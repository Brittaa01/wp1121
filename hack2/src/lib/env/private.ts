import { z } from "zod";

const privateEnvSchema = z.object({
  // TODO: 1.2 Add your private environment variables here for your database (postgres)
  AUTH_SECRET: z.string(),
  AUTH_GITHUB_ID: z.string(),
  AUTH_GITHUB_SECRET: z.string(),
  // TODO: 1.2 end
});

type PrivateEnv = z.infer<typeof privateEnvSchema>;

export const privateEnv: PrivateEnv = {
  // TODO: 1.3 Add your private environment variables here for your database (postgres)
  AUTH_SECRET: process.env.DB_CONNECTION_STRING || "",
  AUTH_GITHUB_ID: process.env.DB_USER || "",
  AUTH_GITHUB_SECRET: process.env.DB_PASSWORD || "",
  // TODO: 1.3 end
};

privateEnvSchema.parse(privateEnv);
