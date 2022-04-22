import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { User as fUser } from '@firebase/auth-types';
import { getUserByEmailAddress } from '../services/api.service';
import { User } from '../interfaces/interfaces';

interface AuthContextType {
  currentUser: fUser | null | undefined;
  currentMongoUser: User | null | undefined;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string, callBack: VoidFunction) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<fUser | null>();
  const [currentMongoUser, setCurrentMongoUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);
  const signUp = async (email: string, password: string) => {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    setCurrentUser(userCredential.user);
  };

  const signIn = async (email: string, password: string, callBack: VoidFunction) => {
    await auth.signInWithEmailAndPassword(email, password);
    callBack();
  };

  const logout = async () => {
    await auth.signOut();
    localStorage.removeItem('user');
  };
  const setMongoUser = async (user: fUser): Promise<void> => {
    const mongoUser = await getUserByEmailAddress(user.email!);
    setCurrentMongoUser(mongoUser);
  };

  useEffect(() => {
    setLoading(true);
    const user = localStorage.getItem('user');
    if (user && user !== 'null') {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
      setMongoUser(parsedUser);
    } else {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        console.log('Auth State changed with user: ', user);
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        if (!user) {
          setCurrentMongoUser(null);
        } else {
          setMongoUser(user);
        }
      });
      setLoading(false);
      return unsubscribe;
    }
    setLoading(false);
  }, []);

  const value: AuthContextType = {
    currentUser,
    currentMongoUser,
    signUp,
    signIn,
    loading,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContext;
