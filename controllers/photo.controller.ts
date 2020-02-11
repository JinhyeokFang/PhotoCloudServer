import { Request, Response } from 'express';

import Controller from './controller';
import userService from '../services/user.service'
import { isVaildToken, decodeToken } from '../utils/jwt';

class PhotoController extends Controller {
    public async addImage(req: Request, res: Response): Promise<void> {
        let { token, date } = req.body;

        if (!req.file) {
            super.ResponseBadRequest(res, { err: "file not found" });
            return;
        }

        let { filename } = req.file;

        if (!isVaildToken(token)) {
            super.ResponseUnauthorized(res, { err: "token is invalid" });
            return;
        }

        let result = await userService.uploadPhoto(decodeToken(token).username, filename, date);

        if (result.err == "the user not found") {
            super.ResponseNotFound(res, { err: result.err });
        } else if (result.err == "the image is already exist") {
            super.ResponseSuccess(res, { message: "the image is already exist"});
        } else if (result.err) {
            super.ResponseInternalServerError(res, { err: result.err });
        } else {
            super.ResponseSuccess(res, {});
        }
    }

    public async showImages(req: Request, res: Response): Promise<void> {
        let { token } = req.body;

        if (!isVaildToken(token)) {
            super.ResponseUnauthorized(res, { err: "token is invalid" });
            return;
        }

        let result = await userService.showPhotos(decodeToken(token).username);

        if (result.err == "the user not found") {
            super.ResponseNotFound(res, { err: result.err });
        } else if (result.err) {
            super.ResponseInternalServerError(res, { err: result.err });
        } else {
            super.ResponseSuccess(res, { photos: result.data });
        }        
    }

    public async removeImage(req: Request, res: Response): Promise<void> {
        let { token, imageDate } = req.body;

        if (!isVaildToken(token)) {
            super.ResponseUnauthorized(res, { err: "token is invalid" });
            return;
        }

        let result = await userService.removeImage(decodeToken(token).username, imageDate);

        if (result.err == "the user not found") {
            super.ResponseBadRequest(res, { err: result.err });
        } else if (result.err == "the image not found") {
            super.ResponseNotFound(res, { err: result.err });
        } else if (result.err) {
            super.ResponseInternalServerError(res, { err: result.err });
        } else {
            super.ResponseSuccess(res, {});
        }
    }
}

export default new PhotoController();