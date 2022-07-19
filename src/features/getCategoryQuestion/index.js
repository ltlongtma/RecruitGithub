import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionCategoryApi from "../../services/questionCategoryApi";
import { TableCategory } from "./Table";
import { getCategory } from "./getCategorySlice";

export const CategoryQuestion = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.getCategoryQuestion);
//   console.log("DATA >>>", data);


  useEffect(() => {
    questionCategoryApi.getAll().then((res) => {
      dispatch(getCategory(res));
    });
  }, []);

  return (
    <div>
      <TableCategory data={data} />
    </div>
  );
};
