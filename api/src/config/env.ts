import { z } from "zod";

const stringToNumber = z.string().transform((val, ctx) => {
  const parsed = parseInt(val);
  if (isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Not a valid number",
    });
    return z.NEVER;
  }
  return parsed;
});

const envSchema = z.object({
  PORT: stringToNumber,
  TZ: z.string(),

  MYSQL_HOST: z.string(),
  MYSQL_PORT: stringToNumber,
  MYSQL_USER: z.string(),
  MYSQL_PASSWORD: z.string(),
  MYSQL_DATABASE: z.string(),
  MYSQL_DIALECT: z.string(),

  MYSQL_ROOT_PASSWORD: z.string(),

  OPENAI_API_KEY: z.string(),

  HASH_SALT: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),

  AWS_S3_URL: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),
  AWS_S3_ACCESS_KEY: z.string().optional(),
  AWS_S3_SECRET_KEY: z.string().optional(),
  AWS_S3_REGION: z.string().optional(),

  CLIENT_URL: z.string().optional(),
  ADMIN_URL: z.string().optional(),

  MINIO_SECRET_KEY: z.string().optional(),
  MINIO_ACCESS_KEY: z.string().optional(),
  MINIO_ENDPOINT: z.string().optional(),

  GA_SERVICE_ACCOUNT: z.string().optional(),
  GA_VIEW_ID: z.string().optional(),

  NODE_ENV: z.enum(["local", "development", "production"]),
});
export type Env = z.infer<typeof envSchema>;
export const env = (() => {
  const r = envSchema.safeParse(process.env);
  if (r.success === true) return r.data;
  throw new Error(
    `ENV validation. ${r.error.errors.map((e) => `${e.path[0]}: ${e.message}`).join(", ")}`,
  );
})();
