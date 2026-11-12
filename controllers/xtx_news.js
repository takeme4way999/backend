/* 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-09 | 大模型：GPT-6 */
const xtx_model = require('../models/xtx_news');
exports.xtx_listNews = async (xtx_req, xtx_res) => {
  try {
    const xtx_items = await xtx_model.xtx_listNews();
    xtx_res.json({ code: 0, msg: '获取新闻成功', data: { xtx_total: xtx_items.length, xtx_items } });
  } catch (xtx_error) {
    console.error('新闻查询失败：', xtx_error.code);
    xtx_res.status(503).json({ code: 503, msg: '新闻数据暂不可用，请检查数据库连接及新闻表', data: {} });
  }
};
