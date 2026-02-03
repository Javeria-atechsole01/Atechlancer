const Gig = require('../models/Gig');
const mongoose = require('mongoose');

exports.createGig = async (req, res) => {
  try {
    const { title, description, price, category, images, tags, deliveryTime, revisions, features, faqs } = req.body;

    // Default status: 'active' if admin, else 'pending_approval'
    const status = req.user.role === 'admin' ? 'active' : 'pending_approval';

    const gig = await Gig.create({
      sellerId: req.user.userId,
      title,
      description,
      price,
      category,
      images: images || [],
      tags: tags || [],
      deliveryTime,
      revisions,
      features: features || [],
      faqs: faqs || [],
      status
    });
    res.status(201).json(gig);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create gig' });
  }
};

exports.updateGig = async (req, res) => {
  try {
    const gig = await Gig.findOneAndUpdate(
      { _id: req.params.id, sellerId: req.user.userId },
      { $set: req.body },
      { new: true }
    );
    if (!gig) return res.status(404).json({ message: 'Gig not found' });
    res.json(gig);
  } catch {
    res.status(400).json({ message: 'Failed to update gig' });
  }
};

exports.deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findOneAndDelete({
      _id: req.params.id,
      sellerId: req.user.userId
    });
    if (!gig) return res.status(404).json({ message: 'Gig not found' });
    res.json({ success: true });
  } catch {
    res.status(400).json({ message: 'Failed to delete gig' });
  }
};

exports.getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ sellerId: req.user.userId }).sort({ createdAt: -1 });
    res.json(gigs);
  } catch {
    res.status(500).json({ message: 'Failed to fetch gigs' });
  }
};

exports.getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('sellerId', 'name photo bio location rating reviewsCount');
    if (!gig) return res.status(404).json({ message: 'Gig not found' });
    res.json(gig);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch gig' });
  }
};

exports.uploadGigCover = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    
    const gig = await Gig.findOne({ _id: req.params.id, sellerId: req.user.userId });
    if (!gig) return res.status(404).json({ message: 'Gig not found' });
    
    // Add new image to the beginning (cover)
    gig.images.unshift(req.file.path);
    await gig.save();
    
    res.json(gig);
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload image' });
  }
};

const buildGigQuery = (queryParams) => {
  const { 
    search, 
    category, 
    minPrice, 
    maxPrice, 
    status 
  } = queryParams;

  const query = {};

  // 1. Text Search (Regex)
  if (search) {
    const searchRegex = new RegExp(search, 'i');
    query.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { tags: searchRegex }
    ];
  }

  // 2. Category Filter
  if (category) {
    query.category = category;
  }

  // 3. Price Range Filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // 4. Status Filter (Default to active if not provided)
  if (status) {
    query.status = status;
  } else {
    query.status = 'active';
  }

  return query;
};

exports.getGigs = async (req, res) => {
  try {
    const { 
      sort = 'latest', 
      page = 1, 
      limit = 10 
    } = req.query;

    const query = buildGigQuery(req.query);

    // 5. Sorting
    let sortOptions = {};
    switch (sort) {
      case 'price_low':
        sortOptions = { price: 1 };
        break;
      case 'price_high':
        sortOptions = { price: -1 };
        break;
      case 'latest':
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    // 6. Pagination
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Execute Query
    const [results, total] = await Promise.all([
      Gig.find(query)
        .populate('sellerId', 'name photo')
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum),
      Gig.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      results,
      total,
      page: pageNum,
      totalPages
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch gigs' });
  }
};
