import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { z } from "zod";

const environmentSchema = z.object({
  APP_NAME: z.string(),
  PORT: z.coerce.number().int().default(3000),
  GOOGLE_MAPS_API_KEY: z.string(),
  AZURE_OPENAI_ENDPOINT: z.string(),
  AZURE_OPENAI_DEPLOYMENT_NAME: z.string(),
  AZURE_OPENAI_KEY: z.string(),
  OPENAI_API_VERSION: z.string(),
});

const env = environmentSchema.parse(process.env);

export const appConfig = {
  app: {
    name: env.APP_NAME,
    port: env.PORT,
  },
  googleMaps: {
    apiKey: env.GOOGLE_MAPS_API_KEY,
  },
  azureOpenAI: {
    endpoint: env.AZURE_OPENAI_ENDPOINT,
    key: env.AZURE_OPENAI_KEY,
    version: env.OPENAI_API_VERSION,
    deploymentName: env.AZURE_OPENAI_DEPLOYMENT_NAME,
  },
};
