import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionCategoryApi from "../../services/questionCategoryApi";
import { TableCategory } from "./Table";
import { getCategory } from "./getCategorySlice";
import { FilterAndAddNew } from "./FilterAndAddnew";
import { ModalEditCategory } from "./Modal/modalEdit";
import useDebounce from "../../hooks/useDebounce";
import PaginatedItems from "../../components/Pagination";
import { ModalDeleteCategory } from "./Modal/ModalDelete";
import { useNavigate } from "react-router-dom";

export const CategoryQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.getCategoryQuestion);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [oldNameCategory, setOldNameCategory] = useState();
  const [idCategory, setIdCategory] = useState();
  const [paramStatus, setParamStatus] = useState({
    active: "",
    keyword: "",
  });
  const debounce = useDebounce(paramStatus, 500);
  useEffect(() => {
    questionCategoryApi.getFilter(debounce).then((res) => {
      dispatch(getCategory(res));
    });
  }, [debounce]);

  const onFilterStatus = async (e) => {
    await setParamStatus(e);
  };
  const handleOpenModalEditCategory = (item) => {
    setShowModalEdit(!showModalEdit);
    setOldNameCategory(item?.name);
    setIdCategory(item?.id);
  };
  const handleSubmitEditCategory = (id, name) => {
    id = idCategory;
    questionCategoryApi.changeName(id, name);
    
  };
  const handleOpenModalDelete = (item) => {
    setShowModalDelete(!showModalDelete);
    setIdCategory(item?.id);
  };
  const handleDelete = async () => {
    await questionCategoryApi
      .delete(idCategory)
      .then((res) => {})
      .catch((err) => {
        console.log("ERROR DELETE >>>", err);
      });
    await questionCategoryApi.getFilter().then((res) => {
      dispatch(getCategory(res));
    });
    setShowModalDelete(false);
    navigate(`/question-category`);
  };
  const onPageChange = (page) => {
    const newParamStatus = { ...paramStatus, page };
    setParamStatus(newParamStatus);
   
  };

  return (
    <div>
      <FilterAndAddNew data={data} onFilterStatus={onFilterStatus} paramStatus={paramStatus} />
      <TableCategory
        data={data}
        handleOpenModalEditCategory={handleOpenModalEditCategory}
        handleOpenModalDelete={handleOpenModalDelete}
      />
      <ModalEditCategory
        show={showModalEdit}
        handleClose={() => setShowModalEdit(!showModalEdit)}
        handleSubmitEditCategory={handleSubmitEditCategory}
        name={oldNameCategory}
      />
      <ModalDeleteCategory
        show={showModalDelete}
        handleClose={() => setShowModalDelete(!showModalDelete)}
        onDelete={handleDelete}
      />
      <PaginatedItems pagination={data?.pagination} onPageChange={onPageChange} />
    </div>
  );
};
