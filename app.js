import express from 'express';
import dataParser from 'body-parser';
import route from './routes/route.js';
import cors from 'cors';


const app= express();

app.use(cors({origin: 'http://localhost:3000'}));

app.use(dataParser.json());

app.use('/api/trade',route);


export default app;