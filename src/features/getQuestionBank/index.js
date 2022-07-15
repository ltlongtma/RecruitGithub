import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionBank } from "./getQuestionBankSlice";
import TableQuestion from "./Table";
import questionBankApi from "../../../src/services/questionBankApi";
import { FormFilter } from "./FormFilter";
import { getFilterCategory } from "./FormFilter/getFilterCategorySlice";
import { Navigate, useNavigate } from "react-router-dom";
import { getDetailQuestion } from "../getDetailQuestion/getDetailQuestionSlice";

export const Questionbank = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const QuestionList = useSelector((state) => state.questionBank);
  const CategoryList = useSelector((state) => state.filterCategory);

  useEffect(() => {
    questionBankApi
      .getAll()

      .then((res) => {
        dispatch(getQuestionBank(res.data));
      })
      .catch((error) => {
        console.log("ERROR getQuestionBank >>> " + error);
      });
    questionBankApi
      .getFilterCategory()
      .then((res) => {
        dispatch(getFilterCategory(res));
      })
      .catch((error) => {
        console.log("ERROR getFilterCategory >>> " + error);
      });
  }, [dispatch]);
  //Create a callback function to recieve value from children (FormFilter) and pass it as query params
  const onFilterAll = (val) => {
    questionBankApi
      .getAll(val)

      .then((res) => {
        dispatch(getQuestionBank(res.data));
      })
      .catch((error) => {});
  };
  const handleViewDetailQuestion = async (e) => {
    await questionBankApi
      .getById(e)
      .then((res) => {
        dispatch(getDetailQuestion(res));
      })
      .catch((error) => {
        console.log("DetailQuestion ERROR>>>", error);
      });
    navigate(`/question/${e}`);
  };
  return (
    <div>
      <FormFilter onFilterAll={onFilterAll} onFilterCategory={CategoryList} />
      <TableQuestion
        questionList={QuestionList}
        handleViewDetailQuestion={handleViewDetailQuestion}
      />
    </div>
  );
};
