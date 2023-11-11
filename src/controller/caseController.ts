
import { Request, Response } from "express";
import { generateUserToken } from "../util/tokenGenerator";
import { sendWhatsappMessage } from "../util/whatsappSender";




export const createCase = async (req: Request, res: Response) => {

    try {
        const { latitude, longitude, phoneNo } = req.body;
        if (!latitude || !longitude || !phoneNo) {
            res.status(403).json({ message: "Inputs are missing" });
        }

        const token =  generateUserToken();
        console.log("Latitude->",latitude, "Longitude->",longitude)
        console.log("Toekn->",token);
        if (token!='ERR_NO_TOKEN') {
                sendWhatsappMessage(latitude, longitude, phoneNo, token);
                res.status(200).json({message:"Case added successfully"})
        } else {
            console.log("Token required for whatsapp message");
        }
    } catch (error) {
        res.status(500).json({error:"internal server error"});
    }
}