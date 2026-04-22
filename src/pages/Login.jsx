import { useState } from "react";
import { useNavigate } from "react-router-dom";
import appLogo from "../assets/app-logo.svg";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    localStorage.setItem("demo_logged_in", "true");
    navigate("/");
  };

  return (
    <div className="p-8 w-full h-screen flex flex-col justify-center gap-8 bg-bg overflow-hidden">
      <div>
        <img
          src={appLogo}
          className="size-44 rounded-4xl object-cover mb-5 ml-auto mr-auto"
          alt="running"
        />
        <h1 className="text-bold text-2xl">Welcome back</h1>
        <p className="text-muted">Sign in to continue</p>
      </div>

      <div className="w-full flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-zinc-100/10 text-zinc-100 rounded-2xl p-4 outline-none placeholder:text-zinc-100/30"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-zinc-100/10 text-zinc-100 rounded-2xl p-4 outline-none placeholder:text-zinc-100/30"
        />

        <button onClick={handleSubmit} className="button-main">
          Sign in
        </button>
      </div>
      <p
        className="text-center text-zinc-400 text-sm cursor-pointer"
        onClick={() => navigate("/register")}
      >
        Don't have an account? <span className="text-zinc-100">Sign up</span>
      </p>
    </div>
  );
}

export default Login;
