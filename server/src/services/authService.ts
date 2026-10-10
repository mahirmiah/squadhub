import bcrypt from 'bcrypt';
import { prisma } from '../db/prisma';

export async function register(name: string, email: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error('A user with this email already exists.');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      player: {
        create: {
          name,
        },
      },
    },
    include: {
      player: true,
    },
  });

  return {
    id: user.id,
    email: user.email,
    player: user.player,
  };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      player: true,
    },
  });

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    throw new Error('Invalid email or password.');
  }

  return {
    id: user.id,
    email: user.email,
    player: user.player,
  };
}
