import express from 'express';
import register from '../../mongoDB/controller/user/register';
import authenticate from '../../mongoDB/controller/user/authenticate';
import refreshToken from '../../../utilsForToken/refreshToken';
import auth from '../../../utilsForToken/checkIfAuth';
import changeDataAboutUser from '../../mongoDB/controller/user/changeDataAboutUser';
import changePassword from '../../mongoDB/controller/user/changePassword';


const userRoute = express.Router();
userRoute.post('/register', register);
userRoute.post('/authenticate', authenticate);
userRoute.post('/auth', refreshToken);
userRoute.put('/changeDataAboutUser', auth, changeDataAboutUser);
userRoute.put('/changePassword', auth, changePassword);
export default userRoute;
