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

exports.getGigs = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, deliveryTime, rating, sort = 'latest', page = 1, limit = 10 } = req.query;

    // Only show active gigs
    const filter = { status: 'active' };

    if (category) filter.category = category;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (deliveryTime) {
      filter.deliveryTime = { $lte: Number(deliveryTime) };
    }

    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    let query = Gig.find(filter).populate('sellerId', 'name photo'); // Populate seller name/photo for cards

    if (q) query = query.find({ $text: { $search: q } });

    if (sort === 'price_asc') query = query.sort({ price: 1 });
    else if (sort === 'price_desc') query = query.sort({ price: -1 });
    else if (sort === 'rating') query = query.sort({ rating: -1 });
    else query = query.sort({ createdAt: -1 });

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      query.skip(skip).limit(Number(limit)).exec(),
      Gig.countDocuments(filter)
    ]);
    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch {
    res.status(500).json({ message: 'Failed to fetch gigs' });
  }
};

exports.getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('sellerId', 'name');
    if (!gig) return res.status(404).json({ message: 'Gig not found' });
    res.json(gig);
  } catch {
    res.status(400).json({ message: 'Invalid id' });
  }
};

exports.uploadGigCover = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const gig = await Gig.findOne({ _id: id, sellerId: req.user.userId });
    if (!gig) return res.status(404).json({ message: 'Gig not found' });
    const url = req.file.path;
    if (!Array.isArray(gig.images)) gig.images = [];
    if (gig.images.length) {
      gig.images[0] = url;
    } else {
      gig.images.push(url);
    }
    await gig.save();
    res.json({ cover: url, gig });
  } catch {
    res.status(500).json({ message: 'Failed to upload cover' });
  }
};
