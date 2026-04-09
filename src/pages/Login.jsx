import { useState } from "react";
import { useNavigate } from "react-router-dom";
import appLogo from "../assets/app-logo.svg";
import { supabase } from "../supabase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else navigate("/");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      else navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 w-full h-screen flex flex-col justify-center gap-8">
      <div>
        <img src={appLogo} className="circle-avatarImage mb-5" alt="running" />
        <h1 className="text-bold text-2xl">
          {isSignUp ? "Create account" : "Welcome back"}
        </h1>
        <p className="text-muted">
          {isSignUp ? "Start tracking your runs" : "Sign in to continue"}
        </p>
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

        {/* 移除 card class，避免 flex-1 和半透明背景干擾按鈕樣式 */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="button-main"
        >
          {loading ? "Loading..." : isSignUp ? "Sign up" : "Sign in"}
        </button>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-muted mt-2"
        >
          {isSignUp
            ? "Already have an account? Sign in"
            : "No account? Sign up"}
        </button>
      </div>
      <div className="fixed inset-0 -z-10 h-full w-full bg-bg overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 h-full w-full rounded-full bg-mainBrand opacity-10 blur-[120px] animate-ghost-smooth" />
        <div
          className="absolute -bottom-1/3 -right-1/4 h-full w-full rounded-full bg-mainBrand opacity-5 blur-[100px]  animate-ghost-smooth animation-delay-500" // 需在 config 或任意值設定延遲
        />
      </div>
    </div>
  );
}

export default Login;
