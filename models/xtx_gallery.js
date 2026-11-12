/* 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-09 | 大模型：GPT-6 */
const xtx_pool = require('../config/xtx_database');
exports.xtx_listGallery = async () => {
  const [xtx_rows] = await xtx_pool.query({ sql: "SELECT xtx_id, xtx_title, xtx_category, xtx_summary, xtx_source, xtx_image, xtx_alt, DATE_FORMAT(xtx_published_at, '%Y-%m-%d %H:%i:%s') AS xtx_published_at FROM xtx_gallery ORDER BY xtx_published_at DESC, xtx_id DESC", timeout: 5000 });
  return xtx_rows;
};
