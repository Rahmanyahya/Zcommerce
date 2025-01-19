import { Inject, Injectable } from "@nestjs/common";
import { redisClient } from "./connection";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class Redis {

    private redis = redisClient

    constructor(
       @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger
    ){}
    async setOtp(email: string, otp: number): Promise<void> {
        await this.redis.set(`otp:${email}`, otp, { EX: (60 * 5)})
        this.logger.info(`Set OTP for ${email}`);
    }

    async compareOtp(email: string, otp: number): Promise<String> {
        const storedOtp = await this.redis.get(`otp:${email}`);

        if (!storedOtp) {
            this.logger.warn(`Otp for ${email} is expired`);
            return "Otp is expired"
        }

        if (Number(storedOtp) !== otp) {
            this.logger.warn(`Invalid OTP for ${email}`);
            return "Invalid Otp";
        }

        return "OK"
    }
}