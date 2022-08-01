import Table from "react-bootstrap/Table";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import className from "classnames/bind";
import styles from "./TableCategory.module.scss";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import questionCategoryApi from "../../../services/questionCategoryApi";
import { IconButton } from "@mui/material";

const cx = className.bind(styles);

export const TableCategory = ({ data, handleOpenModalDelete, ...props }) => {
  const handleChangeSwitchButton = async (item) => {
    const id = item?.id;
    const active = item?.active;
    await questionCategoryApi
      .update(id, { active: !active })
      .then((res) => {})
      .catch((err) => {
        console.log("ERROR UPDATE STATUS >>>", err);
      });
  };
  const dataSortStatus = [...data?.data].sort((a, b) => {
    return b.active - a.active;
  });

  return (
    <div>
      <Table bordered hover responsive className={cx("table")}>
        <thead className={cx("table-head")}>
          <tr>
            <th>No.</th>
            <th>Category name</th>
            <th>Num of Approved</th>
            <th>Num of Pending</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataSortStatus.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.approvedQuantity}</td>
                <td>{item.pendingQuantity}</td>

                <td>
                  <BootstrapSwitchButton
                    style="switchButton"
                    onChange={() => handleChangeSwitchButton(item)}
                    checked={item?.active}
                    onstyle="success"
                    offstyle="secondary"
                    onlabel="active"
                    offlabel="inactive"
                    width={85}
                    height={27}
                  />
                </td>
                <td>
                  <IconButton
                    aria-label="edit"
                    onClick={() => props.handleOpenModalEditCategory(item)}
                    disabled={
                      item?.approvedQuantity > 0 || item?.pendingQuantity > 1 ? true : false
                    }
                    color="success"
                  >
                    <ModeEditOutlineTwoToneIcon className={cx("editIcon")} />
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleOpenModalDelete(item)}
                    disabled={
                      item?.approvedQuantity > 0 || item?.pendingQuantity > 1 ? true : false
                    }
                  >
                    <DeleteRoundedIcon className={cx("deleteIcon")} />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
