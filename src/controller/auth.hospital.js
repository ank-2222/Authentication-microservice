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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const auth_hospital_1 = require("../service/auth.hospital");
const dotenv = __importStar(require("dotenv"));
const auth_hospital_2 = require("../queries/auth.hospital");
dotenv.config({ path: `${__dirname}/.env` });
// console.log(process.env.JWT_SECRET)
class SignupHospital extends auth_hospital_1.signupService {
    constructor() {
        super(...arguments);
        this.signupHospitalUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.signupHospital(req, res);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
        this.loginHospitaluser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.loginHospital(req, res);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
        this.signupPatientUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.signupPatient(req, res);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error", errorMsg: error.message });
            }
        });
        this.loginPatientUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.loginPatient(req, res);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
        this.protect = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authorizationHeader = req.headers.authorization;
                if (authorizationHeader) {
                    const token = authorizationHeader.split(' ')[1];
                    const secret = process.env.JWT_SECRET || "";
                    if (!secret) {
                        throw new Error("JWT_SECRET is not defined");
                    }
                    else {
                        const payload = jwt.verify(token, secret);
                        // console.log(payload);
                        if (payload) {
                            const id = payload.userId;
                            const result = yield (0, auth_hospital_2.isHospitalExistusingId)(id);
                            const user = result.rows[0];
                            if (user) {
                                res.status(200).json({ message: "authorized" });
                            }
                        }
                    }
                }
                else {
                    res.status(401).json({ error: "LogIn to access" });
                }
            }
            catch (error) {
                // Handle the error and return a response
                res.status(401).json({ error: "unauthorized" });
            }
        });
    }
}
exports.default = SignupHospital;
