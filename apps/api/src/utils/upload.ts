import multer, { diskStorage } from "multer";

export const adminProfileUpload = multer({ storage: diskStorage({}) }).single("profile")
export const taskImageUpload = multer({ storage: diskStorage({}) }).single("taskImage")