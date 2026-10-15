import { db } from './index.ts';
import { bookings } from './schema.ts';
import { eq, desc } from 'drizzle-orm';

export interface BookingInput {
  bookingReference: string;
  userUid?: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  serviceCategory: string;
  serviceName: string;
  providerId?: string;
  providerName?: string;
  scheduledDate: string;
  scheduledTime: string;
  status?: string;
  basePrice: number;
  emergencyFee?: number;
  taxAmount?: number;
  totalPrice: number;
  notes?: string;
}

export async function createBookingInDb(input: BookingInput) {
  try {
    const result = await db
      .insert(bookings)
      .values({
        bookingReference: input.bookingReference,
        userUid: input.userUid || null,
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
        customerAddress: input.customerAddress,
        serviceCategory: input.serviceCategory,
        serviceName: input.serviceName,
        providerId: input.providerId || null,
        providerName: input.providerName || null,
        scheduledDate: input.scheduledDate,
        scheduledTime: input.scheduledTime,
        status: input.status || 'pending',
        basePrice: input.basePrice,
        emergencyFee: input.emergencyFee || 0,
        taxAmount: input.taxAmount || 0,
        totalPrice: input.totalPrice,
        notes: input.notes || null,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database createBookingInDb failed:', error);
    throw new Error('Database operation failed', { cause: error });
  }
}

export async function getBookingsByUserUid(userUid: string) {
  try {
    return await db
      .select()
      .from(bookings)
      .where(eq(bookings.userUid, userUid))
      .orderBy(desc(bookings.createdAt));
  } catch (error) {
    console.error('Database getBookingsByUserUid failed:', error);
    throw new Error('Database query failed', { cause: error });
  }
}

export async function getBookingByReference(reference: string) {
  try {
    const rows = await db
      .select()
      .from(bookings)
      .where(eq(bookings.bookingReference, reference))
      .limit(1);
    return rows[0] || null;
  } catch (error) {
    console.error('Database getBookingByReference failed:', error);
    throw new Error('Database query failed', { cause: error });
  }
}

export async function updateBookingStatusInDb(reference: string, status: string) {
  try {
    const rows = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.bookingReference, reference))
      .returning();
    return rows[0] || null;
  } catch (error) {
    console.error('Database updateBookingStatusInDb failed:', error);
    throw new Error('Database update failed', { cause: error });
  }
}
