import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ AHORA SÍ: con await
      const res = await login(email.trim(), password);

      if (res?.ok) {
        const role = res.user?.role;
        const emailUser = res.user?.email || email;

        // ✅ Mensaje personalizado
        if (role === "admin") {
          toast.success("¡Bienvenido Admin!");
          nav("/admin");
        } else {
          toast.success(`Bienvenido ${emailUser}`);
          nav("/");
        }

      } else {
        toast.error(res?.message || "Credenciales inválidas");
      }

    } catch (err) {
      console.error(err);
      toast.error("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - eCommerce</title>
      </Helmet>

      <div className="dark-page">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <h3>Login</h3>

            <form onSubmit={handle}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Ingresando..." : "Ingresar"}
              </button>
            </form>

            <p className="mt-3 small text-light">
              Para solicitar credenciales de Administrador enviar mail a: <strong>rodrigomontes167@gmail.com</strong> 
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
