import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken'
import { globalConfig } from 'src/infra/global.config';


export class JwtService {
    async generateToken (name: string, role: Role): Promise<string> {
     return jwt.sign({name,role}, globalConfig.Jwt.secret, { expiresIn: '1h' })
    }

}