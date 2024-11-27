import { databasePool } from "../../database/config.js";
import { RowDataPacket } from "mysql2";
import { Driver } from "../types/driverRecord.types.js";

export default class DriverRepository {

	public static async getDriversByRideDistance(rideDistance: number): Promise<DriverRecord[]> {
		const [rows] = await databasePool.query<DriverRecord[]>(`
			SELECT 
				id, 
				name, 
				description, 
				vehicle, 
				review, 
				driver_rate_per_km 
			FROM Drivers 
			WHERE driver_minimum_ride_threshold_per_km <= ?
			ORDER BY driver_rate_per_km ASC`.trim(),
			[rideDistance]);

		if (rows.length === 0 || rows === undefined || rows === null) {
			return [];
		}

		return rows;
	}

	public static async getDriverMinimumDistanceByDriverId(driverId: number) {
		const [rows] = await databasePool.query<RowDataPacket[]>(`
			SELECT driver_minimum_ride_threshold_per_km 
			FROM Drivers
			WHERE id = ?`.trim(),
			[driverId]);

		if (rows.length === 0 || rows === undefined || rows === null) {
			return [];
		}

		return rows;
	}

	public static async verifyIfDriverExists(driverId: number) {
		const [rows] = await databasePool.query<RowDataPacket[]>(`SELECT id FROM Drivers WHERE id = ?`.trim(), [driverId]);

		if (rows.length === 0 || rows === undefined || rows === null) {
			return false;
		}

		return true;
	}

	public static async getAllDrivers() {
		const [rows] = await databasePool.query<RowDataPacket[]>(`SELECT id, name FROM Drivers`.trim());

		if (rows.length === 0 || rows === undefined || rows === null) {
			return rows;
		}

		return rows;
	}
}

type DriverRecord = Driver & RowDataPacket;