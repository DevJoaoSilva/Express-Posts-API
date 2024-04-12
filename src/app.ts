import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import routes from './routes';
import connectDB from './db/DB';

class App {
    public express: express.Application;

    public constructor() {
        this.express = express();
        this.DB();
        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(cors());
    }

    private routes() {
        this.express.use(routes);
    }

    private async DB() {
        await connectDB();
    }
}

export default new App().express;
