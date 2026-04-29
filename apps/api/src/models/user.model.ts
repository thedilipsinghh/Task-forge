import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
    id: serial().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    mobile: text().notNull().unique(),

    password: text().notNull(),
    role: text().notNull().default("employee"),
    isActive: boolean().notNull().default(true),

    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),

    profilePic: text(),

    department: text(),
    jobRole: text(),
    doj: timestamp(),
    dob: timestamp(),

    isDelete: boolean().default(false),

})