import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive(),
  role: z.string().min(1),
  isActive: z.boolean(),
});

export const updateUserSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().positive(),
  role: z.string().min(1),
  isActive: z.boolean(),
});