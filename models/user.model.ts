import { Schema, model, Model } from 'mongoose';

import { encrypt } from '../utils/crypto';
import UserModel from '../types/user.type';

const userSchema = new Schema({
    username: String,
    password: String,
    photos: Array
});

class User {
    private userModelInstance: Model<UserModel> = model("user", userSchema);
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

    public uploadPhoto(username: string, filename: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function): void => {
            this.userModelInstance.findOne({username: encrypt(username)}, (err: object, res: UserModel): void => {
                if (err) {
                    resolve({ err });
                } else if (res == null) {
                    resolve({ err: "the user not found" });
                } else {
                    let photos = res.photos;
                    photos.push({url: filename, date: new Date().getTime().toString()});
                    this.userModelInstance.updateOne({username: encrypt(username)}, {photos}, (err: object) => {
                        if (err) {
                            resolve({ err });
                        } else {
                            resolve({});
                        }
                    });
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
}

export default new User();