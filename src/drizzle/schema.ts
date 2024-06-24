import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  email: text("email").unique(),
  password: text("password").notNull(),
});
