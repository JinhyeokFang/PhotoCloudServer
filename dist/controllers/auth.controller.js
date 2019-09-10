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
const jwt_1 = require("../utils/jwt");
const controller_1 = __importDefault(require("./controller"));
const user_model_1 = __importDefault(require("../models/user.model"));
class AuthController extends controller_1.default {
    login(req, res) {
        const _super = Object.create(null, {
            ResponseNotFound: { get: () => super.ResponseNotFound },
            ResponseInternalServerError: { get: () => super.ResponseInternalServerError },
            ResponseSuccess: { get: () => super.ResponseSuccess }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let { username, password } = req.body;
            let result = yield user_model_1.default.login(username, password);
            if (result.err == "the user not found") {
                _super.ResponseNotFound.call(this, res, {});
            }
            else if (result.err) {
                _super.ResponseInternalServerError.call(this, res, { err: result.err });
            }
            else {
                _super.ResponseSuccess.call(this, res, { token: jwt_1.encodeToken({
                        username: username,
                        time: new Date().getTime()
                    }) });
            }
        });
    }
    register(req, res) {
        const _super = Object.create(null, {
            ResponseForbidden: { get: () => super.ResponseForbidden },
            ResponseInternalServerError: { get: () => super.ResponseInternalServerError },
            ResponseSuccess: { get: () => super.ResponseSuccess }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let { username, password } = req.body;
            let result = yield user_model_1.default.register(username, password);
            if (result.err == "the user already exist.") {
                _super.ResponseForbidden.call(this, res, { err: result.err });
            }
            else if (result.err) {
                _super.ResponseInternalServerError.call(this, res, { err: result.err });
            }
            else {
                _super.ResponseSuccess.call(this, res, { token: jwt_1.encodeToken({
                        username: username,
                        time: new Date().getTime()
                    }) });
            }
        });
    }
}
exports.default = new AuthController();
