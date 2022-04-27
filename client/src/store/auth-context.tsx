import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { User as fUser } from '@firebase/auth-types';
import { getUserByEmailAddress } from '../services/api.service';
import { User } from '../interfaces/interfaces';

interface AuthContextType {
  currentUser: fUser | null | undefined;
  currentMongoUser: User | null | undefined;
  setCurrentMongoUser: Dispatch<SetStateAction<User | null | undefined>>;
  userSigningUp: fUser | null | undefined;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string, cb: VoidFunction) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<fUser | null>();
  const [userSigningUp, setUserSigningUp] = useState<fUser | null>();
  const [currentMongoUser, setCurrentMongoUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);
  const signUp = async (email: string, password: string) => {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    setUserSigningUp(userCredential.user);
  };

  const signIn = async (email: string, password: string, cb: VoidFunction) => {
    await auth.signInWithEmailAndPassword(email, password);
    cb();
  };

  const logout = async () => {
    await auth.signOut();
    localStorage.removeItem('user');
    setCurrentMongoUser(null);
    setCurrentUser(null);
  };

  useEffect(() => {
    setLoading(true);

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (!user) {
        setCurrentUser(null);
        setCurrentMongoUser(null);
        localStorage.removeItem('user');
      } else {
        try {
          const lsUser = localStorage.getItem('user');
          if (lsUser) {
            const parsedUser = JSON.parse(lsUser);
            const getMongoUser = async (user: fUser): Promise<void> => {
              const lsMongoUser = await getUserByEmailAddress(user.email!);
              if (lsMongoUser) {
                setCurrentUser(parsedUser);
                setCurrentMongoUser(lsMongoUser);
              }
              setLoading(false);
            };
            getMongoUser(parsedUser);
          }
          const mongoUser = await getUserByEmailAddress(user.email!);
          if (mongoUser) {
            localStorage.setItem('user', JSON.stringify(user));
            setCurrentUser(user);
            setCurrentMongoUser(mongoUser);
          } else {
            setUserSigningUp(user);
          }
        } catch {
          return;
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    currentMongoUser,
    setCurrentMongoUser,
    userSigningUp,
    signUp,
    signIn,
    loading,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContext;
