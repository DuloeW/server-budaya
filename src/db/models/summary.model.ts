import { mysqlTable, serial, text, tinyint } from "drizzle-orm/mysql-core";

export const summary = mysqlTable('summary', {
    id: serial('id').primaryKey(),
    type: tinyint('type').notNull(),
    description: text('description').notNull(),
})