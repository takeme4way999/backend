-- 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-12 | 大模型：gpt-6.1-sol
CREATE TABLE xtx_knowledge_chunks (
 xtx_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 xtx_file_id CHAR(64) NOT NULL,
 xtx_filename VARCHAR(200) NOT NULL,
 xtx_index INT UNSIGNED NOT NULL,
 xtx_content TEXT NOT NULL,
 xtx_original MEDIUMBLOB NULL,
 xtx_size INT UNSIGNED NOT NULL,
 xtx_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY xtx_file_chunk (xtx_file_id, xtx_index)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
