import mongoose, { Schema, Model } from "mongoose";
import joi, { ObjectSchema } from "joi";

import { IUser } from "./dtos";

// User Schema
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 40,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 10,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    dateOfCompany: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    role: {
      type: String,
      enum: ["admin", "contractor", "resource"],
      default: "admin",
    },
    otp: {
      type: String,
      length: 6,
    },
  },
  {
    timestamps: true,
  }
);

// User Model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

// Create Validation
const validateCreateUser = (obj: IUser): joi.ValidationResult => {
  const schema: ObjectSchema = joi.object({
    firstName: joi.string().trim().min(2).max(100).required(),
    lastName: joi.string().trim().min(2).max(100).required(),
    email: joi.string().trim().min(8).max(100).email().required(),
    phone: joi.string().length(10).required(),
    companyName: joi.string().trim().min(2).max(100).required(),
    dateOfCompany: joi.string().trim().min(2).max(100).required(),
    role: joi.string().valid("resource", "contractor", "admin").required(),
  });

  return schema.validate(obj);
};

// Login Validation
const validateLoginUser = (obj: IUser): joi.ValidationResult => {
  const schema: ObjectSchema = joi.object({
    phone: joi.string().length(10).required(),
  });

  return schema.validate(obj);
};

// Otp Validation
const validateOtpUser = (obj: IUser): joi.ValidationResult => {
  const schema: ObjectSchema = joi.object({
    otp: joi.string().length(6).required(),
  });

  return schema.validate(obj);
};

export { User, validateCreateUser, validateLoginUser, validateOtpUser };
