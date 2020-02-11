import { Request, Response } from 'express';

import Controller from './controller';

class IndexController extends Controller {
    public index(req: Request, res: Response): void {
        res.send("Hello")
    }
}

export default new IndexController();