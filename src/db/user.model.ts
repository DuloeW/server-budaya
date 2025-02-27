import { mysqlTable, mysqlSchema, serial, varchar,bigint } from "drizzle-orm/mysql-core";

export const users = mysqlTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', {length: 50}).notNull(),
    password: varchar('password', {length: 100}).notNull(),
})