import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import router from './router';
import { startPriceFetchingTask } from './api/tasks/price.task';
import swaggerUi from 'swagger-ui-express';
import { CryptoStatsService } from './api/service/crypto.service';
import swaggerDocs from './api/docs/swagger.docs';

dotenv.config();

class App {
  public app: express.Application;
  public cryptoService: CryptoStatsService;

  constructor() {
    this.app = express();
    this.cryptoService = new CryptoStatsService();
    this.loadMiddlewares();
    this.configureRoutes();
    this.setupSwagger();
    connectDB();
    this.initializeData();
    startPriceFetchingTask();
  }

  private configureRoutes() {
    this.app.use('/api', router);
  }

  private loadMiddlewares(): void {
    this.app.use(express.json());
  }

  private async initializeData(): Promise<void> {
    await this.cryptoService.initializeCryptos();
  }

  private setupSwagger(): void {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}

export default new App().app;
