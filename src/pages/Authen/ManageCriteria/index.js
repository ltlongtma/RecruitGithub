import React from "react";
import { GetCriteria } from "../../../features/getCriteria";
import { Breadcrumb } from "../../../components/Breadcrumb";

export const ManageCriteria = () => {
  return (
    <div>
      <Breadcrumb firstTitle={"Question Bank"} secondTitle={"Manage Criteria"} href={"/question"} />
      <div>
        <GetCriteria />
      </div>
    </div>
  );
};
