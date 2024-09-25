"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const capitalsRoutes_1 = __importDefault(require("./capitalsRoutes"));
const router = (0, express_1.Router)();
// All user-related routes will be prefixed with `/api/users`
router.use('/capitals', capitalsRoutes_1.default);
exports.default = router;
