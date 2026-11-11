import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const bots = pgTable('bots', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  instructions: text('instructions').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})