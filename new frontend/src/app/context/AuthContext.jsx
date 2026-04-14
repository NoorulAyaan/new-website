import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  const login = () => {
    console.warn("Login is disabled until backend is implemented");
    return false;
  };

  const signup = () => {
    console.warn("Signup is disabled until backend is implemented");
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = false;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}