import express from "express";
import { apiRouter } from "./api/router.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", apiRouter);

app.listen(PORT, () => {
	console.log(`App listening on http://localhost:${PORT}/`);
});