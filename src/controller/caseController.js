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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCase = void 0;
const tokenGenerator_1 = require("../util/tokenGenerator");
const whatsappSender_1 = require("../util/whatsappSender");
const createCase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { latitude, longitude, phoneNo } = req.body;
        if (!latitude || !longitude || !phoneNo) {
            res.status(403).json({ message: "Inputs are missing" });
        }
        const token = (0, tokenGenerator_1.generateUserToken)();
        console.log("Latitude->", latitude, "Longitude->", longitude);
        console.log("Toekn->", token);
        if (token != 'ERR_NO_TOKEN') {
            (0, whatsappSender_1.sendWhatsappMessage)(latitude, longitude, phoneNo, token);
            res.status(200).json({ message: "Case added successfully" });
        }
        else {
            console.log("Token required for whatsapp message");
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.createCase = createCase;
