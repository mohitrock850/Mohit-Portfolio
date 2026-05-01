const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Validate that Cloudinary env vars are set
 */
const validateCloudinaryConfig = () => {
  const { cloud_name, api_key, api_secret } = cloudinary.config();
  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file.'
    );
  }
};

/**
 * Upload image from memory buffer to Cloudinary
 * @param {Buffer} buffer - file buffer
 * @param {String} folder - folder name in Cloudinary
 * @returns {Promise<Object>} Cloudinary response (url, public_id, etc.)
 */
const uploadToCloudinary = (buffer, folder = 'portfolio-projects') => {
  validateCloudinaryConfig();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) {
          console.error('[Cloudinary Upload Error]', error.message || error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  });
};

/**
 * Upload a raw file (PDF, etc.) from memory buffer to Cloudinary
 * @param {Buffer} buffer - file buffer
 * @param {String} folder - folder name in Cloudinary
 * @param {String} fileName - public_id / filename to use in Cloudinary
 * @returns {Promise<Object>} Cloudinary response
 */
const uploadRawToCloudinary = (buffer, folder = 'portfolio-resume', fileName = 'resume') => {
  validateCloudinaryConfig();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'raw',        // required for PDFs
        public_id: fileName,
        overwrite: true,             // always replace with latest
        flags: 'attachment',         // forces browser download instead of preview
      },
      (error, result) => {
        if (error) {
          console.error('[Cloudinary Raw Upload Error]', error.message || error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  });
};

/**
 * Delete a file from Cloudinary by its public_id
 * @param {String} publicId
 * @param {String} resourceType - 'image' | 'raw'
 */
const deleteFromCloudinary = async (publicId, resourceType = 'raw') => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (err) {
    console.warn('[Cloudinary Delete Warning]', err.message || err);
  }
};

module.exports = { uploadToCloudinary, uploadRawToCloudinary, deleteFromCloudinary };