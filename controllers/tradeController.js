import TradeService from "../services/tradeService.js";
import {ERROR_SERVER, ERROR_ENOUGTH, PARAM } from "../utils/constante.js";

class TradeController {
    static async getAllTrades(req, res, next) {
        try {
            const trades = await TradeService.getAllTradesService();
            res.status(200).json(trades);
        } catch (error) {
            next(error);
        }
    }

    static async calculateProfitability(req, res) {
        try {
            const { symbol, startTime, endTime } = req.query;
            const result = await TradeService.calculateProfitabilityService(symbol, startTime, endTime);
            res.status(200).json(result);
        } catch (error) {
            if (error.message.includes(PARAM)) {
                res.status(400).json({ message: error.message });
            } else if (error.message.includes(ERROR_ENOUGTH)) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: ERROR_SERVER });
            }
        }
    }
}   

export default TradeController;