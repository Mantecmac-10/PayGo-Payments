import { useEffect, useState } from "react";
import { getUser } from "../api/user";
import { useNavigate } from "react-router-dom";
import "../styles/search.css";

interface User {
  username: string;
}

export const SearchUsers = () => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!filter.trim()) {
      setUsers([]);
      return;
    }
    const fetchUser = async () => {
      try {
        const data = await getUser(filter);
        setUsers(data.users);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [filter]);

  return (
    <>
      <div className="search-page">
        <div className="search-container">
          <h1 className="search-title">Find Users</h1>

          <p className="search-subtitle">Search by username to send money.</p>

          <input
            className="search-input"
            type="text"
            placeholder="Search username..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <div className="user-list">
            {users.length === 0 && filter.trim() !== "" ? (
              <p className="empty-message">No users found.</p>
            ) : (
              users.map((user) => (
                <div className="user-card" key={user.username}>
                  <div className="user-info">
                    <div className="avatar">
                      {user.username.charAt(0).toUpperCase()}
                    </div>

                    <div className="user-details">
                      <h3>{user.username}</h3>
                      <p>@{user.username}</p>
                    </div>
                  </div>

                  <button
                    className="send-btn"
                    onClick={() =>
                      navigate("/transfer", {
                        state: {
                          user: user,
                        },
                      })
                    }
                  >
                    Send Money
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
