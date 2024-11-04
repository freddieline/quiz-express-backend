"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const corsMiddleware_1 = __importDefault(require("./middleware/corsMiddleware"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(
//   OpenApiValidator.middleware({
//     apiSpec: './openapi.json',
//     validateRequests: true, // (default)
//     validateResponses: true, // false by default
//   }),
// );
const PORT = process.env.PORT || 3001;
// add middleware
app.use(corsMiddleware_1.default);
// Routes
app.use('/api', routes_1.default);
// Error handling middleware
app.use(((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something broke!', error: err.message });
}));
app.listen(PORT, () => {
    console.log("Server is running");
});
