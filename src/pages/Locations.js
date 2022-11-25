import {useEffect, useState} from "react";
import API from "../services/API";
import {Container, Row, Col} from "react-bootstrap";
import Pagination from "../components/Pagination";

const Locations = () => {

	const [locationData, setLocationData] = useState({});

	useEffect(() => {
		const Service = new API();
		Service.Request(process.env.REACT_APP_LOCATIONS_API).then(locations => setLocationData(locations));
	}, []);

	return (
		<>
			<Container>
				<Row>
					{
						locationData && locationData?.results?.map((locationItem,index) => (
							<Col className={"mb-4"} key={index} xs={4}>
								<div className="location-card">
									<h2>{locationItem.name}</h2>
									<div className={"card-row"}>
										<div className={"title"}>Type</div>
										<div className={"description"}>: {locationItem.type ? locationItem.type : '-'}</div>
									</div>
									<div className={"card-row"}>
										<div className={"title"}>Dimension</div>
										<div className={"description"}>: {locationItem.dimension ? locationItem.dimension : '-'}</div>
									</div>
									<div className={"card-row"}>
										<div className={"title"}>Resident count</div>
										<div className={"description"}>: {locationItem.residents?.length ? locationItem.residents.length : 0}</div>
									</div>
								</div>
							</Col>

						))
					}
				</Row>
				 <Pagination />
			</Container>
		</>
	)
}

export default Locations;