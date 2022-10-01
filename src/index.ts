import dotenv from 'dotenv';
dotenv.config();
import { initApp } from './app';

initApp().catch(e => console.error('Error while initalizing app', e));
