import {NavLink} from "react-router-dom";
import {Container} from "react-bootstrap";

const Home = () => {

	return (
		<>
			<Container>
				<h1>home</h1>
				<div className="card-list">
					<NavLink to="/characters">Characters</NavLink>
					<NavLink to="/locations">Locations</NavLink>
				</div>
			</Container>
		</>
	)
}

export default Home;