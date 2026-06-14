import multer from "multer";
import path from "path";

// Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (
    ext !== ".jpg" &&
    ext !== ".jpeg" &&
    ext !== ".webp" &&
    ext !== ".png" &&
    ext !== ".mp4" &&
    ext !== ".mov" &&
    ext !== ".webm" &&
    ext !==  ".mkv"
  ) {
    return cb(
      new Error(`Unsupported file type! ${ext}`),
      false
    );
  }

  cb(null, true);
};

// Multer Upload
const uploads = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
  fileFilter,
});

export default uploads;
