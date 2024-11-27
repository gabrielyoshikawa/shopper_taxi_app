import type { DriverResult } from "./DriverService";
import RideRepository from "../repository/RideRepository.js";

export class RideService {

	static async calculateRideValue(rideDistance: number, driverData: DriverResult) {
		return {
			options: driverData.options.map(driver => {
				const { driver_rate_per_km, ...driverDataWithoutRate } = driver;
				return {
					...driverDataWithoutRate,
					value: driver.driver_rate_per_km * rideDistance,
				};
			}),
		};
	}

	static async insertConfirmedRide(confirmedRideData: any) {
		await RideRepository.insertConfirmedRide(confirmedRideData);
	}

	static async getUserRideHistoryByUserId(userId: number) {
		return await RideRepository.getRideHistoryByUserId(userId);
	}

	static async getUserRideHistoryByUserIdAndDriverId(userId: number, driverId: number) {
		return await RideRepository.getRideHistoryByUserIdAndDriverId(userId, driverId);
	}
}