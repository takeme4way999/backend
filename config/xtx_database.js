/* 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-09 | 大模型：GPT-6 */
const xtx_mysql = require('mysql2/promise');
const xtx_path = require('node:path');
require('dotenv').config({ path: xtx_path.join(__dirname, '../.env'), quiet: true });
// 连接按需建立；首页与健康检查不依赖数据库在线。
const xtx_pool = xtx_mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5
});
module.exports = xtx_pool;
