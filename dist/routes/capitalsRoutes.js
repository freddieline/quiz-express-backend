"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const capitalsController_1 = __importDefault(require("../controllers/capitalsController"));
const router = (0, express_1.Router)();
router.get('/', capitalsController_1.default.getAllCapitals);
exports.default = router;
