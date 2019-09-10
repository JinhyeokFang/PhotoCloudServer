"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const crypto_1 = require("../utils/crypto");
class User {
    constructor() {
        this.userSchema = new mongoose_1.Schema({
            username: String,
            password: String,
            photos: Array
        });
        this.userModelInstance = mongoose_1.model("user", this.userSchema);
    }
    login(username, password) {
        return new Promise((resolve, reject) => {
            this.userModelInstance.findOne({ username: crypto_1.encrypt(username), password: crypto_1.encrypt(password) }, (err, res) => {
                if (err) {
                    resolve({ err });
                }
                else if (res == null) {
                    resolve({ err: "the user not found" });
                }
                else {
                    resolve({});
                }
            });
        });
    }
    register(username, password) {
        return new Promise((resolve, reject) => {
            this.userModelInstance.findOne({ username: crypto_1.encrypt(username) }, (err, res) => {
                if (err) {
                    resolve({ err });
                }
                else if (res == null) {
                    new this.userModelInstance({ username: crypto_1.encrypt(username), password: crypto_1.encrypt(password) }).save((err) => {
                        if (err)
                            resolve({ err });
                        else
                            resolve({});
                    });
                }
                else {
                    resolve({ err: "the user already exist." });
                }
            });
        });
    }
    uploadPhoto(username, filename) {
        return new Promise((resolve, reject) => {
            this.userModelInstance.findOne({ username: crypto_1.encrypt(username) }, (err, res) => {
                if (err) {
                    resolve({ err });
                }
                else if (res == null) {
                    resolve({ err: "the user not found" });
                }
                else {
                    let photos = res.photos;
                    photos.push({ url: filename, date: new Date().getTime().toString() });
                    this.userModelInstance.updateOne({ username: crypto_1.encrypt(username) }, { photos }, (err) => {
                        if (err) {
                            resolve({ err });
                        }
                        else {
                            resolve({});
                        }
                    });
                }
            });
        });
    }
    showPhotos(username) {
        return new Promise((resolve, reject) => {
            this.userModelInstance.findOne({ username: crypto_1.encrypt(username) }, (err, res) => {
                if (err) {
                    resolve({ err });
                }
                else if (res == null) {
                    resolve({ err: "the user not found" });
                }
                else {
                    resolve({ data: res.photos });
                }
            });
        });
    }
    removeImage(username, imageDate) {
        return new Promise((resolve, reject) => {
            this.userModelInstance.findOne({ username: crypto_1.encrypt(username) }, (err, res) => {
                if (err) {
                    resolve({ err });
                }
                else if (res == null) {
                    resolve({ err: "the user not found" });
                }
                else {
                    let imageIndex = res.photos.findIndex(el => el.date == imageDate);
                    if (imageIndex == -1) {
                        resolve({ err: "the image not found" });
                    }
                    else {
                        res.photos.splice(imageIndex, 1);
                        this.userModelInstance.updateOne({ username: crypto_1.encrypt(username) }, { photos: res.photos }, (err) => {
                            if (err) {
                                resolve({ err });
                            }
                            else {
                                resolve({});
                            }
                        });
                    }
                }
            });
        });
    }
}
exports.default = new User();
