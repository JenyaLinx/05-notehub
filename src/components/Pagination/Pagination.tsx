import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface Props {
  totalPages: number;
  page: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  page,
  onChange,
}: Props) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
