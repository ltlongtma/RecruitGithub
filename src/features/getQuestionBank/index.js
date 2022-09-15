import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionBank } from "./Slice";
import TableQuestion from "./Table";
import { FormFilter } from "./FormFilter";
import { getFilterCategory } from "./FormFilter/getFilterCategorySlice";
import PaginatedItems from "../../components/Pagination";
import useDebounce from "../../hooks/useDebounce";
import { getDetailQuestion } from "../getDetailQuestion/Slice";
import PropTypes from "prop-types";

export const Questionbank = ({
  hiddenCreateButton,
  hiddenSelectStatusQuestion,
  showSelectColumn,
  navigateWithState,
  getIdQuestion,
}) => {
  const dispatch = useDispatch();
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
    dispatch(getFilterCategory());
  }, [debounce]);

  const onFilterAll = (val) => {
    const newParamStatus = { ...paramStatus, ...val, page: 1 };
    setParamStatus(newParamStatus);
  };
  const handleViewDetailQuestion = async (e) => {
    await dispatch(getDetailQuestion(e));
    navigateWithState && navigateWithState(e);
    getIdQuestion(e);
  };
  const onPageChange = (page) => {
    const newParamStatus = { ...paramStatus, page };
    setParamStatus(newParamStatus);
  };
  const onChangePageSize = (e) => {
    setParamStatus({ ...paramStatus, pageSize: e });
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
      <PaginatedItems
        pagination={questionList?.pagination}
        onPageChange={onPageChange}
        pageSize={paramStatus.pageSize}
        onChangePageSize={onChangePageSize}
      />
    </div>
  );
};
Questionbank.propTypes = {
  getIdQuestion: PropTypes.func,
};
