import Table from "react-bootstrap/Table";
import React from "react";
import moment from "moment";
import styles from "../../templates.module.scss";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import className from "classnames/bind";

const cx = className.bind(styles);

export const TemplatesList = ({
  templateList,
  ViewDetailTemplate,
  showActionColumn,
  handleModalCloneTemplate,
}) => {
  return (
    <div>
      <div>
        <Table hover responsive className={cx("table-list")}>
          <thead className={cx("table-head")}>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Author</th>
              <th>Num of Question</th>
              <th>Created_date</th>
              {showActionColumn && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {templateList?.data?.map((item, index) => {
              return (
                <tr key={index} onClick={() => ViewDetailTemplate(item)}>
                  <td>
                    {" "}
                    {templateList.pagination.pageSize * (templateList.pagination.page - 1) +
                      1 +
                      index}
                  </td>
                  <td>{item?.name}</td>
                  <td>{item?.description}</td>
                  <td>{item?.category.name}</td>
                  <td>{item?.author.name}</td>
                  <td>{item?.questionBankTemplates?.length}</td>
                  <td>{moment(item.createdDate).format("DD/MM/YYYY h:mm:ss a")}</td>
                  {showActionColumn && (
                    <td onClick={(e) => e.stopPropagation()}>
                      <Tooltip title="Clone to my template">
                        <IconButton
                          color="secondary"
                          onClick={() => handleModalCloneTemplate(item)}
                        >
                          <SimCardDownloadIcon />
                        </IconButton>
                      </Tooltip>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
