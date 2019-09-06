import { Response } from 'express';

export default class Controller {
    public ResponseSuccess (res: Response, body: object): void {
        res.json({
            status: "Success",
            body
        });
    }

    public ResponseBadRequest (res: Response, body: object): void {
        res.status(400).json({
            status: "Bad Request",
            body
        });
    }

    public ResponseUnauthorized (res: Response, body: object): void {
        res.status(401).json({
            status: "Unauthorized",
            body
        });
    }

    public ResponseForbidden (res: Response, body: object): void {
        res.status(403).json({
            status: "Forbidden",
            body
        });
    }

    public ResponseNotFound (res: Response, body: object): void {
        res.status(404).json({
            status: "Not Found",
            body
        });
    }

    public ResponseInternalServerError (res: Response, body: object): void {
        res.status(500).json({
            status: "Internal Server Error",
            body
        });
    }
}