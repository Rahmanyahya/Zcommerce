import nodemailer from 'nodemailer';
import mustache from 'mustache'
import fs from 'fs';
import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class Mailer {

    private template = fs.readFileSync('./src/helper/mailer/template.html', 'utf8')

    constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger
    ) {}

    async sendOtp (email: string, otp: number): Promise<void> {
        const auth = {
            user: process.env.GMAIL,
            pass: process.env.PASSWORD
        }
        const conEmail = {
            'service': 'gmail',
            'auth': auth
        }

        const transporter = nodemailer.createTransport(conEmail);
        const msg = {
            to: email,
            from: `${auth.user}`,
            replyTo: `${auth.user}`,
            subject: 'ZCommerce - Code Otp',
            text: '',
            html: mustache.render(this.template, otp)
        }

       await transporter.sendMail(msg)
       this.logger.info(`Success send email to ${email}`)
    }
}