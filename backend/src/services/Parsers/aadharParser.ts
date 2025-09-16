import { IAadhaarData } from "../../utils/Interface";

export const parseAadhaarDetails = (text: string): IAadhaarData => {
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

export const isFrontSide = (text: string) => {
    return /\bDOB\b/i.test(text) || /\bMale\b|\bFemale\b/i.test(text);
};

export const isBackSide = (text: string) => {
    return /\bAddress\b/i.test(text) || /\b\d{6}\b/.test(text);
};

export const isSameAadhaar = (front: IAadhaarData, back: IAadhaarData): boolean => {
    if (!front.aadhaarNumber || !back.aadhaarNumber) {
        return false;
    }

    return front.aadhaarNumber === back.aadhaarNumber;
};