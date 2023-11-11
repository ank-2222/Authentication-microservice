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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserToken = void 0;
const randomString = __importStar(require("randomized-string"));
const generateUserToken = () => {
    //   let result;
    //    new Promise(async (resolve, reject) => {
    //     const token =  randomString.generate({
    //         charset: "alphanumeric",
    //       length: 6,
    //       prefix: "RR-",
    //     lowerCaseOnly: true,    //lower case only
    //     });
    //     if (token != null) {
    //       resolve({ result: token });
    //     } else {
    //       reject({ result: "ERR_No_TOKEN" });
    //     }
    //   })
    //     .then( (response:any) => {
    //       result =  response.result;
    //     })
    //     .catch( (error) => {
    //       result =  error.result;
    //       console.log(`error in generating Token. Error Code = ${error.result}`);
    //     })
    //     .finally(() => {
    //       console.log("Token Generated");
    //     });
    //   return result;
    const token = randomString.generate({
        charset: "alphanumeric",
        lowerCaseOnly: true,
        length: 6,
        prefix: "RR-", //optional prefix
    });
    return token;
};
exports.generateUserToken = generateUserToken;
