import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import currencyRoutes from "./routes/currencyRoutes";
import "./cron/index";
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(helmet());
app.get("/", (req, res) => {
  res.send("SERVER IS RUNNING ");
});
app.use("/api", currencyRoutes);
server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
