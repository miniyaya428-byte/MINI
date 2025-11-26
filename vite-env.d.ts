// Fix: Remove invalid reference to vite/client and augment NodeJS.ProcessEnv to avoid redeclaration of 'process'
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    [key: string]: any;
  }
}