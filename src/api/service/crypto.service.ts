import { Price } from '../models/Price';
import { Crypto } from '../models/Crypto';
import { ICryptoStats } from '../interface/stats';

export class CryptoStatsService {
  private readonly defaultCryptos = [
    { name: 'bitcoin', symbol: 'BTC' },
    { name: 'ethereum', symbol: 'ETH' },
    { name: 'matic-network', symbol: 'MATIC' },
  ];

  public async initializeCryptos(): Promise<void> {
    for (const cryptoData of this.defaultCryptos) {
      const existingCrypto = await Crypto.findOne({ name: cryptoData.name });
      if (!existingCrypto) {
        const crypto = new Crypto(cryptoData);
        await crypto.save();
        console.log(`Initialized ${cryptoData.name}`);
      }
    }
  }
  public async getCryptoStats(coin: string): Promise<ICryptoStats | null> {
    try {
      const crypto = await Crypto.findOne({ name: coin });
      if (!crypto) {
        return null;
      }

      const latestPrice = await Price.findOne({ crypto: crypto._id }).sort({
        timestamp: -1,
      });

      if (!latestPrice) {
        return null;
      }

      return {
        name: crypto.name,
        symbol: crypto.symbol,
        price: latestPrice.price,
        marketCap: latestPrice.marketCap,
        change24h: latestPrice.change24h,
      };
    } catch (error) {
      console.error(`Error fetching crypto stats: ${error}`);
      throw new Error('Error fetching crypto stats');
    }
  }

  public async getDeviation(coin: string): Promise<number | null> {
    try {
      const crypto = await Crypto.findOne({ name: coin });
      if (!crypto) {
        return null;
      }

      const prices = await Price.find({ crypto: crypto._id })
        .sort({ timestamp: -1 })
        .limit(100);

      if (prices.length === 0) {
        return null;
      }

      const priceValues = prices.map((price) => price.price);
      const mean =
        priceValues.reduce((acc, val) => acc + val, 0) / priceValues.length;
      const variance =
        priceValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
        priceValues.length;

      const deviation = Math.sqrt(variance);

      return deviation;
    } catch (error) {
      console.error(`Error fetching price deviation: ${error}`);
      throw new Error('Error fetching price deviation');
    }
  }
}
