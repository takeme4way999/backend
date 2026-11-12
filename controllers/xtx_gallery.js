/* 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-09 | 大模型：GPT-6 */
const xtx_model = require('../models/xtx_gallery');
exports.xtx_listGallery = async (xtx_req, xtx_res) => {
  try {
    const xtx_items = await xtx_model.xtx_listGallery();
    xtx_res.json({ code: 0, msg: '获取图文成功', data: { xtx_total: xtx_items.length, xtx_items } });
  } catch (xtx_error) {
    console.error('图文查询失败：', xtx_error.code);
    xtx_res.status(503).json({ code: 503, msg: '图文数据暂不可用，请检查数据库连接及图文表', data: {} });
  }
};
