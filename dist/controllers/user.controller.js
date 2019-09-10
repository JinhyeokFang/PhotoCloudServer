"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../utils/jwt");
class UserController extends controller_1.default {
    addImage(req, res) {
        const _super = Object.create(null, {
            ResponseBadRequest: { get: () => super.ResponseBadRequest },
            ResponseUnauthorized: { get: () => super.ResponseUnauthorized },
            ResponseNotFound: { get: () => super.ResponseNotFound },
            ResponseInternalServerError: { get: () => super.ResponseInternalServerError },
            ResponseSuccess: { get: () => super.ResponseSuccess }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let { token } = req.body;
            if (!req.file) {
                _super.ResponseBadRequest.call(this, res, { err: "file not found" });
                return;
            }
            let { filename } = req.file;
            if (!jwt_1.isVaildToken(token)) {
                _super.ResponseUnauthorized.call(this, res, { err: "token is invalid" });
                return;
            }
            let result = yield user_model_1.default.uploadPhoto(jwt_1.decodeToken(token).username, filename);
            if (result.err == "the user not found") {
                _super.ResponseNotFound.call(this, res, { err: result.err });
            }
            else if (result.err) {
                _super.ResponseInternalServerError.call(this, res, { err: result.err });
            }
            else {
                _super.ResponseSuccess.call(this, res, {});
            }
        });
    }
    showImages(req, res) {
        const _super = Object.create(null, {
            ResponseUnauthorized: { get: () => super.ResponseUnauthorized },
            ResponseNotFound: { get: () => super.ResponseNotFound },
            ResponseInternalServerError: { get: () => super.ResponseInternalServerError },
            ResponseSuccess: { get: () => super.ResponseSuccess }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let { token } = req.body;
            if (!jwt_1.isVaildToken(token)) {
                _super.ResponseUnauthorized.call(this, res, { err: "token is invalid" });
                return;
            }
            let result = yield user_model_1.default.showPhotos(jwt_1.decodeToken(token).username);
            if (result.err == "the user not found") {
                _super.ResponseNotFound.call(this, res, { err: result.err });
            }
            else if (result.err) {
                _super.ResponseInternalServerError.call(this, res, { err: result.err });
            }
            else {
                _super.ResponseSuccess.call(this, res, { photos: result.data });
            }
        });
    }
    removeImage(req, res) {
        const _super = Object.create(null, {
            ResponseUnauthorized: { get: () => super.ResponseUnauthorized },
            ResponseBadRequest: { get: () => super.ResponseBadRequest },
            ResponseNotFound: { get: () => super.ResponseNotFound },
            ResponseInternalServerError: { get: () => super.ResponseInternalServerError },
            ResponseSuccess: { get: () => super.ResponseSuccess }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let { token, imageDate } = req.body;
            if (!jwt_1.isVaildToken(token)) {
                _super.ResponseUnauthorized.call(this, res, { err: "token is invalid" });
                return;
            }
            let result = yield user_model_1.default.removeImage(jwt_1.decodeToken(token).username, imageDate);
            if (result.err == "the user not found") {
                _super.ResponseBadRequest.call(this, res, { err: result.err });
            }
            else if (result.err == "the image not found") {
                _super.ResponseNotFound.call(this, res, { err: result.err });
            }
            else if (result.err) {
                _super.ResponseInternalServerError.call(this, res, { err: result.err });
            }
            else {
                _super.ResponseSuccess.call(this, res, {});
            }
        });
    }
}
exports.default = new UserController();
