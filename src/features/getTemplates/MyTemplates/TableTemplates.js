import Table from "react-bootstrap/Table";
import React from "react";
import moment from "moment";
import styles from "../templates.module.scss";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import className from "classnames/bind";

const cx = className.bind(styles);

export const TableTemplates = ({
  templateList,
  handleShowModalDeleteTemplate,
  handleViewDetailTemplate,
  handleEditTemplate,
  handleModalSharing,
  selectedRow,
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={cx("tableBody")}>
            {templateList?.data?.map((item, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => handleViewDetailTemplate(item.id)}
                  className={selectedRow === item.id ? cx("selectedRow") : null}
                >
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
                  <td>{moment(item.createdDate).fromNow()}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <Tooltip title="Edit">
                      <IconButton color="secondary" onClick={() => handleEditTemplate(item)}>
                        <ModeEditOutlineTwoToneIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Sharing to public">
                      <IconButton color="secondary" onClick={() => handleModalSharing(item.id)}>
                        <ShareIcon color="warning" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="secondary"
                        onClick={() => handleShowModalDeleteTemplate(item.id)}
                      >
                        <DeleteRoundedIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
