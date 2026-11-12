/* 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-12 | 大模型：gpt-6.1-sol */
const xtx_path = require('node:path');
exports.xtx_parse = async (xtx_name, xtx_buffer) => {
  const xtx_ext = xtx_path.extname(xtx_name).toLowerCase();
  let xtx_text;
  if (xtx_ext === '.txt') xtx_text = new TextDecoder('utf-8', { fatal: true }).decode(xtx_buffer);
  else if (xtx_ext === '.pdf' && xtx_buffer.subarray(0, 5).toString() === '%PDF-') {
    const { PDFParse: xtx_PDFParse } = require('pdf-parse');
    const xtx_parser = new xtx_PDFParse({ data: new Uint8Array(xtx_buffer) });
    try { xtx_text = (await xtx_parser.getText()).text; }
    finally { await xtx_parser.destroy(); }
  } else throw new Error('仅支持 UTF-8 TXT 或有效 PDF 文件');
  xtx_text = xtx_text.replace(/^<!--[^]*?-->\s*/, '').replace(/\r/g, '').trim();
  if (xtx_text.length < 20) throw new Error('未提取到足够文字；扫描版 PDF 请先 OCR 转成文本');
  if (xtx_text.length > 100000) throw new Error('文本超过 10 万字，请拆分文件后上传');
  const xtx_chunks = [];
  for (const xtx_para of xtx_text.split(/\n\s*\n/).map(xtx_value => xtx_value.trim()).filter(Boolean)) {
    for (let xtx_i = 0; xtx_i < xtx_para.length; xtx_i += 700) xtx_chunks.push(xtx_para.slice(xtx_i, xtx_i + 800));
  }
  if (xtx_chunks.length > 500) throw new Error('知识片段超过 500 条，请拆分或整理文件');
  return xtx_chunks;
};
