"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_1 = require("./repositories/users");
const app = (0, express_1.default)();
/*CORS POLICY*/
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, PUT, POST, DELETE , OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization, Content-Length, X-Requested-With",
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
/*BODY PARSER*/
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
/*COOKI PARSER*/
app.use((0, cookie_parser_1.default)());
/*STATICS FILES*/
app.use(express_1.default.static(path_1.default.resolve(__dirname, "..", "public")));
/*ROUTES*/
app.use('/test', async (req, res) => {
    const result = await (0, users_1.findByUsername)({ username: 'nazi777' });
    return res.json(result);
});
/*Error Handling*/
app.use((err, req, res) => {
    return res.status(500).json({ mrssage: err.message });
});
exports.default = app;
