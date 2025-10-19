// controllers/labController.js
const Lab = require("../models/Lab");
exports.createLab = async (req, res) => {
try {
const lab = await Lab.create({ ...req.body, teacher: req.user.
_id });
res.status(201).json(lab);
} catch(err) {
res.status(400).json({ message: err.message });
}
};
exports.getLabs = async (req, res) => {
try {
const labs = await Lab.find().sort({ createdAt:-1 });
res.json(labs);
} catch(err) {
res.status(400).json({ message: err.message });
}
};
// ... other handlers