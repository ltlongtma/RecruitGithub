import React, { useEffect, useState } from "react";
import { TableCriteria } from "./Table";
import { useDispatch, useSelector } from "react-redux";
import questionCriteriaApi from "../../services/questionCriteriaApi";
import { getCriteria } from "./getCriteriaSlice";
import { ModalEditCriteria } from "./Modal/ModalEdit";
import { FilterAndAddNew } from "./FilterAndAddnew";

export const GetCriteria = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.getCriteria);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [oldNameCriteria, setOldNameCriteria] = useState();
  const [idCriteria, setIdCriteria] = useState();

  useEffect(() => {
    questionCriteriaApi.getAll().then((res) => {
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
        dispatch(getCriteria(res));
      });
    });
  };
  const onFilterStatus = async (e) => {
    await questionCriteriaApi.getFilter(e).then((res) => {
      dispatch(getCriteria(res.data));
    });
  };

  return (
    <div>
      <FilterAndAddNew data={data} onFilterStatus={onFilterStatus} />

      <TableCriteria data={data} handleOpenModalEditCriteria={handleOpenModalEditCriteria} />
      <ModalEditCriteria
        show={showModalEdit}
        handleClose={() => setShowModalEdit(!showModalEdit)}
        handleSubmitEditCriteria={handleSubmitEditCriteria}
        name={oldNameCriteria}
      />
    </div>
  );
};
