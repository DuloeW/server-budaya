import { mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core";

export const category = mysqlTable('ketegori_budaya', {
    id: serial('id').primaryKey(),
    title: varchar('title', {length: 50}).notNull(),
    description: text('description').notNull(),
    image_url: varchar('image_url', {length: 255}).notNull(),
})