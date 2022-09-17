declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      CORS_ORIGINS: string | undefined;
      MONGODB_URI: string;
      MONGODB_NAME: string;
      JWT_SECRET: string;
    }
  }
}

export {}