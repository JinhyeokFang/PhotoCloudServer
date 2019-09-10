"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
var encrypt = function (data) {
    const cipher = crypto_1.createCipher("aes-256-cbc", "SECRET_KEY");
    let temp = cipher.update(data, "utf8", "base64");
    temp += cipher.final("base64");
    return temp;
};
exports.encrypt = encrypt;
var decrypt = function (data) {
    const decipher = crypto_1.createDecipher("aes-256-cbc", "SECRET_KEY");
    let temp = decipher.update(data, "base64", "utf8");
    temp += decipher.final("utf8");
    return temp;
};
exports.decrypt = decrypt;
