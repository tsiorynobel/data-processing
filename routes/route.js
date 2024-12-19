import express from 'express';
import { getAllTrades,calculateProfitabity } from '../controllers/tradeController.js';

const route = express.Router();

route.get('/', getAllTrades);
route.get('/calculate',calculateProfitabity);

export default route;
