const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        category: {
            type: String, // e.g., 'Web Development', 'AI/ML', 'Design'
            required: true
        },
        summary: {
            type: String, // Short tagline for cards
            required: true,
            maxlength: 200
        },
        tags: {
            type: [String],
            default: []
        },

        // Content
        images: {
            type: [String], // Array of image URLs
            default: []
        },
        files: [{
            name: String,
            url: String,
            type: String // 'pdf', 'zip', etc.
        }],
        videoUrl: { type: String }, // YouTube/Vimeo
        repoUrl: { type: String }, // GitHub/GitLab
        liveUrl: { type: String }, // Deployed link

        // Detailed Content (Rich Text)
        description: { type: String },
        problemStatement: { type: String },
        solutionOverview: { type: String },
        techStack: { type: String },
        challenges: { type: String },

        // Metrics & Interactions
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        views: { type: Number, default: 0 },

        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft'
        },
        visibility: {
            type: String,
            enum: ['public', 'private'],
            default: 'public'
        }
    },
    { timestamps: true }
);

// Indexes for searching/filtering
ProjectSchema.index({ title: 'text', summary: 'text', tags: 'text' });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ status: 1 });

module.exports = mongoose.model('Project', ProjectSchema);
