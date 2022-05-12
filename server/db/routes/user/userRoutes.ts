import express from 'express';
import register from '../../mongoDB/controller/user/register';
import authenticate from '../../mongoDB/controller/user/authenticate';
import refreshToken from '../../../utilsForToken/refreshToken';
import auth from '../../../utilsForToken/checkIfAuth';
import changeDataAboutUser from '../../mongoDB/controller/user/changeDataAboutUser';
import changePassword from '../../mongoDB/controller/user/changePassword';
import getDataAboutUser from '../../mongoDB/controller/user/getDataAboutUser';
import authenticatePg from '../../postgres/controller/user/authenticate';
import registerPg from '../../postgres/controller/user/register';
import getDataAboutUserPg from '../../postgres/controller/user/getDataAboutUser';
import changeDataAboutUserPg from '../../postgres/controller/user/changeDataAboutUser';
import changePasswordPg from '../../postgres/controller/user/changePassword';


const userRoute = express.Router();
userRoute.post('/register', register);
userRoute.post('/authenticate', authenticate);
userRoute.post('/auth', refreshToken);
userRoute.put('/changeDataAboutUser', auth, changeDataAboutUser);
userRoute.put('/changePassword', auth, changePassword);
userRoute.get('/dataAboutUser', auth, getDataAboutUser);

const userRoutePg=express.Router();
userRoutePg.post('/authenticate', authenticatePg);
userRoutePg.post('/register', registerPg);
userRoutePg.post('/auth', refreshToken);
userRoutePg.put('/changeDataAboutUser', auth, changeDataAboutUserPg);
userRoutePg.put('/changePassword', auth, changePasswordPg);
userRoutePg.get('/dataAboutUser', auth, getDataAboutUserPg);

export default { userRoute, userRoutePg };
