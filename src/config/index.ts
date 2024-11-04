import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  apiKey: process.env.CURRENCY_API_KEY,
  baseUrl: process.env.CURRENCY_API_URL,
};
