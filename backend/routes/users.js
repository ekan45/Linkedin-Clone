import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  uploadBannerPicture,
  updateSkills,
  addExperience,
  updateExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  deleteEducation
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Profile routes
router.get('/:id', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Image upload routes
router.post('/profile-photo', protect, upload.single('image'), uploadProfilePicture);
router.post('/banner-photo', protect, upload.single('image'), uploadBannerPicture);

// Skills routes
router.put('/skills', protect, updateSkills);

// Experience routes
router.post('/experience', protect, addExperience);
router.put('/experience/:expId', protect, updateExperience);
router.delete('/experience/:expId', protect, deleteExperience);

// Education routes
router.post('/education', protect, addEducation);
router.put('/education/:eduId', protect, updateEducation);
router.delete('/education/:eduId', protect, deleteEducation);

export default router;
