import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosClient from "../../services/AxiosClient";
import { getUsers, editUser } from "./getUsersSlice";
import { ModalDeleteUser } from "./Modal/ModalDeleteUser";
import { ModalEditRole } from "./Modal/ModalEditRole";
import { TableData } from "./Table";
import FormFilterUser from "../../features/getUser/FormFilter";

export const UserList = () => {
  const dispatch = useDispatch();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [user, setUser] = useState();
  const [role, setRole] = useState();

  const userList = useSelector((state) => state.user);

  useEffect(() => {
    axiosClient
      .get(`user`, {})
      .then((response) => {
        dispatch(getUsers(response));
      })
      .catch((error) => {});
  }, [dispatch]);

  const handleDelete = (e) => {
    const id = e;

    axiosClient
      .delete(`user/${id}`)
      .then((response) => {
        return axiosClient.get(`user`);
      })
      .then((response) => {
        dispatch(getUsers(response));
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
    const data = {
      roles: [
        {
          id: role,
        },
      ],
    };

    axiosClient
      .put(`user/${id}`, data)
      .then((res) => {
        console.log("RESPONSE ", res);
        dispatch(editUser(res));
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });

    handleCloseModalEdit();
  };
  const handleChangeRole = (e) => {
    const value = e.target.value;
    setRole(value === "ADMIN" ? 1 : value === "USER" ? 2 : 3);
  };
  //Filter data, accept data from children FormFilterUser
  const onFilterAll = (e) => {
    axiosClient
      .get(`user/filter`, { params: e })
      .then((response) => {
        dispatch(getUsers(response.data));
      })
      .catch((error) => {});
  };
  return (
    <div>
      <FormFilterUser onFilterAll={onFilterAll} />

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
