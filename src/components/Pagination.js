import {useState} from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({data, setData}) => {

	const handlePageClick = (event) => {
		const selectedPage = event.selected + 1;
		console.log(data);
		console.log(event);
	};

	return (
		<>
			{/* @TODO */}
			Pagination
			<ReactPaginate
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={data?.info?.pages}
				previousLabel="< previous"
				renderOnZeroPageCount={null}
			/>
		</>
	)
}

export default Pagination;