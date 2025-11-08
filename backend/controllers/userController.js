import User from '../models/User.js';
import { uploadProfilePhoto, uploadBannerPhoto } from '../utils/uploadHelper.js';

// @desc    Get user profile by ID
// @route   GET /api/users/:id
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('connections', 'name email profilePhoto headline');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile (basic info)
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.headline = req.body.headline !== undefined ? req.body.headline : user.headline;
      user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
      user.location = req.body.location !== undefined ? req.body.location : user.location;
      user.website = req.body.website !== undefined ? req.body.website : user.website;
      user.profileImage = req.body.profileImage !== undefined ? req.body.profileImage : user.profileImage;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        headline: updatedUser.headline,
        bio: updatedUser.bio,
        location: updatedUser.location,
        website: updatedUser.website,
        profilePhoto: updatedUser.profilePhoto,
        bannerPhoto: updatedUser.bannerPhoto,
        profileImage: updatedUser.profileImage
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload profile photo
// @route   POST /api/users/profile-photo
// @access  Private
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Upload to Cloudinary
    const result = await uploadProfilePhoto(req.file.buffer);

    // Update user profile
    const user = await User.findById(req.user._id);
    user.profilePhoto = result.secure_url;
    await user.save();

    res.json({
      success: true,
      message: 'Profile photo uploaded successfully',
      profilePhoto: result.secure_url
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload banner photo
// @route   POST /api/users/banner-photo
// @access  Private
export const uploadBannerPicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Upload to Cloudinary
    const result = await uploadBannerPhoto(req.file.buffer);

    // Update user profile
    const user = await User.findById(req.user._id);
    user.bannerPhoto = result.secure_url;
    await user.save();

    res.json({
      success: true,
      message: 'Banner photo uploaded successfully',
      bannerPhoto: result.secure_url
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add/Update skills
// @route   PUT /api/users/skills
// @access  Private
export const updateSkills = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills)) {
      return res.status(400).json({ message: 'Skills must be an array' });
    }

    const user = await User.findById(req.user._id);
    user.skills = skills;
    await user.save();

    res.json({
      success: true,
      message: 'Skills updated successfully',
      skills: user.skills
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add experience
// @route   POST /api/users/experience
// @access  Private
export const addExperience = async (req, res) => {
  try {
    const { company, position, location, startDate, endDate, current, description } = req.body;

    const user = await User.findById(req.user._id);

    user.experience.unshift({
      company,
      position,
      location,
      startDate,
      endDate: current ? null : endDate,
      current,
      description
    });

    await user.save();

    res.json({
      success: true,
      message: 'Experience added successfully',
      experience: user.experience
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update experience
// @route   PUT /api/users/experience/:expId
// @access  Private
export const updateExperience = async (req, res) => {
  try {
    const { expId } = req.params;
    const { company, position, location, startDate, endDate, current, description } = req.body;

    const user = await User.findById(req.user._id);
    const experience = user.experience.id(expId);

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    experience.company = company || experience.company;
    experience.position = position || experience.position;
    experience.location = location !== undefined ? location : experience.location;
    experience.startDate = startDate || experience.startDate;
    experience.endDate = current ? null : (endDate || experience.endDate);
    experience.current = current !== undefined ? current : experience.current;
    experience.description = description !== undefined ? description : experience.description;

    await user.save();

    res.json({
      success: true,
      message: 'Experience updated successfully',
      experience: user.experience
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete experience
// @route   DELETE /api/users/experience/:expId
// @access  Private
export const deleteExperience = async (req, res) => {
  try {
    const { expId } = req.params;

    const user = await User.findById(req.user._id);
    user.experience = user.experience.filter(exp => exp._id.toString() !== expId);

    await user.save();

    res.json({
      success: true,
      message: 'Experience deleted successfully',
      experience: user.experience
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add education
// @route   POST /api/users/education
// @access  Private
export const addEducation = async (req, res) => {
  try {
    const { school, degree, fieldOfStudy, startDate, endDate, current, description } = req.body;

    const user = await User.findById(req.user._id);

    user.education.unshift({
      school,
      degree,
      fieldOfStudy,
      startDate,
      endDate: current ? null : endDate,
      current,
      description
    });

    await user.save();

    res.json({
      success: true,
      message: 'Education added successfully',
      education: user.education
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update education
// @route   PUT /api/users/education/:eduId
// @access  Private
export const updateEducation = async (req, res) => {
  try {
    const { eduId } = req.params;
    const { school, degree, fieldOfStudy, startDate, endDate, current, description } = req.body;

    const user = await User.findById(req.user._id);
    const education = user.education.id(eduId);

    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }

    education.school = school || education.school;
    education.degree = degree || education.degree;
    education.fieldOfStudy = fieldOfStudy !== undefined ? fieldOfStudy : education.fieldOfStudy;
    education.startDate = startDate || education.startDate;
    education.endDate = current ? null : (endDate || education.endDate);
    education.current = current !== undefined ? current : education.current;
    education.description = description !== undefined ? description : education.description;

    await user.save();

    res.json({
      success: true,
      message: 'Education updated successfully',
      education: user.education
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete education
// @route   DELETE /api/users/education/:eduId
// @access  Private
export const deleteEducation = async (req, res) => {
  try {
    const { eduId } = req.params;

    const user = await User.findById(req.user._id);
    user.education = user.education.filter(edu => edu._id.toString() !== eduId);

    await user.save();

    res.json({
      success: true,
      message: 'Education deleted successfully',
      education: user.education
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
