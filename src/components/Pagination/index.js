import ReactPaginate from "react-paginate";
import className from "classnames/bind";
import styles from "./pagination.module.scss";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

const cx = className.bind(styles);

function PaginatedItems({ pagination, onPageChange, onChangePageSize, hiddenPagination }) {
  const handlePageClick = (event) => {
    onPageChange(event.selected + 1);
  };
  const handleChangePageSize = (e) => {
    onChangePageSize(e.target.value);
  };
  return (
    <div className={cx("wrapper")} hidden={hiddenPagination}>
      <Typography variant="string" className={cx("labelTotal")}>
        Total: {pagination?.total}
      </Typography>

      <FormControl sx={{ width: 150, ml: 7 }} color="primary">
        <InputLabel>Rows per page</InputLabel>

        <Select
          label="rowPerPage"
          name="rowPerPage"
          defaultValue={5}
          onChange={handleChangePageSize}
          className={cx("rowPerPage")}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pagination?.lastPage || 1}
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
        forcePage={pagination?.page - 1}
        className={cx("pagination")}
      />
    </div>
  );
}
export default PaginatedItems;
