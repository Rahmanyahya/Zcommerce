import { z, ZodType } from 'zod'

export class UserValidation {

    static readonly REGISTER: ZodType = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(50)
    })

    static readonly LOGIN: ZodType = z.object({
        email: z.string().email(),
        password: z.string()
    })

    static readonly VERIFY_OTP: ZodType = z.object({
        otp: z.string().min(6)
    })

    static readonly RESET_PASSWORD: ZodType = z.object({
        oldPassword: z.string().min(8),
        newPassword: z.string().min(8).max(50)
    })

    static readonly FORGOT_PASSWORD: ZodType = z.object({
        email: z.string().email()
    })

    static readonly CHANGE_EMAIL: ZodType = z.object({
        newEmail: z.string().email()
    })

    static readonly CHANGE_PROFILE: ZodType = z.object({
        name: z.string().optional(),
        address: z.string().optional()
    })

}

type Register = z.infer<typeof UserValidation.REGISTER>