import DriverRepository from "../repository/DriverRepository.js";
import { StringFormatter } from "../utils/StringFormatter.js";

export class DriverService {

	static async getAvailableDriversForRide(rideDistance: number) {
		const availableDrivers = await DriverRepository.getDriversByRideDistance(rideDistance);
		return DriverService.formatDriverData(availableDrivers);
	}

	static async formatDriverData(availableDrivers: DriverRecord[]): Promise<DriverResult> {
		const formattedDrivers = availableDrivers.map((driver: DriverRecord) => {
			
			const { driverRating, driverComment } = StringFormatter.formatDriverReview(driver.review);
			const driverValue = StringFormatter.formatDriverRatePerKm(driver.driver_rate_per_km);

			return {
				id: driver.id,
				name: driver.name,
				description: driver.description,
				vehicle: driver.vehicle,
				review: {
					rating: driverRating,
					comment: driverComment
				},
				driver_rate_per_km: driverValue
			};
		});

		return { options: formattedDrivers };
	}

	static async getDriverMinimumDistance(driverId: number) {
		return await DriverRepository.getDriverMinimumDistanceByDriverId(driverId);
	}

	static async verifyIfDriverIsRegistered(driverId: number) {
		return await DriverRepository.verifyIfDriverExists(driverId);
	}

	static async getAllDrivers() {
		return await DriverRepository.getAllDrivers();
	}
}

type DriverRecord = {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: string
    driver_rate_per_km: string;
};

export type DriverResult = {
    options: {
        id: number;
        name: string;
        description: string;
        vehicle: string;
        review: {
            rating: string;
            comment: string;
        };
        driver_rate_per_km: number;
    }[];
};