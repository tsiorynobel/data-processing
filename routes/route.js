import express from 'express';
import TradeController from '../controllers/tradeController.js';

const route = express.Router();

route.get('/', TradeController.getAllTrades);

export default route;
