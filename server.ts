import express from "express";
import * as dotenv from 'dotenv';
import router from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});