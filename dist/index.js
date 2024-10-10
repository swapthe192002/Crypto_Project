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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const router_1 = __importDefault(require("./router"));
const price_task_1 = require("./api/tasks/price.task");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const crypto_service_1 = require("./api/service/crypto.service");
const swagger_docs_1 = __importDefault(require("./api/docs/swagger.docs"));
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.cryptoService = new crypto_service_1.CryptoStatsService();
        this.loadMiddlewares();
        this.configureRoutes();
        this.setupSwagger();
        (0, db_1.connectDB)();
        this.initializeData();
        (0, price_task_1.startPriceFetchingTask)();
    }
    configureRoutes() {
        this.app.use('/api', router_1.default);
    }
    loadMiddlewares() {
        this.app.use(express_1.default.json());
    }
    initializeData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cryptoService.initializeCryptos();
        });
    }
    setupSwagger() {
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_docs_1.default));
    }
}
exports.default = new App().app;
