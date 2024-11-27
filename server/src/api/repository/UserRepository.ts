import { databasePool } from "../../database/config.js";
import { RowDataPacket } from "mysql2";

export default class UserRepository {

	public static async verifyIfUserAlreadyExists(email: string): Promise<boolean> {
		const [rows] = await databasePool.query<UserRecord[]>(`SELECT user_email FROM Users WHERE user_email = ?`.trim(), [email]);

		if (rows.length === 0 || rows === undefined || rows === null) {
			return false;
		}

		return true;
	}

	public static async registerNewUser(email: string, password: string) {
		const [rows] = await databasePool.query<RowDataPacket[]>(`INSERT INTO Users (user_email, user_password) VALUES (?,?)`.trim(), [email, password]);

		if (rows.length === 0 || rows === undefined || rows === null) {
			return [];
		}

		return rows;
	}

	public static async getPasswordByEmail(email: string) {
		const [rows] = await databasePool.query<RowDataPacket[]>(`SELECT user_password FROM Users WHERE user_email = ?`.trim(), [email]);

		if (rows.length === 0 || rows === undefined || rows === null) {
			return [];
		}

		const row = rows[0];

		if (row === undefined) {
			return [];
		}

		return row["user_password"];
	}

	public static async getUserIdByEmail(email: string) {
		const [rows] = await databasePool.query<RowDataPacket[]>(`SELECT user_id FROM Users WHERE user_email = ?`.trim(), [email]);

		if (rows.length === 0 || rows === undefined || rows === null) {
			return [];
		}

		const row = rows[0];

		if (row === undefined) {
			return [];
		}

		return row["user_id"];
	}
}

export type UserRecord = RowDataPacket & {
	user_id: number;
	user_email: string;
	user_password: string;
};