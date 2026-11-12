/* 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-12 | 大模型：gpt-6.1-sol */
const xtx_model = require('../models/xtx_chat');
exports.xtx_chat = async (xtx_req, xtx_res) => {
  const xtx_messages = xtx_req.body?.xtx_messages;
  if (!Array.isArray(xtx_messages) || !xtx_messages.length || xtx_messages.length > 19 || xtx_messages.some((xtx_item, xtx_index) => !xtx_item || xtx_item.role !== (xtx_index % 2 ? 'assistant' : 'user') || typeof xtx_item.content !== 'string' || !xtx_item.content.trim() || xtx_item.content.length > 4000) || xtx_messages.at(-1).role !== 'user') {
    return xtx_res.status(400).json({ code: 400, msg: '请提供交替排列的用户与助手消息，最后一条为用户消息；最多 19 条，每条 1～4000 字', data: {} });
  }
  if (!process.env.SILICONFLOW_API_KEY) return xtx_res.status(503).json({ code: 503, msg: '请先在后端 .env 配置 API Key', data: {} });
  try {
    const xtx_data = await xtx_model.xtx_complete(xtx_messages.map(xtx_item => ({ role: xtx_item.role, content: xtx_item.content })));
    xtx_res.json({ code: 0, msg: '回复成功', data: xtx_data });
  } catch (xtx_error) {
    const xtx_messages = { 401: 'API Key 无效，请检查后端配置', 403: '当前账号没有模型访问权限', 402: '账户余额不足', 404: '指定模型不可用，请检查模型名称', 400: '模型或请求参数不受支持，请检查模型配置', 429: '请求过于频繁或额度受限，请稍后重试' };
    const xtx_msg = xtx_error.name === 'TimeoutError' ? '模型响应超时，请稍后重试' : xtx_messages[xtx_error.xtx_status] || 'AI 服务暂不可用，请稍后重试';
    xtx_res.status(502).json({ code: 502, msg: xtx_msg, data: {} });
  }
};
