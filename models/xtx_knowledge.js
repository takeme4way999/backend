/* 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-12 | 大模型：gpt-6.1-sol */
const xtx_pool = require('../config/xtx_database');
const xtx_mysql = require('mysql2');
const xtx_fs = require('node:fs');
const xtx_path = require('node:path');
const xtx_crypto = require('node:crypto');
const xtx_logPath = xtx_path.join(__dirname, '../xtx_database.md');
exports.xtx_list = async () => {
  const [xtx_rows] = await xtx_pool.query('SELECT xtx_file_id, MAX(xtx_filename) AS xtx_filename, MAX(xtx_size) AS xtx_size, COUNT(*) AS xtx_chunks, MIN(xtx_created_at) AS xtx_created_at FROM xtx_knowledge_chunks GROUP BY xtx_file_id ORDER BY xtx_created_at DESC');
  return xtx_rows;
};
exports.xtx_original = async (xtx_id) => {
  const [xtx_rows] = await xtx_pool.execute('SELECT xtx_filename, xtx_original FROM xtx_knowledge_chunks WHERE xtx_file_id=? AND xtx_index=1', [xtx_id]);
  return xtx_rows[0];
};
exports.xtx_insert = async (xtx_name, xtx_buffer, xtx_chunks) => {
  const xtx_fileId = xtx_crypto.createHash('sha256').update(xtx_buffer).digest('hex');
  const xtx_conn = await xtx_pool.getConnection();
  const xtx_sql = xtx_mysql.format('INSERT INTO xtx_knowledge_chunks (xtx_file_id,xtx_filename,xtx_index,xtx_content,xtx_original,xtx_size) VALUES ?', [xtx_chunks.map((xtx_text, xtx_i) => [xtx_fileId, xtx_name, xtx_i + 1, xtx_text, xtx_i === 0 ? xtx_buffer : null, xtx_buffer.length])]);
  try {
    await xtx_conn.beginTransaction();
    await xtx_conn.query(xtx_sql);
    // 追加完整 SQL，包括原文件十六进制内容，便于新机器重建。
    xtx_fs.appendFileSync(xtx_logPath, `\n\n<!-- ${new Date().toISOString()} · 上传 ${xtx_fileId} -->\n\n\x60\x60\x60sql\n${xtx_sql};\n\x60\x60\x60\n`);
    await xtx_conn.commit();
    return { xtx_file_id: xtx_fileId, xtx_filename: xtx_name, xtx_chunks: xtx_chunks.length };
  } catch (xtx_error) { await xtx_conn.rollback(); throw xtx_error; }
  finally { xtx_conn.release(); }
};
exports.xtx_retrieve = async (xtx_question) => {
  const [xtx_rows] = await xtx_pool.query('SELECT xtx_id,xtx_file_id,xtx_filename,xtx_index,xtx_content FROM xtx_knowledge_chunks');
  const xtx_normalize = xtx_text => xtx_text.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  const xtx_clean = xtx_normalize(xtx_question);
  const xtx_terms = new Set(xtx_question.toLowerCase().match(/[a-z0-9]{2,}/g) || []);
  for (let xtx_i = 0; xtx_i < xtx_clean.length - 1; xtx_i++) xtx_terms.add(xtx_clean.slice(xtx_i, xtx_i + 2));
  return xtx_rows.map(xtx_row => {
    const xtx_text = xtx_normalize(xtx_row.xtx_content);
    const xtx_score = [...xtx_terms].reduce((xtx_sum, xtx_term) => xtx_sum + (xtx_text.includes(xtx_term) ? 1 : 0), 0);
    return { ...xtx_row, xtx_score };
  }).filter(xtx_row => xtx_row.xtx_score >= 2).sort((xtx_a, xtx_b) => xtx_b.xtx_score - xtx_a.xtx_score || xtx_a.xtx_id - xtx_b.xtx_id).slice(0, 4);
};
