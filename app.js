/* 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-09 | 大模型：GPT-6 */
const xtx_express = require('express');
const xtx_cors = require('cors');
const xtx_path = require('node:path');
const xtx_app = xtx_express();
xtx_app.disable('x-powered-by');
xtx_app.use(xtx_cors());
xtx_app.use(xtx_express.json());
xtx_app.use('/api', require('./routes/xtx_api'));
xtx_app.use(xtx_express.static(xtx_path.join(__dirname, '../frontend')));
xtx_app.use((xtx_req, xtx_res) => {
  xtx_res.status(404).json({ code: 404, msg: '资源不存在', data: {} });
});
xtx_app.use((xtx_error, xtx_req, xtx_res, xtx_next) => {
  console.error('请求处理失败：', xtx_error.message);
  const xtx_status = xtx_error.status === 400 ? 400 : 500;
  xtx_res.status(xtx_status).json({ code: xtx_status, msg: xtx_status === 400 ? '请求格式错误' : '服务器内部错误', data: {} });
});
if (require.main === module) {
  xtx_app.listen(8909, () => console.log('拾光已启动：http://localhost:8909'));
}
module.exports = xtx_app;
