import { z } from "zod";

const privateEnvSchema = z.object({
  // TODO: 1.2 Add your private environment variables here for your database (postgres)
  POSTGRES_URL: z.string().url(),
  AUTH_SECRET: z.string(),
  AUTH_GITHUB_ID: z.string(),
  AUTH_GITHUB_SECRET: z.string(),
  // TODO: 1.2 end
});

type PrivateEnv = z.infer<typeof privateEnvSchema>;

export const privateEnv: PrivateEnv = {
  // TODO: 1.3 Add your private environment variables here for your database (postgres)
  POSTGRES_URL: process.env.POSTGRES_URL || "",
  AUTH_SECRET: process.env.AUTH_SECRET || "",
  AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID || "",
  AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET || "",
  // TODO: 1.3 end
};

privateEnvSchema.parse(privateEnv);
