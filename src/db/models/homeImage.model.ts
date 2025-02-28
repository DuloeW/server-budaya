import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const homeImage = mysqlTable('home_image', {
    id: serial('id').primaryKey(),
    title: varchar('title', {length: 50}).notNull(),
    image_url: varchar('image_url', {length: 255}).notNull()
})