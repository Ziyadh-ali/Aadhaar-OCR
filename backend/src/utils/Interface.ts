
export interface UploadRequest extends Request {
    files?: {
        frontImage?: Express.Multer.File[];
        backImage?: Express.Multer.File[];
    };
}