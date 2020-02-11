import UserModel from '../models/user.model'
import { encrypt } from '../utils/crypto';
import User from '../interfaces/user.interface';

class UserService {
    public login(username: string, password: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function): void => {
            UserModel.findOne({username: encrypt(username), password: encrypt(password)}, (err: object, res: User): void => {
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
            UserModel.findOne({username: encrypt(username)}, (err: object, res: User): void => {
                if (err) {
                    resolve({ err });
                } else if (res == null) {
                    new UserModel({username: encrypt(username), password: encrypt(password)}).save((err: object): void => {
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
            UserModel.findOne({username: encrypt(username)}, (err: object, res: User): void => {
                if (err) {
                    resolve({ err });
                } else if (res == null) {
                    resolve({ err: "the user not found" });
                } else {
                    let photos = res.photos;
                    if (photos.find(photo => photo.date == date) == undefined) {
                        photos.push({url: filename, date});
                        UserModel.updateOne({username: encrypt(username)}, {photos}, (err: object) => {
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
            UserModel.findOne({username: encrypt(username)}, (err: object, res: User): void => {
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
            UserModel.findOne({username: encrypt(username)}, (err: object, res: User): void => {
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
                        UserModel.updateOne({username: encrypt(username)}, {photos: res.photos}, (err: object) => {
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

export default new UserService();