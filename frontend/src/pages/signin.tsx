import { useRef, useState } from "react";
import { signin } from "../api/auth";
import "../styles/auth.css";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usernameRef.current || !passwordRef.current) return;

    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!username || !password) {
      setError("Please fill every field!");
      return;
    }

    try {
      setError("");

      const response = await signin({
        username,
        password,
      });

      localStorage.setItem("token", response.token);

      usernameRef.current.value = "";
      passwordRef.current.value = "";
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Something went wrong. Please try again.",
      );
    }
  };
  return (
    <>
      <div className="auth-page">
        <div className="auth-card">
          <h1 className="logo">PayGo</h1>

          <h2 className="auth-title">Welcome Back</h2>

          <p className="auth-subtitle">Sign in to continue.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username: </label>
              <input
                ref={usernameRef}
                type="text"
                placeholder="Put your Username"
              />
            </div>

            <div className="form-group">
              <label>Password: </label>
              <input
                ref={passwordRef}
                type="text"
                placeholder="Put your Password"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}

            <button type="submit" className="auth-btn">
              Sign In
            </button>
          </form>
          <p className="auth-footer">
            Don't have an account?
            <a href="/signup"> Sign Up</a>
          </p>
        </div>
      </div>
    </>
  );
}
