interface EnvironmentVariables {
  NODE_ENV: string;
  PORT: string;
  JWT_SECRET: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}
