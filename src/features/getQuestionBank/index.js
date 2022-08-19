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
  const questionList = useSelector((state) => state.questionBank);
  const categoryList = useSelector((state) => state.filterCategory);
  const [paramStatus, setParamStatus] = useState({
    status: "APPROVED",
    pageSize: 5,
    keyword: "",
  });
  const debounce = useDebounce(paramStatus, 500);

  useEffect(() => {
    dispatch(getQuestionBank(debounce));

    // questionBankApi
    //   .getAll(debounce)

    //   .then((res) => {
    //     dispatch(getQuestionBank(res));
    //   })
    //   .catch((error) => {
    //     console.log("ERROR getQuestionBank >>> " + error);
    //   });
    // questionBankApi
    //   .getFilterCategory()
    //   .then((res) => {
    //     dispatch(getFilterCategory(res));
    //   })
    //   .catch((error) => {
    //     console.log("ERROR getFilterCategory >>> " + error);
    //   });
    dispatch(getFilterCategory());
  }, [debounce]);

  const onFilterAll = (val) => {
    const newParamStatus = { ...paramStatus, ...val, page: 1 };
    setParamStatus(newParamStatus);
  };
  const handleViewDetailQuestion = (e) => {
    navigateWithState && navigateWithState(e);
  };
  const onPageChange = (page) => {
    const newParamStatus = { ...paramStatus, page };
    setParamStatus(newParamStatus);
  };

  return (
    <div>
      <FormFilter
        paramStatus={paramStatus}
        onFilterAll={onFilterAll}
        onFilterCategory={categoryList}
        hiddenCreateButton={hiddenCreateButton}
        hiddenSelectStatusQuestion={hiddenSelectStatusQuestion}
      />

      <TableQuestion
        questionList={questionList}
        handleViewDetailQuestion={handleViewDetailQuestion}
        showSelectColumn={showSelectColumn}
      />
      <PaginatedItems pagination={questionList?.pagination} onPageChange={onPageChange} />
    </div>
  );
};
