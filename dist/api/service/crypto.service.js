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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoStatsService = void 0;
const Price_1 = require("../models/Price");
const Crypto_1 = require("../models/Crypto");
class CryptoStatsService {
    constructor() {
        this.defaultCryptos = [
            { name: 'bitcoin', symbol: 'BTC' },
            { name: 'ethereum', symbol: 'ETH' },
            { name: 'matic-network', symbol: 'MATIC' },
        ];
    }
    initializeCryptos() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const cryptoData of this.defaultCryptos) {
                const existingCrypto = yield Crypto_1.Crypto.findOne({ name: cryptoData.name });
                if (!existingCrypto) {
                    const crypto = new Crypto_1.Crypto(cryptoData);
                    yield crypto.save();
                    console.log(`Initialized ${cryptoData.name}`);
                }
            }
        });
    }
    getCryptoStats(coin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crypto = yield Crypto_1.Crypto.findOne({ name: coin });
                if (!crypto) {
                    return null;
                }
                const latestPrice = yield Price_1.Price.findOne({ crypto: crypto._id }).sort({
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
            }
            catch (error) {
                console.error(`Error fetching crypto stats: ${error}`);
                throw new Error('Error fetching crypto stats');
            }
        });
    }
    getDeviation(coin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crypto = yield Crypto_1.Crypto.findOne({ name: coin });
                if (!crypto) {
                    return null;
                }
                const prices = yield Price_1.Price.find({ crypto: crypto._id })
                    .sort({ timestamp: -1 })
                    .limit(100);
                if (prices.length === 0) {
                    return null;
                }
                const priceValues = prices.map((price) => price.price);
                const mean = priceValues.reduce((acc, val) => acc + val, 0) / priceValues.length;
                const variance = priceValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
                    priceValues.length;
                const deviation = Math.sqrt(variance);
                return deviation;
            }
            catch (error) {
                console.error(`Error fetching price deviation: ${error}`);
                throw new Error('Error fetching price deviation');
            }
        });
    }
}
exports.CryptoStatsService = CryptoStatsService;
