import { Response, Request } from "express";
import { IAadhaarData, UploadRequest } from "../utils/Interface";
import { IOCRService } from "../services/ocr/IOCRService";


export const processAdhaarImages = (ocrService: IOCRService<IAadhaarData>) =>
    async (req: Request, res: Response) => {
        try {
            const uploadReq = req as unknown as UploadRequest
            const frontImage = uploadReq.files?.frontImage?.[0];
            const backImage = uploadReq.files?.backImage?.[0];

            if (!frontImage || !backImage) {
                res.status(400).json({ success: false, message: "Both front and back images are required" });
                return;
            }

            const details = await ocrService.extractData(frontImage.path, backImage.path);

            if (!details.name || !details.dob || !details.gender || !details.aadhaarNumber) {
                res.status(422).json({
                    success: false,
                    message: "Could not extract all Aadhaar details. Please upload clearer images.",
                    data: details,
                });
                return;
            }

            res.status(200).json({ success: true, data: details });
        } catch (error) {
            console.error("Error processing Aadhaar images:", error);
            res.status(500).json({ message: error instanceof Error ? error.message : "Internal server error" });
        }
    };
// export const processAdhaarImages = async (req: UploadRequest, res: Response) => {
//     try {
//         const frontImage = req.files?.frontImage?.[0];
//         const backImage = req.files?.backImage?.[0];

//         if (!frontImage || !backImage) {
//             res.status(400).json({
//                 success: true,
//                 message: "Both front and back images are required",
//             });
//         }

//         const details = await extractAadhaarData(frontImage?.path!, backImage?.path!);

//         await Promise.all([
//             console.log("deleting"),
//             new Promise((resolve) => require("fs").unlink(frontImage?.path, resolve)),
//             new Promise((resolve) => require("fs").unlink(backImage?.path, resolve)),
//             console.log("deleted"),
//         ]);

//         if (!details.name || !details.dob || !details.gender || !details.aadhaarNumber || !details.address) {
//             res.status(422).json({
//                 success: false,
//                 message: "Could not extract all Aadhaar details. Please upload clearer images.",
//                 data: details
//             });
//         }

//         res.status(200).json({
//             success: true,
//             data: details,
//         });
//     } catch (error) {
//         console.error("Error processing Aadhar images:", error);
//         if (error instanceof Error) {
//             res.status(500).json({ message: error.message });
//         } else {
//             res.status(500).json({ message: "Internal server error" });
//         }
//     }
// }