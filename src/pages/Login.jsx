import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="page-wrapper">
      <h1 className="text-bold text-2xl">
        {isSignUp ? "Create account" : "Welcome back"}
      </h1>
      <p className="text-muted mb-8">
        {isSignUp ? "Start tracking your runs" : "Sign in to continue"}
      </p>

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
    </div>
  );
}

export default Login;
