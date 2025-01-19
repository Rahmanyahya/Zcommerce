import { Module } from "@nestjs/common";
import { UserService } from "./User.service";
import { UserController } from "./User.controller";
import { JwtModule } from '@nestjs/jwt'
import { globalConfig } from "src/infra/global.config";
import { JwtService } from "src/helper/common/jwt.service";

@Module({
    providers: [UserService, JwtService],
    controllers: [UserController]
})

export class UserModule {}
