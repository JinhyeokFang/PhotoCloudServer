import { Request, Response } from 'express';
import { encodeToken, decodeToken, isVaildToken } from '../utils/jwt';

import Controller from './controller';
import userService from '../services/user.service'

class AuthController extends Controller {
    public async checkToken(req: Request, res: Response): Promise<void> {
        let { token } = req.body;

        if (isVaildToken(token))
            super.ResponseSuccess(res, {token: encodeToken({
                username: decodeToken(token).username,
                time: new Date().getTime()
            })});
        else
            super.ResponseUnauthorized(res, {});
    }

    public async login(req: Request, res: Response): Promise<void> {
        let { username, password } = req.body;

        let result = await userService.login(username, password);

        if (result.err == "the user not found") {
            super.ResponseNotFound(res, {});
        } else if (result.err) {
            super.ResponseInternalServerError(res, {err: result.err});
        } else {
            super.ResponseSuccess(res, {token: encodeToken({
                username,
                time: new Date().getTime()
            })});
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
        let { username, password } = req.body;  

        let result = await userService.register(username, password);

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