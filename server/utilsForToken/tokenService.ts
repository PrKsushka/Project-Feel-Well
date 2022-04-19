import jwt from 'jsonwebtoken';
import 'dotenv/config';

class TokenService {
  static generateToken(id: number, email: string, role: string) {
    return jwt.sign({ id, email, role }, 'access', { expiresIn: '1h' });
  }
  static refreshToken(id: number, email: string, role: string){
    return jwt.sign({ id, email, role }, 'refresh', { expiresIn: '10d' });
  }
}
export default TokenService;
