const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ======================
// USER SIGNUP
// ======================
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user" // ✅ explicitly set
    });

    res.status(201).json({
      message: "Signup successful"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// USER / ADMIN LOGIN
// ======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ INCLUDE ROLE IN JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ======================
// ADMIN LOGIN (FIXED ADMIN)
// ======================
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Match with .env credentials
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      message: "Invalid admin credentials"
    });
  }

  // Generate admin JWT
  const token = jwt.sign(
    {
      email,
      role: "admin"
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    role: "admin"
  });
};

// ======================
// GOOGLE LOGIN
// ======================
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    
    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { name, email, sub } = ticket.getPayload();
    
    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create a new user with Google details
      user = await User.create({
        name,
        email,
        password: await bcrypt.hash(sub, 10), // Google accounts don't use passwords, use 'sub' as dummy
        role: "user"
      });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Google authentication failed" });
  }
};

