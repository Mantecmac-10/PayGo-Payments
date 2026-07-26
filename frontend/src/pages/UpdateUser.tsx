import { useState } from "react";
import { updateUser, verifyUser } from "../api/user";
import "../styles/update.css";

export const UpdateUser = () => {
  const [verified, setVerified] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");

  const [password, setNewPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");

  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      await verifyUser(currentPassword);

      setVerified(true);
      setMessage("");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Wrong password");
    }
  };

  const handleUpdate = async () => {
    try {
      const data = await updateUser({
        password,
        firstName,
        LastName,
      });

      setMessage(data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="update-page">
      <div className="update-card">
        <h1>Update Profile</h1>

        {!verified ? (
          <>
            <p className="subtitle">Enter current password</p>

            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <button className="update-btn" onClick={handleVerify}>
              Continue
            </button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label>First Name</label>

              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>

              <input
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>New Password</label>

              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button className="update-btn" onClick={handleUpdate}>
              Update Account
            </button>
          </>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};
