"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
class IndexController extends controller_1.default {
    index(req, res) {
        // res.render('index');
    }
}
exports.default = new IndexController();
