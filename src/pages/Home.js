import {Container} from "react-bootstrap";
import image from "../assets/images/cover.jpg";
import styleHomeCard from "../assets/styles/components/home-card.scss";

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