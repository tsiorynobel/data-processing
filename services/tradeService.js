import tradeModel from "../models/tradeModel.js";
import axios from "axios";
import { ERROR_PARAMS, ERROR_TRADES, ERROR_PRICE,ERROR_FILTER, ERROR_DATA, BXBT } from "../utils/constante.js";


class TradeService {

    static async getAllTradesService() {
        return await tradeModel.findAll();
    }

    static async filterTrades(symbol, startTime, endTime) {
        try {
          const res = await this.getAllTradesService();
            const trades = res.map(trade => trade.dataValues);

          if (!Array.isArray(trades)) {
            throw new Error(ERROR_DATA);
          }
      
          const filteredBySymbol = trades.filter(trade => trade.symbol === BXBT);

          const filteredByStartTime = filteredBySymbol.filter(trade =>
            trade.timestamp && new Date(trade.timestamp) >= new Date(startTime)
          );
      
          const finalFilteredTrades = filteredByStartTime.filter(trade =>
            new Date(trade.timestamp) <= new Date(endTime)
          );

          return finalFilteredTrades;

        } catch (error) {
          console.error(ERROR_FILTER, error.message);
          throw error;
        }
  };

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
    
    static async calculateProfitabilityService(symbol, startTime, endTime) {
        if (!symbol || !startTime || !endTime) {
            throw new Error(ERROR_PARAMS);
        }

        const filteredTrades = await this.filterTrades(symbol, startTime, endTime);

        if (!Array.isArray(filteredTrades) || filteredTrades.length < 2) {
            throw new Error(ERROR_TRADES);
        }

        const initialPrice = parseFloat(filteredTrades[0]?.price);
        const finalPrice = parseFloat(filteredTrades[filteredTrades.length - 1]?.price);

        if (isNaN(initialPrice) || isNaN(finalPrice)) {
            throw new Error(ERROR_PRICE);
        }

        const profitability = ((finalPrice - initialPrice) / initialPrice) * 100;

        return {
            symbol,
            startTime,
            endTime,
            initialPrice,
            finalPrice,
            profitability: profitability.toFixed(2) + " %",
        };
    }


}

export default TradeService;



    