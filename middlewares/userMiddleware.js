const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });

    try {
      const decoded = jwt.verify(token, process.env.JWT);
      req.user = { id: decoded.id, email: decoded.email }; 
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  };

