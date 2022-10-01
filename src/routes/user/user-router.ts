import { validator } from '@util/validator';
import { Router } from 'express';
import { createUser } from './controllers/create-user-controller';
import { getUser } from './controllers/get-user-controller';
import { loginWithRefreshToken } from './controllers/login-refresh-token';
import { loginUser } from './controllers/login-user-controller';
import { userCreateSchema } from './validators/create-user-validator';
import { userGetSchema } from './validators/get-user-validator';

const router = Router();

router.post('/create', validator(userCreateSchema), createUser);
router.post('/login', validator(userCreateSchema), loginUser);
router.post('/refresh', loginWithRefreshToken);
router.get('/get/:id', validator(userGetSchema), getUser);

export default router;
