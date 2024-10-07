"use client";
import { createContext, useState, useContext, useEffect, use } from "react";
import jwt from "jsonwebtoken";
const AuthContext = createContext<AuthContextType | null>(null);
interface User {
  _id: string;
  name: string;
  avatar?: string;
  role: "manager" | "member" | "";
}
interface AuthContextType {
  isAuthenticated: boolean | undefined;
  login: () => void;
  user: User;
  logout: () => void;
  isLoading: boolean;
}
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const [user, setUser] = useState<User>({ _id: "", name: "", avatar: "", role: "" });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    login();
  }, []);

  const login = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwt.decode(token) as jwt.JwtPayload;
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          setIsAuthenticated(false);
          setUser({ _id: "", name: "", avatar: "", role: "" });
          localStorage.removeItem("token");
        } else {
          setIsAuthenticated(true);
          setUser({
            _id: decodedToken._id,
            name: decodedToken.name,
            avatar: decodedToken.avatar,
            role: decodedToken.role,
          });
        }
      } else {
        setIsAuthenticated(false);
        setUser({ _id: "", name: "", avatar: "", role: "" });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser({ _id: "", name: "", avatar: "", role: "" });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        user,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
