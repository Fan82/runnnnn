import { useState } from "react";
import { useNavigate } from "react-router-dom";
import appLogo from "../assets/app-logo.svg";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    navigate("/login");
  };

  return (
    <div className="p-8 w-full h-screen flex flex-col justify-center gap-8 bg-bg overflow-hidden">
      <div>
        <img
          src={appLogo}
          className="size-20 rounded-4xl object-cover mb-5 ml-auto mr-auto"
          alt="logo"
        />
        <h1 className="text-bold text-2xl">Create account</h1>
        <p className="text-muted">Sign up to get started</p>
      </div>

      <div className="w-full flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-zinc-100/10 text-zinc-100 rounded-2xl p-4 outline-none placeholder:text-zinc-100/30"
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full bg-zinc-100/10 text-zinc-100 rounded-2xl p-4 outline-none placeholder:text-zinc-100/30"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button onClick={handleSubmit} className="button-main">
          Create Account
        </button>

        <p
          className="text-center text-zinc-400 text-sm cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account?{" "}
          <span className="text-zinc-100">Sign in</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
