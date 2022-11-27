import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import API from "../services/API";
import style from "../assets/styles/components/pagination.scss";
import {useEffect} from "react";
import {setIsLoading} from "../store/data";

const Pagination = ({type, data, setData}) => {

	const Service = new API();
	const dispatch = useDispatch();
	const searchParams = useSelector(state => state.data.value.searchParams);
	const pageCount = useSelector(state => state.data.value.pageCount);


	const handlePageClick = (event) => {



		let params = '';
		let url;
		const selectedPage = parseInt(event.selected) + 1;
		params = `?status=${searchParams.query}&page=${selectedPage}`;
		if (type === 'location') {
			url = `${process.env.REACT_APP_LOCATIONS_API}${params}`;
		} else {
			url = `${process.env.REACT_APP_CHARACTERS_API}/${params}`;
		}
		dispatch(setIsLoading(true));
		Service.Request(url).then(response => {
			setData(response);
			clearSecondSelected();
			setTimeout(() => {
				dispatch(setIsLoading(false));
			}, 600);
		});
	};

	const clearSecondSelected = () => {
		/*
			 addSelectedClassToPagination fonksiyonunda manuel eklendiği için, çift selected gözükmesini engellemek için.
		*/
		let selectedCount = 0;
		const paginationItems = document.querySelectorAll('.pagination li');
		paginationItems.forEach((pagination, index) => {
			if(pagination.classList.contains('selected')) {
				selectedCount++;
			}
		});
		if(selectedCount > 1) {
			document.querySelector('.pagination .selected').classList.remove('selected');
		}
	};

	const addSelectedClassToPagination = () => {
		/*
			 Data, farklı bir componentten değiştirildiğinde(Filter),
			 react router bunu algılayamıyor ve selected hala en son seçilen kalıyor.
			 Default ilk sayfa getirildi.
		*/
		const paginationItems = document.querySelectorAll('.pagination li');
		const firstPagination = paginationItems[1];
		if (!firstPagination.classList.contains('next')) {
			firstPagination.classList.add('selected');
		}
	}

	useEffect(() => {
		addSelectedClassToPagination();
	}, [pageCount])

	return (
		<div className={"pagination"}>
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				onPageChange={handlePageClick}
				pageRangeDisplayed={1}
				pageCount={data?.info?.pages}
				previousLabel="<"
			/>
		</div>
	)
}

export default Pagination;