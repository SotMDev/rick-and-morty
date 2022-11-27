import {useEffect} from "react";
import style from '../assets/styles/components/filters.scss'
import API from "../services/API";
import {useDispatch, useSelector} from "react-redux";
import {setPageCount, setSearchParams} from "../store/data";

const Filter = ({characterData, setCharacterData}) => {

	const Service = new API();
	const dispatch = useDispatch();
	const isLoading = useSelector(state => state.data.value.isLoading);
	const searchParams = useSelector(state => state.data.value.searchParams);
	const pageCount = useSelector(state => state.data.value.pageCount);

	const filterProducts = (type) => {
		dispatch(setPageCount(pageCount + 1));
		dispatch(setSearchParams(
			{
				query: type,
				next: characterData.info.next,
				prev: characterData.info.prev
			}
		));
	}

	useEffect(() => {
		if (searchParams.query !== '') {
			Service.Request(`${process.env.REACT_APP_CHARACTERS_API}?page=1&status=${searchParams.query}`).then(characters => {
				setCharacterData(characters);
			});
		}
	}, [searchParams]);

	return (
		<div className={"filter"}>
			<h3>Filter by status: </h3>
			<div className="filters">
				{
					['Dead', 'Alive', 'Unknown'].map(((type, index) => (
						<div
							key={index}
							className={`button ${type.toLowerCase()} ${searchParams.query === type.toLowerCase() ? 'active' : ''}`}
							onClick={() => filterProducts(type.toLowerCase())}
						>
							{type}
						</div>
					)))
				}
			</div>
		</div>
	)
}

export default Filter;