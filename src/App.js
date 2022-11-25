import 'normalize.css';
import {Route, Routes} from "react-router-dom";
import './assets/styles/style.scss';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

function App() {
	return (
		<div className="App">
			<Header/>
			<Routes>
				<Route exact path="/" element={<Home/>}></Route>
				<Route path="/contact" element={<Contact/>}></Route>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
