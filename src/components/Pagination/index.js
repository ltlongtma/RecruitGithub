import ReactPaginate from "react-paginate";
import className from "classnames/bind";
import styles from "./Pagination.module.scss";
const cx = className.bind(styles);

function PaginatedItems({ pagination, onPageChange }) {
  const handlePageClick = (event) => {
    onPageChange(event.selected + 1);
  };
  return (
    <>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pagination?.lastPage}
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
        forcePage={pagination.page - 1}
        className={cx("pagination")}
      />
    </>
  );
}
export default PaginatedItems;
