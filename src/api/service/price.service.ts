import axios from 'axios';
import { Price } from '../models/Price';
import { Crypto } from '../models/Crypto';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

export class PriceService {
  private cryptos = [
    { name: 'bitcoin', symbol: 'BTC' },
    { name: 'ethereum', symbol: 'ETH' },
    { name: 'matic-network', symbol: 'MATIC' },
  ];

  public async fetchAndStorePrices(): Promise<void> {
    try {
      const ids = this.cryptos.map((crypto) => crypto.name).join(',');
      const response = await axios.get(
        `${COINGECKO_API_URL}?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`,
      );

      const prices = response.data;
      console.log(prices);

      for (const crypto of this.cryptos) {
        const priceData = prices[crypto.name];

        if (priceData) {
          const cryptoDoc = await Crypto.findOne({ name: crypto.name });

          if (cryptoDoc) {
            const newPrice = new Price({
              crypto: cryptoDoc._id,
              price: priceData.usd,
              marketCap: priceData.usd_market_cap,
              change24h: priceData.usd_24h_change,
            });

            console.log(
              `Attempting to save price for ${crypto.name}:`,
              newPrice,
            );

            const savedPrice = await newPrice.save();
            console.log(
              `Stored price for ${crypto.name}: $${savedPrice.price}`,
            );
          } else {
            console.error(`Crypto document not found for ${crypto.name}`);
          }
        } else {
          console.error(`Price data not found for ${crypto.name}`);
        }
      }
    } catch (error) {
      //@ts-ignore
      console.error(`Error fetching prices: ${error.message}`);
    }
  }
}
