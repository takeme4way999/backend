<!-- 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-09 | 大模型：GPT-6 -->
# 接口变更记录（仅追加）

## 2026-11-09 · 初始化

### GET /api/health
- 请求参数：无。示例：`GET /api/health`
- HTTP 状态：200
- 响应：`{"code":0,"msg":"服务运行正常","data":{"xtx_status":"ok"}}`
- 仅检查应用存活，不检查数据库。
- 修改时间：2026-11-09

### GET /api/project
- 请求参数：无。示例：`GET /api/project`
- HTTP 状态：200
- 响应：`{"code":0,"msg":"获取成功","data":{"xtx_name":"拾光 · 页面导航","xtx_category":"自选","xtx_author":"xutongxin","xtx_studentId":"24001010909"}}`
- 修改时间：2026-11-09

### 通用错误与跨域
- 不存在的路径：HTTP 404，`{"code":404,"msg":"资源不存在","data":{}}`
- JSON 解析失败：HTTP 400，`{"code":400,"msg":"请求格式错误","data":{}}`
- 内部错误：HTTP 500，`{"code":500,"msg":"服务器内部错误","data":{}}`
- 所有来源均可跨域访问，OPTIONS 预检由 cors 中间件处理。
- 修改时间：2026-11-09

## 2026-11-09 · 新增 POST /api/database/test

- HTTP 方法：POST
- 请求参数：可选字符串 xtx_user（最多 128 字符）、xtx_password（最多 1024 字符）；省略字段时使用 backend/.env 中对应配置。显式空密码表示使用空密码，不回退默认值。
- 默认配置请求示例：`{}`
- 自定义请求示例：`{"xtx_user":"xtx_demo","xtx_password":"<用户输入的密码>"}`
- 成功：HTTP 200，`{"code":0,"msg":"MySQL 连接成功，已完成查询验证","data":{"xtx_connected":true}}`
- 登录失败：HTTP 502，`{"code":502,"msg":"连接失败：用户名或密码错误，或该用户没有登录权限","data":{"xtx_connected":false}}`
- 参数无效：HTTP 400，`{"code":400,"msg":"用户名或密码格式不正确","data":{}}`
- 同时处理服务未启动、主机无法解析和超时，返回相应中文提示；不返回密码或原始数据库错误。
- 连接目标由服务端 DB_HOST 决定，使用 MySQL 默认端口；不指定数据库名，使用 SELECT 1 验证连接，测试后关闭连接。
- 修改时间：2026-11-09

## 2026-11-09 · 新增 GET /api/news

- 请求参数：无。请求示例：`GET /api/news`。
- 从 MySQL 的 xtx_news 表读取全部新闻，按 xtx_published_at DESC、xtx_id DESC 排序。
- 成功 HTTP 200；响应示例（示意单条数据）：
```json
{"code":0,"msg":"获取新闻成功","data":{"xtx_total":1,"xtx_items":[{"xtx_id":1,"xtx_title":"校园人工智能实验室开展模型应用体验活动","xtx_category":"人工智能","xtx_summary":"示例新闻：活动围绕文本摘要与图像识别展开。","xtx_source":"拾光编辑部 · 示例数据","xtx_published_at":"2026-11-09 09:00:00"}]}}
```
- 空表成功返回：`{"code":0,"msg":"获取新闻成功","data":{"xtx_total":0,"xtx_items":[]}}`。
- 查询失败 HTTP 503：`{"code":503,"msg":"新闻数据暂不可用，请检查数据库连接及新闻表","data":{}}`。
- 修改时间：2026-11-09。

## 2026-11-09 · 新增 GET /api/gallery

- HTTP 方法：GET；请求参数：无。请求示例：`GET /api/gallery`。
- 数据来源：独立的 MySQL 表 xtx_gallery，按 xtx_published_at DESC、xtx_id DESC 排序。
- 成功 HTTP 200。示例（只列一条，实际返回所有记录）：
```json
{"code":0,"msg":"获取图文成功","data":{"xtx_total":1,"xtx_items":[{"xtx_id":1,"xtx_title":"晨光里的城市","xtx_category":"城市观察","xtx_summary":"用几何轮廓记录城市天际线，在楼宇与晨光之间发现秩序之美。","xtx_source":"拾光原创插画 · 示例内容","xtx_image":"/images/gallery/xtx_1.svg","xtx_alt":"城市建筑与晨日插画","xtx_published_at":"2026-11-09 09:00:00"}]}}
```
- 空表：HTTP 200，`{"code":0,"msg":"获取图文成功","data":{"xtx_total":0,"xtx_items":[]}}`。
- 查询失败：HTTP 503，`{"code":503,"msg":"图文数据暂不可用，请检查数据库连接及图文表","data":{}}`。
- 修改时间：2026-11-09。

## 2026-11-12 · 新增 POST /api/chat

- 请求参数：xtx_messages 为交替的 user/assistant 消息数组，首尾为 user；最多 19 条，每条 content 为 1～4000 字字符串。服务端自动加入系统提示词“你是一个有用的高级学习助手”。
- 请求示例：`{"xtx_messages":[{"role":"user","content":"你好，请介绍一下你自己"}]}`。
- 上游：POST https://api.siliconflow.cn/v1/chat/completions，模型由 .env 中 SILICONFLOW_MODEL 指定，Key 从 SILICONFLOW_API_KEY 读取；非流式，max_tokens=2048，上游超时 60 秒。
- 成功 HTTP 200：
```json
{"code":0,"msg":"回复成功","data":{"xtx_reply":"你好！我是高级学习助手。","xtx_model":"deepseek-ai/DeepSeek-V4-Flash","xtx_usage":{"prompt_tokens":18,"completion_tokens":20,"total_tokens":38},"xtx_finish_reason":"stop"}}
```
- 参数无效 HTTP 400：`{"code":400,"msg":"请提供交替排列的用户与助手消息，最后一条为用户消息；最多 19 条，每条 1～4000 字","data":{}}`。
- 未配置 Key HTTP 503：`{"code":503,"msg":"请先在后端 .env 配置 API Key","data":{}}`。
- 上游失败 HTTP 502：`{"code":502,"msg":"AI 服务暂不可用，请稍后重试","data":{}}`。具体按鉴权失败、权限、余额、模型、限流及超时返回中文提示，不回传凭据与原始上游错误。
- 修改时间：2026-11-12。已实际调用指定模型，得到有效文本回复。

## 2026-11-12 · 知识库管理与 RAG 客服

### GET /api/knowledge/files
- 参数：无；示例：`GET /api/knowledge/files`。
- HTTP 200 示例：`{"code":0,"msg":"获取知识库成功","data":{"xtx_files":[{"xtx_file_id":"<64位SHA256>","xtx_filename":"xtx_service_guide.txt","xtx_size":1352,"xtx_chunks":4,"xtx_created_at":"2026-11-12T08:00:00.000Z"}]}}`。
- 空库 xtx_files 为 []；失败 HTTP 503，`{"code":503,"msg":"知识库暂不可用，请检查数据库","data":{}}`。
- 修改时间：2026-11-12。

### POST /api/knowledge/upload
- multipart/form-data，文件字段 xtx_file，一次一个 TXT/PDF，最大 5 MB；TXT 需 UTF-8，PDF 需可提取文本层，不支持扫描图片 OCR。提取文本限 20～100000 字，最多 500 个片段。
- 请求示例：`curl -F "xtx_file=@frontend/files/xtx_service_guide.txt" http://localhost:8909/api/knowledge/upload`。
- HTTP 200：`{"code":0,"msg":"文件已解析并加入知识库","data":{"xtx_file_id":"<64位SHA256>","xtx_filename":"xtx_service_guide.txt","xtx_chunks":4}}`。
- 原文件与片段持久化在 xtx_knowledge_chunks，原文件仅存于首片段。相同内容 SHA256 去重。
- 失败示例：HTTP 409，`{"code":409,"msg":"相同内容的文件已上传，无需重复上传","data":{}}`；HTTP 400，`{"code":400,"msg":"文件超过 5 MB 限制","data":{}}`；无文件/解析失败也为 400；入库失败为 503。
- 上传成功的 INSERT（含原文件十六进制）追加到 xtx_database.md。
- 修改时间：2026-11-12。

### GET /api/knowledge/files/:xtx_id
- xtx_id 为 64 位小写 SHA256，示例：`GET /api/knowledge/files/a0220deba1c9003cccad1eec2bd203afe918591e3ea19942ca9ac5cda67bcfde`。
- 成功 HTTP 200 为附件二进制下载，Content-Disposition 携带原文件名；此文件传输接口不使用 JSON 包裹。
- 失败 HTTP 400/404/503，JSON 示例：`{"code":404,"msg":"知识库文件不存在","data":{}}`。
- 修改时间：2026-11-12。

### POST /api/knowledge/ask
- JSON 参数 xtx_question，2～2000 字。示例：`{"xtx_question":"配送运费是多少？"}`。
- 本地关键词/中文双字片段检索，取匹配分数至少 2 的前 4 个片段；不调用外部向量服务。系统提示要求仅依据资料回答，并标注片段编号；没有匹配时不调用 LLM。
- 成功 HTTP 200，结构示例：
```json
{"code":0,"msg":"知识库回答成功","data":{"xtx_reply":"满99元免基础运费，否则8元。[1]","xtx_model":"deepseek-ai/DeepSeek-V4-Flash","xtx_usage":{"total_tokens":199},"xtx_finish_reason":"stop","xtx_upstream":{"choices":[{"message":{"role":"assistant","content":"满99元免基础运费，否则8元。[1]"}}]},"xtx_sources":[{"xtx_id":6,"xtx_file_id":"<64位SHA256>","xtx_filename":"xtx_order_policy.txt","xtx_index":2,"xtx_content":"配送与运费：单笔实付满99元免基础运费，未满99元8元。","xtx_score":4}],"xtx_llm_called":true,"xtx_request":{"model":"deepseek-ai/DeepSeek-V4-Flash","messages":[{"role":"system","content":"客服约束与检索原文"},{"role":"user","content":"配送运费是多少？"}],"stream":false,"max_tokens":2048}}}
```
- 无匹配：`{"code":0,"msg":"未检索到相关知识","data":{"xtx_reply":"知识库中暂无相关依据，请补充问题关键词或上传相关文件，必要时联系人工客服。","xtx_sources":[],"xtx_llm_called":false,"xtx_request":null}}`。
- 参数错误 HTTP 400；数据库失败 HTTP 503；模型超时/服务失败 HTTP 502，返回 JSON {code,msg,data}，data 包含已检索到的 xtx_sources 与无 Key 的 xtx_request 供排查。
- 浏览器与后端控制台打印模型请求与收到的数据。Key 只在 .env，日志中不包含 Authorization。
- 每次提问独立检索，不使用上一次对话作为依据；客户端可保留对话展示。
- 修改时间：2026-11-12。
