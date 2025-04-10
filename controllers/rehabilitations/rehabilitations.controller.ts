import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { RehabilitationService } from "../../services/rehabilitations/rehabilitations.service";
import {
  validateCreateRehabilitation,
  validateUpdateRehabilitation,
} from "../../models/rehabilitations/rehabilitations.model";

class RehabilitationsController {
  /**-----------------------------------------------
   * @desc    Create new Rehabilitations
   * @route   /api/rehabilitations/create
   * @method  POST
   * @access  public
   ------------------------------------------------*/
  createRehabilitationsCtr = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      // Validate body
      if (!req.body) {
        res
          .status(400)
          .json({ message: "Request body and PDF file are required" });
        return;
      }

      const { error } = validateCreateRehabilitation(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const files = req.files as { file?: Express.Multer.File[] };
      const filePath = files?.file?.[0]?.path;

      const rehabilitations = await RehabilitationService.createRehabilitation(
        req.body,
        filePath
      );

      res
        .status(201)
        .json({ rehabilitations, message: "Created Successfully" });
    }
  );
}

export default new RehabilitationsController();
