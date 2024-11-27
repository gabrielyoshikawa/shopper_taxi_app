import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import RegisterForm from './modules/register/RegisterForm';
import RequestRide from './modules/core/requestRide/RequestRide';
import Menu from './modules/menu/Menu';
import LoginForm from './modules/login/LoginForm';
import RideHistory from './modules/core/rideHistory/RideHistory';

function App() {

	return (
		<>
		<Router>
			<Routes>
				<Route path="/" element={<LoginForm />}></Route>
				<Route path="/register" element={<RegisterForm />}></Route>
				<Route path="/menu" element={<Menu />}></Route>
				<Route path="/request" element={<RequestRide />}></Route>
				<Route path="/history" element={<RideHistory />}></Route>
			</Routes>
		</Router>
		</>
	);
}

export default App;
