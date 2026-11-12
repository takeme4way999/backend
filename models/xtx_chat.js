/* 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-12 | 大模型：gpt-6.1-sol */
require('dotenv').config({ path: require('node:path').join(__dirname, '../.env'), quiet: true });
exports.xtx_complete = async (xtx_messages, xtx_system = '你是一个有用的高级学习助手', xtx_trace = false) => {
  const xtx_response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}` },
    body: JSON.stringify({ model: process.env.SILICONFLOW_MODEL, messages: [{ role: 'system', content: xtx_system }, ...xtx_messages], stream: false, max_tokens: 2048 }),
    signal: AbortSignal.timeout(60000)
  });
  const xtx_data = await xtx_response.json();
  if (!xtx_response.ok) {
    const xtx_error = new Error('上游调用失败');
    xtx_error.xtx_status = xtx_response.status;
    throw xtx_error;
  }
  if (typeof xtx_data.choices?.[0]?.message?.content !== 'string' || !xtx_data.choices[0].message.content.trim()) throw new Error('未收到有效回复');
  return { xtx_reply: xtx_data.choices[0].message.content, xtx_model: xtx_data.model || process.env.SILICONFLOW_MODEL, xtx_usage: xtx_data.usage || {}, xtx_finish_reason: xtx_data.choices[0].finish_reason, ...(xtx_trace ? { xtx_upstream: xtx_data } : {}) };
};
