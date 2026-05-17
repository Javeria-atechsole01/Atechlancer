/**
 * Check if the file is an allowed image type.
 * @param {Object} file - Multer file object
 * @returns {boolean}
 */
const isImage = (file) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  return allowedMimeTypes.includes(file.mimetype);
};

/**
 * Check if the file is an allowed document type.
 * @param {Object} file - Multer file object
 * @returns {boolean}
 */
const isDocument = (file) => {
  const allowedMimeTypes = ['application/pdf'];
  return allowedMimeTypes.includes(file.mimetype);
};

/**
 * File filter for Multer
 * @param {Object} req - Express request object
 * @param {Object} file - Multer file object
 * @param {Function} cb - Callback function
 */
const fileFilter = (req, file, cb) => {
  if (isImage(file) || isDocument(file)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and PDF are allowed.'), false);
  }
};

module.exports = {
  isImage,
  isDocument,
  fileFilter
};
