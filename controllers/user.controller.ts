import { Request, Response } from 'express';

import Controller from './controller';
import user from '../models/user.model'
import { isVaildToken, decodeToken } from '../utils/jwt';

class UserController extends Controller {
    public async addImage(req: Request, res: Response): Promise<void> {
        let { token } = req.body;

        if (!req.file) {
            super.ResponseBadRequest(res, { err: "file not found" });
            return;
        }

        let { filename } = req.file;

        if (!isVaildToken(token)) {
            super.ResponseUnauthorized(res, { err: "token is invalid" });
            return;
        }

        let result = await user.uploadPhoto(decodeToken(token).username, filename);

        if (result.err == "the user not found") {
            super.ResponseNotFound(res, { err: result.err });
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

        let result = await user.showPhotos(decodeToken(token).username);

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

        let result = await user.removeImage(decodeToken(token).username, imageDate);

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

export default new UserController();