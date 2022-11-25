import {NavLink} from "react-router-dom";
import logo from '../assets/images/logo.png'
import { Container, Row, Col } from 'react-bootstrap';

const Header = () => {
	return (
		<header id="header">
			<Container>
				<Row className={"align-items-center"}>
					<Col xs={6}>
						<div className="logo">
							<NavLink to="/">
								<img src={logo} alt={"logo"}/>
							</NavLink>
						</div>
					</Col>
					<Col xs={6}>
						<nav className={"navigation"}>
							<NavLink to="/">Home</NavLink>
							<NavLink to="/contact">Contact</NavLink>
						</nav>
					</Col>
				</Row>
			</Container>
		</header>
	)
}

export default Header;