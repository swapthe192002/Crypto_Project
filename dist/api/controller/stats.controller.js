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
exports.getStats = getStats;
const crypto_service_1 = require("../service/crypto.service");
const coin_validator_1 = require("../validator/coin.validator");
const cryptoStatsService = new crypto_service_1.CryptoStatsService();
function getStats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const coin = req.query.coin;
        if (!coin) {
            res.status(400).json({ error: 'Query parameter "coin" is required.' });
            return;
        }
        const validationResult = coin_validator_1.coinValidator.safeParse(coin);
        if (!validationResult.success) {
            res.status(400).json({
                error: 'Invalid coin. Allowed values are: bitcoin, matic-network, ethereum.',
            });
            return;
        }
        const validatedCoin = validationResult.data;
        try {
            const stats = yield cryptoStatsService.getCryptoStats(validatedCoin);
            if (!stats) {
                res.status(404).json({
                    error: 'Cryptocurrency not found or no price data available.',
                });
                return;
            }
            res.status(200).json(stats);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Failed to fetch cryptocurrency stats.' });
            }
        }
    });
}
