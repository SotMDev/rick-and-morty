import {useEffect, useState} from "react";
import API from "../services/API";
import {Container, Row, Col} from "react-bootstrap";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoading} from "../store/data";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Locations = () => {

	const isLoading = useSelector(state => state.data.value.isLoading);
	const dispatch = useDispatch();
	const [locationData, setLocationData] = useState({});

	useEffect(() => {
		const Service = new API();
		dispatch(setIsLoading(true));
		Service.Request(process.env.REACT_APP_LOCATIONS_API).then(locations => {
			setLocationData(locations);
			setTimeout(() => {
				dispatch(setIsLoading(false));
			}, 600);
		});
	}, []);

	return (
		<>
			<Container>
				{
					isLoading ?
						<Row>
							{Array(20).fill('').map((skeleton, index) => (
								<Col className={"mb-4"} key={index} xs={12} sm={6} lg={4}>
									<Skeleton height={131} count={1}/>
								</Col>
							))}
						</Row>
						:
						<Row>
							{
								locationData && locationData?.results?.map((location, index) => (
									<Col className={"mb-4"} key={index} xs={12} sm={6} lg={4}>
										<div className="location-card">
											<h2>{location.name}</h2>
											<div className={"card-row"}>
												<div className={"title"}>Type <span>:</span></div>
												<div className={"description"}>{location.type ? location.type : '-'}</div>
											</div>
											<div className={"card-row"}>
												<div className={"title"}>Dimension <span>:</span></div>
												<div
													className={"description"}>{location.dimension ? location.dimension : '-'}</div>
											</div>
											<div className={"card-row"}>
												<div className={"title"}>Resident count <span>:</span></div>
												<div
													className={"description"}>{location.residents?.length ? location.residents.length : 0}</div>
											</div>
										</div>
									</Col>
								))
							}
						</Row>
				}
				<Pagination type={'location'} data={locationData} setData={setLocationData}/>
			</Container>
		</>
	)
}

export default Locations;