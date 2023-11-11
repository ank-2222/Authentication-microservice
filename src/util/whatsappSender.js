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
exports.sendWhatsappMessage = void 0;
const accountSid = 'ACad4b830ec2db6fde3a6561b69608aff5';
const authToken = '596a98b3ace6525af3a388a120d76421';
const client = require('twilio')(accountSid, authToken);
const sendWhatsappMessage = (lat, long, phone, token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("whatsapp->", phone);
    client.messages
        .create({
        body: `Sending Emergency service to your location.\t Your current location\'s Latitude is ${lat} and longitude ${long}.\t Your Token = ${token}`,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:+91${phone}`
    })
        .then(() => console.log("whatsapp Message sent."));
});
exports.sendWhatsappMessage = sendWhatsappMessage;
