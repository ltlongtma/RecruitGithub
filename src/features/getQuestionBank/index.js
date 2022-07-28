import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionBank } from "./getQuestionBankSlice";
import TableQuestion from "./Table";
import questionBankApi from "../../../src/services/questionBankApi";
import { FormFilter } from "./FormFilter";
import { getFilterCategory } from "./FormFilter/getFilterCategorySlice";
import { useNavigate } from "react-router-dom";
import { getDetailQuestion } from "../getDetailQuestion/getDetailQuestionSlice";
import PaginatedItems from "../../components/Pagination";

export const Questionbank = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const QuestionList = useSelector((state) => state.questionBank);
  const CategoryList = useSelector((state) => state.filterCategory);
  const [paramStatus, setParamStatus] = useState({
    status: "APPROVED",
  });

  useEffect(() => {
    questionBankApi
      .getAll()

      .then((res) => {
        dispatch(getQuestionBank(res));
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
  }, []);
  //Create a callback function to recieve value from children (FormFilter) and pass it as query params
  const onFilterAll = (val) => {
    const newParamStatus = { ...paramStatus, ...val, page: 1 };
    setParamStatus(newParamStatus);

    questionBankApi
      .getAll(newParamStatus)

      .then((res) => {
        dispatch(getQuestionBank(res));
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
  const onPageChange = (page) => {
    const newParamStatus = { ...paramStatus, page };
    setParamStatus(newParamStatus);
    questionBankApi
      .getAll(newParamStatus)
      .then((res) => {
        dispatch(getQuestionBank(res));
      })
      .catch((error) => {});
  };

  return (
    <div>
      <FormFilter
        paramStatus={paramStatus}
        onFilterAll={onFilterAll}
        onFilterCategory={CategoryList}
      />

      <TableQuestion
        questionList={QuestionList}
        handleViewDetailQuestion={handleViewDetailQuestion}
      />
      <PaginatedItems pagination={QuestionList?.pagination} onPageChange={onPageChange} />
    </div>
  );
};
