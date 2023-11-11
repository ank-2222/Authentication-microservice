import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import {
  insertIntoHospital,
  insertIntoPatient,
  isEmailExistInHospital,
  isEmailExistInPatient,
  loginEmailHospital,
  loginEmailPatient,
} from "../queries/auth.hospital";
import {
  hospitalUser,
  loginUser,
  patientUser,
} from "../interfaces/auth.hospital";
import { v4 as uuidv4 } from "uuid";
import { comparePassword, hashPassword } from "../util/hashPassword";
// import { userInfo } from "os";
// import { json } from "body-parser";
import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/.env` });
export class signupService {
  //---------------------------------------------------------------------------
  public createSendtoken = async (userId: string) => {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
  };

  public signupHospital = async (req: Request, res: Response) => {
    // console.log(req.body);
    const {
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
    }: hospitalUser = req.body;

    // Check if the email is already registered
    const emailExists = await isEmailExistInHospital(email);
    if (emailExists.rows.length > 0) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    // Insert the new user into the database
    const id: string = uuidv4();
    const hashedPassword = await hashPassword(password);
    const newPassword: string = hashedPassword;

    const newUser = await insertIntoHospital(
      id,
      name,
      phoneNumber,
      email,
      newPassword,
      licenseId,
      capacity,
      longitude,
      latitude,
      address,
      status
    );

    const token = await this.createSendtoken(id);
    const data = {
      message: "Successfully Created",
      user: newUser.rows[0],
    };
    //these are the cookie options...
    const cookieOptions: any = {
      //converting into ms
      expiresIn: new Date(Date.now() + Number(90) * 24 * 60 * 60),
      //this will prevent the browser from accessing the cookie and make it transportOnly
      httpOnly: true,
      sameSite: "none", // Set the SameSite attribute to None
    };
    res.cookie("jwt", token, cookieOptions);
    res.status(201).json({ data, token: token });
  };

  public signupPatient = async (req: Request, res: Response) => {
    const {
      name,
      phoneNumber,
      email,
      password,
      gender,
      address,
      emergencyContact,
    }: patientUser = req.body;

    // Check if the email is already registered
    const emailExists = await isEmailExistInPatient(email);
    if (emailExists.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Insert the new user into the database
    const id: string = uuidv4();
    const hashedPassword = hashPassword(password);
    const newPassword: string = await hashedPassword;

    const newUser = await insertIntoPatient(
      id,
      name,
      Number(phoneNumber),
      email,
      newPassword,
      gender,
      emergencyContact,
      address
    );
    const token = await this.createSendtoken(id);
    const data = {
      message: "Successfully Created",
      user: newUser.rows[0],
    };
    //these are the cookie options...
    const cookieOptions = {
      //converting into ms
      expiresIn: new Date(
        Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60
      ),
      //this will prevent the browser from accessing the cookie and make it transportOnly
      httpOnly: true,
    };
    res.cookie("jwt", token, cookieOptions);
    res.status(201).json({ data, token: token });
  };

  public loginHospital = async (req: Request, res: Response) => {
    const { email, password }: loginUser = req.body;

    const result = await loginEmailHospital(email);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const user = result.rows[0];

    // Compare the hashed password
    const passCompare = comparePassword(password, user.password);
    const isPasswordValid = await passCompare;
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    const token = await this.createSendtoken(user.id);
    const data = {
      message: "Successfully LoggedIn",
      user: user,
    };
    //these are the cookie options...
    const cookieOptions = {
      //converting into ms
      expiresIn: new Date(
        Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60
      ),
      //this will prevent the browser from accessing the cookie and make it transportOnly
      httpOnly: true,
    };
    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({ data, token: token });
  };
  public loginPatient = async (req: Request, res: Response) => {
    const { email, password }: loginUser = req.body;

    const result = await loginEmailPatient(email);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // Compare the hashed password
    const passCompare = comparePassword(password, user.password);
    const isPasswordValid = await passCompare;
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = await this.createSendtoken(user.id);
    const data = {
      message: "Successfully LoggedIn",
      user: user,
    };
    //these are the cookie options...
    const cookieOptions = {
      //converting into ms
      expiresIn: new Date(
        Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60
      ),
      //this will prevent the browser from accessing the cookie and make it transportOnly
      httpOnly: true,
    };
    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({ data, token: token });
  };
}
