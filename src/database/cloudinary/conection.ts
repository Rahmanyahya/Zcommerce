import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
import { config } from 'src/infra/global.config';
dotenv.config()

cloudinary.v2.config({
     cloud_name: `${config.Cloudinary.cloud_name}`,
     api_key: `${config.Cloudinary.api_key}`,
     api_secret: `${config.Cloudinary.api_secret}`,
     secure: true,
})

export const cloud = cloudinary.v2;