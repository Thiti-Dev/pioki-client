declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PIOKI_SERVICE_ENDPOINT: string
        PIOKI_SERVICE_ACCESS_KEY: string
      }

      interface RequestInit {
        test: string
      }
    }
}
export {}