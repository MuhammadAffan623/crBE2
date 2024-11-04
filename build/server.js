"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const currencyRoutes_1 = __importDefault(require("./routes/currencyRoutes"));
require("./cron/index");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: "100kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "100kb" }));
app.use((0, helmet_1.default)());
app.get("/", (req, res) => {
    res.send("SERVER IS RUNNING ");
});
app.use("/api", currencyRoutes_1.default);
server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map