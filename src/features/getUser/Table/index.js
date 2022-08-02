import Table from "react-bootstrap/Table";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import className from "classnames/bind";
import styles from "../Table/table.module.scss";

const cx = className.bind(styles);

export const TableData = (props) => {
  return (
    <div>
      <Table bordered hover responsive className={cx("table")}>
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
          {props.userList.length > 0 &&
            props.userList?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.badgeId}</td>
                  <td>{item?.username}</td>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.roles[0].name}</td>
                  <td>
                    <ModeEditOutlineTwoToneIcon
                      onClick={() => props.handleShowModalEdit(item)}
                      color="success"
                      className={cx("editIcon")}
                    />
                    <DeleteRoundedIcon
                      color="error"
                      onClick={() => props.handleShowModalDelete(item)}
                      className={cx("deleteIcon")}
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
