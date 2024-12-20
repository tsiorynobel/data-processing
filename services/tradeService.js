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

    static async fetchANdStoreTrades() { //NB:recup data
    const { data } = await axios.get(process.env.BITMEX_API_URL, {
        params: {
        symbol: BXBT,
        reverse: true,
        count: 1000,
        },
    });

    const trades = data.map((trade) => ({  //NB: Transforme Data avec format def
        timestamp: trade.timestamp,
        symbol: trade.symbol,
        side: trade.side,
        size: trade.size,
        price: trade.price,
    }));

    await tradeModel.bulkCreate(trades, { ignoreDuplicates: true }); //NB: agit comme issertAllData 

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

    static async  getMedianService() {
      const trades = await this.getAllTradesService();
      if (!trades || trades.length === 0) {
        return null;
      }
    
      const prices = trades.map((trade) => trade.price);
      if (!prices || prices.length === 0) {
        return null;
      }
    
      const median = await this.calculateMedian(prices);
      return median ? median.toFixed(2) : null;
    }
    

  static async calculateMedian(values) {
    if (!values || values.length === 0) return null; 
    values.sort((a, b) => a - b);
  
    const middle = Math.floor(values.length / 2);
    if (values.length % 2 !== 0) {
      return values[middle];
    }
    return (values[middle - 1] + values[middle]) / 2;
  }
  

    static async getStatService() {
      
        const trades = await this.getAllTradesService();
        const prices = trades.map(trade => trade.price);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const avgPrice = (prices.reduce((sum, price) => sum + price, 0) / prices.length).toFixed(2);

        const maxPriceTrade = trades.find(trade => trade.price === maxPrice);
        const minPriceTrade = trades.find(trade => trade.price === minPrice);

        const startDate = trades[0]?.timestamp;
        const endDate = trades[trades.length - 1]?.timestamp;

        let median = null;
        try {
          median = await this.getMedianService();
        } catch (error) {
          console.error(ERROR_DATA, error);
        }

        return {
          max: maxPrice.toFixed(2),
          maxDate: maxPriceTrade?.timestamp || null,
          min: minPrice.toFixed(2),
          minDate: minPriceTrade?.timestamp || null,
          median: median || null,
          avg: avgPrice,
          startDate,
          endDate,      
        };
    }

}

export default TradeService;
