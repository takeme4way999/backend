/* 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-09 | 大模型：GPT-6 */
const xtx_mysql = require('mysql2/promise');
const xtx_path = require('node:path');
require('dotenv').config({ path: xtx_path.join(__dirname, '../.env'), quiet: true });
exports.xtx_testConnection = async (xtx_req, xtx_res) => {
  const { xtx_user, xtx_password } = xtx_req.body || {};
  if ((xtx_user !== undefined && (typeof xtx_user !== 'string' || xtx_user.length > 128)) ||
      (xtx_password !== undefined && (typeof xtx_password !== 'string' || xtx_password.length > 1024))) {
    return xtx_res.status(400).json({ code: 400, msg: '用户名或密码格式不正确', data: {} });
  }
  let xtx_connection;
  try {
    // 不指定数据库：测试服务器登录，不要求业务数据库已经创建。
    xtx_connection = await xtx_mysql.createConnection({
      host: process.env.DB_HOST,
      user: xtx_user === undefined ? process.env.DB_USER : xtx_user,
      password: xtx_password === undefined ? process.env.DB_PASSWORD : xtx_password,
      connectTimeout: 5000
    });
    await xtx_connection.query({ sql: 'SELECT 1 AS xtx_connected', timeout: 5000 });
    return xtx_res.json({ code: 0, msg: 'MySQL 连接成功，已完成查询验证', data: { xtx_connected: true } });
  } catch (xtx_error) {
    const xtx_messages = {
      ER_ACCESS_DENIED_ERROR: '连接失败：用户名或密码错误，或该用户没有登录权限',
      ECONNREFUSED: '连接失败：MySQL 服务未启动或端口不可访问',
      ENOTFOUND: '连接失败：数据库主机地址无法解析',
      ETIMEDOUT: '连接超时：请检查 MySQL 服务和网络',
      PROTOCOL_SEQUENCE_TIMEOUT: '查询超时：请检查 MySQL 服务'
    };
    return xtx_res.status(502).json({ code: 502, msg: xtx_messages[xtx_error.code] || '连接失败：请检查数据库服务、账号权限及连接配置', data: { xtx_connected: false } });
  } finally {
    if (xtx_connection) xtx_connection.destroy();
  }
};
