import express from "express";
import session from "express-session";
import userRoutes from "./routes/user.routes";

const app = express();

// Middleware
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      //   secure: process.env.NODE_ENV === "production",
      //   maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: false,
    },
  })
);

// Routes
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
