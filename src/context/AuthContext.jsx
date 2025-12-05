import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const s = localStorage.getItem("user");
    if (s) setUser(JSON.parse(s));
  }, []);

 const login = (email, password) => {
  const EMAIL_VALIDO = "rodrigomontes167@gmail.com";
  const PASSWORD_VALIDO = "React2025!";

  if (email === EMAIL_VALIDO && password === PASSWORD_VALIDO) {
    const u = { email };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
    return { ok: true };
  }

  return { ok: false, message: "Email o contraseña incorrectos" };
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
