import { IAadhaarData } from "../../utils/Interface";
import { isBackSide, isFrontSide, isSameAadhaar, parseAadhaarDetails } from "../Parsers/aadharParser";
import { IOCRService } from "./IOCRService";
import { ImageAnnotatorClient } from '@google-cloud/vision';

export class AadhaarOCRService implements IOCRService<IAadhaarData> {
    private client: ImageAnnotatorClient;

    constructor(client: ImageAnnotatorClient) {
        this.client = client;
    }

    async extractData(frontImagePath: string, backImagePath: string): Promise<IAadhaarData> {
        const frontText = await this.getText(frontImagePath);
        const backText = await this.getText(backImagePath);

        if (!isFrontSide(frontText) || !isBackSide(backText)) {
            throw new Error("Aadhaar front/back images might be swapped or invalid");
        }

        const frontData = parseAadhaarDetails(frontText);
        const backData = parseAadhaarDetails(backText);

        // if (!isSameAadhaar(frontData, backData)) {
        //     throw new Error("Front and back sides do not belong to the same Aadhaar card.");
        // }

        return parseAadhaarDetails(`${frontText}\n${backText}`)
    }

    private async getText(imagePath: string): Promise<string> {
        const [result] = await this.client.textDetection(imagePath);
        return result.fullTextAnnotation?.text || "";
    }
} 