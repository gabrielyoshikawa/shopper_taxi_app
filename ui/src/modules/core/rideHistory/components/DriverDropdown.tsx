import { useState, useEffect } from "react";
import './DriverDropdown.css';

type DriverDropdownProps = {
	onDataFromChild: (selectedDriver: string) => void;
};

type Driver = {
	id: number;
	name: string;
};

function DriverDropdown({ onDataFromChild }: DriverDropdownProps) {
	const [drivers, setDrivers] = useState([]);
	const [selectedDriver, setSelectedDriver] = useState("");

	const getAllDrivers = async () => {
		try {
			const response = await fetch("http://localhost:8080/api/drivers", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const data = await response.json();
				setDrivers(data.allDrivers);
			} else {
				const errorData = await response.json();
				console.error(`Error: ${errorData.message}`);
			}
		} catch (error) {
			console.error("Error fetching drivers:", error);
		}
	};

	useEffect(() => {
		getAllDrivers();
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		setSelectedDriver(selectedValue);
		onDataFromChild(selectedValue);
	};

	return (
		<div className="driver-dropdown">
			<label htmlFor="driver-select"></label>
			<select id="driver-select" value={selectedDriver} onChange={handleChange}>
				<option value="">Todos os motoristas</option>
				{drivers.map((driver: Driver) => (
					<option key={driver.id} value={driver.id}>
						{driver.name}
					</option>
				))}
			</select>
		</div>
	);
}

export default DriverDropdown;
