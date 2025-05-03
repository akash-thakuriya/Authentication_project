const express = require("express");
const router = express.Router();
const { register, login } = require('../controllers/authController');  // Fix path

router.post("/register", register);
router.post("/login", login);

//google
router.get("/google", (req, res) => {
    const redirectURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
    res.redirect(redirectURL);
  });
  
  router.get("/google/callback", require("../controllers/googleOAuthController"));
  

  //facebook

  router.get("/facebook", (req, res) => {
    const redirectURL = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&scope=email`;
    res.redirect(redirectURL);
  });
  
  router.get("/facebook/callback", require("../controllers/facebookOAuthController"));
  

module.exports = router;