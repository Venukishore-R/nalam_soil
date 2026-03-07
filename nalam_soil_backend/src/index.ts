import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import farmerRouter from './router'
import { initDatabase } from './config/database'

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use("/api", farmerRouter);

app.get('/', (_req, res) => res.send('Nalam soil backend is running'));

const start = async () => {
  await initDatabase();
  const PORT = Number(process.env.PORT ?? 4000);
  app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
};

start().catch((error) => {
  console.error("server-start-error", error);
  process.exit(1);
});
