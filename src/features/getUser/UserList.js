import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/AxiosInstance";
import { getUsers, editUser } from "./getUsersSlice";
import { ModalDeleteUser } from "./Modal/ModalDeleteUser";
import { ModalEditRole } from "./Modal/ModalEditRole";
import { TableData } from "./Table";

export const UserList = () => {
  const dispatch = useDispatch();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [user, setUser] = useState();
  const [role, setRole] = useState();

  const userList = useSelector((state) => state.user);

  const token = sessionStorage.getItem("isToken");
  useEffect(() => {
    axiosInstance
      .get(`user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(getUsers(response.data));
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  }, [dispatch, token]);

  const handleDelete = (e) => {
    const id = e;

    axiosInstance
      .delete(`user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return axiosInstance.get(`user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((response) => {
        dispatch(getUsers(response.data));
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
    axiosInstance.put(`user/${id}`, data, { headers }).then((res) => {
      dispatch(editUser(res.data));
    });

    handleCloseModalEdit();
  };
  const handleChangeRole = (e) => {
    const value = e.target.value;
    setRole(value === "ADMIN" ? 1 : value === "USER" ? 2 : 3);
  };
  return (
    <div>
      <TableData
        userList={userList}
        handleShowModalEdit={handleShowModalEdit}
        handleShowModalDelete={handleShowModalDelete}
      />
      {/* Modal delete */}
      <ModalDeleteUser
        centered
        show={showModalDelete}
        onHide={handleCloseModalDelete}
        closeModal={handleCloseModalDelete}
        onDelete={() => handleDelete(user?.id)}
      />
      {/* Modal Edit Role */}
      <ModalEditRole
        centered
        show={showModalEdit}
        onHide={handleCloseModalEdit}
        handleChangeRole={handleChangeRole}
        handleEditNewRole={handleEditNewRole}
        handleCloseModalEdit={handleCloseModalEdit}
        user={user}
      />
    </div>
  );
};
