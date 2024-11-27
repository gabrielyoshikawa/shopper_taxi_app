import { databasePool } from "../../database/config.js";
import { RowDataPacket } from "mysql2";

export default class RideRepository {

	public static async insertConfirmedRide(confirmedRideData: any) {
		const { customer_id, origin, destination, distance, duration, driver, value } = confirmedRideData;

		await databasePool.query<RowDataPacket[]>(`
			INSERT INTO Rides (
				customer_id, 
				ride_origin, 
				ride_destination, 
				ride_distance, 
				ride_duration, 
				driver_id, 
				ride_value) 
			VALUES (?,?,?,?,?,?,?)`.trim(), [
			customer_id,
			origin,
			destination,
			distance,
			duration,
			driver.id,
			value
		]);
	}

	public static async getRideHistoryByUserId(userId: number) {
		const [rows] = await databasePool.query<RideHistory[]>(`
			SELECT 
				ride_id,
				ride_date,
				customer_id, 
				ride_origin, 
				ride_destination, 
				ride_distance, 
				ride_duration, 
				driver_id, 
				ride_value,
				name
			FROM Rides 
			JOIN Drivers ON Rides.driver_id = Drivers.id
			WHERE customer_id = ?
			ORDER BY ride_date DESC
			`.trim(), [
			userId,
		]);


		if (rows.length === 0 || rows === undefined || rows === null) {
			return [];
		}

		return {
			rides: rows.map((ride) => ({
				id: ride.ride_id,
				date: ride.ride_date,
				origin: ride.ride_origin,
				destination: ride.ride_destination,
				distance: ride.ride_distance,
				duration: ride.ride_duration,
				driver: {
					id: ride.driver_id,
					name: ride["name"],
				},
				value: ride.ride_value
			})),
		};
	}

	public static async getRideHistoryByUserIdAndDriverId(userId: number, driverId?: number) {
		const [rows] = await databasePool.query<RideHistory[]>(`
			SELECT 
				ride_id,
				ride_date,
				customer_id, 
				ride_origin, 
				ride_destination, 
				ride_distance, 
				ride_duration, 
				driver_id, 
				ride_value,
				name
			FROM Rides 
			JOIN Drivers ON Rides.driver_id = Drivers.id
			WHERE customer_id = ?
			AND driver_id = ?
			ORDER BY ride_date DESC
			`.trim(), [
			userId,
			driverId
		]);

		if (rows.length === 0 || rows === undefined || rows === null) {
			return [];
		}

		return {
			rides: rows.map((ride) => ({
				id: ride.ride_id,
				date: ride.ride_date,
				origin: ride.ride_origin,
				destination: ride.ride_destination,
				distance: ride.ride_distance,
				duration: ride.ride_duration,
				driver: {
					id: ride.driver_id,
					name: ride["name"],
				},
				value: ride.ride_value
			})),
		};
	}
}

type RideHistory = RowDataPacket & {
	ride_id: number,
	ride_date: string,
	customer_id: number,
	ride_origin: string,
	ride_destination: string,
	ride_distance: number,
	ride_duration: string;
	driver_id: number,
	ride_value: number,
	driver_name: string;
};