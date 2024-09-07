"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const configs_1 = __importDefault(require("./configs"));
const access = {
    uri: configs_1.default.db.uri,
    connectionLimit: configs_1.default.db.poolSize,
    waitForConnections: true,
};
const connection = promise_1.default.createPool(access);
exports.default = connection;
