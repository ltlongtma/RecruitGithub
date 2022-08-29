import Table from "react-bootstrap/Table";
import styles from "../templates.module.scss";
import className from "classnames/bind";
import sliceContent from "../../../helpers/sliceContent";
import moment from "moment";
import { Button } from "@mui/material";

const cx = className.bind(styles);

const TemplateDetail = ({
  dataInDetailtemplate,
  handleModalViewDetailQuestionEachTemplate,
  handleShowModalDelete,
  handleShowModalApprove
}) => {
  return (
    <div className={cx("table")}>
      {dataInDetailtemplate?.questionBankTemplates?.length > 0 ? (
        <div>
          <Table bordered hover responsive>
            <thead className={cx("table-head")}>
              <tr>
                <th>No.</th>
                <th>Content</th>
                <th>Answer</th>
                <th>Category</th>
                <th>Level</th>
                <th>Dated Added</th>
                <th>Author</th>
                <th>Date Approved</th>
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
                    <td>{data?.question.level}</td>
                    <td>{moment(data?.createDate).format("DD/MM/YYYY h:mm:ss")}</td>
                    <td>{data?.question.author?.name}</td>
                    <td>{moment(data?.question.approvedDate).format("DD/MM/YYYY h:mm:ss")}</td>
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
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleShowModalApprove(dataInDetailtemplate.id)}
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
