import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionCategoryApi from "../../services/questionCategoryApi";
import { TableCategory } from "./Table";
import { getCategory } from "./getCategorySlice";
import { FilterAndAddNew } from "./FilterAndAddnew";
import { ModalEditCategory } from "./Modal/modalEdit";
import { useDebounce } from "../../hooks";
import PaginatedItems from "../../components/Pagination";

export const CategoryQuestion = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.getCategoryQuestion);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [oldNameCategory, setOldNameCategory] = useState();
  const [idCategory, setIdCategory] = useState();
  const [paramStatus, setParamStatus] = useState({
    active: "",
    keyword: "",
    // page: "",
    // pageSize: "",
  });

  useEffect(() => {
    questionCategoryApi.getFilter().then((res) => {
      dispatch(getCategory(res));
    });
  }, []);

  const onFilterStatus = async (e) => {
    await questionCategoryApi.getFilter(e).then((res) => {
      dispatch(getCategory(res));
    });
  };
  const handleOpenModalEditCategory = (item) => {
    setShowModalEdit(!showModalEdit);
    setOldNameCategory(item?.name);
    setIdCategory(item?.id);
  };
  const handleSubmitEditCategory = (id, name) => {
    id = idCategory;
    questionCategoryApi.changeName(id, name).then(() => {
      questionCategoryApi.getFilter().then((res) => {
        dispatch(getCategory(res));
      });
    });
  };
  const onPageChange = (page) => {
    const newParamStatus = { ...paramStatus, page };
    setParamStatus(newParamStatus);
    questionCategoryApi.getFilter(newParamStatus).then((res) => {
      dispatch(getCategory(res));
    });
  };

  return (
    <div>
      <FilterAndAddNew data={data} onFilterStatus={onFilterStatus} paramStatus={paramStatus} />
      <TableCategory data={data} handleOpenModalEditCategory={handleOpenModalEditCategory} />
      <ModalEditCategory
        show={showModalEdit}
        handleClose={() => setShowModalEdit(!showModalEdit)}
        handleSubmitEditCategory={handleSubmitEditCategory}
        name={oldNameCategory}
      />
      <PaginatedItems pagination={data?.pagination} onPageChange={onPageChange} />
    </div>
  );
};
