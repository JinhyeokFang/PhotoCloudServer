import { Router } from 'express';
import userController from '../controllers/user.controller';

import imageUpload from '../utils/multer';

const router = Router();

router.get('/image', userController.showImages);
router.post('/image', imageUpload.single('file'), userController.addImage);

export default router;