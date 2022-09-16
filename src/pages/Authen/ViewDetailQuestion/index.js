import React from "react";
import { DetailQuestion } from "../../../features/getDetailQuestion";
import { Breadcrumb } from "../../../components/Breadcrumb";

export const ViewDetailQuestion = () => {
  return (
    <div>
      <Breadcrumb firstTitle={"Question Bank"} secondTitle={"Detail Question"} href={"/question"} />
      <DetailQuestion />
    </div>
  );
};
