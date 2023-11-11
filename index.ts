import express from "express";
import bodyParser from "body-parser";
const cors = require("cors");

const cookieParser = require("cookie-parser");
import { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/.env` });
const port =  process.env.PORT || 5000;
// handle uncaught err
// process.on("uncaughtException", function (err) {
//   console.log(`uncaughterror-> ${err}`);
// });

import caseRoutes from "./src/routes/caseRoutes";
import signupRoutes from "./src/routes/auth.routes";

const app = express();
// Allow requests from http://localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // You might need this if you are using cookies for authentication
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(cookieParser());

app.use("/api", caseRoutes);
app.use("/api", signupRoutes);
app.get("/healthz", (req: Request, res: Response) => {
  const CurrentDateTime = new Date().toLocaleString();
  res.status(200).json({
    HTTPCode: "200",
    Status: "OK",
    message: "Welcome to Home",
    EntryTime: CurrentDateTime,
  });
});
app.get("/", (req: Request, res: Response) => {
  const CurrentDateTime = new Date().toLocaleString();
  res.status(200).json({
    HTTPCode: "200",
    Status: "OK",
    message: "Welcome to Home",
    EntryTime: CurrentDateTime,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`server is running at port ${port} `);
});
