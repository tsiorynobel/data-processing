import express from 'express';
import TradeController from '../controllers/tradeController.js';

const route = express.Router();

route.get('/', TradeController.getAllTrades);
route.get('/calculate',TradeController.calculateProfitability);
route.get('/stat',TradeController.getStat);

export default route;
