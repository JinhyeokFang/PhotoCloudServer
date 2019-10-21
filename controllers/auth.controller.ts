import { Request, Response } from 'express';
import { encodeToken, isVaildToken } from '../utils/jwt';

import Controller from './controller';
import user from '../models/user.model'

class AuthController extends Controller {
    public async checkToken(req: Request, res: Response): Promise<void> {
        let { token } = req.body;

        if (isVaildToken(token))
            super.ResponseSuccess(res, {});
        else
            super.ResponseUnauthorized(res, {});
    }

    public async login(req: Request, res: Response): Promise<void> {
        let { username, password } = req.body;

        let result = await user.login(username, password);

        if (result.err == "the user not found") {
            super.ResponseNotFound(res, {});
        } else if (result.err) {
            super.ResponseInternalServerError(res, {err: result.err});
        } else {
            super.ResponseSuccess(res, {token: encodeToken({
                username: username,
                time: new Date().getTime()
            })});
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
        let { username, password } = req.body;  

        let result = await user.register(username, password);

        if (result.err == "the user already exist.") {
            super.ResponseForbidden(res, {err: result.err});
        } else if (result.err) {
            super.ResponseInternalServerError(res, {err: result.err});
        } else {
            super.ResponseSuccess(res, {token: encodeToken({
                username: username,
                time: new Date().getTime()
            })});
        }
    }
}

export default new AuthController();