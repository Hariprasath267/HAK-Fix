import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table keyed by Firebase Auth UID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  name: text('name'),
  role: text('role').default('customer').notNull(), // 'customer' | 'provider' | 'admin'
  phone: text('phone'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Customer Bookings table
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  bookingReference: text('booking_reference').notNull().unique(),
  userUid: text('user_uid').references(() => users.uid),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  customerAddress: text('customer_address').notNull(),
  serviceCategory: text('service_category').notNull(),
  serviceName: text('service_name').notNull(),
  providerId: text('provider_id'),
  providerName: text('provider_name'),
  scheduledDate: text('scheduled_date').notNull(),
  scheduledTime: text('scheduled_time').notNull(),
  status: text('status').default('pending').notNull(), // 'pending' | 'accepted' | 'on_the_way' | 'in_progress' | 'completed' | 'cancelled'
  basePrice: integer('base_price').notNull(),
  emergencyFee: integer('emergency_fee').default(0).notNull(),
  taxAmount: integer('tax_amount').default(0).notNull(),
  totalPrice: integer('total_price').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userUid],
    references: [users.uid],
  }),
}));
