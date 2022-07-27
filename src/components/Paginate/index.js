import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Questionbank } from "../../features/getQuestionBank";
import { getQuestionBank } from "../../features/getQuestionBank/getQuestionBankSlice";
import questionBankApi from "../../services/questionBankApi";

function PaginatedItems({ itemsPerPage }) {
  const QuestionList = useSelector((state) => state.questionBank);
  const [currentItems, setCurrentItems] = useState(QuestionList);
  console.log("QuestionList >>>", QuestionList);
  console.log("CurrentItems >>>", currentItems);

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(QuestionList?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(QuestionList?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    // console.log(`EVENT>>>: `, event);
    const newOffset = (event.selected * itemsPerPage) % QuestionList?.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <Questionbank QuestionList={currentItems} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
export default PaginatedItems;
