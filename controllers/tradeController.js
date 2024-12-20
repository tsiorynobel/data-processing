import TradeService from "../services/tradeService.js";
import {ERROR_SERVER } from "../utils/constante.js";

class TradeController {
    static async getAllTrades(req, res, next) {
        try {
            const trades = await TradeService.getAllTradesService();
            res.status(200).json(trades);
        } catch (error) {
            next(ERROR_SERVER,error.message);
        }
    }
}   

export default TradeController;