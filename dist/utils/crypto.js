"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var crypto_1=require("crypto"),encrypt=function(e){var r=crypto_1.createCipher("aes-256-cbc","SECRET_KEY"),t=r.update(e,"utf8","base64");return t+=r.final("base64")};exports.encrypt=encrypt;var decrypt=function(e){var r=crypto_1.createDecipher("aes-256-cbc","SECRET_KEY"),t=r.update(e,"base64","utf8");return t+=r.final("utf8")};exports.decrypt=decrypt;