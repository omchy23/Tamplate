import express from "express";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_CORS_ORIGIN,
      process.env.ADMIN_CORS_ORIGIN
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

// import routes
import TamplateRoute from "./routes/tamplate.route.js";
import CategoryRoute from "./routes/category.route.js";

// endpoints
app.use("/api/v1/", TamplateRoute);
app.use("/api/v1/", CategoryRoute);

export { app };
