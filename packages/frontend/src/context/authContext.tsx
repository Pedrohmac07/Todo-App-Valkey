import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from '../services/api';
import { type AuthContextType, type User } from "../interfaces/authInterface";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get('/me');
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);


  const login = async (email: string, password: string) => {

    try {
      const response = await api.post('/sign-in', { email, password });

      setUser({
        id: response.data.userId,
        name: response.data.name,
        email: email
      });

    } catch (error) {
      console.error('Context Error', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/sign-out');
      setUser(null);
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const deleteAccount = async () => {
    try {
      await api.delete('/me');
      setUser(null);
    } catch (error) {
      console.error("Failed to delete account", error);
      throw error;
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    try {
      await api.post('/sign-up', { name, email, password });
      setUser(null)

    } catch (error) {
      console.error('Context Error', error);
      throw error;
    }

  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      deleteAccount,
      signUp
    }
    }> {children} </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
