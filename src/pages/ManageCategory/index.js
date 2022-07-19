import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { CategoryQuestion } from "../../features/getCategoryQuestion";

export const ManageCategory = () => {
  return (
    <div>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/question">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/question">Question bank</Breadcrumb.Item>
          <Breadcrumb.Item active>Manage Category </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <CategoryQuestion />
      </div>
    </div>
  );
};
