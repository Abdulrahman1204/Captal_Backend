import { Request, Response } from "express";
import { IOTP, IUser } from "../../models/users/dtos";
import { User } from "../../models/users/users.model";
import { generateJWT } from "../../utils/generateToken";
import { generateOTP } from "../../utils/generateOTP";

class UserService {
  // ~ Post => /api/user/create ~ Create New User
  static async createUser(userData: IUser) {
    let user = await User.findOne({
      phone: userData.phone,
      email: userData.email,
    });
    if (user) {
      throw new Error("user already exists");
    }

    user = await User.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      companyName: userData.companyName,
      dateOfCompany: userData.dateOfCompany,
      role: userData.role,
    });

    return user;
  }

  // ~ Post => /api/user/login ~ Sign In User
  static async loginUser(userData: IUser) {
    let user = await User.findOne({
      phone: userData.phone,
    });

    if (!user) {
      throw new Error("user not found");
    }

    const otp = generateOTP();

    user.otp = otp;
    
    await user.save();

    return user;
  }

  // ~ Post => /api/user/verifyotp ~ Verify OTP
  static async verifyOtp(otpData: IOTP, paramsId: string): Promise<string> {
    // Validate input
    if (!paramsId || !otpData?.otp) {
      throw new Error("invalid input parameters");
    }

    const user = await User.findById(paramsId);
    console.log(user)
    console.log(paramsId)
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.otp) {
      throw new Error("No OTP exists for this user");
    }

    if (otpData.otp !== user.otp) {
      throw new Error("Invalid OTP code");
    }

    // Clear OTP after successful verification
    user.otp = "";
    await user.save();

    // Generate JWT token
    const token = generateJWT({
      id: user._id.toString(),
      role: user.role,
    });

    return token;
  }

  // ~ Get => /api/user/logout ~ Logout User
  static async logoutUser(res: Response) {
    res.clearCookie("booksGPTToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
    });

    return true;
  }
}

export { UserService };
