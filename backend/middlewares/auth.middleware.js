import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); // Await the user lookup
    if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });

    req.user = user; // Now req.user is the actual user object
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid Token' });
  }
};