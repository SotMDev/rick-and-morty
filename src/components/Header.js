import {NavLink} from "react-router-dom";
import logo from '../assets/images/logo.svg'
import { Container, Row, Col } from 'react-bootstrap';
import styleHeader from "../assets/styles/components/header.scss";

const Header = () => {
	return (
		<header id="header">
			<Container>
				<Row className={"align-items-center"}>
					<Col xs={12} md={6}>
						<div className="logo">
							<NavLink to="/">
								<img src={logo} alt={"logo"}/>
							</NavLink>
						</div>
					</Col>
					<Col xs={12} md={6}>
						<nav className={"navigation"}>
							<NavLink to="/">Home</NavLink>
							<NavLink to="/locations">Locations</NavLink>
							<NavLink to="/characters">Characters</NavLink>
						</nav>
					</Col>
				</Row>
			</Container>
		</header>
	)
}

export default Header;