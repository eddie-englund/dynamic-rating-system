import { Router } from 'express';
import { createUser } from './controllers/create-user-controller';
import { userCreateValidator } from './validators/create-user-validator';

const router = Router();

router.post('/create', userCreateValidator, createUser)