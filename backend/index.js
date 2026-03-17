import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from "cors" 
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import mongoose from "mongoose"

dotenv.config();
let port = process.env.PORT || 8000;

let app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "https://luxycart-frontend.onrender.com",
        "https://luxycart-admin.onrender.com",
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    credentials: true
}))

// Allow Firebase auth redirect to work across origins
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
    next();
})


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)


app.listen(port, ()=>{
    console.log("Hello from server");
    connectDb();
})


mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

