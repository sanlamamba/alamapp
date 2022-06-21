require("dotenv").config();
import jwt from "jsonwebtoken";

const requireToken = (req, res, next) => {
  // console.log(req.body);
  const token =
    req.headers["x-access-token"] ||
    req.headers["authorization"] ||
    req.body.token;
  if (token) {
    // decode with secret key
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};

export default requireToken;
