import express from 'express';
const router = express.Router();
import { login, signUp } from '../controllers/authController.js';
// import socketListener from '../socket.js';
import { createCanvas } from '../controllers/canvaController.js';

router.post('/sign-up', signUp);
router.post('/login', login);

router.post('/createCanvas', createCanvas );


export default router;