import { Request } from "express";

export interface JWTPayload {
  id: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}