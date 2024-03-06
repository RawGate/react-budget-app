import { z } from 'zod';

export const positiveNumberSchema = z
  .number()
  .refine((value) => value > 0, {
    message: 'Please enter a positive number.',
  });