import Table from "react-bootstrap/Table";
import React from "react";

export const TableTemplates = ({ templateList }) => {
  return (
    <div>
      <div>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Author</th>
              <th>Num of Question</th>
              <th>Created_date</th>
            </tr>
          </thead>
          <tbody>
            {templateList?.data?.map((temp, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{temp?.name}</td>
                  <td>{temp?.author.name}</td>
                  <td>{templateList?.data.length}</td>
                  <td>{temp.createdDate}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
