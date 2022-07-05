import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getUsers, deleteUser } from "./getUsersSlice";
import Table from "react-bootstrap/Table";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export const UserList = () => {
  const dispatch = useDispatch();
  const UserList = useSelector((state) => state.user);

  const token = sessionStorage.getItem("isToken");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("RESPONE ", response.data);
        dispatch(getUsers(response.data));
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  }, [dispatch, token]);
  // console.log("UserList: " + JSON.stringify(UserList));
  const handleDelete = (e) => {
    const id = e;
    axios
      .delete(`http://localhost:8080/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("RESPONE ", response.data);

        // dispatch(getUsers(response.data));
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };
  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Num</th>
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {UserList.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.roles[0].name}</td>
                <td>
                  <ModeEditOutlineTwoToneIcon />
                  <DeleteRoundedIcon onClick={(e) => handleDelete(user.id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
