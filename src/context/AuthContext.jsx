import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Mantener sesión al refrescar
  useEffect(() => {
    const saved = localStorage.getItem("authUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // ✅ LOGIN
  const login = (email, password) => {
    // ✅ ADMIN FIJO
    if (
      email === "rodrigomontes167@gmail.com" &&
      password === "React2025!"
    ) {
      const adminUser = {
        email,
        role: "admin",
      };

      setUser(adminUser);
      localStorage.setItem("authUser", JSON.stringify(adminUser));

      return { ok: true, user: adminUser };
    }

    // ✅ USUARIO NORMAL (cualquiera)
    if (email && password.length >= 4) {
      const normalUser = {
        email,
        role: "user",
      };

      setUser(normalUser);
      localStorage.setItem("authUser", JSON.stringify(normalUser));

      return { ok: true, user: normalUser };
    }

    return { ok: false, message: "Credenciales inválidas" };
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin", // ✅ CLAVE
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
