import express from 'express';
const router = express.Router();
import { login, signUp } from '../controllers/authController.js';

router.post('/sign-up', signUp);
router.post('/login', login);

export default router;