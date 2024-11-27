import bcrypt from "bcryptjs";
import UserRepository from "../repository/UserRepository.js";

export default class UserService {

	static async verifyIfUserAlreadyExists(email: string) {
		return await UserRepository.verifyIfUserAlreadyExists(email);
	}

	static async validatePasswordByEmail(email: string, password: string): Promise<boolean> {
		const userHashedPassword = String(await UserRepository.getPasswordByEmail(email));
		const isValidated = await bcrypt.compare(password.trim(), userHashedPassword.trim()).then((result) => result);
		return isValidated;
	}
	
	static async hashPassword(password: string) {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		return hashedPassword;
	}

	static async registerNewUser(email: string, password: string) {
		await UserRepository.registerNewUser(email, password);
	}

	static async getUserId(email: string) {
		return await UserRepository.getUserIdByEmail(email);
	}

}