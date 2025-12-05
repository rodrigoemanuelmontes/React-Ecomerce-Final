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
    const res = login(email, password);
    setLoading(false);
    if (res.ok) {
      toast.success("Login correcto");
      nav("/");
    } else {
      toast.error(res.message || "Error al iniciar sesión");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - eCommerce</title>
      </Helmet>

      {/* ⬅ AGREGAMOS ESTO */}
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
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Ingresando..." : "Ingresar"}
              </button>
            </form>

            {/* Este texto ahora será blanco */}
            <p className="mt-3 small">
              Para solicitar credenciales enviar email a: rodrigomontes167@gmail.com
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
