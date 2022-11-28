import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import API from "../services/API";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import {setIsLoading} from "../store/data";
import styleCharacterCard from "../assets/styles/components/character-card.scss";

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
		}).catch(err => {
			dispatch(setIsLoading(false));
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
								<Col className={"mb-4"} key={index} xs={12} sm={6} lg={3}>
									<Skeleton height={200} count={1}/>
								</Col>
							))}
						</Row>
						:
						<Row>
							{
								characterData && characterData?.results?.map((character,index) => (
									<Col className={"mb-4"} key={index} xs={12} sm={6} lg={3}>
										<NavLink to={`/characters/${character.id}`}>
											<div className="character-card">
												<div className="character-image">
													<img src={character.image} alt={character.name}/>
												</div>
												<h1>{character.name}</h1>
												<div className={`character-info ${character.status.toLowerCase()}`}>
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