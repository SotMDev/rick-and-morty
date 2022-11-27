import {NavLink} from "react-router-dom";
import {Container} from "react-bootstrap";
import styleHomeCard from "../assets/styles/components/home-card.scss";
import image from "../assets/images/cover.jpg";

const Home = () => {

	return (
		<>
			<Container>
				<img src={image} alt="" className={"mb-2"}/>
			</Container>
		</>
	)
}

export default Home;