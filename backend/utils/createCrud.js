import asyncHandler from './asyncHandler.js';

// Ek hi jagah se kisi bhi Model ke liye 5 standard handlers banata hai:
// getAll, getOne, create, update, remove
const createCrud = (Model, name) => ({
  getAll: asyncHandler(async (req, res) => {
    const items = await Model.find().sort({ createdAt: -1 });
    res.json(items);
  }),

  getOne: asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error(`${name} nahi mila`);
    }
    res.json(item);
  }),

  create: asyncHandler(async (req, res) => {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  }),

  update: asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!item) {
      res.status(404);
      throw new Error(`${name} nahi mila`);
    }
    res.json(item);
  }),

  remove: asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error(`${name} nahi mila`);
    }
    res.json({ message: `${name} delete ho gaya`, id: req.params.id });
  })
});

export default createCrud;
