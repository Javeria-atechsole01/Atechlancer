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

// Storage for Gig Images
const gigImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'gig_images',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const uploadGigImages = multer({
  storage: gigImageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Storage for Deliveries
const deliveryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'deliveries',
    resource_type: 'raw',
    allowed_formats: ['pdf']
  }
});

const uploadDelivery = multer({
  storage: deliveryStorage,
  limits: { fileSize: 20 * 1024 * 1024 }
});

module.exports = {
  uploadPhoto,
  uploadDocument,
  uploadGigImages,
  uploadDelivery
};
