import React, { useEffect, useState } from "react";
import { TableCriteria } from "./Table";
import { useDispatch, useSelector } from "react-redux";
import questionCriteriaApi from "../../services/questionCriteriaApi";
import { getCriteria } from "./getCriteriaSlice";
import { ModalEditCriteria } from "./Modal/ModalEdit";
import { FilterAndAddNew } from "./FilterAndAddnew";
import PaginatedItems from "../../components/Pagination";

export const GetCriteria = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.getCriteria);
  // console.log("DATA >>>", data);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [oldNameCriteria, setOldNameCriteria] = useState();
  const [idCriteria, setIdCriteria] = useState();
  const [paramStatus, setParamStatus] = useState({
    enable: "",
    keyword: "",
  });

  useEffect(() => {
    questionCriteriaApi.getFilter().then((res) => {
      dispatch(getCriteria(res));
    });
  }, []);

  const handleOpenModalEditCriteria = (item) => {
    setShowModalEdit(!showModalEdit);
    setOldNameCriteria(item?.name);
    setIdCriteria(item?.id);
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
    await questionCriteriaApi.getFilter(e).then((res) => {
      dispatch(getCriteria(res));
    });
  };
  const onPageChange = (page) => {
    const newParamStatus = { ...paramStatus, page };
    setParamStatus(newParamStatus);
    questionCriteriaApi
      .getFilter(newParamStatus)
      .then((res) => {
        dispatch(getCriteria(res.data));
      })
      .catch((error) => {});
  };

  return (
    <div>
      <FilterAndAddNew data={data} onFilterStatus={onFilterStatus} paramStatus={paramStatus} />

      <TableCriteria data={data} handleOpenModalEditCriteria={handleOpenModalEditCriteria} />
      <ModalEditCriteria
        show={showModalEdit}
        handleClose={() => setShowModalEdit(!showModalEdit)}
        handleSubmitEditCriteria={handleSubmitEditCriteria}
        name={oldNameCriteria}
      />
      <PaginatedItems pagination={data?.pagination} onPageChange={onPageChange} />
    </div>
  );
};
