import api from '../config/api.js';

export const getAll = async ()=>{ 
    const res = await api.get('/');
    return res.data;
}

export const filterTrades = async (symbol,startTime,endTime) =>{ 
    try {
        const res = await api.get("/");
        const trades = res.data;
      
        if (!Array.isArray(trades)) {
          throw new Error("Les données reçues ne sont pas un tableau.");
        }

        const filteredBySymbol = trades.filter(trade => trade.symbol === symbol);
      
        const filteredByStartTime = filteredBySymbol.filter(trade =>
          trade.timestamp && new Date(trade.timestamp) >= new Date(startTime)
        );
      
        const finalFilteredTrades = filteredByStartTime.filter(trade =>
          new Date(trade.timestamp) <= new Date(endTime)
        );

      
      
        return finalFilteredTrades;
      } catch (error) {
        console.error("Erreur lors du filtrage :", error.message);
        throw error;
      }

}
