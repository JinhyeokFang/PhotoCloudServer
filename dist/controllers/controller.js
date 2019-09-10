"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    ResponseSuccess(res, body) {
        res.json({
            status: "Success",
            body
        });
    }
    ResponseBadRequest(res, body) {
        res.status(400).json({
            status: "Bad Request",
            body
        });
    }
    ResponseUnauthorized(res, body) {
        res.status(401).json({
            status: "Unauthorized",
            body
        });
    }
    ResponseForbidden(res, body) {
        res.status(403).json({
            status: "Forbidden",
            body
        });
    }
    ResponseNotFound(res, body) {
        res.status(404).json({
            status: "Not Found",
            body
        });
    }
    ResponseInternalServerError(res, body) {
        res.status(500).json({
            status: "Internal Server Error",
            body
        });
    }
}
exports.default = Controller;
