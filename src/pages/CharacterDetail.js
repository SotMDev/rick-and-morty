import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import {Container} from "react-bootstrap";
import API from "../services/API";
import {setIsLoading} from "../store/data";
import styleOtherCharacterCard from "../assets/styles/components/other-character-card.scss";
import styleCharacterDetail from "../assets/styles/components/character-detail.scss";

const CharacterDetail = () => {

	let {id} = useParams();
	const isLoading = useSelector(state => state.data.value.isLoading);
	const dispatch = useDispatch();
	const Service = new API();
	const [characterData, setCharacterData] = useState({});
	const [otherCharacterData, setOtherCharacterData] = useState([]);

	const getCharacter = (endpoint, setter) => {
		dispatch(setIsLoading(true));
		Service.Request(endpoint)
			.then(response => {
				setter(response);
				setTimeout(() => {
					dispatch(setIsLoading(false));
				}, 600);
			})
			.catch(err => {
				dispatch(setIsLoading(false));
			});
	};

	useEffect(() => {
		getCharacter(`${process.env.REACT_APP_CHARACTERS_API}/${id}`, setCharacterData);
	}, [])

	useEffect(() => {
		if (characterData?.status !== undefined) {
			Service.Request(`${process.env.REACT_APP_CHARACTERS_API}?status=${characterData.status}`).then(response => {
				const filteredCharacterIDs = response.results.map(res => {
					return res.id;
				});
				getCharacter(`${process.env.REACT_APP_CHARACTERS_API}/${filteredCharacterIDs.toString()}`, setOtherCharacterData);
			}).catch(err => {
				dispatch(setIsLoading(false));
			});
		}
	}, [characterData])

	return (
		<>
			<Container>
				{
					isLoading ?
						<div>
							<div className={`character-detail`}>
								<div className="character-detail-left-side">
									<Skeleton height={200} count={1}/>
									<Skeleton height={50} width={100} count={1}/>
									<Skeleton height={40} count={1}/>
									<Skeleton height={40} count={1}/>
								</div>
								<div className="character-detail-right-side">
									<Skeleton style={{marginBottom: "20px"}} height={50} count={1}/>
									<Skeleton height={60} count={10}/>
								</div>
							</div>
						</div>
						:
						<div>
							<div className={`character-detail`}>
								<div className="character-detail-left-side">
									<img src={characterData?.image} alt=""/>
									<h1>{characterData?.name}</h1>
									<div className={"character-info"}>
										<div
											className={`character-status ${characterData?.status?.toLowerCase()}`}>{characterData?.status} - {characterData?.species}</div>
										<div
											className={`character-gender`}>{characterData?.type ? characterData?.type : '?'} - {characterData?.gender}</div>

										<div>{characterData?.origin?.name}</div>
									</div>
								</div>
								<div className="character-detail-right-side">
									<h1>Other Characters</h1>
									<div className={"other-character-list"}>
										{
											otherCharacterData?.map((otherCharacter, index) => (
												<div className={""} key={index}>
													<div
														onClick={() => Service.Request(`${process.env.REACT_APP_CHARACTERS_API}/${otherCharacter.id}`).then(response => setCharacterData(response))}>
														<div className="other-character-card">
															<img src={otherCharacter.image} alt={otherCharacter.name}/>
															<div>
																<h2>{otherCharacter.name}</h2>
																<div>{otherCharacter?.origin?.name}</div>
																<i>{otherCharacter?.type ? otherCharacter?.type : '?'} - {otherCharacter?.gender}</i>
															</div>
														</div>
													</div>
												</div>
											))
										}
									</div>
								</div>
							</div>
						</div>
				}
			</Container>
		</>
	)
}

export default CharacterDetail;