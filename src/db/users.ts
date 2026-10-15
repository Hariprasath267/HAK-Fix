import { db } from './index.ts';
import { users } from './schema.ts';
import { eq } from 'drizzle-orm';

export interface UserInput {
  uid: string;
  email: string;
  name?: string;
  role?: 'customer' | 'provider' | 'admin';
  phone?: string;
  avatarUrl?: string;
}

export async function getOrCreateUser(input: UserInput) {
  try {
    const result = await db
      .insert(users)
      .values({
        uid: input.uid,
        email: input.email,
        name: input.name || input.email.split('@')[0],
        role: input.role || 'customer',
        phone: input.phone || null,
        avatarUrl: input.avatarUrl || null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email: input.email,
          ...(input.name ? { name: input.name } : {}),
          ...(input.avatarUrl ? { avatarUrl: input.avatarUrl } : {}),
          ...(input.phone ? { phone: input.phone } : {}),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database getOrCreateUser failed:', error);
    throw new Error('Database operation failed', { cause: error });
  }
}

export async function getUserByUid(uid: string) {
  try {
    const rows = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    return rows[0] || null;
  } catch (error) {
    console.error('Database getUserByUid failed:', error);
    throw new Error('Database query failed', { cause: error });
  }
}
