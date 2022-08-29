import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginatedItems from "../../../../components/Pagination";
import { templatesFilterByAdmin, templatesPending } from "../../getTemplateListSlice";
import { TemplatesList } from "../Pending/TemplatesList";

export const ApprovedTemplates = ({ onPageChange, params }) => {
  const templateList = useSelector((state) => state.getTemplateList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(templatesFilterByAdmin(params));
  }, []);
  const ViewDetailTemplate = (item) => {
    // dispatch(getDetailTemplate(item.id));
  };

  return (
    <div>
      <TemplatesList
        templateList={templateList}
        ViewDetailTemplate={ViewDetailTemplate}
      />
      <PaginatedItems pagination={templateList?.pagination} onPageChange={onPageChange} />
    </div>
  );
};
