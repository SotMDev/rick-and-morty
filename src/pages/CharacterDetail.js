import {useEffect, useState} from "react";
import {NavLink, useParams} from 'react-router-dom';
import {Container} from "react-bootstrap";
import API from "../services/API";

const CharacterDetail = () => {

	let {id} = useParams();
	const Service = new API();
	const [characterData, setCharacterData] = useState({});
	const [otherCharacterData, setOtherCharacterData] = useState([]);

	useEffect(() => {
		Service.Request(`${process.env.REACT_APP_CHARACTERS_API}/${id}`).then(response => setCharacterData(response));
	}, [])

	useEffect(() => {
		if (characterData?.status !== undefined) {
			Service.Request(`${process.env.REACT_APP_CHARACTERS_API}?status=${characterData.status}`).then(response => {
				const filteredCharacterIDs = response.results.map(res => {
					return res.id;
				});
				Service.Request(`${process.env.REACT_APP_CHARACTERS_API}/${filteredCharacterIDs.toString()}`).then(otherCharacters => setOtherCharacterData(otherCharacters));
			});
		}
	}, [characterData])

	return (
		<>
			<Container>
				<div className={`character-detail`}>
					<div className="character-detail-left-side">
						<img src={characterData?.image} alt=""/>
						<h1>{characterData?.name}</h1>
						<div className={"character-info"}>
							<div
								className={`character-status ${characterData?.status?.toLowerCase()}`}>{characterData?.status} - {characterData?.species}</div>
							<div
								className={`character-gender`}>{characterData?.type ? characterData?.type : '?'} - {characterData?.gender}</div>
						</div>
						<div>{characterData?.origin?.name}</div>
					</div>
					<div className="character-detail-right-side">
						<h1>Other Characters</h1>
						<div className={"other-character-list"}>
							{
								otherCharacterData?.map((otherCharacter, index) => (
									<div className={""} key={index}>

										<NavLink onClick={() => console.log(otherCharacter?.id)} to={`/characters/${otherCharacter.id}`}>
											<div className="other-character-card">
												<img src={otherCharacter.image} alt={otherCharacter.name}/>
												<div>
													<h2>{otherCharacter.name}</h2>
													<div>{otherCharacter?.origin?.name}</div>
													<i>{otherCharacter?.type ? otherCharacter?.type : '?'} - {otherCharacter?.gender}</i>
												</div>
											</div>
										</NavLink>
									</div>
								))
							}
						</div>
					</div>
				</div>
			</Container>
		</>

	)
}

export default CharacterDetail;