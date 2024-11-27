import { Request, Response } from "express";
import { DriverService } from "../../services/DriverService.js";

export class DriverController {
	static async getAllDrivers(_req: Request, res: Response) {
		try {
			const allDrivers = await DriverService.getAllDrivers();
			return res.status(200).json({ allDrivers });
		} catch (err) {
			return res.status(400).json({
				error_code: "INVALID_DATA",
				error_description: "Os dados fornecidos no corpo da requisição são inválidos"
			});
		}
	}
}
