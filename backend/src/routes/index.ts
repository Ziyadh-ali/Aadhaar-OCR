import { Router , type Request , type Response } from "express";
import { upload } from "../config/multer";
import { processAdhaarImages } from "../controllers/ocrController";
import { UploadRequest } from "../utils/Interface";

const router = Router();

    router.post(
        "/upload-aadhar" ,
        upload.fields([
            {name: "frontImage" , maxCount: 1},
            {name: "backImage" , maxCount: 1}
        ]),
        (req , res) => processAdhaarImages(req as unknown as UploadRequest, res),
    );

export default router;