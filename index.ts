import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import express, { Express, Request, Response } from 'express';

import * as Connector from './dbConnection';
import * as commentRouter from './routers/comments'
import * as apiRouter from './routers/api';

dotenv.config();


const app: Express = express();
const port: string = process.env.PORT;
const host = process.env.HOST;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/comments", commentRouter.router);
app.use("/api", apiRouter.router);

app.get('/', (req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname, 'home.html'));
});



app.listen(port, () => {
    console.log(`server is running at http://${host}:${port}`);
    Connector.dbInit();
})

