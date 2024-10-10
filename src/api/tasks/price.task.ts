import cron from 'node-cron';
import { PriceService } from '../service/price.service';

const priceService = new PriceService();
const CRON_SCHEDULE = '0 * * * *';

export const startPriceFetchingTask = () => {
  priceService.fetchAndStorePrices();

  cron.schedule(CRON_SCHEDULE, async () => {
    console.log('Fetching prices from CoinGecko...');
    await priceService.fetchAndStorePrices();
  });
};
