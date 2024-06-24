import type { Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  dialect: "postgresql",
  out: "./src/drizzle/migrations",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DB_URL as string,
  },
}) satisfies Config;
