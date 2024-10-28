import app from "./app";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const HOST = process.env.HOST ? process.env.HOST : "localhost";

app.listen(PORT, HOST, () => {
  console.log(`[ready] http://${HOST}:${PORT}`);
});
