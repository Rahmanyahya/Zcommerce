
export interface Login {
    email: string;
    password: string;
}

export interface Register {
    email: string;
    password: string;
}

export interface verifyOtp {
    otp: string;
}

export interface UserModel {
    name?: string;
    address?: string;
}

export interface RESET_PASSWORD {
    oldPassword: string;
    newPassword: string;
}

export interface FORGOT_PASSWORD {
    email: string;
}


export interface UserResponse {
    name: string;
    token?: string;
}