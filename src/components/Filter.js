import {useState, useEffect} from "react";
import style from '../assets/styles/components/filters.scss'
import API from "../services/API";

const Filter = ({characterData, setCharacterData}) => {

	const Service = new API();
	const [searchParam, setSearchParam] = useState('');

	const filterProducts = (type) => {
		setSearchParam(type);
	}

	useEffect(() => {
		if(searchParam !== ''){
			Service.Request(`${process.env.REACT_APP_CHARACTERS_API}?status=${searchParam}`).then(characters => setCharacterData(characters));
		}
	}, [searchParam]);

	return (
		<div className={"filter"}>
			<h3>Filter by status: </h3>
			<div className={"filters"}>
				<div className={`button dead ${searchParam === 'dead' ? 'active' : ''}`} onClick={() => filterProducts('dead')}>Dead</div>
				<div className={`button alive ${searchParam === 'alive' ? 'active' : ''}`} onClick={() => filterProducts('alive')}>Alive</div>
				<div className={`button unknown ${searchParam === 'unknown' ? 'active' : ''}`} onClick={() => filterProducts('unknown')}>Unknown</div>
			</div>
		</div>
	)
}

export default Filter;