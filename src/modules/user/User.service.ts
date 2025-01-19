import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/helper/common/prisma.service";
import { ValidationService } from "../../helper/common/validation.service";
import { Logger } from "winston";
import { Login, Register, UserResponse } from "./User.model";
import { User } from "@prisma/client";
import { UserValidation } from "./User.validation";
import { JwtService } from "src/helper/common/jwt.service";
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService,
        private jwtService: JwtService
    ){}

    async registerUser (
        req: Register
    ): Promise<UserResponse> {
        this.logger.debug(`Register new user ${JSON.stringify(req)}`)
        const validatedData = this.validationService.validate<Register>(UserValidation.REGISTER, req)
        const userExist = await this.checkIsUserExist(req)

        if (!userExist) throw new HttpException('User already registered', 400)
        

        validatedData.password = await bcrypt.hash(validatedData.password, 10);

        const { name } = await this.prismaService.user.create({data: {
            email: validatedData.email,
            password: validatedData.password,
        }})


      return {
        name
      }
    }

    async loginUser (
        req: Login
    ): Promise<UserResponse> {
        this.logger.debug(`Login user ${JSON.stringify(req)}`)
        const validatedData = this.validationService.validate<Login>(UserValidation.LOGIN, req)
        const isUserExist = await this.checkIsUserExist(req);

        if (!isUserExist) throw new HttpException('User not found', 404)

        const isPasswordMatch = await bcrypt.compare(validatedData.password, isUserExist.password)
        if (!isPasswordMatch) throw new HttpException('Invalid password', 401)
        
        return {
            name: isUserExist.name,
            token: await this.jwtService.generateToken(isUserExist.name, isUserExist.role)
        }
    }

    async checkIsUserExist (user: User | Register): Promise<User> {
        this.logger.info(`Checking user ${JSON.stringify(user)}`)
        return await this.prismaService.user.findFirst({ where: {
            email: user.email,
        }})
    }
}