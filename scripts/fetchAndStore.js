import sequelize from "../config/database.js";

(async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: false });
    } 
    catch (error) {
      console.error(error.message);
    } 
    
    finally {
      process.exit();
    }
  })();