"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conn = void 0;
const mysql2_1 = require("mysql2");
exports.conn = (0, mysql2_1.createConnection)({
    host: 'localhost',
    user: 'root',
    database: 'test'
});
