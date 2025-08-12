import vision from "@google-cloud/vision";
import dotenv from "dotenv"

dotenv.config();

export interface IAadhaarData {
    name: string;
    dob: string;
    gender: string;
    aadhaarNumber: string;
    address: string;
}


const client = new vision.ImageAnnotatorClient({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL || "",
        private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    },
    projectId: process.env.GOOGLE_PROJECT_ID || "",
});

export const extractAadhaarData = async (frontImageUrl: string, backImageUrl: string): Promise<IAadhaarData> => {
    // console.log(process.env.GOOGLE_CLIENT_EMAIL)
    // console.log(process.env.GOOGLE_PROJECT_ID)
    // console.log(process.env.GOOGLE_PRIVATE_KEY)
    const frontText = await getTextFromImage(frontImageUrl);
    const backText = await getTextFromImage(backImageUrl);

    if (!isFrontSide(frontText) || !isBackSide(backText)) {
        throw new Error("Aadhaar front/back images might be swapped or invalid");
    }
    const combinedText = `${frontText}\n${backText}`;
    return parseAadhaarDetails(combinedText);
}

const isFrontSide = (text: string) => {
    return /\bDOB\b/i.test(text) || /\bMale\b|\bFemale\b/i.test(text);
};

const isBackSide = (text: string) => {
    return /\bAddress\b/i.test(text) || /\b\d{6}\b/.test(text); // pincode check
};

const getTextFromImage = async (imageUrl: string): Promise<string> => {
    const [result] = await client.textDetection(imageUrl);
    return result.fullTextAnnotation?.text || "";
};

const parseAadhaarDetails = (text: string): IAadhaarData => {
    const cleanText = text.replace(/\s+/g, " ").trim();

    const nameMatch = cleanText.match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)(?=.*DOB)/);
    const dobMatch = cleanText.match(/DOB\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})/i);
    const genderMatch = cleanText.match(/\b(Male|Female)\b/i);
    const aadhaarMatch = cleanText.match(/\d{4}\s\d{4}\s\d{4}/);
    const addressMatch = text.match(/Address\s*:\s*([\s\S]*?\b\d{6}\b)/i);

    return {
        name: nameMatch?.[1]?.trim() || "",
        dob: dobMatch?.[1] || "",
        gender: genderMatch?.[0] || "",
        aadhaarNumber: aadhaarMatch?.[0] || "",
        address: addressMatch?.[1]?.trim() || "",
    };
};
