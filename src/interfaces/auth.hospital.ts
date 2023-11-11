// types/RegistrationTypes.ts

import { Status, gender } from "../constants/hospital.enums";

type location = {
	latitude: number;
	longitude: number;
};

export interface user {
	id: string;
	name: string;
	phoneNumber: number;
	email: string;
	password: string;
	address: string;
}

export interface hospitalUser extends user {
	licenseId: string;
	capacity: number;
	latitude: location["latitude"];
	longitude: location["longitude"];
	status: Status.AVAILABLE | Status.UNAVAILABLE;
}

export interface patientUser extends user {
	emergencyContact: number;
	gender: gender.MALE | gender.FEMALE;
}

export interface loginUser {
	email: string;
	password: string;
}


export interface JwtPayload {
	userId: string
  }