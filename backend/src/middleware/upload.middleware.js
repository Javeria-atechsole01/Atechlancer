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

// Configure storage for Gig Images
const gigImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'gig_images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }]
  }
});

// Configure storage for Order Deliveries (multiple file types)
const deliveryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'order_deliveries',
    resource_type: 'raw',
    allowed_formats: ['zip', 'pdf', 'doc', 'docx', 'txt', 'png', 'jpg', 'jpeg'],
    use_filename: true,
    unique_filename: true
  }
});

// Configure storage for Message Attachments (images/videos/documents)
const messageAttachmentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'message_attachments',
    resource_type: 'raw',
    allowed_formats: [
      'png', 'jpg', 'jpeg', 'gif', 'webp',
      'mp4', 'mov', 'avi',
      'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xlsx', 'zip', 'txt'
    ],
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

// Initialize Multer for Gig Images
const uploadGigImages = multer({
  storage: gigImageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per image
  fileFilter: fileFilter
});

// Initialize Multer for Deliveries
const uploadDelivery = multer({
  storage: deliveryStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB total per file
  fileFilter: fileFilter
});

// Initialize Multer for Message Attachments
const uploadMessageAttachments = multer({
  storage: messageAttachmentStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: fileFilter
});

module.exports = {
  uploadPhoto,
  uploadDocument,
  uploadGigImages,
  uploadDelivery,
  uploadMessageAttachments
};
