import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Users = () => {
  const { backendUrl } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loadingEmail, setLoadingEmail] = useState(null);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/all-users", {
        withCredentials: true,
      });

      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRoleChange = async (email, role) => {
    try {
      setLoadingEmail(email);

      const { data } = await axios.put(
        backendUrl + "/api/user/update-role",
        { email, role },
        { withCredentials: true },
      );

      if (data.success) {
        setUsers((prev) =>
          prev.map((user) => (user.email === email ? { ...user, role } : user)),
        );
        toast.success("Role updated");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingEmail(null);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">All Users</h2>

      {users.map((user) => (
        <div
          key={user.email}
          className="flex justify-between items-center p-2 shadow rounded mb-2"
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm">{user.name}</p>
            <p className="text-sm">{user.email}</p>
          </div>

          <select
            value={user.role}
            disabled={loadingEmail === user.email}
            onChange={(e) => handleRoleChange(user.email, e.target.value)}
            className="border rounded border-gray-400 px-1 py-1"
          >
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="user">User</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Users;
