const Item = require('../models/Item');

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('userId', 'name email');
    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching items',
    });
  }
};

// Get item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('userId', 'name email');

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching item' });
  }
};

// Create item
exports.createItem = async (req, res) => {
  try {
    const { itemName, description, type, location, date, contactInfo } = req.body;

    // Validation
    if (!itemName || !description || !type || !location || !date || !contactInfo) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const item = await Item.create({
      itemName,
      description,
      type,
      location,
      date,
      contactInfo,
      userId: req.user.id, // Assuming auth middleware attaches user to req
    });

    // Populate the userId field before returning
    await item.populate('userId', 'name email');

    res.status(201).json({ success: true, message: 'Item created successfully', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error creating item' });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    // AUTH CHECK: Ensure only the owner can update
    if (item.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this entry' });
    }

    // Ensure a user cannot reassign the item to another user
    const updateData = { ...req.body };
    delete updateData.userId;

    item = await Item.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate('userId', 'name email');

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error updating item' });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    // AUTH CHECK: Ensure only the owner can delete
    if (item.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this entry' });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error deleting item' });
  }
};

// Search items (Updated to use Regex for partial matching)
exports.searchItems = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Please provide a search term' });
    }

    // Escape regex characters to prevent database errors or ReDoS attacks
    const safeName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Search in both itemName and description, case-insensitive
    const items = await Item.find({
      $or: [
        { itemName: { $regex: safeName, $options: 'i' } },
        { description: { $regex: safeName, $options: 'i' } }
      ]
    }).populate('userId', 'name email');

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error searching items' });
  }
};