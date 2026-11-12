-- 姓名：xutongxin | 学号：24001010909 | 时间：2026-11-09 | 大模型：GPT-6
CREATE TABLE xtx_gallery (xtx_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, xtx_title VARCHAR(200) NOT NULL, xtx_category VARCHAR(40) NOT NULL, xtx_summary TEXT NOT NULL, xtx_source VARCHAR(100) NOT NULL, xtx_image VARCHAR(255) NOT NULL, xtx_alt VARCHAR(200) NOT NULL, xtx_published_at DATETIME NOT NULL) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO xtx_gallery (xtx_title, xtx_category, xtx_summary, xtx_source, xtx_image, xtx_alt, xtx_published_at) VALUES
('晨光里的城市','城市观察','用几何轮廓记录城市天际线，在楼宇与晨光之间发现秩序之美。','拾光原创插画 · 示例内容','/images/gallery/xtx_1.svg','城市建筑与晨日插画','2026-11-09 09:00:00'),
('山间的慢时光','自然探索','层叠的山峰与一条小径，提醒我们在忙碌之余为自然留一点时间。','拾光原创插画 · 示例内容','/images/gallery/xtx_2.svg','层叠山峰与落日插画','2026-11-08 09:00:00'),
('向星空发出邀请','宇宙想象','以行星和轨道描绘宇宙的辽阔，让好奇心成为探索未知的起点。','拾光原创插画 · 示例内容','/images/gallery/xtx_3.svg','行星与轨道插画','2026-11-07 09:00:00'),
('书页之间的灵感','阅读生活','一本打开的书可以连接许多世界，记录阅读带来的片刻安静。','拾光原创插画 · 示例内容','/images/gallery/xtx_4.svg','打开的书本与叶片插画','2026-11-06 09:00:00'),
('一杯咖啡的留白','日常美学','用温暖的色彩收藏午后片刻，在简单的日常中寻找生活的节奏。','拾光原创插画 · 示例内容','/images/gallery/xtx_5.svg','咖啡杯与升腾热气插画','2026-11-05 09:00:00'),
('绿色能源的风景','可持续生活','风车与草地组成清洁能源的想象图景，关注技术和环境的关系。','拾光原创插画 · 示例内容','/images/gallery/xtx_6.svg','草地上的风力发电机插画','2026-11-04 09:00:00'),
('连接彼此的网络','数字世界','由节点和连线构成的网络，呈现信息流动与协作的力量。','拾光原创插画 · 示例内容','/images/gallery/xtx_7.svg','相互连接的数字节点插画','2026-11-03 09:00:00'),
('把花园装进日常','植物手记','观察叶片的生长方向，在一盆植物中体会季节缓慢而具体的变化。','拾光原创插画 · 示例内容','/images/gallery/xtx_8.svg','花盆与舒展的叶片插画','2026-11-02 09:00:00');
