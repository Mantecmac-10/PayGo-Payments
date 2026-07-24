import { useRef, useState } from "react";

interface Submission {
  username: string;
  email: string;
  password: string;
  firstName: string;
  LastName: string;
}
export default function Form() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const LastNameRef = useRef<HTMLInputElement | null>(null);

  const [submitted, setSubmitted] = useState<Submission | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
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
      setSubmitted(null);
      return;
    }

    setError("");
    setSubmitted({ username, email, password, firstName, LastName });

    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    firstNameRef.current.value = "";
    LastNameRef.current.value = "";
    usernameRef.current.focus();
  };
  return (
    <>
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              ref={usernameRef}
              type="text"
              placeholder="Enter Unique Username"
            />
          </div>

          <div>
            <label>Email</label>
            <input ref={emailRef} type="text" placeholder="Enter Email" />
          </div>

          <div>
            <label>Password</label>
            <input ref={passwordRef} type="text" placeholder="Enter Password" />
          </div>

          <div>
            <label>First Name</label>
            <input
              ref={firstNameRef}
              type="text"
              placeholder="Enter First Name"
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              ref={LastNameRef}
              type="text"
              placeholder="Enter Last Name"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit">Submit</button>
        </form>

        {submitted && (
          <div>
            <p className="font-medium">Submitted!</p>
            <p>Username: {submitted.username}</p>
            <p>Email: {submitted.email}</p>
            <p>Password: {submitted.password}</p>
            <p>First Name: {submitted.firstName}</p>
            <p>Last Name: {submitted.LastName}</p>
          </div>
        )}
      </div>
    </>
  );
}
