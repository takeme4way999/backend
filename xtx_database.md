<!-- 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-09 | 大模型：GPT-6 -->
# 数据库操作记录（仅追加）

## 2026-11-09 · 初始化说明

本次仅建立 MySQL 连接配置骨架，尚未执行任何 SQL，未创建数据库或业务表，无需恢复数据库即可运行现有页面与接口。

后续每次实际建库、建表、改表或插入数据，都按执行顺序在本文件追加完整 SQL；每张新表至少插入 8 条有实际业务意义的测试数据。须包含建库和选择数据库语句，使全部记录可在新机器顺序执行以重建数据库。

## 2026-11-09 · 连接验证

通过默认配置成功登录本机 MySQL，并执行只读查询 `SELECT 1 AS xtx_connected`。没有创建或修改数据库、表或数据，无新增重建 SQL。


## 2026-11-09 · 科技新闻表与测试数据（执行顺序）

```sql
CREATE DATABASE IF NOT EXISTS `xtx_shiguang` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```sql
USE `xtx_shiguang`;
```

```sql
-- 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-09 | 大模型：GPT-6
CREATE TABLE IF NOT EXISTS xtx_news (
  xtx_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  xtx_title VARCHAR(200) NOT NULL,
  xtx_category VARCHAR(40) NOT NULL,
  xtx_summary TEXT NOT NULL,
  xtx_source VARCHAR(100) NOT NULL,
  xtx_published_at DATETIME NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```sql
INSERT INTO xtx_news (xtx_title, xtx_category, xtx_summary, xtx_source, xtx_published_at) VALUES
('校园人工智能实验室开展模型应用体验活动', '人工智能', '示例新闻：活动围绕文本摘要与图像识别展开，参与者通过动手实践了解模型的能力与局限，并讨论数据隐私保护。', '拾光编辑部 · 示例数据', '2026-11-09 09:00:00'),
('机器人社团完成室内自主导航演示', '机器人', '示例新闻：学生团队结合距离传感器与路径规划算法，在模拟场地完成避障和定点配送，下一阶段将优化复杂环境下的稳定性。', '拾光编辑部 · 示例数据', '2026-11-08 14:30:00'),
('开源协作工作坊分享代码审查实践', '软件开发', '示例新闻：工作坊通过提交变更、评审与问题追踪的完整流程，帮助开发者了解团队协作方式，并强调自动化测试的重要性。', '拾光编辑部 · 示例数据', '2026-11-07 10:00:00'),
('智慧温室试点上线环境监测看板', '物联网', '示例新闻：试点利用温湿度传感器定期采集数据，通过可视化看板展示环境变化，并在异常时提醒管理人员处理。', '拾光编辑部 · 示例数据', '2026-11-06 15:00:00'),
('绿色计算课程展示服务器节能实验', '绿色科技', '示例新闻：课程对不同负载下的设备功耗进行测量，比较任务调度策略的影响，鼓励学生从实际数据出发评估节能效果。', '拾光编辑部 · 示例数据', '2026-11-05 11:00:00'),
('网络安全课堂演练钓鱼邮件识别', '网络安全', '示例新闻：课堂使用模拟邮件讲解可疑链接、异常附件和身份冒用的识别方法，提醒参与者保护账号并启用多因素认证。', '拾光编辑部 · 示例数据', '2026-11-04 09:30:00'),
('数字制造工作室举办三维打印设计展', '数字制造', '示例新闻：展览展示从建模到打印的设计过程，学生分享支撑结构、材料选择和尺寸校准的经验，探索快速原型制作。', '拾光编辑部 · 示例数据', '2026-11-03 13:00:00'),
('数据可视化小组发布校园能耗分析作品', '数据科学', '示例新闻：小组以教学数据构建交互图表，对比建筑能耗的时间变化，并说明数据清洗、缺失值处理和图表表达的方法。', '拾光编辑部 · 示例数据', '2026-11-02 16:00:00');
```


## 2026-11-09 · 独立图文表与 8 条初始内容

```sql
USE `xtx_shiguang`;
```

```sql
-- 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-09 | 大模型：GPT-6
CREATE TABLE xtx_gallery (xtx_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, xtx_title VARCHAR(200) NOT NULL, xtx_category VARCHAR(40) NOT NULL, xtx_summary TEXT NOT NULL, xtx_source VARCHAR(100) NOT NULL, xtx_image VARCHAR(255) NOT NULL, xtx_alt VARCHAR(200) NOT NULL, xtx_published_at DATETIME NOT NULL) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```sql
INSERT INTO xtx_gallery (xtx_title, xtx_category, xtx_summary, xtx_source, xtx_image, xtx_alt, xtx_published_at) VALUES
('晨光里的城市','城市观察','用几何轮廓记录城市天际线，在楼宇与晨光之间发现秩序之美。','拾光原创插画 · 示例内容','/images/gallery/xtx_1.svg','城市建筑与晨日插画','2026-11-09 09:00:00'),
('山间的慢时光','自然探索','层叠的山峰与一条小径，提醒我们在忙碌之余为自然留一点时间。','拾光原创插画 · 示例内容','/images/gallery/xtx_2.svg','层叠山峰与落日插画','2026-11-08 09:00:00'),
('向星空发出邀请','宇宙想象','以行星和轨道描绘宇宙的辽阔，让好奇心成为探索未知的起点。','拾光原创插画 · 示例内容','/images/gallery/xtx_3.svg','行星与轨道插画','2026-11-07 09:00:00'),
('书页之间的灵感','阅读生活','一本打开的书可以连接许多世界，记录阅读带来的片刻安静。','拾光原创插画 · 示例内容','/images/gallery/xtx_4.svg','打开的书本与叶片插画','2026-11-06 09:00:00'),
('一杯咖啡的留白','日常美学','用温暖的色彩收藏午后片刻，在简单的日常中寻找生活的节奏。','拾光原创插画 · 示例内容','/images/gallery/xtx_5.svg','咖啡杯与升腾热气插画','2026-11-05 09:00:00'),
('绿色能源的风景','可持续生活','风车与草地组成清洁能源的想象图景，关注技术和环境的关系。','拾光原创插画 · 示例内容','/images/gallery/xtx_6.svg','草地上的风力发电机插画','2026-11-04 09:00:00'),
('连接彼此的网络','数字世界','由节点和连线构成的网络，呈现信息流动与协作的力量。','拾光原创插画 · 示例内容','/images/gallery/xtx_7.svg','相互连接的数字节点插画','2026-11-03 09:00:00'),
('把花园装进日常','植物手记','观察叶片的生长方向，在一盆植物中体会季节缓慢而具体的变化。','拾光原创插画 · 示例内容','/images/gallery/xtx_8.svg','花盆与舒展的叶片插画','2026-11-02 09:00:00');
```


## 2026-11-12 · 知识库片段表（原文件仅保存在首片段，按文件哈希去重）

```sql
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

```


<!-- 2026-11-12T06:38:29.410Z · 上传 a0220deba1c9003cccad1eec2bd203afe918591e3ea19942ca9ac5cda67bcfde -->

```sql
INSERT INTO xtx_knowledge_chunks (xtx_file_id,xtx_filename,xtx_index,xtx_content,xtx_original,xtx_size) VALUES ('a0220deba1c9003cccad1eec2bd203afe918591e3ea19942ca9ac5cda67bcfde', 'xtx_service_guide.txt', 1, '拾光服务站服务指南（教学模拟政策）。营业时间为周一至周五 09:00—18:00，周末与法定节假日休息。人工客服邮箱为 service@example.com；该地址仅用于教学示例，不提供真实服务。非营业时段的问题会在下一个工作日处理。', CONVERT('<!-- 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-12 | 大模型：gpt-6.1-sol -->\n拾光服务站服务指南（教学模拟政策）。营业时间为周一至周五 09:00—18:00，周末与法定节假日休息。人工客服邮箱为 service@example.com；该地址仅用于教学示例，不提供真实服务。非营业时段的问题会在下一个工作日处理。\n\n预约咨询：用户可通过服务站的预约表登记咨询需求，填写姓名、联系方式与问题描述。工作人员将在一个工作日内回复预约确认。需要修改预约时，请至少提前两小时联系人工客服；预约咨询不收取费用。\n\n账号帮助：忘记密码时可在登录页面使用“忘记密码”，通过绑定邮箱验证后重设密码。收不到验证邮件时，应检查垃圾邮件箱与邮箱地址。客服不会索要用户密码、短信验证码或支付密码。\n\n隐私与反馈：请勿在咨询内容中提交身份证号码、银行卡信息等敏感数据。需要查询、修改或删除个人服务记录时，可通过人工客服提交申请，并配合完成身份核验。服务意见通常在两个工作日内回复。\n' USING utf8mb4), 1190), ('a0220deba1c9003cccad1eec2bd203afe918591e3ea19942ca9ac5cda67bcfde', 'xtx_service_guide.txt', 2, '预约咨询：用户可通过服务站的预约表登记咨询需求，填写姓名、联系方式与问题描述。工作人员将在一个工作日内回复预约确认。需要修改预约时，请至少提前两小时联系人工客服；预约咨询不收取费用。', NULL, 1190), ('a0220deba1c9003cccad1eec2bd203afe918591e3ea19942ca9ac5cda67bcfde', 'xtx_service_guide.txt', 3, '账号帮助：忘记密码时可在登录页面使用“忘记密码”，通过绑定邮箱验证后重设密码。收不到验证邮件时，应检查垃圾邮件箱与邮箱地址。客服不会索要用户密码、短信验证码或支付密码。', NULL, 1190), ('a0220deba1c9003cccad1eec2bd203afe918591e3ea19942ca9ac5cda67bcfde', 'xtx_service_guide.txt', 4, '隐私与反馈：请勿在咨询内容中提交身份证号码、银行卡信息等敏感数据。需要查询、修改或删除个人服务记录时，可通过人工客服提交申请，并配合完成身份核验。服务意见通常在两个工作日内回复。', NULL, 1190);
```


<!-- 2026-11-12T06:38:29.424Z · 上传 036b3172749dcb5859d5fd0bbcbd33964ea2e93a44e80a6e3eea3794350e7acc -->

```sql
INSERT INTO xtx_knowledge_chunks (xtx_file_id,xtx_filename,xtx_index,xtx_content,xtx_original,xtx_size) VALUES ('036b3172749dcb5859d5fd0bbcbd33964ea2e93a44e80a6e3eea3794350e7acc', 'xtx_order_policy.txt', 1, '拾光服务站订单与售后规则（教学模拟政策）。订单支持银行卡及平台列出的电子支付方式。付款成功后，通常在一个工作日内审核。未付款订单在创建后 30 分钟自动关闭；请勿重复付款，如遇扣款后状态未更新，应保留支付凭证联系人工客服。', CONVERT('<!-- 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-12 | 大模型：gpt-6.1-sol -->\n拾光服务站订单与售后规则（教学模拟政策）。订单支持银行卡及平台列出的电子支付方式。付款成功后，通常在一个工作日内审核。未付款订单在创建后 30 分钟自动关闭；请勿重复付款，如遇扣款后状态未更新，应保留支付凭证联系人工客服。\n\n配送与运费：实物订单审核通过后两个工作日内发货，发货后预计三至五个工作日送达，偏远地区以实际物流为准。单笔实付满 99 元免基础运费；未满 99 元收取 8 元基础运费。发货前可联系人工客服修改地址，发货后需与物流协商。\n\n退货申请：实物商品签收后七个自然日内，可申请未使用且包装完整的无理由退货。定制商品、已激活数字服务和已使用的消耗品不适用无理由退货。申请时请提供订单号与商品照片；质量问题经核实后由服务站承担退货运费，其他原因由用户承担。\n\n退款与质量售后：退货验收通过后三个工作日内原路发起退款，实际到账以支付渠道为准。实物商品签收后三十个自然日内如出现非人为质量问题，可提交故障说明、照片或视频申请检测与换货。超出上述时间或人为损坏时，请联系人工客服评估，不承诺免费换新。\n' USING utf8mb4), 1420), ('036b3172749dcb5859d5fd0bbcbd33964ea2e93a44e80a6e3eea3794350e7acc', 'xtx_order_policy.txt', 2, '配送与运费：实物订单审核通过后两个工作日内发货，发货后预计三至五个工作日送达，偏远地区以实际物流为准。单笔实付满 99 元免基础运费；未满 99 元收取 8 元基础运费。发货前可联系人工客服修改地址，发货后需与物流协商。', NULL, 1420), ('036b3172749dcb5859d5fd0bbcbd33964ea2e93a44e80a6e3eea3794350e7acc', 'xtx_order_policy.txt', 3, '退货申请：实物商品签收后七个自然日内，可申请未使用且包装完整的无理由退货。定制商品、已激活数字服务和已使用的消耗品不适用无理由退货。申请时请提供订单号与商品照片；质量问题经核实后由服务站承担退货运费，其他原因由用户承担。', NULL, 1420), ('036b3172749dcb5859d5fd0bbcbd33964ea2e93a44e80a6e3eea3794350e7acc', 'xtx_order_policy.txt', 4, '退款与质量售后：退货验收通过后三个工作日内原路发起退款，实际到账以支付渠道为准。实物商品签收后三十个自然日内如出现非人为质量问题，可提交故障说明、照片或视频申请检测与换货。超出上述时间或人为损坏时，请联系人工客服评估，不承诺免费换新。', NULL, 1420);
```


<!-- 发布说明：仅保留教学示例 SQL，用户实际上传文件的记录留在本机。 -->


<!-- 教学示例原文以可读字符串表达，不含 PDF 或二进制文件备份。 -->
