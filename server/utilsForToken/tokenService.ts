import jwt from 'jsonwebtoken';
import 'dotenv/config';

class TokenService {
  static generateToken(id: number, email: string, role: string) {
    return jwt.sign({ id, email, role }, 'access', { expiresIn: '24h' });
  }
}
export default TokenService;
