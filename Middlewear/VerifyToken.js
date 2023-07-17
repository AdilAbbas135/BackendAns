var jwt = require("jsonwebtoken");

const VerifyToken = (req, res, next) => {
  // GET USER FROM TOKEN AND GET ID OF THE USER AND SHOW HIS DATA
  const token = req.header("token");
  if (!token) {
    res.status(401).json({ error: "Access Denied" });
  } else {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (data) {
        req.user = data;
        // req.isTokenVerified = true;
        next();
      } else {
        return res.status(401).json({ error: "Access Denied" });
      }
    } catch (error) {
      return res.status(400).json({ error: "Session Expired Login Again" });
    }
  }
};
module.exports = VerifyToken;
