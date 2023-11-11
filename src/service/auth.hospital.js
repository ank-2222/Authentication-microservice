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
exports.signupService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const auth_hospital_1 = require("../queries/auth.hospital");
const uuid_1 = require("uuid");
const hashPassword_1 = require("../util/hashPassword");
// import { userInfo } from "os";
// import { json } from "body-parser";
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: `${__dirname}/.env` });
class signupService {
    constructor() {
        //---------------------------------------------------------------------------
        this.createSendtoken = (userId) => __awaiter(this, void 0, void 0, function* () {
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET is not defined");
            }
            const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            return token;
        });
        this.signupHospital = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body);
            const { name, phoneNumber, email, password, licenseId, capacity, longitude, latitude, address, status, } = req.body;
            // Check if the email is already registered
            const emailExists = yield (0, auth_hospital_1.isEmailExistInHospital)(email);
            if (emailExists.rows.length > 0) {
                res.status(400).json({ message: "Email already registered" });
                return;
            }
            // Insert the new user into the database
            const id = (0, uuid_1.v4)();
            const hashedPassword = yield (0, hashPassword_1.hashPassword)(password);
            const newPassword = hashedPassword;
            const newUser = yield (0, auth_hospital_1.insertIntoHospital)(id, name, phoneNumber, email, newPassword, licenseId, capacity, longitude, latitude, address, status);
            const token = yield this.createSendtoken(id);
            const data = {
                message: "Successfully Created",
                user: newUser.rows[0],
            };
            //these are the cookie options...
            const cookieOptions = {
                //converting into ms
                expiresIn: new Date(Date.now() + Number(90) * 24 * 60 * 60),
                //this will prevent the browser from accessing the cookie and make it transportOnly
                httpOnly: true,
                sameSite: "none", // Set the SameSite attribute to None
            };
            res.cookie("jwt", token, cookieOptions);
            res.status(201).json({ data, token: token });
        });
        this.signupPatient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, phoneNumber, email, password, gender, address, emergencyContact, } = req.body;
            // Check if the email is already registered
            const emailExists = yield (0, auth_hospital_1.isEmailExistInPatient)(email);
            if (emailExists.rows.length > 0) {
                return res.status(400).json({ message: "Email already registered" });
            }
            // Insert the new user into the database
            const id = (0, uuid_1.v4)();
            const hashedPassword = (0, hashPassword_1.hashPassword)(password);
            const newPassword = yield hashedPassword;
            const newUser = yield (0, auth_hospital_1.insertIntoPatient)(id, name, Number(phoneNumber), email, newPassword, gender, emergencyContact, address);
            const token = yield this.createSendtoken(id);
            const data = {
                message: "Successfully Created",
                user: newUser.rows[0],
            };
            //these are the cookie options...
            const cookieOptions = {
                //converting into ms
                expiresIn: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60),
                //this will prevent the browser from accessing the cookie and make it transportOnly
                httpOnly: true,
            };
            res.cookie("jwt", token, cookieOptions);
            res.status(201).json({ data, token: token });
        });
        this.loginHospital = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const result = yield (0, auth_hospital_1.loginEmailHospital)(email);
            if (result.rows.length === 0) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            const user = result.rows[0];
            // Compare the hashed password
            const passCompare = (0, hashPassword_1.comparePassword)(password, user.password);
            const isPasswordValid = yield passCompare;
            if (!isPasswordValid) {
                res.status(401).json({ message: "Invalid password" });
                return;
            }
            const token = yield this.createSendtoken(user.id);
            const data = {
                message: "Successfully LoggedIn",
                user: user,
            };
            //these are the cookie options...
            const cookieOptions = {
                //converting into ms
                expiresIn: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60),
                //this will prevent the browser from accessing the cookie and make it transportOnly
                httpOnly: true,
            };
            res.cookie("jwt", token, cookieOptions);
            res.status(200).json({ data, token: token });
        });
        this.loginPatient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const result = yield (0, auth_hospital_1.loginEmailPatient)(email);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            const user = result.rows[0];
            // Compare the hashed password
            const passCompare = (0, hashPassword_1.comparePassword)(password, user.password);
            const isPasswordValid = yield passCompare;
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password" });
            }
            const token = yield this.createSendtoken(user.id);
            const data = {
                message: "Successfully LoggedIn",
                user: user,
            };
            //these are the cookie options...
            const cookieOptions = {
                //converting into ms
                expiresIn: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60),
                //this will prevent the browser from accessing the cookie and make it transportOnly
                httpOnly: true,
            };
            res.cookie("jwt", token, cookieOptions);
            res.status(200).json({ data, token: token });
        });
    }
}
exports.signupService = signupService;
