import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserService } from "../../services/users/user.service";
import {
  validateCreateUser,
  validateLoginUser,
  validateOtpUser,
} from "../../models/users/users.model";

class UserController {
  /**-----------------------------------------------
   * @desc    Create new user
   * @route   /api/user/create
   * @method  POST
   * @access  private ( only admin ) 
   ------------------------------------------------*/
  createUserCtrl = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      // Validate body
      if (!req.body) {
        res.status(400).json({ message: "Request body" });
        return;
      }

      const { error } = validateCreateUser(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const user = await UserService.createUser(req.body);

      res.status(201).json({
        message: "Created Successfully",
      });
    }
  );

  /**-----------------------------------------------
   * @desc    login User
   * @route   /api/user/login
   * @method  POST
   * @access public
   ------------------------------------------------*/
  loginUserCtrl = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      // Validate body
      if (!req.body) {
        res.status(400).json({ message: "Request body" });
        return;
      }

      const { error } = validateLoginUser(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const user = await UserService.loginUser(req.body);

      res.status(201).json({
        user: user._id,
        message: "Check Your SMS or email",
      });
    }
  );

  /**-----------------------------------------------
 * @desc    Verify Otp For User Login
 * @route   /api/user/verifyotp/:id
 * @method  POST
 * @access  public 
 ------------------------------------------------*/
  verifyOtp = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      // Validate body
      if (!req.body) {
        res.status(400).json({ message: "Request body" });
        return;
      }

      const { error } = validateOtpUser(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const token = await UserService.verifyOtp(req.body, req.params.id);

      res.cookie("booksGPTToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30 * 1000,
      });

      res.status(200).json({
        message: "Login Successfully",
      });
    }
  );

  /**-----------------------------------------------
 * @desc    Logout User
 * @route   /api/user/logout
 * @method  GET
 * @access  public 
 ------------------------------------------------*/
  logoutCtrl = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      await UserService.logoutUser(res);

      res.status(200).json({
        message: "Successfully logged out",
      });
    }
  );
}

export default new UserController();
