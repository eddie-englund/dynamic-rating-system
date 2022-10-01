import 'express-async-errors';
import dotenv from 'dotenv';
import { initApp } from './app';

dotenv.config();

(async () => {
  await initApp();
});
