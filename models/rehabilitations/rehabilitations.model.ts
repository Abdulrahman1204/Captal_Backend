import mongoose, { Schema, Model } from "mongoose";
import joi, { ObjectSchema } from "joi";

import { IRehabilitation } from "./dtos";

// Rehabilitation Schema
const RehabilitationSchema = new Schema(
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
    lastyearRevenue: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    amount: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    file: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Rehabilitation Model
const Rehabilitation: Model<IRehabilitation> = mongoose.model<IRehabilitation>(
  "Rehabilitation",
  RehabilitationSchema
);

// Create Validation
const validateCreateRehabilitation = (
  obj: IRehabilitation
): joi.ValidationResult => {
  const schema: ObjectSchema = joi.object({
    firstName: joi.string().trim().min(2).max(100).required(),
    lastName: joi.string().trim().min(2).max(100).required(),
    email: joi.string().trim().min(8).max(100).email().required(),
    phone: joi.string().length(10).required(),
    companyName: joi.string().trim().min(2).max(100).required(),
    dateOfCompany: joi.string().trim().min(2).max(100).required(),
    lastyearRevenue: joi.string().trim().min(2).max(100).required(),
    amount: joi.string().trim().min(2).max(100).required(),
    file: joi.string().trim().optional(),
  });

  return schema.validate(obj);
};

// Update Validation
const validateUpdateRehabilitation = (
  obj: IRehabilitation
): joi.ValidationResult => {
  const schema: ObjectSchema = joi.object({
    firstName: joi.string().trim().min(2).max(100),
    lastName: joi.string().trim().min(2).max(100),
    email: joi.string().trim().min(8).max(100).email(),
    phone: joi.string().length(10),
    companyName: joi.string().trim().min(2).max(100),
    dateOfCompany: joi.string().trim().min(2).max(100),
    lastyearRevenue: joi.string().trim().min(2).max(100),
    amount: joi.string().trim().min(2).max(100),
    file: joi.string().trim().optional(),
  });

  return schema.validate(obj);
};

export { Rehabilitation, validateCreateRehabilitation, validateUpdateRehabilitation }