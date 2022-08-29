import Table from "react-bootstrap/Table";
import React from "react";
import moment from "moment";
import styles from "../../templates.module.scss";

import className from "classnames/bind";

const cx = className.bind(styles);

export const TemplatesList = ({ templateList, ViewDetailTemplate }) => {
  return (
    <div>
      <div>
        <Table bordered hover responsive className={cx("table-list")}>
          <thead className={cx("table-head")}>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Author</th>
              <th>Num of Question</th>
              <th>Created_date</th>
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
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
