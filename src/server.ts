import db from "./db";
import configs from "./configs";
import app from "./app";

async function startServer() {
  try {
    await db.getConnection();
    app.listen(configs.port, () => {
      console.log(`Server running on port ${configs.port}`);
    });
  } catch (error) {
    console.log(error);
    db.end();
  }
}

startServer();
