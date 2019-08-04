import * as dotenv from 'dotenv';

const isDev: boolean = process.env.NODE_ENV !== 'production';

if (isDev) {
  dotenv.config();
}

export class Config {
  static readonly IS_DEV: boolean = isDev;
  static readonly PORT: number = parseInt(process.env.PORT, 10);
  static readonly POSTGRES_USER: string = process.env.POSTGRES_USER;
  static readonly POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD;
  static readonly POSTGRES_DB: string = process.env.POSTGRES_DB;
  static readonly POSTGRES_PORT: number = parseInt(process.env.POSTGRES_PORT, 10);
  static readonly JWT_SECRET: string = process.env.JWT_SECRET;
}
