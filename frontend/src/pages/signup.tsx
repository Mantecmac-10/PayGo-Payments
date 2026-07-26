import { useRef, useState } from "react";
import { signup } from "../api/auth";
import "../styles/auth.css";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const LastNameRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !usernameRef.current ||
      !emailRef.current ||
      !passwordRef.current ||
      !firstNameRef.current ||
      !LastNameRef.current
    )
      return;

    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const firstName = firstNameRef.current.value.trim();
    const LastName = LastNameRef.current.value.trim();

    if (!username || !email || !password || !firstName || !LastName) {
      setError("Please fill every field!");
      return;
    }

    try {
      setError("");

      await signup({
        username,
        email,
        password,
        firstName,
        LastName,
      });

      usernameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      firstNameRef.current.value = "";
      LastNameRef.current.value = "";
      usernameRef.current.focus();
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

          <h2 className="auth-title">Create Account</h2>

          <p className="auth-subtitle">Start sending money instantly.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username </label>
              <input
                ref={usernameRef}
                type="text"
                placeholder="Enter Unique Username"
              />
            </div>

            <div className="form-group">
              <label>Email </label>
              <input ref={emailRef} type="text" placeholder="Enter Email" />
            </div>

            <div className="form-group">
              <label>Password </label>
              <input
                ref={passwordRef}
                type="text"
                placeholder="Enter Password"
              />
            </div>

            <div className="form-group">
              <label>First Name </label>
              <input
                ref={firstNameRef}
                type="text"
                placeholder="Enter First Name"
              />
            </div>

            <div className="form-group">
              <label>Last Name </label>
              <input
                ref={LastNameRef}
                type="text"
                placeholder="Enter Last Name"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button type="submit" className="auth-btn">
              Submit
            </button>
          </form>
          <p className="auth-footer">
            Already have an account?
            <a href="/signin"> Sign In</a>
          </p>
        </div>
      </div>
    </>
  );
}
