import { Router } from "express";
import userController from "../../controllers/users/user.controller";

const router: Router = Router();

// New User
router.route("/create").post(userController.createUserCtrl);

// Login User
router.route("/login").post(userController.loginUserCtrl);

// Otp User
router.route("/verifyotp/:id").post(userController.verifyOtp);

// Logout User
router.route("/logout").get(userController.logoutCtrl);

export default router;
