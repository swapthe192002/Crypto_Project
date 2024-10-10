import { Request, Response } from 'express';
import { CryptoStatsService } from '../service/crypto.service';
import { coinValidator } from '../validator/coin.validator';

const cryptoStatsService = new CryptoStatsService();

export async function getStats(req: Request, res: Response): Promise<void> {
  const coin = req.query.coin as string;

  if (!coin) {
    res.status(400).json({ error: 'Query parameter "coin" is required.' });
    return;
  }

  const validationResult = coinValidator.safeParse(coin);

  if (!validationResult.success) {
    res.status(400).json({
      error:
        'Invalid coin. Allowed values are: bitcoin, matic-network, ethereum.',
    });
    return;
  }

  const validatedCoin = validationResult.data;

  try {
    const stats = await cryptoStatsService.getCryptoStats(validatedCoin);
    if (!stats) {
      res.status(404).json({
        error: 'Cryptocurrency not found or no price data available.',
      });
      return;
    }

    res.status(200).json(stats);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch cryptocurrency stats.' });
    }
  }
}
