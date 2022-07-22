import Table from "react-bootstrap/Table";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import className from "classnames/bind";
import styles from "./TableCategory.module.scss";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useDispatch } from "react-redux";

import questionCategoryApi from "../../../services/questionCategoryApi";

const cx = className.bind(styles);

export const TableCategory = ({ data, ...props }) => {

  const handleChangeSwitchButton = async (item) => {
    const id = item?.id;
    const enable = item?.enable;
    await questionCategoryApi
      .update(id, { enable: !enable })
      .then((res) => {})
      .catch((err) => {
        console.log("ERROR UPDATE STATUS >>>", err);
      });
  };

  return (
    <div>
      <Table bordered hover responsive className={cx("table")}>
        <thead className={cx("table-head")}>
          <tr>
            <th>Num</th>
            <th>Category name</th>
            <th>Number of Approved</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.name}</td>
                <td>{item.approvedQuantity}</td>
                <td>
                  <BootstrapSwitchButton
                    style="switchButton"
                    onChange={() => handleChangeSwitchButton(item)}
                    checked={item?.enable}
                    onstyle="success"
                    offstyle="secondary"
                    onlabel="Enable"
                    offlabel="Disable"
                    width={85}
                    height={27}
                  />
                </td>
                <td>
                  <ModeEditOutlineTwoToneIcon
                    color="outline-success"
                    className={cx("editIcon")}
                    onClick={() => props.handleOpenModalEditCategory(item)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
