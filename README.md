<!-- 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-12 | 大模型：gpt-6.1-sol -->
# 拾光后端

姓名：xutongxin · 学号：24001010909

Node.js + Express + MySQL，MVC 风格，包含数据库连接测试、科技新闻、图文列表、AI 聊天、知识库文件上传及 RAG 客服。接口前缀 `/api/`，端口固定为 8909。

## 本地运行

需要 Node.js 22 或更高版本，以及 MySQL。

```powershell
cnpm i
# cnpm 不可用或安装失败时使用 npm i
npm start
# 开发模式：npm run dev
```

在仓库根目录创建本机 `.env`，填写以下变量（不提交凭据）：

```dotenv
DB_HOST=<数据库主机>
DB_USER=<数据库用户>
DB_PASSWORD=<数据库密码>
DB_NAME=<数据库名>
SILICONFLOW_API_KEY=<SiliconFlow密钥>
SILICONFLOW_MODEL=deepseek-ai/DeepSeek-V4-Flash
```

按 `xtx_database.md` 中的 SQL 代码块顺序恢复数据库；该文件含建库、建表及初始数据，知识库原文件以十六进制 BLOB 保存。DB_NAME 应与 SQL 中的数据库名一致。单独的 xtx_news.sql、xtx_gallery.sql、xtx_knowledge.sql 用于查看各模块结构，勿在完整恢复后重复执行。

启动后可访问 `http://localhost:8909/api/health` 验证应用存活。健康检查不代表数据库在线。

## 目录与接口

- `app.js`：服务入口，托管相邻的 `../frontend/`（如存在）。这个仓库只包含后端，独立克隆后直接使用 API；如需原项目网页，把前端放在该仓库的同级 `frontend/`。
- `config/`：MySQL 连接池。
- `controllers/`、`models/`、`routes/`：控制器、模型、路由。
- `services/`：TXT/PDF 文本解析与切片。
- `xtx_interface.md`：接口参数与 JSON 示例。
- `xtx_database.md`：数据库操作及重建 SQL 的追加记录。

主要接口：GET `/api/health`、GET `/api/project`、POST `/api/database/test`、GET `/api/news`、GET `/api/gallery`、POST `/api/chat`；知识库接口为 GET `/api/knowledge/files`、GET `/api/knowledge/files/:xtx_id`、POST `/api/knowledge/upload`、POST `/api/knowledge/ask`。

知识库支持 UTF-8 TXT 与含文本层的 PDF（单文件 5 MB），使用关键词检索后调用模型，返回引用来源。扫描版 PDF 需要先 OCR。原文件和文本片段持久化在 MySQL，上传 SQL 追加到 xtx_database.md。模型请求和返回内容会按功能记录到控制台，不包含 API Key。

JSON 接口统一返回 `{ "code": 0, "msg": "提示信息", "data": {} }`，非 0 表示失败；文件下载为二进制附件。当前开发服务允许所有来源跨域访问。

此公开仓库仅发布教学示例 SQL；用户实际上传的知识文件记录保留在本机。
