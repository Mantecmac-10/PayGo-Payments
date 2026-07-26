import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doTransfer } from "../api/account";
import "../styles/transfer.css";

interface User {
  username: string;
}

export const Transfer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = location.state?.user as User | undefined;

  if (!user) {
    return (
      <div>
        <h2>No user selected</h2>
      </div>
    );
  }
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    try {
      if (!amount || Number(amount) <= 0) {
        alert("Please enter a valid amount");
        return;
      }

      await doTransfer(Number(amount), user.username);

      alert("Transfer Successful");

      navigate("/balance");
    } catch (err: any) {
      console.error(err);

      alert(
        err.response?.data?.message || "Transfer failed. Please try again.",
      );
    }
  };

  return (
    <>
      <div className="transfer-page">
        <div className="transfer-card">
          <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>

          <h2 className="transfer-title">Send Money</h2>

          <p className="transfer-user">@{user.username}</p>

          <div className="input-group">
            <label>Amount (₹)</label>

            <input
              type="number"
              min="1"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button className="transfer-btn" onClick={handleTransfer}>
            Transfer Money
          </button>
        </div>
      </div>
    </>
  );
};
