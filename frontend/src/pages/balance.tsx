import { useEffect, useState } from "react";
import { getBalance } from "../api/account";
import "../styles/balance.css";

export const Balance = () => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const data = await getBalance();
        setBalance(data.balance);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div className="balance-page">
      <div className="balance-card">
        <div className="balance-top">
          <span className="balance-icon">💳</span>
          <p className="balance-heading">Available Balance</p>
        </div>

        <h1 className="balance-amount">₹ {balance.toLocaleString("en-IN")}</h1>

        <p className="balance-message">Ready for your next transaction.</p>
      </div>
    </div>
  );
};
