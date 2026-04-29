import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user.model";

export const task = pgTable("task", {
    id: serial().primaryKey(),
    title: text().notNull(),
    desc: text(),
    taskImage: text(),
    complete: boolean(),
    due: timestamp(),
    completeDate: timestamp(),
    userId: integer("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),


})