import Table from "react-bootstrap/Table";
import styles from "../templates.module.scss";
import className from "classnames/bind";
import sliceContent from "../../../helpers/sliceContent";
import moment from "moment";

const cx = className.bind(styles);

const ViewDetailTemplate = ({
  dataInDetailtemplate,
  handleModalViewDetailQuestionEachTemplate,
}) => {
  return (
    <div>
      {dataInDetailtemplate?.questionBankTemplates?.length > 0 ? (
        <Table hover responsive className={cx("table")}>
          <thead className={cx("table-head")}>
            <tr>
              <th>No.</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Category</th>
              <th>Level</th>
              <th>Author</th>
              <th>Dated Added</th>
              <th>Date Approved</th>
              <th>Approver</th>
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
                  <td>{data?.question.author?.name}</td>
                  <td>{moment(data?.createDate).fromNow()}</td>
                  <td>{moment(data?.question.approvedDate).fromNow()}</td>
                  <td>{data?.approver}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ViewDetailTemplate;
