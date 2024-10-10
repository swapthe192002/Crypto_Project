import { z } from 'zod';

const validCoins = ['bitcoin', 'matic-network', 'ethereum'] as const;
type ValidCoin = typeof validCoins[number];

export const coinValidator = z
  .string()
  .refine((value) => validCoins.includes(value.toLowerCase() as ValidCoin), {
    message: 'Invalid coin. Allowed values are: bitcoin, matic-network, ethereum.',
  })
  .transform((value) => value.toLowerCase() as ValidCoin);

export type CoinType = z.infer<typeof coinValidator>;
