import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import AdminLayout
from "../../components/AdminLayout";

import "../../styles/adminUsers.css";

function Users() {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:5000/api/admin/users",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setUsers(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  const deleteUser =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this user?"
        );

      if (!confirmDelete) {

        return;

      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(
          `http://localhost:5000/api/admin/users/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        fetchUsers();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <AdminLayout>

      <div className="admin-users">

        <h1>
          Users Management
        </h1>

        <table>

          <thead>

            <tr>

              <th>
                Name
              </th>

              <th>
                Email
              </th>

              <th>
                Role
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user._id}>

                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

                <td>

                  <button
                    onClick={() =>
                      deleteUser(
                        user._id
                      )
                    }
                    className="delete-btn"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );

}

export default Users;