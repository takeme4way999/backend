/* 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-12 | 大模型：gpt-6.1-sol */
const xtx_router = require('express').Router();
const xtx_multer = require('multer');
const xtx_controller = require('../controllers/xtx_knowledge');
const xtx_upload = xtx_multer({ storage: xtx_multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 0 } }).single('xtx_file');
xtx_router.get('/files', xtx_controller.xtx_list);
xtx_router.get('/files/:xtx_id', xtx_controller.xtx_download);
xtx_router.post('/upload', (xtx_req, xtx_res, xtx_next) => {
  xtx_upload(xtx_req, xtx_res, xtx_error => {
    if (xtx_error) return xtx_res.status(400).json({ code: 400, msg: xtx_error.code === 'LIMIT_FILE_SIZE' ? '文件超过 5 MB 限制' : '请通过 xtx_file 字段上传一个文件', data: {} });
    xtx_next();
  });
}, xtx_controller.xtx_upload);
xtx_router.post('/ask', xtx_controller.xtx_ask);
module.exports = xtx_router;
