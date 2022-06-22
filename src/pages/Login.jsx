import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      setError("");
      history.push("/");
    } catch (error) {
      if (error.code === "auto/internal-error") setError("Correo inválido");
    }
  };
  return (
    <div>
      {error && <p>error</p>}
      <form>
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          placeholder="tucorreo@undominio.org"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          min={6}
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Registrarme</button>
      </form>
    </div>
  );
}

export default Login;
