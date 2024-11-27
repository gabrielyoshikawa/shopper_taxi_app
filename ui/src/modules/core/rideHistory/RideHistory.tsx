import { StringFormatter } from '../../../utils/StringFormatter';
import './RideHistory.css';
import DriverDropdown from './components/DriverDropdown';
import { useState } from 'react';

type Ride = {
	id: number;
	date: string;
	driver: {
		id: number;
		name: string;
	};
	origin: string;
	destination: string;
	distance: number;
	duration: string;
	value: string;
};

function RideHistory() {
	const [dataFromChild, setDataFromChild] = useState('');
	const [rides, setRides] = useState([]);
	const [userId, setUserId] = useState('');

	const handleDataFromChild = (data: string) => {
		setDataFromChild(data);
	};

	const activeUserId = sessionStorage.getItem("userId");
	const driverId: string | null = dataFromChild;

	const getRideHistory = async () => {
		try {

			const fetchUrl = !driverId
				? `http://localhost:8080/api/ride/${userId}`
				: `http://localhost:8080/api/ride/${userId}?driver_id=${driverId}`;

			if (!userId) {
				alert("User id is empty");
			}

			const response = await fetch(fetchUrl, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const fetchResult = await response.json();
			setRides(fetchResult.rides || []);
		} catch (error) {
			console.error('Error fetching the ride history:', error);
		}
	};

	return (
		<>
			<div className="ride-main-container">
				<div className="ride-history-container">
					<div className="fields-to-select-container">
						<label htmlFor="origin"></label>
						<input
							type="text"
							id="origin"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							placeholder={`Id do usuário ativo na sessão: ${activeUserId}`}
						/>
						<DriverDropdown onDataFromChild={handleDataFromChild} />
						<button className="apply-filter" onClick={getRideHistory}>
							Pesquisar
						</button>
					</div>
				</div>

				<div className="ride-container">
					<table className="ride-table">
						<thead>
							<tr>
								<th>Data e hora da viagem</th>
								<th>Motorista</th>
								<th>Origem</th>
								<th>Destino</th>
								<th>Distância</th>
								<th>Tempo</th>
								<th>Valor da viagem</th>
							</tr>
						</thead>
						<tbody>
							{rides.length > 0 ? (
								rides.map((ride: Ride) => (
									<tr key={ride.id}>
										<td>{new Date(ride.date).toLocaleString()}</td>
										<td>{ride.driver?.name}</td>
										<td>{ride.origin}</td>
										<td>{ride.destination}</td>
										<td>{ride.distance} km</td>
										<td>{ride.duration}</td>
										<td>{StringFormatter.formatValueToBRL(Number(ride.value))}</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={7} style={{ textAlign: 'center' }}>Sem dados disponíveis</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default RideHistory;
