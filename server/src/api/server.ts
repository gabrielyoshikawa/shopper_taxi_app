import express from "express";
import cors from "cors";
import { apiRouter } from "./router.js";

const app = express();

app.use(cors({
	origin: ["http://localhost", "http://localhost:80"],
	methods: "GET,POST,PUT,DELETE,PATCH",
	allowedHeaders: "Content-Type,Authorization"
}));

const PORT = 8080;

app.use(express.json());
app.use("/api", apiRouter);

app.listen(PORT, () => {
	console.log(`App listening on http://localhost:${PORT}/`);
});