import { v2 as cloudinary } from "cloudinary"; 
import multer from "multer"; 
import { CloudinaryStorage } from "multer-storage-cloudinary"; 
 
// Configure Cloudinary 
cloudinary.config({ 
  cloud_name: "dkltqpci0", 
  api_key: "754726425731953", 
  api_secret: "eVd0Hk7xHifbP2p-8suLfqW42Y0", 
}); 
 
// Multer Storage Configuration 
const storage = new CloudinaryStorage({ 
  cloudinary: cloudinary, 
  params: { 
    folder: "Captal", 
    allowed_formats: ["jpg", "png", "jpeg", "pdf", "doc", "docx"], 
    public_id: (req: Express.Request, file: Express.Multer.File) => `${Date.now()}_${file.originalname}`, 
  } as any,  
}); 
 
// Multer Upload Middleware 
const upload = multer({ storage }); 
 
export { cloudinary, upload };