/* 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-09 | 大模型：GPT-6 */
const xtx_router = require('express').Router();
const xtx_controller = require('../controllers/xtx_project');
xtx_router.get('/health', xtx_controller.xtx_health);
xtx_router.get('/project', xtx_controller.xtx_getProject);
xtx_router.get('/news', require('../controllers/xtx_news').xtx_listNews);
xtx_router.post('/database/test', require('../controllers/xtx_database').xtx_testConnection);
xtx_router.get('/gallery', require('../controllers/xtx_gallery').xtx_listGallery);
xtx_router.post('/chat', require('../controllers/xtx_chat').xtx_chat);
xtx_router.use('/knowledge', require('./xtx_knowledge'));
module.exports = xtx_router;
