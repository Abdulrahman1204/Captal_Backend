import { Request, Response } from "express";
import { IRehabilitation } from "../../models/rehabilitations/dtos";
import { Rehabilitation } from "../../models/rehabilitations/rehabilitations.model";

class RehabilitationService {
  // ~ Post => /api/rehabilitations/create ~ Create New Rehabilitation
  static async createRehabilitation(rehData: IRehabilitation, file?: string) {
    const rehabilitations = await Rehabilitation.create({
      firstName: rehData.firstName,
      lastName: rehData.lastName,
      email: rehData.email,
      phone: rehData.phone,
      companyName: rehData.companyName,
      dateOfCompany: rehData.dateOfCompany,
      lastyearRevenue: rehData.lastyearRevenue,
      amount: rehData.amount,
      file: file
    });

    return rehabilitations;
  }
}

export { RehabilitationService };
