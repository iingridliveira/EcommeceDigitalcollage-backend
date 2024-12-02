import jwt from "jsonwebtoken";

const tokenCheck = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, "your-secret-key");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export { tokenCheck };
