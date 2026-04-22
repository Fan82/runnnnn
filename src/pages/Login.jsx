import { useState } from "react";
import { useNavigate } from "react-router-dom";
import appLogo from "../assets/app-logo.svg";

// 假帳號設定
const DEMO_EMAIL = "demo@example.com";
const DEMO_PASSWORD = "demo1234";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    // 模擬網路延遲
    await new Promise((res) => setTimeout(res, 600));

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem("demo_logged_in", "true");
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 w-full h-screen flex flex-col justify-center gap-8">
      <div>
        <img src={appLogo} className="circle-avatarImage mb-5" alt="running" />
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

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="button-main"
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
      </div>

      <div className="fixed inset-0 -z-10 h-full w-full bg-bg overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 h-full w-full rounded-full bg-mainBrand opacity-10 blur-[120px] animate-ghost-smooth" />
        <div className="absolute -bottom-1/3 -right-1/4 h-full w-full rounded-full bg-mainBrand opacity-5 blur-[100px] animate-ghost-smooth animation-delay-500" />
      </div>
    </div>
  );
}

export default Login;
