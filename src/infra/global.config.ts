export const globalConfig = {
    Server: {
        port: process.env.SERVER_PORT || 3030,
        prefix: process.env.SERVER_PREFIX 
    },
    Mailer: {
        gmail: process.env.GMAIL,
        password: process.env.PASSWORD
    },
    Redis: {
        redis_connection: process.env.REDIS_URL_CONECTION
    },
    Jwt: {
        secret: process.env.JWT_SECRET
    },
    Cloudinary: {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
        folder_name: process.env.CLOUD_FOLDER_NAME
    }
}


