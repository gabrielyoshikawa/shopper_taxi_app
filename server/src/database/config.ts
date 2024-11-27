import mysql from "mysql2/promise";
import "dotenv/config";

export const databasePool = mysql.createPool({
	host: process.env["MYSQL_HOST"],
	user: process.env["MYSQL_USER"],
	password: process.env["MYSQL_PASSWORD"],
	database: process.env["MYSQL_DATABASE"],
	port: Number(process.env["MYSQL_PORT"]),
	connectTimeout: 300_000,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});