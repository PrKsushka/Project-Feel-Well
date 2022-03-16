import express from 'express';
import register from '../../mongoDB/controller/user/register';
import authenticate from '../../mongoDB/controller/user/authenticate';
import refreshToken from '../../../utilsForToken/refreshToken';
import auth from '../../../utilsForToken/checkIfAuth';

const userRoute = express.Router();
userRoute.post('/register', register);
userRoute.post('/authenticate', authenticate);
userRoute.get('/auth', auth, refreshToken);
export default userRoute;
