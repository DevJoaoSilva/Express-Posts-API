import express from 'express';
import cors from 'cors';
import 'dotenv/config';

class App {
    public express: express.Application;

    public constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private routes() {
        this.express.get('/', (req, res) => res.send('Hello world'));
    }
}

export default new App().express;
