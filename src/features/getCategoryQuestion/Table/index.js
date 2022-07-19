import Table from "react-bootstrap/Table";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import className from "classnames/bind";
import styles from "./TableCategory.module.scss";

const cx = className.bind(styles);

export const TableCategory = ({ data }) => {
  return (
    <div>
      <Table bordered hover responsive className={cx("table")}>
        <thead className={cx("table-head")}>
          <tr>
            <th>Num</th>
            <th>Category name</th>
            <th>Number of Question</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            // console.log("ITEM >>>", item);

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.name}</td>
                <td>test</td>

                <td>
                  <ModeEditOutlineTwoToneIcon />
                  <DeleteRoundedIcon />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

// function countOccurrences(arr) {
//   return arr.reduce(function (a, b) {
//     console.log("A>>> ", a, "B >>> ", b);
//     a[b] = a[b] + 1 || 1;
//     return a;
//   }, {});
// }
// console.log(countOccurrences(["a", "b", "c", "b", "a"]));
