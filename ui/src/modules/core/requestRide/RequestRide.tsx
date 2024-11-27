import { useState } from 'react';
import ConfirmRide from '../confirmRide/ConfirmRide';
import './RequestRide.css';

function RequestRide() {
	const [rideFormData, setFormData] = useState({ origin: "", destination: "" });
	const [isRideSuccessful, setIsRideSuccessful] = useState(false);
	const [rideRequest, setRideRequest] = useState<unknown>(null);
	const [rideResult, setRideResult] = useState<unknown>(null);
	const [userId, setUserId] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const activeUserId = sessionStorage.getItem("userId");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const rideRequestData = {
			customer_id: userId,
			origin: rideFormData.origin,
			destination: rideFormData.destination,
		};

		setRideRequest(rideRequestData);

		try {
			const response = await fetch("http://localhost:8080/api/ride/estimate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(rideRequestData),
			});

			const result = await response.json();

			if (response.ok) {
				setIsRideSuccessful(true);
				setRideResult(result);
			} else {
				alert(result.error_description);
				setIsRideSuccessful(false);
			}
		} catch (error) {
			console.error("Error:", error);
			setIsRideSuccessful(false);
		}
	};

	return (
		<>
			<div className="request-ride-container" style={{ display: isRideSuccessful ? 'none' : 'block' }}>
				<div className="request-ride">
					<form className='request-ride-form' onSubmit={handleSubmit}>
						<div className="user-id-container">
							<label htmlFor="origin">Id do usuário</label>
							<input 
								type="text" 
								id="origin" 
								value={userId}
								onChange={(e) => setUserId(e.target.value)} 
								placeholder={`Id do usuário ativo na sessão: ${activeUserId}`} />
						</div>

						<div className="origin-form-container">
							<label htmlFor="origin">Origin</label>
							<input
								type="text"
								name="origin"
								id="origin"
								required
								placeholder="Posição inicial"
								value={rideFormData.origin}
								onChange={handleChange}
							/>
						</div>

						<div className="destination-form-container">
							<label htmlFor="destination">Posição final</label>
							<input
								type="text"
								name="destination"
								id="destination"
								required
								placeholder="Posição final"
								value={rideFormData.destination}
								onChange={handleChange}
							/>
						</div>

						<div className="button-estimate-ride-value-container">
							<button className='estimateRideValue' type="submit">Estimar valor da viagem</button>
						</div>
					</form>
				</div>
			</div>

			{isRideSuccessful && <ConfirmRide rideRequest={rideRequest} rideResult={rideResult} />}
		</>
	);
}

export default RequestRide;
