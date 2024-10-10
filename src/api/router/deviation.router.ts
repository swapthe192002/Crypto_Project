import express from 'express';
import { getDeviation } from '../controller/deviation.controller';

const router = express.Router();

/**
 * @swagger
 * /coin/deviation:
 *   get:
 *     summary: Get standard deviation of the latest 100 prices for a cryptocurrency
 *     tags: [Deviation]
 *     parameters:
 *       - in: query
 *         name: coin
 *         required: true
 *         description: The name of the cryptocurrency (bitcoin, matic-network, ethereum)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched standard deviation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 coin:
 *                   type: string
 *                   description: The cryptocurrency name
 *                 deviation:
 *                   type: number
 *                   description: The calculated standard deviation
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
 *         description: Failed to fetch price deviation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/deviation', getDeviation);

export default router;
