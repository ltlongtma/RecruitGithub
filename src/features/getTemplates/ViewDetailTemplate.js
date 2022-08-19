import Table from "react-bootstrap/Table";
import styles from "./templates.module.scss";
import className from "classnames/bind";
import sliceContent from "../../helpers/sliceContent";
import moment from "moment";

const cx = className.bind(styles);

const ViewDetailTemplate = ({
  dataInDetailtemplate,
  handleModalViewDetailQuestionEachTemplate,
}) => {
  return (
    <div>
      <Table bordered hover responsive className={cx("table")}>
        <thead className={cx("table-head")}>
          <tr>
            <th>No.</th>
            <th>Content</th>
            <th>Answer</th>
            <th>Category</th>
            <th>Level</th>
            <th>Dated Added</th>
            <th>Author</th>
            <th>Approver</th>
            <th>Date Approved</th>
          </tr>
        </thead>
        <tbody>
          {dataInDetailtemplate &&
            dataInDetailtemplate?.questionBankTemplates?.map((data, index) => {
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
                  <td>{data?.approver}</td>
                  <td>{moment(data?.question.approvedDate).format("DD/MM/YYYY h:mm:ss")}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewDetailTemplate;
