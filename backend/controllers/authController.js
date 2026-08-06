const User = require('../models/User');

const sanitizeUser = (user) => {
  return {
    id: user._id || user.id,
    name: user.name,
    email: user.email,
    company: user.company,
    role: user.role,
    avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}`
  };
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, company, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.'
      });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      company: company || 'TalentLync Workspace',
      role: role || 'Talent Lead'
    });

    const userData = sanitizeUser(user);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token: `token_${user.id}`,
      user: userData
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your email and password.'
      });
    }

    let user = await User.findByEmail(email);

    // Auto-create demo account on initial demo sign in
    if (!user && (email.toLowerCase() === 'demo@talentlync.io' || email.toLowerCase() === 'admin@talentlync.io')) {
      user = await User.create({
        name: email.startsWith('demo') ? 'Demo Recruiter' : 'Talent Lead',
        email: email.toLowerCase(),
        password: password,
        company: 'TalentLync Global',
        role: 'Senior Talent Partner'
      });
    }

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const userData = sanitizeUser(user);

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      token: `token_${user.id}`,
      user: userData
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer token_')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access.'
      });
    }

    const userId = authHeader.replace('Bearer token_', '');
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    return res.status(200).json({
      success: true,
      user: sanitizeUser(user)
    });
  } catch (error) {
    next(error);
  }
};
