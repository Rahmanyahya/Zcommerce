import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { globalConfig } from 'src/infra/global.config';
import { UserService } from './User.service';
import { Login, Register, UserResponse } from './User.model';
import { WebResponse } from 'src/model/web.model';

@Controller(`${globalConfig.Server.prefix}/users`)
export class UserController {
    
    constructor(private UserService: UserService) {}

    @Post('/register')
    @HttpCode(200)
    async Register(
        @Body() req: Register
    ): Promise<WebResponse <UserResponse> > {
        const response =  await this.UserService.registerUser(req);
        return { data: response };
    }

    @Post('/login')
    @HttpCode(200)
    async Login(
        @Body() req: Login
    ): Promise<WebResponse <UserResponse> > {
        const response =  await this.UserService.loginUser(req);
        return { data: response };
    }

    
}