import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { User as fUser } from '@firebase/auth-types';

interface AuthContextType {
  currentUser: fUser | null | undefined;
  signUp: (email: string, password: string) => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<fUser | null>();

  const signUp = async (email: string, password: string) => {
    console.log(email);
    const user = auth.createUserWithEmailAndPassword(email, password);
    console.log(user);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value: AuthContextType = { currentUser, signUp };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
