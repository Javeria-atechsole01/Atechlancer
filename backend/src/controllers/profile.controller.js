const Profile = require('../models/Profile');
const { User } = require('../models/User');

/**
 * @desc    Create or update user profile
 * @route   POST /api/profile
 * @access  Private
 */
const createOrUpdateProfile = async (req, res) => {
  try {
    const { bio, skills, education, experience, portfolioLinks } = req.body;
    const userId = req.user.userId;

    const profileFields = {
      userId,
      bio,
      skills: Array.isArray(skills) ? skills : skills ? skills.split(',').map(skill => skill.trim()) : [],
      education,
      experience,
      portfolioLinks: Array.isArray(portfolioLinks) ? portfolioLinks : portfolioLinks ? portfolioLinks.split(',').map(link => link.trim()) : []
    };

    let profile = await Profile.findOne({ userId });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { userId },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * @desc    Get current user's profile
 * @route   GET /api/profile/me
 * @access  Private
 */
const getOwnProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.userId }).populate(
      'userId',
      'name email role'
    );

    if (!profile) {
      return res.status(404).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * @desc    Get profile by user ID
 * @route   GET /api/profile/:userId
 * @access  Public
 */
const getPublicProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.params.userId
    }).populate('userId', 'name role');

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
};

/**
 * @desc    Upload profile photo
 * @route   POST /api/profile/upload-photo
 * @access  Private
 */
const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const userId = req.user.userId;
    const photoUrl = req.file.path;

    let profile = await Profile.findOne({ userId });

    if (profile) {
      profile.photo = photoUrl;
      await profile.save();
    } else {
      // Create profile if it doesn't exist just for the photo
      profile = new Profile({
        userId,
        photo: photoUrl
      });
      await profile.save();
    }

    res.json({ photo: photoUrl, profile });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * @desc    Upload document/project
 * @route   POST /api/profile/upload-doc
 * @access  Private
 */
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const userId = req.user.userId;
    const docUrl = req.file.path;

    let profile = await Profile.findOne({ userId });

    if (profile) {
      profile.documents.push(docUrl);
      await profile.save();
    } else {
      // Create profile if it doesn't exist
      profile = new Profile({
        userId,
        documents: [docUrl]
      });
      await profile.save();
    }

    res.json({ documents: profile.documents, profile });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createOrUpdateProfile,
  getOwnProfile,
  getPublicProfile,
  uploadProfilePhoto,
  uploadDocument
};
