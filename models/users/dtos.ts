import { Document, Types } from "mongoose";

// User Interface
export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  dateOfCompany: string;
  role: "admin" | "contractor" | "resource";
  otp: string;
}


// OTP
export interface IOTP extends Document {
  otp: string;
}