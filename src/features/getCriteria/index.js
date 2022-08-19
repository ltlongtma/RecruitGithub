import React, { useEffect, useState } from "react";
import { TableCriteria } from "./Table";
import { useDispatch, useSelector } from "react-redux";
import questionCriteriaApi from "../../services/questionCriteriaApi";
import { getCriteria } from "./getCriteriaSlice";
import { ModalEditCriteria } from "./Modal/ModalEdit";
import { FilterAndAddNew } from "./FilterAndAddnew";
import PaginatedItems from "../../components/Pagination";
import { ModalDeleteCriteria } from "./Modal/ModalDelete";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";

export const GetCriteria = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.getCriteria);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [oldNameCriteria, setOldNameCriteria] = useState();
  const [idCriteria, setIdCriteria] = useState();
  const [paramStatus, setParamStatus] = useState({
    active: "",
    keyword: "",
  });
  const debounce = useDebounce(paramStatus, 500);
  useEffect(() => {
    questionCriteriaApi.getFilter(debounce).then((res) => {
      dispatch(getCriteria(res));
    });
  }, [debounce]);

  const handleOpenModalEditCriteria = (item) => {
    setShowModalEdit(!showModalEdit);
    setOldNameCriteria(item?.name);
    setIdCriteria(item?.id);
  };
  const handleOpenModalDelete = (item) => {
    setShowModalDelete(!showModalDelete);
    setIdCriteria(item?.id);
  };
  const handleDelete = async () => {
    await questionCriteriaApi
      .delete(idCriteria)
      .then((res) => {})
      .catch((err) => {
        console.log("ERROR DELETE >>>", err);
      });
    await questionCriteriaApi.getFilter().then((res) => {
      dispatch(getCriteria(res));
    });
    setShowModalDelete(false);
    navigate(`/question-criteria`);
  };
  const handleSubmitEditCriteria = (id, name) => {
    id = idCriteria;
    questionCriteriaApi.changeName(id, name).then(() => {
      questionCriteriaApi.getAll().then((res) => {
        dispatch(getCriteria(res.data));
      });
    });
  };
  const onFilterStatus = async (e) => {
    setParamStatus(e);
  };
  const onPageChange = (page) => {
    const newParamStatus = { ...paramStatus, page };
    setParamStatus(newParamStatus);
    // questionCriteriaApi
    //   .getFilter(newParamStatus)
    //   .then((res) => {
    //     dispatch(getCriteria(res.data));
    //   })
    //   .catch((error) => {});
  };

  return (
    <div>
      <FilterAndAddNew data={data} onFilterStatus={onFilterStatus} paramStatus={paramStatus} />

      <TableCriteria
        data={data}
        handleOpenModalEditCriteria={handleOpenModalEditCriteria}
        handleOpenModalDelete={handleOpenModalDelete}
      />
      <ModalEditCriteria
        show={showModalEdit}
        handleClose={() => setShowModalEdit(!showModalEdit)}
        handleSubmitEditCriteria={handleSubmitEditCriteria}
        name={oldNameCriteria}
      />
      <ModalDeleteCriteria
        show={showModalDelete}
        handleClose={() => setShowModalDelete(!showModalDelete)}
        onDelete={handleDelete}
      />
      <PaginatedItems pagination={data?.pagination} onPageChange={onPageChange} />
    </div>
  );
};
