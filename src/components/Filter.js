import {useState} from "react";
import style from '../assets/styles/components/filters.scss'
import API from "../services/API";

const Filter = ({characterData, setCharacterData}) => {

	const Service = new API();
	const [searchParam, setSearchParam] = useState('');

	const filterProducts = (type) => {
		setSearchParam(type);
		Service.Request(`${process.env.REACT_APP_CHARACTERS_API}?status=${type}`).then(characters => setCharacterData(characters));
	}
	return (
		<div className={"filter"}>
			<h3>Filter by status: </h3>
			<div className={"filters"}>
				<div className="button dead" onClick={() => filterProducts('dead')}>Dead</div>
				<div className="button alive" onClick={() => filterProducts('alive')}>Alive</div>
				<div className="button unknown" onClick={() => filterProducts('unknown')}>Unknown</div>
			</div>
		</div>
	)
}

export default Filter;