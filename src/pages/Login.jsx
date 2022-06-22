import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = () => {
    history.push("/register");
  };
  
  const handleResetPassword = async () => {
    if(!email) return setError("Por favor ingresa un correo")
    try {
      await resetPassword(email)
      setError("Te enviamos un correo para crear una nueva contraseña")
    } catch (error){
      setError(error.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      {error && <p>{error}</p>}
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
        <button onClick={handleSubmit}>Login</button>
      </form>
      <br />
      <a
        href="#!"
        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        onClick={handleResetPassword}
      >
        Olvidaste tu contraseña?
      </a>
      <br />
      <button onClick={handleRegister}>Crear una cuenta</button>
      <br />
      <button onClick={handleGoogleLogin}>Login with google</button>
    </div>
  );
}

export default Login;
