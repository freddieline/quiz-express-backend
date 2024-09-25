"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Create a CORS middleware function
function corsMiddleware(req, res, next) {
    // Allow requests from any origin (adjust as needed)
    const allowedOrigins = ['http://localhost:3000', 'https://your-frontend-domain.com']; // Replace with your allowed origins
    // Check if the origin is allowed
    res.setHeader('Access-Control-Allow-Origin', "*");
    // Allow common HTTP methods and headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Enable preflight requests for OPTIONS requests
    if (req.method === 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
}
exports.default = corsMiddleware;
