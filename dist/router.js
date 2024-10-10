"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stats_router_1 = __importDefault(require("./api/router/stats.router"));
const deviation_router_1 = __importDefault(require("./api/router/deviation.router"));
const router = (0, express_1.Router)();
const coinRoute = '/coin';
router.use(coinRoute, stats_router_1.default);
router.use(coinRoute, deviation_router_1.default);
exports.default = router;
