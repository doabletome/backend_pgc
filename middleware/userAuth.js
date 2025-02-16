import jwt from "jsonwebtoken";

const secret_key = "Himanshu";

export function userAuth(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "invalid token" });
      }
      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    console.error("JWT Authentication Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
