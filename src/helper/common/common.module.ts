import { Global, Module} from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { ConfigModule } from '@nestjs/config'
import * as winston from "winston"
import { PrismaService } from "./prisma.service";
import { ValidationService } from "./validation.service";
import { APP_FILTER } from "@nestjs/core";
import { ErrorFilter } from "./error.filter";



@Global()
@Module({
    imports: [
        WinstonModule.forRoot({
            level: 'debug',
            format: winston.format.json(),
            transports: [new winston.transports.Console({ level: 'debug'})]
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    providers: [
        PrismaService,
        ValidationService,
        {
            provide: APP_FILTER,
            useClass: ErrorFilter
        }
    ],
    exports: [PrismaService, ValidationService]
})

export class CommonModule {}