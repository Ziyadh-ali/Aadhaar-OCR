# Aadhaar OCR Project

A web application to extract digital information from **Aadhaar card images** (front and back) using **Google Vision API**.

## Features

- Upload front and back images of Aadhaar card
- Extract details such as:
  - Name
  - Aadhaar Number
  - Date of Birth
  - Gender
  - Address
- Validate that front and back belong to the same Aadhaar
- File upload validation (image type, max size 2MB)
- Real-time preview of uploaded images
- Error handling for invalid or unclear images

## Tech Stack

- **Frontend:** React, TypeScript, ShadCN UI, TailwindCSS
- **Backend:** Node.js, Express, TypeScript
- **OCR Service:** Google Cloud Vision API
- **Other:** Multer (file upload), Axios, dotenv

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <repo-folder>
2. **Install dependencies**
   ▫️Backend:
   
         cd backend
         npm install
   ▫️Frontend:
   
         cd frontend
         npm install
4. **Setup environment variables**
    - Create a .env file in the backend folder with the following:
      - PORT=5000
      - GOOGLE_PROJECT_ID=aadhar-ocr-468618
      - GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----   \nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9j7AigP2jAfBr\nOylw66m2PrpMhKi4o6iOav0RidbNppWy8sdKHPUHdjIRBZK2QF3u052EDnJyqspU\nDCjJH+b8BKWCVTCPu+iWGc2i2wZeuLxjjtOhuEIqJJ+cCTK0P70kwpHwHa1TW13Q\nIucRTWc857UNBxD5Md83ntWmmls2CZsthWsN+L65f282zNN65PvNf4W23KOFLzF5\nkyHOfUPWmXOhtbdTdLF21EJ5o5FHz2S8UBzwhUyuV2PKnkJ4Rk6oCoVnTxgWQMB2\nC2+u8MRol6NhLviCtkf047aVil22RvuTWvwborDzbS7XNyJyCbMKq3tipfHm5dBr\nc0Yn+xRlAgMBAAECggEADHXpihsYkSKLf0EAVF/pZAVzkZwWyyxW5CW8RO7eo94T\ncRPsbb7BjKAEYoIPRtOsWQqoDAo3E7qOWkACXlYuhNp5Vrvq2Ufs3hEMJ2xmWsuh\n9plo5/SIxORraYJhRt/5uvTfSv1oa1ZSMGBa+BQyeRpyGE0inH7ewXU7bhwvarnR\nu7tRmoq0l+RnaSnEEAIy8F7FzpUvtwG/CSNdy7Hy+2vbUopvNPqCk6kNNYMAML5o\nUePc0PRLMfXZ+Lam8XiuKwWDmTOK958ZYS+yP0jsmgxzNLyE677XhkyZ0338Z0FP\nLBYMFj6ZTr7oj1950Y82DQlL6CaGUHGQw++yfUbxcQKBgQD6EPXOpo2jkCCztEoP\nHFaVKuZ7q8Bvg3wnS6gFMiIE/JrZsGE0pqBgQ/1UOHmwnmHzpIdO2BlXV6uye2FU\nKhYIXQCOBrz2nFFA+FPEnZcnsgPNHpAAdlJRDq3yJt+dcuoQ5HbtnUTh89GOM+Pa\nLPg0wNKpe+pLUWtWpb0jjtvf1wKBgQDCDy/6LxDVH82Kc3dI5iWjkhhQy/FH9jP8\n70Liqxvb41VvfXeV9qa0qi+KRPRLZzF6lUcZZZt9Kt9G6ApSXl/V4UhTNGj/xeA5\n1Czi/Lg48P0P8z8UFLlXVihy5YbdbRiNqR0X+/LfFPzjDsMqu9sVcwHisRtL2EdM\nhUScAOkWIwKBgQCSyb3gjjf6WTI5Co2mjRXt/f7Jfao6S05nqqt4UVNS5gzn1/dX\ndrARkhd0hqo4GOCaqmuaxpMpiBcLcA1T4FiKlD0tIZtuj5fKsXpKoc8GyCIfF9+j\nxdDQL/O/fz4oKDpprBJ7rKOwlvTdqmwHt/oCzWVbg5emmqaNeECsTMGYhQKBgDzn\n+V3jUbwiTCdtD/4wRZXt73XEXIkCa9Sx32M24vqDgjgIv/SwQign1d3mwGm+DJh1\nq6f77O4++27MuxiZCCkfmMyMgXvtRe/AeQoQ2Vz9vd84sA6EZptTrkRJZ6etauxj\nLH9vkw2TD7/PzU9nQF6eBvR4M6H9UntgxGTWIFHTAoGANB7Pk+ErmTLKAt3zJgsC\nuCIumcdiAtwpnz/w62+VjgKZzsxEXYypFlpSrDHCheRL3GonKDvwh/2AJhaZw+Tz\nc3DmMELLtrP/P+EqCmPMIx8jiLsWRxLtYgdUJam6kyqdhXvxIRP2BJm7qRYtgL8h\ndQe6dsgPdy9Say16rjvxRUA=\n-----END PRIVATE KEY-----\n
      - GOOGLE_CLIENT_EMAIL=adhaar-ocr@aadhar-ocr-468618.iam.gserviceaccount.com
      - ALLOWED_ORIGIN=http://localhost:5173
   - Create a .env file in the frontend folder with the following:
      - VITE_API_BASE_URL=http://localhost:5000
5. **Running the Project**
   - Start the backend:
     - npm run dev
   - Start the frontend:
     -  npm run dev
   - Open http://localhost:5173 in your browser to access the app.

## Usage

1. Upload the front and back images of your Aadhaar card.
2. Ensure that both images belong to the same Aadhaar card.
3. Wait for the OCR processing to extract the details.
4. View the extracted information in the results panel.
5. If data extraction fails, upload clearer images.

## Notes

1. Maximum upload size for images: 2MB.
2. Supported image types: JPG, JPEG, PNG.
