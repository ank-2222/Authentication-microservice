import { Request, Response, NextFunction } from "express";

export function validateHospitalRequiredFields(
	req: Request,
	res: Response,
	next: NextFunction
) {
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
	} = req.body;

	// Define the list of required fields
	const requiredFields = [
		"name",
		"phoneNumber",
		"email",
		"password",
		"licenseId",
		"capacity",
		"longitude",
		"latitude",
		"address",
		"status",
	];

	const fieldDataTypes: { [key: string]: string } = {
		name: "string",
		phoneNumber: "number",
		email: "string",
		password: "string",
		licenseId: "string",
		capacity: "number",
		longitude: "number",
		latitude: "number",
		address: "string",
		status: "string",
	};

	// Check if any required field is missing, empty, or has an invalid data type
	const missingOrInvalidFields = requiredFields.filter((field) => {
		const fieldValue = req.body[field];
		const expectedDataType = fieldDataTypes[field];

		if (
			typeof fieldValue !== expectedDataType ||
			(typeof fieldValue === "string" && fieldValue.trim() === "") ||
			(typeof fieldValue === "number" && isNaN(fieldValue))
		) {
			return true;
		}

		return false;
	});

	if (missingOrInvalidFields.length > 0) {
		return res.status(400).json({
			message: `Missing or Invalid required fields: ${missingOrInvalidFields.join(
				", "
			)}`,
			missingOrEmptyFields: missingOrInvalidFields,
		});
	}

	// If all required fields are present and not empty, continue to the next middleware or route handler
	next();
}

export function validatePatientRequiredFields(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const {
		name,
		phoneNumber,
		email,
		newPassword,
		gender,
		emergencyContact,
		address,
	} = req.body;

	// Define the list of required fields
	const requiredFields = [
		"name",
		"phoneNumber",
		"email",
		"password",
		"gender",
		"emergencyContact",
		"address",
	];

	const fieldDataTypes: { [key: string]: string } = {
		name: "string",
		phoneNumber: "number",
		email: "string",
		password: "string",
		gender: "string",
		emergencyContact: "number",
		address: "string",
	};

	// Check if any required field is missing, empty, or has an invalid data type
	const missingOrInvalidFields = requiredFields.filter((field) => {
		const fieldValue = req.body[field];
		const expectedDataType = fieldDataTypes[field];

		if (
			typeof fieldValue !== expectedDataType ||
			(typeof fieldValue === "string" && fieldValue.trim() === "")
		) {
			return true;
		}

		return false;
	});
	if (missingOrInvalidFields.length > 0) {
		return res.status(400).json({
			message: `Missing or Invalid required fields: ${missingOrInvalidFields.join(
				", "
			)}`,
			missingOrInvalidFields: missingOrInvalidFields,
		});
	}

	// If all required fields are present and not empty, continue to the next middleware or route handler
	next();
}

export function validateLogin(req: Request, res: Response, next: NextFunction) {
	const { email, Password } = req.body;

	// Define the list of required fields
	const requiredFields = ["email", "password"];

	const fieldDataTypes: { [key: string]: string } = {
		email: "string",
		password: "string",
	};

	// Check if any required field is missing, empty, or has an invalid data type
	const missingOrInvalidFields = requiredFields.filter((field) => {
		const fieldValue = req.body[field];
		const expectedDataType = fieldDataTypes[field];

		if (
			typeof fieldValue !== expectedDataType ||
			(typeof fieldValue === "string" && fieldValue.trim() === "")
		) {
			return true;
		}

		return false;
	});
	if (missingOrInvalidFields.length > 0) {
		return res.status(400).json({
			message: `Missing or Invalid required fields: ${missingOrInvalidFields.join(
				", "
			)}`,
			missingOrInvalidFields: missingOrInvalidFields,
		});
	}

	// If all required fields are present and not empty, continue to the next middleware or route handler
	next();
}
