const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const { fileFilter } = require('../utils/fileValidation');

// Configure storage for Profile Images
const photoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional optimization
  }
});

// Configure storage for Documents
const documentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_documents',
    resource_type: 'raw', // Important for PDFs and non-image files
    allowed_formats: ['pdf'],
    use_filename: true,
    unique_filename: true
  }
});

// Initialize Multer for Photos
const uploadPhoto = multer({
  storage: photoStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Initialize Multer for Documents
const uploadDocument = multer({
  storage: documentStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for documents
  fileFilter: fileFilter
});

module.exports = {
  uploadPhoto,
  uploadDocument
};
