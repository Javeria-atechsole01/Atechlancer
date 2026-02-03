const Profile = require('../models/Profile');
const { User } = require('../models/User');

/**
 * @desc    Create or update user profile
 * @route   POST /api/profile
 * @access  Private
 */
const createOrUpdateProfile = async (req, res) => {
  try {
    const {
      bio,
      title,
      location,
      skills,
      education,
      experience,
      projects,
      certifications,
      socialLinks
    } = req.body;

    const userId = req.user.userId;

    // Build profile object
    const profileFields = {
      userId,
      bio,
      title,
      location,
      skills: Array.isArray(skills) ? skills : [],
      education: Array.isArray(education) ? education : [],
      experience: Array.isArray(experience) ? experience : [],
      projects: Array.isArray(projects) ? projects : [],
      certifications: Array.isArray(certifications) ? certifications : [],
      socialLinks: typeof socialLinks === 'object' ? socialLinks : {}
    };

    let profile = await Profile.findOne({ userId });

    if (profile) {
      // Update by finding and saving (to trigger pre-save hook for completion score)
      // Alternatively, we define the fields and then save.

      // We manually update fields to ensure the pre('save') hook runs if we used save(), 
      // but findOneAndUpdate implies we might need to manually calc score or just use save() method.
      // Using findOne + save is better for the hook.

      profile.bio = bio !== undefined ? bio : profile.bio;
      profile.title = title !== undefined ? title : profile.title;
      profile.location = location !== undefined ? location : profile.location;
      profile.hourlyRate = hourlyRate !== undefined ? Number(hourlyRate) : profile.hourlyRate;
      if (skills) profile.skills = skills;
      if (education) profile.education = education;
      if (experience) profile.experience = experience;
      if (projects) profile.projects = projects;
      if (certifications) profile.certifications = certifications;
      if (socialLinks) profile.socialLinks = socialLinks;

      await profile.save();
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

/**
 * @desc    Get candidates (freelancers/students) with search and filters
 * @route   GET /api/profile/candidates
 * @access  Public
 */
const getCandidates = async (req, res) => {
  try {
    const { search, skills, minRate, maxRate, page = 1, limit = 12 } = req.query;

    const pipeline = [
      // 1. Lookup User details
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      // 2. Unwind user array (lookup returns an array)
      { $unwind: '$user' },
      
      // 3. Match only freelancers and students
      {
        $match: {
          'user.role': { $in: ['freelancer', 'student'] }
        }
      }
    ];

    // 4. Apply Search (Name, Title, Skills)
    if (search) {
      const regex = new RegExp(search, 'i');
      pipeline.push({
        $match: {
          $or: [
            { 'user.name': regex },
            { title: regex },
            { skills: regex }
          ]
        }
      });
    }

    // 5. Filter by Skills (Exact match or overlap)
    if (skills) {
      const skillsArray = skills.split(',').map(s => new RegExp(s.trim(), 'i'));
      pipeline.push({
        $match: {
          skills: { $in: skillsArray }
        }
      });
    }

    // 6. Filter by Hourly Rate
    if (minRate || maxRate) {
      const rateFilter = {};
      if (minRate) rateFilter.$gte = Number(minRate);
      if (maxRate) rateFilter.$lte = Number(maxRate);
      
      pipeline.push({
        $match: {
          hourlyRate: rateFilter
        }
      });
    }

    // 7. Pagination Facet
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    pipeline.push({
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [
          { $skip: skip },
          { $limit: limitNum },
          // Project only necessary fields
          {
            $project: {
              _id: 1,
              title: 1,
              hourlyRate: 1,
              skills: 1,
              location: 1,
              photo: 1,
              'user._id': 1,
              'user.name': 1,
              'user.email': 1,
              'user.role': 1
            }
          }
        ]
      }
    });

    const result = await Profile.aggregate(pipeline);
    
    const candidates = result[0].data;
    const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;

    res.json({
      results: candidates,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });

  } catch (err) {
    console.error('Get Candidates Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createOrUpdateProfile,
  getOwnProfile,
  getPublicProfile,
  uploadProfilePhoto,
  uploadDocument,
  getCandidates
};
