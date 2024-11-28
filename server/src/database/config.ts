import mysql from "mysql2/promise";
import "dotenv/config";

export const databasePool = mysql.createPool({
	host: process.env["DB_ENDPOINT"],
	user: process.env["DB_USER"],
	password: process.env["DB_PASSWORD"],
	database: process.env["DB_DATABASE"],
	port: Number(process.env["DB_PORT"]),
	connectTimeout: 300_000,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});