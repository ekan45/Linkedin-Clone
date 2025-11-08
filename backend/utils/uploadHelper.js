import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

/**
 * Upload image to Cloudinary from buffer
 * @param {Buffer} buffer - Image buffer
 * @param {String} folder - Cloudinary folder name
 * @param {String} publicId - Optional public ID
 * @returns {Promise} - Upload result
 */
export const uploadToCloudinary = (buffer, folder = 'linkedin-clone', publicId = null) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
      uploadOptions.overwrite = true;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Create readable stream from buffer
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

/**
 * Delete image from Cloudinary
 * @param {String} publicId - Cloudinary public ID
 * @returns {Promise} - Delete result
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Error deleting from Cloudinary: ${error.message}`);
  }
};

/**
 * Upload profile photo with specific transformations
 */
export const uploadProfilePhoto = async (buffer) => {
  return uploadToCloudinary(buffer, 'linkedin-clone/profiles');
};

/**
 * Upload banner photo with specific transformations
 */
export const uploadBannerPhoto = async (buffer) => {
  return uploadToCloudinary(buffer, 'linkedin-clone/banners');
};

/**
 * Upload post image
 */
export const uploadPostImage = async (buffer) => {
  return uploadToCloudinary(buffer, 'linkedin-clone/posts');
};

/**
 * Upload company logo
 */
export const uploadCompanyLogo = async (buffer) => {
  return uploadToCloudinary(buffer, 'linkedin-clone/companies');
};
