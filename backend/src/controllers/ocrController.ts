import { Request, Response } from "express";
import { extractAadhaarData } from "../services/ocrService";
import { UploadRequest } from "../utils/Interface";


export const processAdhaarImages = async (req: UploadRequest, res: Response) => {
    try {
        const frontImage = req.files?.frontImage?.[0];
        const backImage = req.files?.backImage?.[0];

        if (!frontImage || !backImage) {
            res.status(400).json({
                success: true,
                message: "Both front and back images are required",
            });
        }

        const details = await extractAadhaarData(frontImage?.path!, backImage?.path!);

        await Promise.all([
            console.log("deleting"),
            new Promise((resolve) => require("fs").unlink(frontImage?.path, resolve)),
            new Promise((resolve) => require("fs").unlink(backImage?.path, resolve)),
            console.log("deleted"),
        ]);

        if (!details.name || !details.dob || !details.gender || !details.aadhaarNumber || !details.address) {
            res.status(422).json({
                success: false,
                message: "Could not extract all Aadhaar details. Please upload clearer images.",
                data: details
            });
        }

        res.status(200).json({
            success: true,
            data: details,
        });
    } catch (error) {
        console.error("Error processing Aadhar images:", error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}