import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUsers, deleteUser } from "./getUsersSlice";
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
        //  console.log("RESPONE ", response.data);
        dispatch(getUsers(response.data));
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  }, [dispatch]);

  const handleDelete = (e) => {
    const id = e;

    axios
      .delete(`http://localhost:8080/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(deleteUser(id));
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
    setShowModalDelete(false);
  };
  const handleClose = () => setShowModalDelete(false);
  const handleShow = (id) => {
    setShowModalDelete(true);
    setUser(id);
  };
  // console.log("USER LIST " + UserList);

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
          {UserList.length > 0 &&
            UserList?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.id}</td>
                  <td>{item?.username}</td>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.roles[0].name}</td>
                  <td>
                    {/* <ModeEditOutlineTwoToneIcon onClick={() => setShowModalEdit(true)} /> */}
                    <DeleteRoundedIcon onClick={() => handleShow(item)} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {/* Modal delete */}
      <Modal show={showModalDelete} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to delete this user?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleDelete(user?.id)}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Edit Role */}
      <Modal show={showModalEdit} onHide={() => setShowModalEdit(!showModalEdit)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Edit account {user.name} with role {user.roles[0].name}?
          <Form>
            <Form.Text>New Role</Form.Text>
            <Form.Check type="radio" label="ADMIN" id="admin" name="role" />
            <Form.Check type="radio" label="USER" id="user" name="role" />
            <Form.Check type="radio" label="GUEST" id="guest" name="role" />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Save</Button>
          <Button variant="primary" onClick={() => setShowModalEdit(!showModalEdit)}>
            Cancer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
