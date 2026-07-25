import { useEffect, useState } from "react";
import { getUser } from "../api/user";

interface User {
  username: string;
}

export const SearchUsers = () => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState<User[]>([]);

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
      <div>
        <h1>Serch User</h1>
        <input
          type="text"
          placeholder="Search username..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div>
          {users.map((user) => (
            <div key={user.username}>
              <p>{user.username}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
