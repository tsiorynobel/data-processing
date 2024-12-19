import express from 'express';
import dataParser from 'body-parser';
import route from './routes/route.js';


const app= express();

app.use(dataParser.json());

app.use('/api/trade',route);


export default app;