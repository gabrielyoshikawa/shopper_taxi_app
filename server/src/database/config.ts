import mysql from "mysql2/promise";
import "dotenv/config";

const DB_ENDPOINT="database-1.cnyswcaa66w0.us-east-1.rds.amazonaws.com";
const DB_PASSWORD="XukCuQIBPkUUPltkQNdY";
const DB_PORT="3306";
const DB_USER="admin";
const DB_DATABASE="prod_shopper_taxi_app";

export const databasePool = mysql.createPool({
	host: DB_ENDPOINT,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	port: Number(DB_PORT),
	connectTimeout: 300_000,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});