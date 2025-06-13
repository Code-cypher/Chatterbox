import { Router } from 'express';
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getUserInfo, login, signup, updateProfile,  addProfileImage, removeProfileImage, logOut } from "../controllers/AuthController.js";
import multer from 'multer';

const authRouter = Router();
const upload = multer({ dest: 'uploads/profiles/' });

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/user-info',verifyToken ,getUserInfo)
authRouter.post('/update-profile', verifyToken, updateProfile);
authRouter.post('/add-profile-image', verifyToken, upload.single("profile-image"),addProfileImage);
authRouter.delete('/remove-profile-image', verifyToken, removeProfileImage);
authRouter.post('/logout',logOut);

export default authRouter;