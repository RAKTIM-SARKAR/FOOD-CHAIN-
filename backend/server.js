import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();
const port = process.env.PORT || 8000;  // Read port from environment or fallback to 5000
const appUrl = process.env.APP_URL || `http://localhost:${port}`;  // Use APP_URL from env

//middleware
app.use(express.json());
app.use(cors());  // Allow access to backend from any frontend

//db connection
connectDB();

//API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
   res.send("API working");
});

//run express server
app.listen(port, () => {
   console.log(`Server Started on ${appUrl}`);  // Use appUrl from .env
});
