import { useState } from 'react';
import './ConfirmRide.css';
import { StringFormatter } from '../../../utils/StringFormatter.js';
import { UnitConverter } from '../../../utils/UnitConverter.js';
import { useNavigate } from 'react-router';

function ConfirmRide({ rideRequest, rideResult }) {
	const [selectedDriverId, setSelectedDriverId] = useState(null);

	const navigate = useNavigate();

	const handleDriverSelect = (driverId) => {
		setSelectedDriverId(driverId);
	};

	const originCoordinates = rideResult.result.origin;
	const destinationCoordinates = rideResult.result.destination;

	function formatCoordinates(coordinates: any): string {
		return `${coordinates.latitude},${coordinates.longitude}`;
	}

	const formattedOriginCoordinates = formatCoordinates(originCoordinates);
	const formattedDestinationCoordinates = formatCoordinates(destinationCoordinates);

	const handleConfirmRide = async () => {
		if (!selectedDriverId) {
			return;
		}

		const selectedDriver = rideResult.result.options.find(driver => driver.id === selectedDriverId);

		const requestData = {
			customer_id: rideRequest.customer_id,
			origin: rideRequest.origin,
			destination: rideRequest.destination,
			distance: rideResult.result.distance,
			duration: rideResult.result.duration,
			driver: {
				id: selectedDriver.id,
				name: selectedDriver.name
			},
			value: selectedDriver.value
		};

		try {
			const response = await fetch('http://localhost:8080/api/ride/confirm', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestData),
			});

			if (response.ok) {
				navigate("/history");
			}
		} catch (error) {
			console.error('Error confirming the ride:', error);
		}
	};

	const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	return (
		<>
			<main className="confirm-ride-pop-up">
				<div className="route-data-container">
					<div className="inputs-container">
						<div className="input-group">
							<label htmlFor="origin">Ponto de partida</label>
							<input type="text" id="origin" value={rideRequest.origin} readOnly />
						</div>

						<div className="input-group">
							<label htmlFor="destination">Ponto de desembarque</label>
							<input type="text" id="destination" value={rideRequest.destination} readOnly />
						</div>
					</div>
					<div className="p-container">
						<p>{UnitConverter.meterToKilometer(rideResult.result.distance)}</p>
						<p>{UnitConverter.secondsToHoursAndMinutes(rideResult.result.duration)}</p>
					</div>
				</div>

				<iframe className='map'
					referrerPolicy="no-referrer-when-downgrade"
					src={`https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}&origin=${formattedOriginCoordinates}&destination=${formattedDestinationCoordinates}`}
					allowFullScreen>
				</iframe>

				<p>Motoristas disponíveis</p>
				<div className="drivers-container">
					<table className="drivers-table">
						<thead>
							<tr>
								<th></th>
								<th>Nome</th>
								<th>Descrição</th>
								<th>Veículo</th>
								<th>Avaliação</th>
								<th>Valor da viagem</th>
							</tr>
						</thead>
						<tbody>
							{rideResult.result.options.map((driver) => (
								<tr key={driver.id}>
									<td>
										<input
											type="radio"
											name="driverSelection"
											value={driver.id}
											checked={selectedDriverId === driver.id}
											onChange={() => handleDriverSelect(driver.id)}
										/>
									</td>
									<td>{driver.name}</td>
									<td>{driver.description}</td>
									<td>{driver.vehicle}</td>
									<td>{driver.review.rating}</td>
									<td>{StringFormatter.formatValueToBRL(driver.value)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<button className="confirmRide" onClick={handleConfirmRide}>
					Confirmar viagem
				</button>
			</main>
		</>
	);
}

export default ConfirmRide;
