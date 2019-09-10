"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const multer_1 = __importDefault(require("../utils/multer"));
const router = express_1.Router();
router.get('/image', user_controller_1.default.showImages);
router.post('/image', multer_1.default.single('file'), user_controller_1.default.addImage);
router.delete('/image', user_controller_1.default.removeImage);
exports.default = router;
