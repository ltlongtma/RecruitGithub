import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionBank } from "./getQuestionBankSlice";
import TableQuestion from "./Table";
import questionBankApi from "../../../src/services/questionBankApi";
import { FormFilter } from "./FormFilter";
import { getFilterCategory } from "./FormFilter/getFilterCategorySlice";
import { useNavigate } from "react-router-dom";
import PaginatedItems from "../../components/Pagination";
import useDebounce from "../../hooks/useDebounce";

export const Questionbank = ({
  hiddenCreateButton,
  hiddenSelectStatusQuestion,
  showSelectColumn,
  navigateWithState,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const QuestionList = useSelector((state) => state.questionBank);
  const CategoryList = useSelector((state) => state.filterCategory);
  const [paramStatus, setParamStatus] = useState({
    status: "APPROVED",
    pageSize: 5,
    keyword: "",
  });
  const debounce = useDebounce(paramStatus, 500);

  useEffect(() => {
    questionBankApi
      .getAll(debounce)

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
  }, [debounce]);

  const onFilterAll = (val) => {
    const newParamStatus = { ...paramStatus, ...val, page: 1 };
    setParamStatus(newParamStatus);
  };

  const handleViewDetailQuestion = (e) => {
    navigate(`/question/${e}`, { state: navigateWithState });
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
        hiddenCreateButton={hiddenCreateButton}
        hiddenSelectStatusQuestion={hiddenSelectStatusQuestion}
      />

      <TableQuestion
        questionList={QuestionList}
        handleViewDetailQuestion={handleViewDetailQuestion}
        showSelectColumn={showSelectColumn}
      />
      <PaginatedItems pagination={QuestionList?.pagination} onPageChange={onPageChange} />
    </div>
  );
};
