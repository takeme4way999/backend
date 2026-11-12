/* 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-09 | 大模型：GPT-6 */
const xtx_project = require('../models/xtx_project');
exports.xtx_health = (xtx_req, xtx_res) => {
  xtx_res.json({ code: 0, msg: '服务运行正常', data: { xtx_status: 'ok' } });
};
exports.xtx_getProject = (xtx_req, xtx_res) => {
  xtx_res.json({ code: 0, msg: '获取成功', data: xtx_project });
};
