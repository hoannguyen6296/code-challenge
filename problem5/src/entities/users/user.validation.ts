import { z } from 'zod';
import { maxInputLength, minInputLength } from '../../common/constant';

const baseUserValidation = {
  name: z.string().min(minInputLength),
  age: z.number().int().positive(),
  summary: z.string().min(minInputLength).max(maxInputLength),
  isActive: z.boolean(),
};
export const createUserSchema = z.object({
  ...baseUserValidation,
  email: z.email(),
});

export const updateUserSchema = z.object({
  ...baseUserValidation,
}).partial();

export const findUserSchema = z.object({
  name: z.string().min(minInputLength).optional(),
  age: z.string()
    .optional()
    .transform(val => val === undefined ? undefined : Number(val))
    .refine(val => val === undefined || (Number.isInteger(val) && val > 0), {
      message: 'Age must be a positive integer',
    }),
  isActive: z.string()
    .optional()
    .transform(val => {
      if (val === undefined) return undefined;
      if (val === 'true') return true;
      if (val === 'false') return false;
      return undefined;
    })
    .refine(val => val === undefined || typeof val === 'boolean', {
      message: 'isActive must be a boolean',
    }),
});
