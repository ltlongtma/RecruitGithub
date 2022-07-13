import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionBank } from "./getQuestionBankSlice";
import TableQuestion from "./Table";
import questionBankApi from "../../../src/services/questionBankApi";
import { FormFilter } from "./FormFilter";

export const Questionbank = () => {
  const dispatch = useDispatch();
  const QuestionList = useSelector((state) => state.questionBank);

  useEffect(() => {
    questionBankApi
      .getAll()

      .then((res) => {
        dispatch(getQuestionBank(res.data));
      })
      .catch((error) => {
        console.log("ERROR " + error);
      });
  }, [dispatch]);
  //Create a callback function to recieve value from children (FormFilter) and pass it as query params
  const onFilter = (val) => {
    questionBankApi
      .getAll(val)

      .then((res) => {
        dispatch(getQuestionBank(res.data));
      })
      .catch((error) => {});
  };
  return (
    <div>
      <FormFilter onFilter={onFilter} />
      <TableQuestion questionList={QuestionList} />
    </div>
  );
};
