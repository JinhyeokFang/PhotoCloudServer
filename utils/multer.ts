import { Request } from 'express';
import multer from 'multer';
import path from 'path';

import config from '../config';

export default multer({
    storage: multer.diskStorage({
        destination: config.fileDir.default,
        filename: (req: Request, file, cb: Function): void => cb(null, new Date().valueOf() + path.extname(file.originalname))
    }),
});