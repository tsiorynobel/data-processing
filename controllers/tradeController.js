import { getAll, filterTrades} from "../models/tradeModel.js";

export const getAllTrades = async (req , res) => {
    try { 
        const trades = await getAll();
        res.status(200).json(trades);
        
        
    } catch (error) {
        res.status(500).json({message:'Erreur:',error : error.message });
        
    }
};

export const calculateProfitabity = async (req , res) => {
    try {
        const { symbol, startTime, endTime } = req.query;
    
        if (!symbol || !startTime || !endTime) {
          return res.status(400).json({ message: "Les paramètres 'symbol', 'startTime' et 'endTime' sont requis." });
        }
    
        console.log("📌 Paramètres reçus :", { symbol, startTime, endTime });
    
        const filteredTrades = await filterTrades(symbol, startTime, endTime);
    
        console.log("Type de filteredTrades :", typeof filteredTrades);
        console.log("Contenu de filteredTrades :", JSON.stringify(filteredTrades, null, 2));
        console.log("Longueur de filteredTrades :", filteredTrades.length);
    
        if (!Array.isArray(filteredTrades) || filteredTrades.length < 2) {
          console.error("Données filtrées insuffisantes ou invalides :", filteredTrades);
          return res.status(404).json({ message: "Pas assez de trades pour calculer la rentabilité." });
        }
    
        filteredTrades.forEach((trade, index) => {
          console.log(`Trade ${index} :`, JSON.stringify(trade, null, 2));
          console.log(`Prix du trade ${index} :`, trade.price);
        });
    
        const initialPrice = parseFloat(filteredTrades[0]?.price);
        const finalPrice = parseFloat(filteredTrades[filteredTrades.length - 1]?.price);
    
        if (isNaN(initialPrice) || isNaN(finalPrice)) {
          console.error("Erreur : Les prix initiaux ou finaux ne sont pas des nombres.");
          return res.status(500).json({ message: "Les prix initiaux ou finaux ne sont pas des nombres." });
        }
    
        console.log("Initial Price :", initialPrice);
        console.log("Final Price :", finalPrice);
    
        const profitability = ((finalPrice - initialPrice) / initialPrice) * 100;
    
        console.log(`Calcul de la rentabilité : (( ${finalPrice} - ${initialPrice} ) / ${initialPrice} ) * 100`);
    
        return res.status(200).json({
          symbol,
          startTime,
          endTime,
          initialPrice,
          finalPrice,
          profitability: profitability.toFixed(2) + " %",
        });
      } catch (error) {
        console.error(" Erreur dans calculateProfitability :", error.message);
        return res.status(500).json({ error: "Erreur serveur" });
      } 

};