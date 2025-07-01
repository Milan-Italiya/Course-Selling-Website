import jwt from "jsonwebtoken";

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD);
        req.userId = decoded.id; // Attach the decoded token to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        console.log("Invalid token or expired token", error);
        return res.status(401).json({ message: "Invalid token or expired token" });
    }
}

export default userMiddleware;