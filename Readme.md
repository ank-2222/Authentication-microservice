# Hospital Authentication API

This API provides authentication routes for hospitals and patients using Express.js.

## Installation

Before running the API, make sure to install the required dependencies. Use the following command:

```bash
npm install
```


## Usage

Hospital Signup

POST /h/signup
Endpoint for hospital registration. Requires valid hospital registration fields.

Hospital Login

POST /h/login
Endpoint for hospital login. Requires valid login credentials.

Patient Signup

POST /p/signup
Endpoint for patient registration. Requires valid patient registration fields.

Patient Login

POST /p/login
Endpoint for patient login. Requires valid login credentials.

Check User Authentication Status

GET /isLoggedIn
Endpoint to check the authentication status of the user. Requires a valid authentication token.

Controllers and Middlewares
The API uses the following controllers and middlewares:

- signupHospital: Handles hospital authentication logic.
- validateHospitalRequiredFields: Middleware to validate required hospital registration fields.
- validateLogin: Middleware to validate login credentials.
- validatePatientRequiredFields: Middleware to validate required patient registration fields.
- signupHospitalUser: Function to handle hospital signup requests.
- signupPatientUser: Function to handle patient signup requests.
- loginHospitaluser: Function to handle hospital login requests.
- loginPatientUser: Function to handle patient login requests.
- protect: Middleware to protect routes requiring authentication.