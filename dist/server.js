"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const configs_1 = __importDefault(require("./configs"));
const app_1 = __importDefault(require("./app"));
async function startServer() {
    try {
        await db_1.default.getConnection();
        app_1.default.listen(configs_1.default.port, () => {
            console.log(`Server running on port ${configs_1.default.port}`);
        });
    }
    catch (error) {
        console.log(error);
        db_1.default.end();
    }
}
startServer();
