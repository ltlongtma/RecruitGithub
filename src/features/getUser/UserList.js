import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUsers, deleteUser, editUser } from "./getUsersSlice";
import Table from "react-bootstrap/Table";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const UserList = () => {
  const dispatch = useDispatch();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [user, setUser] = useState();
  const [role, setRole] = useState();

  const UserList = useSelector((state) => state.user);
  // console.log("USERLIST ", UserList);

  const token = sessionStorage.getItem("isToken");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log("RESPONE ", response.data);
        dispatch(getUsers(response.data));
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  }, [dispatch, token]);

  const handleDelete = (e) => {
    const id = e;

    axios
      .delete(`http://localhost:8080/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log("RESPONE ", response.data);
        dispatch(deleteUser(id));
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
    setShowModalDelete(false);
  };
  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = (item) => {
    setShowModalDelete(true);
    setUser(item);
  };
  const handleShowModalEdit = (item) => {
    setShowModalEdit(true);
    setUser(item);
  };
  const handleCloseModalEdit = () => setShowModalEdit(false);
  const handleEditNewRole = (id) => {
    const data = { roles: [{ id: role }] };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios.put(`http://localhost:8080/api/user/${id}`, data, { headers }).then((res) => {
      // console.log("RES EDIT " + JSON.stringify(res.data));
    });

    handleCloseModalEdit();
  };
  const handleChangeRole = (e) => {
    const value = e.target.value;
    // console.log("ROLE " + e.target.value);
    setRole(value === "ADMIN" ? 1 : value === "USER" ? 2 : 3);
  };
  return (
    <div>
      <Table striped bordered hover responsive >
        <thead>
          <tr >
            <th>Num</th>
            <th>Id Badge</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {UserList.length > 0 &&
            UserList?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.badgeId}</td>
                  <td>{item?.username}</td>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.roles[0].name}</td>
                  <td>
                    <ModeEditOutlineTwoToneIcon onClick={() => handleShowModalEdit(item)} />
                    <DeleteRoundedIcon onClick={() => handleShowModalDelete(item)} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {/* Modal delete */}
      <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to delete this user?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleDelete(user?.id)}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleCloseModalDelete}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Edit Role */}
      <Modal show={showModalEdit} onHide={handleCloseModalEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Edit account {user?.username} with role {user?.roles[0].name}?
          <Form>
            <Form.Text>New Role</Form.Text>
            <Form.Check
              type="radio"
              label="ADMIN"
              id="admin"
              name="role"
              value="ADMIN"
              onChange={handleChangeRole}
              defaultChecked={user?.roles[0].name === "ADMIN" ? true : false}
            />
            <Form.Check
              type="radio"
              label="USER"
              id="user"
              name="role"
              value="USER"
              onChange={handleChangeRole}
              defaultChecked={user?.roles[0].name === "USER" ? true : false}
            />
            <Form.Check
              type="radio"
              label="GUEST"
              id="guest"
              name="role"
              value="GUEST"
              onChange={handleChangeRole}
              defaultChecked={user?.roles[0].name === "GUEST" ? true : false}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleEditNewRole(user?.id)}>
            Save
          </Button>
          <Button variant="primary" onClick={handleCloseModalEdit}>
            Cancer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
