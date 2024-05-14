const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    const decoded = jwt.verify(
      token,
      process.env.jwt_secret,
      (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token Expired" });

        req.body.user_id = decoded.userId;

        next();
      }
    );
  } else res.status(401).json({ message: "Token Expired" });
};
module.exports = verifyToken;
