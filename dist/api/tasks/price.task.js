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
exports.startPriceFetchingTask = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const price_service_1 = require("../service/price.service");
const priceService = new price_service_1.PriceService();
const CRON_SCHEDULE = '0 * * * *';
const startPriceFetchingTask = () => {
    priceService.fetchAndStorePrices();
    node_cron_1.default.schedule(CRON_SCHEDULE, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Fetching prices from CoinGecko...');
        yield priceService.fetchAndStorePrices();
    }));
};
exports.startPriceFetchingTask = startPriceFetchingTask;
