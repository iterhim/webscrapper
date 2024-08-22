import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({ path: './.env' });

export interface IServerConfig {
  port: number;
  environment: string;
  apiKeyHeader: string;
  apiKey: string;
}

export interface IDocs {
  user: string;
  password: string;
}

export interface IConfiguration {
  server: IServerConfig;
  docs: IDocs;
}

export const config: IConfiguration = {
  server: {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    apiKeyHeader: process.env.API_KEY_HEADER,
    apiKey: process.env.API_KEY,
  },

  docs: {
    user: process.env.DOCS_USER,
    password: process.env.DOCS_PASSWORD,
  },
};

export const configuration = () => config;
