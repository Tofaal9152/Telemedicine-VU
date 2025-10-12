import { v2 as cloudinary } from 'cloudinary';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;