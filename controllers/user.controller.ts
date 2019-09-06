import { Request, Response } from 'express';

import Controller from './controller';
import user from '../models/user.model'

class UserController extends Controller {
    public async addImage(req: Request, res: Response): Promise<void> {
        let { username } = req.body;
        let { filename } = req.file;

        let result = await user.uploadPhoto(username, filename);

        if (result.err == "the user not found") {
            super.ResponseNotFound(res, { err: result.err });
        } else if (result.err) {
            super.ResponseInternalServerError(res, { err: result.err });
        } else {
            super.ResponseSuccess(res, {});
        }
    }

    public async showImages(req: Request, res: Response): Promise<void> {
        let { username } = req.body;

        let result = await user.showPhotos(username);

        if (result.err == "the user not found") {
            super.ResponseNotFound(res, { err: result.err });
        } else if (result.err) {
            super.ResponseInternalServerError(res, { err: result.err });
        } else {
            super.ResponseSuccess(res, { photos: result.data });
        }        
    }
}

export default new UserController();