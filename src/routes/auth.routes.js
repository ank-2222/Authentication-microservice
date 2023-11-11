"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { signupHospital, signupPatient } from '../controller/signup.hospital';
const auth_hospital_1 = __importDefault(require("../controller/auth.hospital"));
const signup_middleware_1 = require("../middlewares/signup.middleware");
const { signupHospitalUser, signupPatientUser, loginHospitaluser, loginPatientUser, protect, } = new auth_hospital_1.default();
const router = express_1.default.Router();
router.post("/h/signup", signup_middleware_1.validateHospitalRequiredFields, signupHospitalUser);
router.post("/h/login", signup_middleware_1.validateLogin, loginHospitaluser);
router.post("/p/signup", signup_middleware_1.validatePatientRequiredFields, signupPatientUser);
router.post("/p/login", signup_middleware_1.validateLogin, loginPatientUser);
router.get("/isLoggedIn", protect);
exports.default = router;
