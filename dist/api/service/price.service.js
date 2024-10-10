"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceService = void 0;
const axios_1 = __importDefault(require("axios"));
const Price_1 = require("../models/Price");
const Crypto_1 = require("../models/Crypto");
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';
class PriceService {
    constructor() {
        this.cryptos = [
            { name: 'bitcoin', symbol: 'BTC' },
            { name: 'ethereum', symbol: 'ETH' },
            { name: 'matic-network', symbol: 'MATIC' },
        ];
    }
    fetchAndStorePrices() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ids = this.cryptos.map((crypto) => crypto.name).join(',');
                const response = yield axios_1.default.get(`${COINGECKO_API_URL}?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
                const prices = response.data;
                console.log(prices);
                for (const crypto of this.cryptos) {
                    const priceData = prices[crypto.name];
                    if (priceData) {
                        const cryptoDoc = yield Crypto_1.Crypto.findOne({ name: crypto.name });
                        if (cryptoDoc) {
                            const newPrice = new Price_1.Price({
                                crypto: cryptoDoc._id,
                                price: priceData.usd,
                                marketCap: priceData.usd_market_cap,
                                change24h: priceData.usd_24h_change,
                            });
                            console.log(`Attempting to save price for ${crypto.name}:`, newPrice);
                            const savedPrice = yield newPrice.save();
                            console.log(`Stored price for ${crypto.name}: $${savedPrice.price}`);
                        }
                        else {
                            console.error(`Crypto document not found for ${crypto.name}`);
                        }
                    }
                    else {
                        console.error(`Price data not found for ${crypto.name}`);
                    }
                }
            }
            catch (error) {
                //@ts-ignore
                console.error(`Error fetching prices: ${error.message}`);
            }
        });
    }
}
exports.PriceService = PriceService;
