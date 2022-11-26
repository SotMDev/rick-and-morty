import 'normalize.css';
import {Route, Routes} from "react-router-dom";
import './assets/styles/style.scss';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Locations from "./pages/Locations";
import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";

function App() {
	return (
		<div className="App">
			<Header/>
			<Routes>
				<Route exact path="/" element={<Home/>}></Route>
				<Route path="/locations" element={<Locations/>}></Route>
				<Route path="/characters">
					<Route index element={<Characters />} />
					<Route path=":id" element={<CharacterDetail />} />
				</Route>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
