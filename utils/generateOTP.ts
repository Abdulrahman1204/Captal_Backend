import { randomBytes } from "crypto";

export function generateOTP(): string {
  const buffer = randomBytes(3);

  const hex = buffer.toString("hex").slice(0, 6);

  const num = parseInt(hex, 16);
  const otp = num % 1000000;

  return otp.toString().padStart(6, "0");
}
