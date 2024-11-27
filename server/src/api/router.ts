import { Router } from "express";
import { InputValidator } from "./handlers/pipes/InputValidator.js";
import { LoginController } from "./handlers/controllers/LoginController.js";
import { RegisterUserController } from "./handlers/controllers/RegisterUserController.js";
import { RideController } from "./handlers/controllers/RideController.js";
import { DriverController } from "./handlers/controllers/DriverController.js";

export const apiRouter = Router();

apiRouter.route('/registerUser')
	.post([InputValidator.userLoginOrRegisterRequest], RegisterUserController.registerNewUser);

apiRouter.route('/login')
	.post([InputValidator.userLoginOrRegisterRequest], LoginController.login);

apiRouter.route('/ride/estimate')
	.post([InputValidator.rideRequest], RideController.getRideInformation);

apiRouter.route('/ride/confirm')
	.patch([InputValidator.rideRequest, InputValidator.driverConfirmationRequest], RideController.confirmRide);

apiRouter.route('/ride/:customer_id')
	.get([InputValidator.validateUserRidesHistoryRequest], RideController.getUserRideHistory);

apiRouter.route('/drivers')
	.get(DriverController.getAllDrivers);
