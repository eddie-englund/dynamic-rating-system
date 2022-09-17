import { Router } from 'express';
import { createUser } from './controllers/create-user-controller';
import { getUser } from './controllers/get-user-controller';
import { userCreateValidator } from './validators/create-user-validator';
import { userGetValidator } from './validators/get-user-validator';

export const router = Router();

router.post('/create', userCreateValidator, createUser)
router.get('/get/:id', userGetValidator, getUser)

