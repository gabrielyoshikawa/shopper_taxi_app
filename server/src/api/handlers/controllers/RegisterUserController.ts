import { Request, Response } from "express";
import UserService from "../../services/UserService.js";


export class RegisterUserController {
	static async registerNewUser(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			const isUserAlreadyRegister = await UserService.verifyIfUserAlreadyExists(email);

			if (isUserAlreadyRegister) {
				return res.status(409).json({ message: 'Email already exists' });
			}

			const hashedPassword = await UserService.hashPassword(password);
			await UserService.registerNewUser(email, hashedPassword);

			return res.status(200).json("Email registrado com sucesso");
		} catch (err) {
			return res.status(401).json("Erro ao registrar email");
		}
	}
}