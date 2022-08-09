import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionTemplate from "../../services/questionTemplates";
import { FormFilterTemplates } from "./FormFilter";
import { TableTemplates } from "./Table";
import { getTemplateList } from "./getTemplateListSlice";

export const Templates = () => {
  const dispatch = useDispatch();

  const templatesList = useSelector((state) => state.getTemplateList);
  useEffect(() => {
    questionTemplate
      .getFilter()

      .then((res) => {
        console.log("RES 1", res);
        dispatch(getTemplateList(res));
      })
      .catch((error) => {
        console.log("ERROR getTemplateList >>> " + error);
      });
  }, []);
  return (
    <div>
      <FormFilterTemplates />
      <TableTemplates templateList={templatesList} />
    </div>
  );
};
