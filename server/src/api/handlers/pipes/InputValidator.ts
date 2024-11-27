import type { NextFunction, Request, Response } from "express";
import { DriverService } from "../../services/DriverService.js";

export class InputValidator {
	public static async userLoginOrRegisterRequest(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;

			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
				return res.status(400).json({
					error_code: "INVALID_DATA",
					error_description: "Os dados fornecidos no corpo da requisição são inválidos"
				});
			}

			if (!email || email.length === 0) {
				return res.status(400).json({
					error_code: "INVALID_DATA",
					error_description: "Os dados fornecidos no corpo da requisição são inválidos"
				});
			}

			if (!password || password.length === 0) {
				return res.status(400).json({
					error_code: "INVALID_DATA",
					error_description: "Os dados fornecidos no corpo da requisição são inválidos"
				});
			}

			return next();
		} catch (err) {
			return next(err);
		}
	}

	public static async rideRequest(req: Request, res: Response, next: NextFunction) {
		try {
			const { customer_id, origin, destination } = req.body;

			if (!origin || !destination || origin.trim().length === 0 || destination.trim().length === 0) {
				return res.status(400).json({
					error_code: "INVALID_DATA",
					error_description: "Os dados fornecidos no corpo da requisição são inválidos"
				});
			}

			if (customer_id.length === 0) {
				return res.status(400).json({
					error_code: "INVALID_DATA",
					error_description: "Os dados fornecidos no corpo da requisição são inválidos"
				});
			}

			if (origin === destination) {
				return res.status(400).json({
					error_code: "INVALID_DATA",
					error_description: "Os dados fornecidos no corpo da requisição são inválidos"
				});
			}

			return next();
		} catch (err) {
			return next(err);
		}
	}

	public static async driverConfirmationRequest(req: Request, res: Response, next: NextFunction) {
		try {
			const { distance, driver } = req.body;

			if (!driver.id || driver.id.length === 0) {
				return res.status(400).json({
					error_code: "INVALID_DATA",
					error_description: "Os dados fornecidos no corpo da requisição são inválidos"
				});
			}

			const isDriverRegistered = await DriverService.verifyIfDriverIsRegistered(driver.id);

			if (!isDriverRegistered) {
				return res.status(404).json({
					error_code: "DRIVER_NOT_FOUND",
					error_description: "Motorista não encontrado"
				});
			}

			const driverMinimumDistance = await DriverService.getDriverMinimumDistance(driver.id);

			if (driverMinimumDistance < distance) {
				return res.status(406).json({
					error_code: "INVALID_DISTANCE",
					error_description: "Quilometragem inválida para o motorista"
				});
			}

			return next();
		} catch (err) {
			return next(err);
		}
	}

	public static async validateUserRidesHistoryRequest(req: Request, res: Response, next: NextFunction) {
		try {
			const customerId = req.params["customer_id"];
			const driverId = req.query["driver_id"];

			if (!customerId || customerId.length === 0) {
				return res.status(400).json({
					error_code: "INVALID_DATA",
					error_description: "Os dados fornecidos no corpo da requisição são inválidos"
				});
			}

			if (driverId !== undefined) {
				const isDriverIdValid = await DriverService.verifyIfDriverIsRegistered(Number(driverId));

				if (!isDriverIdValid) {
					return res.status(404).json({
						error_code: "DRIVER_NOT_FOUND",
						error_description: "Motorista invalido"
					});
				}
			}

			return next();
		} catch (err) {
			return next(err);
		}
	}
}