import { useRef, useState } from "react";
import { signup } from "../api/auth";

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
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username </label>
            <input
              ref={usernameRef}
              type="text"
              placeholder="Enter Unique Username"
            />
          </div>

          <div>
            <label>Email </label>
            <input ref={emailRef} type="text" placeholder="Enter Email" />
          </div>

          <div>
            <label>Password </label>
            <input ref={passwordRef} type="text" placeholder="Enter Password" />
          </div>

          <div>
            <label>First Name </label>
            <input
              ref={firstNameRef}
              type="text"
              placeholder="Enter First Name"
            />
          </div>

          <div>
            <label>Last Name </label>
            <input
              ref={LastNameRef}
              type="text"
              placeholder="Enter Last Name"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
