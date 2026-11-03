import { useState, useEffect } from "react";

interface User {
  id: number;
    name: string;
    username: string;
     email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
    useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true);
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const userData: User[] = await response.json();
          setUsers(userData);
        } catch (error) {
            setError('Failed to fetch users');
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;