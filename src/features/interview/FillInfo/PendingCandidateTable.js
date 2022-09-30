import Table from "react-bootstrap/Table";
import React from "react";
import styles from "./module.scss";
import moment from "moment";
import className from "classnames/bind";
import { Button, IconButton, Tooltip } from "@mui/material";
import PaginatedItems from "../../../components/Pagination";
import { SearchForm } from "../../../components/SearchForm";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";

const cx = className.bind(styles);

export const PendingCandidateTable = ({
  candidatePendingList,
  hiddenTablePendingcandidate,
  onPageChange,
  onChangePageSize,
  handleBack,
  onValueSearch,
  handleViewDetailPendingCandidate,
  handleFillDataIntoFormInput,
  handleNext,
}) => {
  return (
    <div className={cx("table-list")} hidden={hiddenTablePendingcandidate}>
      <div className={cx("formSearch")}>
        <SearchForm onValueSearch={onValueSearch} />
      </div>

      <Table hover responsive>
        <thead className={cx("tableHead")}>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Male</th>
            <th>Education</th>
            <th>Position</th>
            <th>Mode</th>
            <th>Interview Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={cx("tableBody")}>
          {candidatePendingList?.data?.map((item, index) => {
            return (
              <tr key={index} onClick={() => handleViewDetailPendingCandidate(item?.id)}>
                <td>
                  {candidatePendingList?.pagination.pageSize *
                    (candidatePendingList?.pagination?.page - 1) +
                    1 +
                    index}
                </td>
                <Tooltip title=" Click to view more information">
                  <td>{item?.candidate.name}</td>
                </Tooltip>
                <td>{item?.candidate.gender}</td>
                <td>{item?.candidate.educationStatus}</td>
                <td>{item?.candidate.position}</td>
                <td>{item?.candidate?.workMode}</td>
                <td>{moment(item?.interviewDate).format("DD/MM/YYYY")}</td>

                <td onClick={(e) => e.stopPropagation()}>
                  <Tooltip title="Interview">
                    <IconButton color="secondary" onClick={handleNext}>
                      <QuestionAnswerOutlinedIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                  {/* <Tooltip title="Edit">
                    <IconButton
                      color="secondary"
                      onClick={() => handleFillDataIntoFormInput(item?.id)}
                    >
                      <ModeEditOutlineTwoToneIcon color="success" />
                    </IconButton>
                  </Tooltip> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button variant="outlined" color="info" className={cx("btnBack")} onClick={handleBack}>
        Back
      </Button>

      <PaginatedItems
        pagination={candidatePendingList?.pagination}
        onPageChange={onPageChange}
        onChangePageSize={onChangePageSize}
      />
    </div>
  );
};
