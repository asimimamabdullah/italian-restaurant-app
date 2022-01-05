import React, { useEffect, useState } from "react";
import "../Orders/Orders/ManageOrders.css";
import axios from "axios";
import { useStateValue } from "../../../StateProvider";
import Loading from "../../Screens/Global/Loading";
import Box from './Box/Box'

const RegisteredUsers = () => {
  const { token } = useStateValue();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null)

  useEffect(() => {
    if (token[0]) {
      const getUsers = async () => {
        try {
          await axios
            .get("/api/users", {
              headers: {
                Authorization: `Bearer ${ token[0] }`,
              },
            })
            .then((response) => {
              setUsers(response.data.users);
            });
        } catch (error) {
          setError(error.response.data.error)
        }
      };
      getUsers();
    }
  }, [token]);

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 2000);
  }


  if (users.length === 0) return <Loading />;

  return (
    <div className="manageOrders">
      {error && <div className="error__box">{error}</div>}

      <h2 className="manageOrders__title">Registered Users</h2>

      <div className="manageOrders__container">

        {users?.map((user, i) => (
          < Box {...user} key={i} />
        ))}
      </div>
    </div>

  )
};

export default RegisteredUsers;
