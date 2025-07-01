import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import courseRoute from './routes/course.routes.js'
import userRoute from './routes/user.route.js'
import adminRoute from './routes/admin.route.js'
import orderRoute from './routes/order.route.js'
import teamRoute from './routes/team.route.js'
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser'


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        const url = new URL(origin);
        if (url.hostname === 'localhost' && url.port !== '5000') {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Cloudinary configuration code
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB connection
try {
    await mongoose.connect(mongoURI)
    console.log("Connected to MongoDB");
} catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
}
//-------------- Routes ------------------//
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/order", orderRoute)
app.use("/api/v1/team", teamRoute)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
