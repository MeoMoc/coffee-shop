import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import authService from "@/services/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string,
    role?: string
  ) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = authService.getToken();
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const result = await authService.login(username, password);
    if (result.success) {
      setToken(result.token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    role = "USER"
  ) => {
    const result = await authService.register(username, email, password, role);
    if (result.success) {
      setToken(result.token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      token,
      loading,
      login,
      register,
      logout,
    }),
    [isAuthenticated, token, loading]
  );

  if (loading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};