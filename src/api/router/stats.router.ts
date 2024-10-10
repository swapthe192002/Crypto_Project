import express from 'express';
import { getStats } from '../controller/stats.controller';

const router = express.Router();

/**
 * @swagger
 * /coin/stats:
 *   get:
 *     summary: Get cryptocurrency statistics
 *     tags: [Stats]
 *     parameters:
 *       - in: query
 *         name: coin
 *         required: true
 *         description: The name of the cryptocurrency (bitcoin, matic-network, ethereum)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched cryptocurrency stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the cryptocurrency
 *                 symbol:
 *                   type: string
 *                   description: The symbol of the cryptocurrency
 *                 price:
 *                   type: number
 *                   description: Current price of the cryptocurrency in USD
 *                 marketCap:
 *                   type: number
 *                   description: Market capitalization of the cryptocurrency
 *                 change24h:
 *                   type: number
 *                   description: Percentage change in price over the last 24 hours
 *       400:
 *         description: Query parameter "coin" is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Cryptocurrency not found or no price data available
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to fetch cryptocurrency stats
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/stats', getStats);

export default router;
