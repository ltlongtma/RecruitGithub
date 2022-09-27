import Table from "react-bootstrap/Table";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import className from "classnames/bind";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import styles from "../Table/table.module.scss";

const cx = className.bind(styles);

export const TableData = (props) => {
  return (
    <div>
      <Table hover responsive className={cx("table")}>
        <thead className={cx("table-head")}>
          <tr>
            <th>No.</th>
            <th>Id Badge</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.userList?.data.length > 0 &&
            props.userList?.data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.badgeId}</td>
                  <td>{item?.username}</td>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.roles[0].name}</td>
                  <td>
                    <Tooltip title="Edit">
                      <span>
                        <IconButton
                          color="secondary"
                          onClick={() => props.handleShowModalEdit(item)}
                        >
                          <ModeEditOutlineTwoToneIcon color="primary" className={cx("editIcon")} />
                        </IconButton>
                      </span>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <span>
                        <IconButton
                          color="secondary"
                          onClick={() => props.handleShowModalDelete(item)}
                        >
                          <DeleteRoundedIcon color="error" className={cx("deleteIcon")} />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};
