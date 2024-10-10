"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinValidator = void 0;
const zod_1 = require("zod");
const validCoins = ['bitcoin', 'matic-network', 'ethereum'];
exports.coinValidator = zod_1.z
    .string()
    .refine((value) => validCoins.includes(value.toLowerCase()), {
    message: 'Invalid coin. Allowed values are: bitcoin, matic-network, ethereum.',
})
    .transform((value) => value.toLowerCase());
