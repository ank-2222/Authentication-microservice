"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHospitalExistusingId = exports.loginEmailPatient = exports.loginEmailHospital = exports.insertIntoPatient = exports.insertIntoHospital = exports.isEmailExistInPatient = exports.isEmailExistInHospital = void 0;
const db_config_1 = __importDefault(require("../configs/db.config"));
const isEmailExistInHospital = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const checkEmailQuery = "SELECT * FROM public.hospital WHERE email = $1";
    const result = yield db_config_1.default.query(checkEmailQuery, [email]);
    return result;
});
exports.isEmailExistInHospital = isEmailExistInHospital;
const isEmailExistInPatient = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const checkEmailQuery = "SELECT * FROM public.patient WHERE email = $1";
    const result = yield db_config_1.default.query(checkEmailQuery, [email]);
    return result;
});
exports.isEmailExistInPatient = isEmailExistInPatient;
const insertIntoHospital = (id, name, phoneNumber, email, password, licenseId, capacity, longitude, latitude, address, status) => __awaiter(void 0, void 0, void 0, function* () {
    const insertUserQuery = `INSERT INTO public.hospital 
  (id, name, "phoneNumber", email, password, "licenseId", capacity,longitude,latitude, address, status) 
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11) RETURNING *`;
    try {
        const result = yield db_config_1.default.query(insertUserQuery, [
            id,
            name,
            phoneNumber,
            email,
            password,
            licenseId,
            capacity,
            longitude,
            latitude,
            address,
            status,
        ]);
        return result;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error Occured");
    }
});
exports.insertIntoHospital = insertIntoHospital;
const insertIntoPatient = (id, name, phoneNumber, email, password, gender, emergencyContact, address) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const insertUserQuery = `INSERT INTO public.patient 
		(id, name,gender, "phoneNumber", email,  address, password, "emergencyContact") 
	  VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
        const result = yield db_config_1.default.query(insertUserQuery, [
            id,
            name,
            gender,
            phoneNumber,
            email,
            address,
            password,
            emergencyContact,
        ]);
        return result;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error occured");
    }
});
exports.insertIntoPatient = insertIntoPatient;
const loginEmailHospital = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const checkEmailQuery = "SELECT * FROM public.hospital WHERE email = $1";
    const result = yield db_config_1.default.query(checkEmailQuery, [email]);
    return result;
});
exports.loginEmailHospital = loginEmailHospital;
const loginEmailPatient = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const checkEmailQuery = "SELECT * FROM public.patient WHERE email = $1";
    const result = yield db_config_1.default.query(checkEmailQuery, [email]);
    return result;
});
exports.loginEmailPatient = loginEmailPatient;
const isHospitalExistusingId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIdQuery = "SELECT * FROM public.hospital WHERE id = $1";
    const result = yield db_config_1.default.query(checkIdQuery, [id]);
    return result;
});
exports.isHospitalExistusingId = isHospitalExistusingId;
