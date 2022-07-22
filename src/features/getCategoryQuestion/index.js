import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionCategoryApi from "../../services/questionCategoryApi";
import { TableCategory } from "./Table";
import { getCategory } from "./getCategorySlice";
import { FilterAndAddNew } from "./FilterAndAddnew";
import { ModalEditCategory } from "./Modal/modalEdit";

export const CategoryQuestion = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.getCategoryQuestion);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [oldNameCategory, setOldNameCategory] = useState();

  const [idCategory, setIdCategory] = useState();

  useEffect(() => {
    questionCategoryApi.getAll().then((res) => {
      dispatch(getCategory(res));
    });
  }, []);

  const onFilterStatus = async (e) => {
    await questionCategoryApi.getFilter(e).then((res) => {
      dispatch(getCategory(res.data));
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
      questionCategoryApi.getAll().then((res) => {
        dispatch(getCategory(res));
      });
    });
  };

  return (
    <div>
      <FilterAndAddNew data={data} onFilterStatus={onFilterStatus} />
      <TableCategory data={data} handleOpenModalEditCategory={handleOpenModalEditCategory} />
      <ModalEditCategory
        show={showModalEdit}
        handleClose={() => setShowModalEdit(!showModalEdit)}
        handleSubmitEditCategory={handleSubmitEditCategory}
        name={oldNameCategory}
      />
    </div>
  );
};
