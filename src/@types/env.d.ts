declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      EXPRESS_PORT: string | undefined;
      CORS_ORIGINS: string | undefined;
      MONGODB_URI: string;
      MONGODB_NAME: string;
    }
  }
}

export {}