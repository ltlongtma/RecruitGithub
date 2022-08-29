import React from "react";
import { TemplatesContent } from "../../features/getTemplates/MyTemplates";

export const MyTemplates = ({ handleEditTemplate }) => {
  return (
    <div>
      <TemplatesContent handleEditTemplate={handleEditTemplate} />
    </div>
  );
};
