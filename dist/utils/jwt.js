"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_simple_1 = require("jwt-simple");
var encodeToken = function (data) {
    return jwt_simple_1.encode(data, "SECRET_KEY");
};
exports.encodeToken = encodeToken;
var decodeToken = function (token) {
    try {
        let decoded = jwt_simple_1.decode(token, "SECRET_KEY");
        return decoded;
    }
    catch (_a) {
        return null;
    }
};
exports.decodeToken = decodeToken;
var isVaildToken = function (token) {
    let decodedToken = decodeToken(token);
    if (decodedToken == null)
        return false;
    if (decodedToken.time == undefined)
        return false;
    if (new Date().getTime() - decodedToken.time > 1000 * 60 * 60 * 24)
        return false;
    return true;
};
exports.isVaildToken = isVaildToken;
