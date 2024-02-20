import {sql} from 'drizzle-orm'
import {jsonb, pgTable, text, timestamp} from 'drizzle-orm/pg-core'

/** Execution  */
export const sync_run = pgTable('sync_run', {
  id: text('id')
    .notNull()
    .primaryKey()
    .default(sql`substr(md5(random()::text), 0, 25)`),
  customer_id: text('customer_id').notNull(),
  provider_name: text('provider_name').notNull(),
  status: text('status').notNull(),
  started_at: timestamp('started_at', {
    precision: 3,
    mode: 'string',
  }),
  completed_at: timestamp('completed_at', {
    precision: 3,
    mode: 'string',
  }),
  created_at: timestamp('created_at', {
    precision: 3,
    mode: 'string',
  }).defaultNow(),
  updated_at: timestamp('updated_at', {
    precision: 3,
    mode: 'string',
  }).defaultNow(),
})

export const sync_state = pgTable('sync_state', {
  customer_id: text('customer_id').notNull(),
  provider_name: text('provider_name').notNull(),
  state: jsonb('state'),
  created_at: timestamp('created_at', {
    precision: 3,
    mode: 'string',
  }).defaultNow(),
  updated_at: timestamp('updated_at', {
    precision: 3,
    mode: 'string',
  }).defaultNow(),
})
