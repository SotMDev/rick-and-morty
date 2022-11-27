import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import API from "../services/API";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoading} from "../store/data";
import Skeleton from "react-loading-skeleton";

const Characters = () => {

	const isLoading = useSelector(state => state.data.value.isLoading);
	const dispatch = useDispatch();

	const [characterData, setCharacterData] = useState({});

	useEffect(() => {
		const Service = new API();
		dispatch(setIsLoading(true));
		Service.Request(process.env.REACT_APP_CHARACTERS_API).then(characters => {
			setCharacterData(characters);
			setTimeout(() => {
				dispatch(setIsLoading(false));
			}, 600);
		});
	}, []);

	return (
		<>
			<Container>
				<Filter characterData={characterData} setCharacterData={setCharacterData} />
				{
					isLoading ?
						<Row>
							{Array(20).fill('').map((skeleton, index) => (
								<Col className={"mb-4"} key={index} xs={6} sm={4} lg={3}>
									<Skeleton height={200} count={1}/>
								</Col>
							))}
						</Row>
						:
						<Row>
							{
								characterData && characterData?.results?.map((character,index) => (
									<Col className={"mb-4"} key={index} xs={6} sm={4} lg={3}>
										<NavLink to={`/characters/${character.id}`}>
											<div className="character-card">
												<div className="character-image">
													<img src={character.image} alt={character.name}/>
												</div>
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
				}
				<Pagination type={'character'} data={characterData} setData={setCharacterData} />
			</Container>
		</>
	)
}

export default Characters;