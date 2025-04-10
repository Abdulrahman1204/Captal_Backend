import { Document, Types } from "mongoose";

// User Interface
export interface IRehabilitation extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  dateOfCompany: string;
  lastyearRevenue: string;
  amount: string;
  file?: string
}
