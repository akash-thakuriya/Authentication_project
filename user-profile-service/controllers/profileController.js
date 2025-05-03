const User = require("../models/User");

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.json(user);
};

const updateProfile = async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.json(user);
};

module.exports = { getProfile, updateProfile };
