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
  signIn: (email: string, password: string) => Promise<void>;
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
    console.log(userCredential);
  };

  const signIn = async (email: string, password: string) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  const logout = async () => {
    await auth.signOut();
    localStorage.removeItem('user');
  };

  useEffect(() => {
    setLoading(true);
    const user = localStorage.getItem('user');
    if (user && user !== 'null') {
      const parsedUser = JSON.parse(user);
      const getMongoUser = async (user: fUser): Promise<void> => {
        const mongoUser = await getUserByEmailAddress(user.email!);
        console.log('mongouser found: ', mongoUser);
        if (mongoUser) {
          setCurrentUser(parsedUser);
          setCurrentMongoUser(mongoUser);
        }
        setLoading(false);
      };
      getMongoUser(parsedUser);
    } else {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        setLoading(true);

        console.log('Auth State changed with user: ', user);
        if (!user) {
          setCurrentUser(null);
          setCurrentMongoUser(null);
        } else {
          console.log('getting muser by email');
          const mongoUser = await getUserByEmailAddress(user.email!);
          console.log(mongoUser);
          if (mongoUser) {
            localStorage.setItem('user', JSON.stringify(user));
            setCurrentUser(user);
            setCurrentMongoUser(mongoUser);
          } else {
            setUserSigningUp(user);
          }
        }
        setLoading(false);
      });
      return unsubscribe;
    }
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
