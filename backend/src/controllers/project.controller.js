const Project = require('../models/Project');

// Create Project
exports.createProject = async (req, res) => {
    try {
        const project = await Project.create({
            ...req.body,
            ownerId: req.user.userId
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create project', error: error.message });
    }
};

// Update Project
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.params.id, ownerId: req.user.userId },
            { $set: req.body },
            { new: true }
        );
        if (!project) return res.status(404).json({ message: 'Project not found or unauthorized' });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update project' });
    }
};

// Get All Public Projects (Hub)
exports.getProjects = async (req, res) => {
    try {
        const { category, tags, search, sort = 'newest' } = req.query;
        let query = { status: 'published', visibility: 'public' };

        if (category) query.category = category;
        if (tags) query.tags = { $in: tags.split(',') };
        if (search) {
            query.$text = { $search: search };
        }

        let sortOption = { createdAt: -1 };
        if (sort === 'popular') sortOption = { views: -1, likesCount: -1 }; // Needs aggregation for likes count usually, but keeping simple

        // Standard find doesn't sort by virtual 'likes.length', effectively we sort by views for popular now
        // A better approach for likes sorting would be aggregation, but let's stick to simple mongoose for MVP

        const projects = await Project.find(query)
            .populate('ownerId', 'name photo title')
            .sort(sortOption)
            .limit(50); // Pagination recommended later

        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
};

// Get Single Project
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('ownerId', 'name photo title bio location');
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Increment views
        project.views += 1;
        await project.save({ timestamps: false }); // Don't update updatedAt on view

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch project' });
    }
};

// Toggle Like
exports.likeProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const userId = req.user.userId;
        const isLiked = project.likes.includes(userId);

        if (isLiked) {
            project.likes.pull(userId);
        } else {
            project.likes.push(userId);
        }

        await project.save();
        res.json({ likes: project.likes.length, isLiked: !isLiked });
    } catch (error) {
        res.status(500).json({ message: 'Failed to like project' });
    }
};

// Get My Projects (Student Dashboard)
exports.getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({ ownerId: req.user.userId }).sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch your projects' });
    }
};
