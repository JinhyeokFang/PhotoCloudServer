"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
exports.default = multer_1.default({
    storage: multer_1.default.diskStorage({
        destination: config_1.default.fileDir.default,
        filename: (req, file, cb) => cb(null, new Date().valueOf() + path_1.default.extname(file.originalname))
    }),
});
