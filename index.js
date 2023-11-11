"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: `${__dirname}/.env` });
const port = process.env.PORT || 5000;
// handle uncaught err
// process.on("uncaughtException", function (err) {
//   console.log(`uncaughterror-> ${err}`);
// });
const caseRoutes_1 = __importDefault(require("./src/routes/caseRoutes"));
const auth_routes_1 = __importDefault(require("./src/routes/auth.routes"));
const app = (0, express_1.default)();
// Allow requests from http://localhost:5173
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // You might need this if you are using cookies for authentication
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
// parse application/json
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(cors());
app.use(cookieParser());
app.use("/api", caseRoutes_1.default);
app.use("/api", auth_routes_1.default);
app.get("/healthz", (req, res) => {
    const CurrentDateTime = new Date().toLocaleString();
    res.status(200).json({
        HTTPCode: "200",
        Status: "OK",
        message: "Welcome to Home",
        EntryTime: CurrentDateTime,
    });
});
app.get("/", (req, res) => {
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
