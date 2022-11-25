import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import API from "../services/API";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import {NavLink} from "react-router-dom";

const Characters = () => {

	const [characterData, setCharacterData] = useState({});

	useEffect(() => {
		const Service = new API();
		Service.Request(process.env.REACT_APP_CHARACTERS_API).then(characters => setCharacterData(characters));
	}, []);

	return (
		<>
			<Container>
				<Filter />
				<Row>
					{
						characterData && characterData?.results?.map((character,index) => (
							<Col className={"mb-4"} key={index} xs={3}>
								<NavLink to={`/characters/${character.id}`}>
									<div className="character-card">
										<img src={character.image} alt={character.name}/>
										<h1>{character.name}</h1>
										<div className={character.status.toLowerCase()}>
											{character.status} - {character.species}
										</div>
									</div>
								</NavLink>

							</Col>
						))
					}
				</Row>
				<Pagination />
			</Container>
		</>
	)
}

export default Characters;