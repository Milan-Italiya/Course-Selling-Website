import jwt from "jsonwebtoken";

const getTokenFromRequest = (req) => {
  let token = null;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token && req.cookies?.jwt_token) {
    token = req.cookies.jwt_token;
  }

  return token;
};

export const optionalCourseAuth = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userId = decoded.id || decoded._id || decoded.userId;

    if (userId) {
      req.user = {
        _id: userId,
      };
    }

    next();
  } catch (error) {
    console.log("Optional course auth error:", error.message);
    next();
  }
};

export const requireCourseAuth = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userId = decoded.id || decoded._id || decoded.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload.",
      });
    }

    req.user = {
      _id: userId,
    };

    next();
  } catch (error) {
    console.log("Require course auth error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};