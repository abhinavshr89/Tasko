import express from 'express';
import { registerController , loginController, logoutController, meController } from '../controller/auth.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();  

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.get('/me', isAuthenticated, meController);


export default router;