const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const facebookOAuthController = async (req, res) => {
  const code = req.query.code;

  try {
    // 1. Exchange code for access token
    const tokenRes = await axios.get(
      `https://graph.facebook.com/v12.0/oauth/access_token`,
      {
        params: {
          client_id: process.env.FACEBOOK_CLIENT_ID,
          client_secret: process.env.FACEBOOK_CLIENT_SECRET,
          redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
          code,
        },
      }
    );

    const access_token = tokenRes.data.access_token;

    // 2. Get user profile info
    const profileRes = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email&access_token=${access_token}`
    );

    const { id, name, email } = profileRes.data;

    // 3. Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        username: name,
        email,
        password: id, // fake password for OAuth
      });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5. Respond with token
    res.json({ token });
  } catch (err) {
    console.error("Facebook OAuth Error:", err.response?.data || err.message || err);
    res.status(500).json({ msg: "Facebook login failed" });
  }
  
};

module.exports = facebookOAuthController;
