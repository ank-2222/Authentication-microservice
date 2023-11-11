"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const caseController_1 = require("../controller/caseController");
const router = express_1.default.Router();
router.post("/raiseTicket", caseController_1.createCase);
exports.default = router;
