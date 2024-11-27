import { Request, Response } from "express";
import UserService from "../../services/UserService.js";

export class LoginController {

	static async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			const isUserAlreadyRegister = await UserService.verifyIfUserAlreadyExists(email);
			if (!isUserAlreadyRegister) {
				return res.status(409).json({ message: 'Email do not exist' });
			}

			const arePasswordsMatching = await UserService.validatePasswordByEmail(email, password);
			if (!arePasswordsMatching) {
				return res.status(409).json({ message: 'Passwords do not match' });
			}

			const userId: number = await UserService.getUserId(email);

			return res.status(200).json({
				message: "Credenciais válidas",
				userId,
			});
		} catch (err) {
			return res.status(401).json("Credenciais inválidas");
		}
	}
}