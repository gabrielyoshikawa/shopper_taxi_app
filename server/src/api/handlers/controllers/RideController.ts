import { Request, Response } from "express";
import { GeoService } from "../../services/GeoService.js";
import { RouteService } from "../../services/RouteService.js";
import { DriverService } from "../../services/DriverService.js";
import { UnitConverter } from "../../utils/UnitConverter.js";
import { RideService } from "../../services/RideService.js";

export class RideController {
	static async getRideInformation(req: Request, res: Response) {
		try {
			const { origin, destination } = req.body;
			// const { customer_id, origin, destination } = req.body;

			const geoResult = await GeoService.getOriginAndDestinationCoordinatesFromUserRequest(origin, destination, "Google");
			const routeResult = await RouteService.getRouteDistanceAndRouteTime(geoResult);
			const driverResult = await DriverService.getAvailableDriversForRide(UnitConverter.meterToKilometer(routeResult.distance));
			const rideResult = await RideService.calculateRideValue(UnitConverter.meterToKilometer(routeResult.distance), driverResult);

			const originAndDestinationCoordinates = await GeoService.getOriginAndDestinationCoordinatesFromUserRequest(origin, destination, "Shopper");

			const result = {
				...originAndDestinationCoordinates,
				...routeResult,
				...rideResult
			};

			return res.status(200).json({ result });
		} catch (err) {
			return res.status(400).json({
				error_code: "INVALID_DATA",
				error_description: "Os dados fornecidos no corpo da requisição são inválidos",
			});
		}
	}

	static async confirmRide(req: Request, res: Response) {
		try {
			await RideService.insertConfirmedRide(req.body);
			return res.status(200).json({ sucess: true });
		} catch (err) {
			return res.status(400).json({
				error_code: "INVALID_DATA",
				error_description: "Os dados fornecidos no corpo da requisição são inválidos"
			});
		}
	}

	static async getUserRideHistory(req: Request, res: Response) {
		try {
			const customerId = req.params["customer_id"];
			const driverId = req.query["driver_id"];

			const userRides = !driverId
				? await RideService.getUserRideHistoryByUserId(Number(customerId))
				: await RideService.getUserRideHistoryByUserIdAndDriverId(Number(customerId), Number(driverId));

			if (userRides === undefined) {
				return res.status(404).json({
					error_code: "NO_RIDES_FOUND",
					error_description: "Nenhum registro encontrado"
				});
			}

			return res.status(200).json({ customerId, ...userRides });
		} catch (err) {
			return res.status(404).json({
				error_code: "NO_RIDES_FOUND",
				error_description: "Nenhum registro encontrado"
			});
		}
	}
}
