import { Schema, model, Model } from 'mongoose';

import { encrypt } from '../utils/crypto';
import UserModel from '../types/user.type';

class User {
    private userSchema: Schema = new Schema({
        username: String,
        password: String,
        photos: Array
    });
    private userModelInstance: Model<UserModel> = model("user", this.userSchema);

    public login(username: string, password: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function): void => {
            this.userModelInstance.findOne({username: encrypt(username), password: encrypt(password)}, (err: object, res: UserModel): void => {
                if (err) {
                    resolve({ err });
                } else if (res == null) {
                    resolve({ err: "the user not found" });
                } else {
                    resolve({});
                }
            });
        });
    }

    public register(username: string, password: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function): void => {
            this.userModelInstance.findOne({username: encrypt(username)}, (err: object, res: UserModel): void => {
                if (err) {
                    resolve({ err });
                } else if (res == null) {
                    new this.userModelInstance({username: encrypt(username), password: encrypt(password)}).save((err: object): void => {
                        if (err)
                            resolve({ err });
                        else
                            resolve({});
                    })
                } else {
                    resolve({ err: "the user already exist."});
                }
            });
        });
    }

    public uploadPhoto(username: string, filename: string, date: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function): void => {
            this.userModelInstance.findOne({username: encrypt(username)}, (err: object, res: UserModel): void => {
                if (err) {
                    resolve({ err });
                } else if (res == null) {
                    resolve({ err: "the user not found" });
                } else {
                    let photos = res.photos;
                    if (photos.find(photo => photo.date == date) == undefined) {
                        photos.push({url: filename, date});
                        this.userModelInstance.updateOne({username: encrypt(username)}, {photos}, (err: object) => {
                            if (err) {
                                resolve({ err });
                            } else {
                                resolve({});
                            }
                        });
                    } else {
                        resolve({ err: "the image is already exist" });
                    }
                }
            });
        });
    }

    public showPhotos(username: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function): void => {
            this.userModelInstance.findOne({username: encrypt(username)}, (err: object, res: UserModel): void => {
                if (err) {
                    resolve({ err });
                } else if (res == null) {
                    resolve({ err: "the user not found" });
                } else {
                    resolve({ data: res.photos });
                }
            });
        });
    }

    public removeImage(username: string, imageDate: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function): void => {
            this.userModelInstance.findOne({username: encrypt(username)}, (err: object, res: UserModel): void => {
                if (err) {
                    resolve({ err });
                } else if (res == null) {
                    resolve({ err: "the user not found" });
                } else {
                    let imageIndex = res.photos.findIndex(el => el.date == imageDate);
                    if (imageIndex == -1) {
                        resolve({ err: "the image not found" });
                    } else {
                        res.photos.splice(imageIndex, 1);
                        this.userModelInstance.updateOne({username: encrypt(username)}, {photos: res.photos}, (err: object) => {
                            if (err) {
                                resolve({ err });
                            } else {
                                resolve({});
                            }
                        });
                    }
                }
            });
        })
    }
}

export default new User();