import Table from "react-bootstrap/Table";
import styles from "../templates.module.scss";
import className from "classnames/bind";
import sliceContent from "../../../helpers/sliceContent";
import moment from "moment";
import { Button, Chip } from "@mui/material";

const cx = className.bind(styles);

const TemplateDetail = ({
  dataInDetailtemplate,
  handleModalViewDetailQuestionEachTemplate,
  handleShowModalDelete,
  handleShowModalApprove,
  setHiddenBtn,
}) => {
  return (
    <div className={cx("table")}>
      {dataInDetailtemplate?.questionBankTemplates?.length > 0 ? (
        <div>
          <Table hover responsive>
            <thead className={cx("table-head")}>
              <tr>
                <th>No.</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Category</th>
                <th>Level</th>
                <th>Dated Added</th>
                <th>Date Approved</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {dataInDetailtemplate?.questionBankTemplates?.map((data, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => handleModalViewDetailQuestionEachTemplate(data?.question)}
                  >
                    <td>{index + 1}</td>
                    <td>{data?.question?.content}</td>
                    <td>{sliceContent(data.question.answer)}</td>
                    <td>{data?.question.category.name}</td>
                    <td>
                      <Chip
                        label={data?.question.level}
                        variant="outlined"
                        color={
                          data?.question.level === "MEDIUM"
                            ? "info"
                            : data?.question.level === "EASY"
                            ? "success"
                            : "secondary"
                        }
                      />
                    </td>
                    <td>{moment(data?.createDate).fromNow()}</td>
                    <td>{moment(data?.question.approvedDate).fromNow()}</td>
                    <td>{data?.question.author?.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className={cx("button")}>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleShowModalDelete(dataInDetailtemplate.id)}
              hidden={setHiddenBtn}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleShowModalApprove(dataInDetailtemplate.id)}
              hidden={setHiddenBtn}
            >
              Approve
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TemplateDetail;
