const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const googleOAuthController = async (req, res) => {
  const code = req.query.code;

  try {
    // 1. Exchange code for tokens
    const { data: tokenResponse } = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const { access_token, id_token } = tokenResponse;

    // 2. Use id_token to get user info
    const { data: userInfo } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );

    const { sub, email, name } = userInfo;

    // 3. Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: name,
        email,
        password: sub, // fake password, since Google manages it
      });
    }

    // 4. Generate your own JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5. Return the token or redirect with it
    res.json({ token }); // Or redirect with token to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Google login failed" });
  }
};

module.exports = googleOAuthController;
