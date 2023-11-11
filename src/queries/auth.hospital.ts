import { connect } from "http2";
import pool from "../configs/db.config";

export const isEmailExistInHospital = async (email: string) => {
	const checkEmailQuery = "SELECT * FROM public.hospital WHERE email = $1";

	const result = await pool.query(checkEmailQuery, [email]);
	return result;
};
export const isEmailExistInPatient = async (email: string) => {
	const checkEmailQuery = "SELECT * FROM public.patient WHERE email = $1";

	const result = await pool.query(checkEmailQuery, [email]);
	return result;
};

export const insertIntoHospital = async (
	id: string,
	name: string,
	phoneNumber: number,
	email: string,
	password: string,
	licenseId: string,
	capacity: number,
	longitude: number,
	latitude: number,
	address: string,
	status: string
) => {
	const insertUserQuery = `INSERT INTO public.hospital 
  (id, name, "phoneNumber", email, password, "licenseId", capacity,longitude,latitude, address, status) 
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11) RETURNING *`;

	try {
		const result = await pool.query(insertUserQuery, [
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
	} catch (error) {
		console.log(error);
		throw new Error("Error Occured");
	}
};

export const insertIntoPatient = async (
	id: string,
	name: string,
	phoneNumber: number,
	email: string,
	password: string,
	gender: string,
	emergencyContact: number,
	address: string
) => {
	try {
		const insertUserQuery = `INSERT INTO public.patient 
		(id, name,gender, "phoneNumber", email,  address, password, "emergencyContact") 
	  VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

		const result = await pool.query(insertUserQuery, [
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
	} catch (error) {
		console.log(error);
		throw new Error("Error occured");
	}
};

export const loginEmailHospital = async (email: string) => {
	const checkEmailQuery = "SELECT * FROM public.hospital WHERE email = $1";

	const result = await pool.query(checkEmailQuery, [email]);
	return result;
};

export const loginEmailPatient = async (email: string) => {
	const checkEmailQuery = "SELECT * FROM public.patient WHERE email = $1";

	const result = await pool.query(checkEmailQuery, [email]);
	return result;
};

export const isHospitalExistusingId = async (id: string) => {
	const checkIdQuery = "SELECT * FROM public.hospital WHERE id = $1";

	const result = await pool.query(checkIdQuery, [id]);
	return result;
}
