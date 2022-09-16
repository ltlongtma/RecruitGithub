import React from "react";
import { CategoryQuestion } from "../../../features/getCategoryQuestion";
import { Breadcrumb } from "../../../components/Breadcrumb";


export const ManageCategory = () => {
  return (
    <div>
      <Breadcrumb firstTitle={"Question Bank"} secondTitle={"Manage Category"} href={"/question"} />
      <CategoryQuestion />
    </div>
  );
};
