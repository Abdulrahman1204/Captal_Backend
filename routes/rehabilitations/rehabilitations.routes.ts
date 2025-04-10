import { Router } from "express";
import rehabilitationsController from "../../controllers/rehabilitations/rehabilitations.controller";
import { upload } from "../../utils/cloudinary";

const router: Router = Router();

// New Rehabilitations
router
  .route("/create")
  .post(
    upload.fields([{ name: "file", maxCount: 1 }]),
    rehabilitationsController.createRehabilitationsCtr
  );

export default router;
