import { User } from 'generated/prisma';

export function sanitizeUser(user: User) {
  if (!user) return null;

  const { password, hashedRefreshToken, ...safeUser } = user;
  return safeUser;
}
