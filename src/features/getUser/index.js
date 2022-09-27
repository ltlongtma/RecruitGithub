import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosClient from "../../services/AxiosClient";
import { deleteUser, editUser, getUsersByAdmin } from "./Slice";
import { ModalEditRole } from "./Modal/ModalEditRole";
import { TableData } from "./Table";
import FormFilterUser from "../../features/getUser/FormFilter";
import userApi from "../../services/ManageUserApi";
import useDebounce from "../../hooks/useDebounce";
import { ModalConfirm } from "../../components/Modal";

export const UserList = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [params, setParams] = useState({
    page: 1,
    pageSize: 5,
    name: "",
    username: "",
    email: "",
    roleId: "",
  });
  const debounce = useDebounce(params, 500);
  useEffect(() => {
    dispatch(getUsersByAdmin(debounce));
  }, [debounce]);

  const handleDelete = async (e) => {
    await dispatch(deleteUser(e));
    dispatch(getUsersByAdmin());

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
  const handleChangeRoleId = async (e) => {
    const value = e.target.id;
    await setRole(value);
  };
  const handleEditNewRole = async (id) => {
    // console.log("E >>", id, role);
    await dispatch(editUser(id, role));
    dispatch(getUsersByAdmin());

    setShowModalEdit(false);
  };

  //Filter data, accept data from children FormFilterUser
  const onFilterAll = (e) => {
    setParams(e);
  };
  return (
    <div>
      <FormFilterUser onFilterAll={onFilterAll} params={params} />

      <TableData
        userList={userList}
        handleShowModalEdit={handleShowModalEdit}
        handleShowModalDelete={handleShowModalDelete}
      />
      {/* Modal delete */}
      <ModalConfirm
        centered
        title={`DELETE USER`}
        content={`Are you sure want to delete this user?`}
        show={showModalDelete}
        onHide={handleCloseModalDelete}
        handleNoModal={handleCloseModalDelete}
        handleYesModal={() => handleDelete(user?.id)}
      />
      {/* Modal Edit Role */}
      <ModalEditRole
        centered
        show={showModalEdit}
        onHide={handleCloseModalEdit}
        handleChangeRoleId={handleChangeRoleId}
        handleEditNewRole={handleEditNewRole}
        handleCloseModalEdit={handleCloseModalEdit}
        user={user}
      />
    </div>
  );
};
