import tradeModel from "../models/tradeModel.js";
import axios from "axios";
import { ERROR_PARAMS, ERROR_TRADES, ERROR_PRICE,ERROR_FILTER, ERROR_DATA, BXBT } from "../utils/constante.js";


class TradeService {

    static async getAllTradesService() {
        return await tradeModel.findAll();
    }

    static async fetchANdStoreTrades() {
    const { data } = await axios.get(process.env.BITMEX_API_URL, {
        params: {
        symbol: BXBT,
        reverse: true,
        count: 1000,
        },
    });

    const trades = data.map((trade) => ({  
        timestamp: trade.timestamp,
        symbol: trade.symbol,
        side: trade.side,
        size: trade.size,
        price: trade.price,
    }));

    await tradeModel.bulkCreate(trades, { ignoreDuplicates: true });

    return trades;

    }
}

export default TradeService;



    