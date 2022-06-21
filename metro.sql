/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50617
 Source Host           : localhost:3306
 Source Schema         : metro

 Target Server Type    : MySQL
 Target Server Version : 50617
 File Encoding         : 65001

 Date: 21/05/2022 15:21:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_distance
-- ----------------------------
DROP TABLE IF EXISTS `admin_distance`;
CREATE TABLE `admin_distance`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `start` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `end` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `distance` decimal(10, 2) NULL DEFAULT NULL,
  `updatetime` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 81 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admin_distance
-- ----------------------------
INSERT INTO `admin_distance` VALUES (2, 'A03', 'A04', 5.00, 1652776117);
INSERT INTO `admin_distance` VALUES (3, 'A04', 'A05', 6.00, 1652776119);
INSERT INTO `admin_distance` VALUES (4, 'A01', 'A02', 4.00, 1652880920);
INSERT INTO `admin_distance` VALUES (5, 'A02', 'A03', 3.00, 1652880951);
INSERT INTO `admin_distance` VALUES (6, 'A06', 'A07', 2.00, 1652769036);
INSERT INTO `admin_distance` VALUES (7, 'A05', 'A06', 2.00, 1652769036);
INSERT INTO `admin_distance` VALUES (8, 'A11', 'A12', 2.00, 1652769036);
INSERT INTO `admin_distance` VALUES (9, 'A09', 'A10', 3.00, 1652772863);
INSERT INTO `admin_distance` VALUES (10, 'A08', 'A09', 2.00, 1652769036);
INSERT INTO `admin_distance` VALUES (11, 'A07', 'A08', 2.00, 1652769036);
INSERT INTO `admin_distance` VALUES (12, 'A10', 'A11', 2.00, 1652769036);
INSERT INTO `admin_distance` VALUES (13, 'A12', 'A13', 2.00, 1652769036);
INSERT INTO `admin_distance` VALUES (14, 'A16', 'A17', 2.00, 1652769036);
INSERT INTO `admin_distance` VALUES (15, 'A15', 'A16', 2.00, 1652769036);
INSERT INTO `admin_distance` VALUES (16, 'A14', 'A15', 2.00, 1652769036);
INSERT INTO `admin_distance` VALUES (17, 'A13', 'A14', 2.00, 1652769036);
INSERT INTO `admin_distance` VALUES (18, 'A17', 'A18', 2.00, 1652769036);
INSERT INTO `admin_distance` VALUES (19, 'A18', 'A19', 2.00, 1652769036);
INSERT INTO `admin_distance` VALUES (20, 'A21', 'A22', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (21, 'A20', 'A21', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (22, 'A23', 'A24', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (23, 'A19', 'A20', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (24, 'A22', 'A23', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (25, 'A24', 'A25', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (26, 'B04', 'B05', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (27, 'B03', 'B04', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (28, 'A26', 'A27', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (29, 'A25', 'A26', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (30, 'B01', 'B02', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (31, 'B02', 'B03', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (32, 'B08', 'B09', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (33, 'B09', 'B10', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (34, 'B07', 'B08', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (35, 'B06', 'B07', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (36, 'B10', 'B11', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (37, 'B05', 'B06', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (38, 'B14', 'B15', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (39, 'B13', 'B14', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (40, 'B12', 'B13', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (41, 'B11', 'B12', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (42, 'B15', 'B16', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (43, 'B16', 'B17', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (44, 'C04', 'C05', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (45, 'C01', 'C02', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (46, 'C02', 'C03', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (47, 'C03', 'C04', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (48, 'C05', 'C06', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (49, 'C08', 'C09', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (50, 'C11', 'C12', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (51, 'C07', 'C08', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (52, 'C06', 'C07', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (53, 'C09', 'C10', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (54, 'C10', 'C11', 2.00, 1652769037);
INSERT INTO `admin_distance` VALUES (55, 'C16', 'C17', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (56, 'C13', 'C14', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (57, 'C12', 'C13', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (58, 'C14', 'C15', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (59, 'C17', 'C18', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (60, 'C15', 'C16', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (61, 'D01', 'D02', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (62, 'C19', 'C20', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (63, 'C20', 'C21', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (64, 'C18', 'C19', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (65, 'C21', 'C22', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (66, 'C22', 'C23', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (67, 'D04', 'D05', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (68, 'D03', 'D04', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (69, 'D02', 'D03', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (70, 'D06', 'D07', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (71, 'D05', 'D06', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (72, 'D07', 'D08', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (73, 'D13', 'D14', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (74, 'D10', 'D11', 13.00, 1652777753);
INSERT INTO `admin_distance` VALUES (75, 'D09', 'D10', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (76, 'D12', 'D13', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (77, 'D11', 'D12', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (78, 'D08', 'D09', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (79, 'D14', 'D15', 2.00, 1652769038);
INSERT INTO `admin_distance` VALUES (80, 'D15', 'D16', 2.00, 1652769038);

-- ----------------------------
-- Table structure for admin_price
-- ----------------------------
DROP TABLE IF EXISTS `admin_price`;
CREATE TABLE `admin_price`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `price1` decimal(10, 2) NULL DEFAULT NULL,
  `price2` decimal(10, 2) NULL DEFAULT NULL,
  `price3` decimal(10, 2) NULL DEFAULT NULL,
  `price4` decimal(10, 2) NULL DEFAULT NULL,
  `updatetime` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admin_price
-- ----------------------------
INSERT INTO `admin_price` VALUES (1, 2.00, 4.00, 6.00, 8.00, 1652948696);

-- ----------------------------
-- Table structure for admin_site
-- ----------------------------
DROP TABLE IF EXISTS `admin_site`;
CREATE TABLE `admin_site`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `uid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `line` int(4) NULL DEFAULT NULL,
  `updatetime` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 88 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admin_site
-- ----------------------------
INSERT INTO `admin_site` VALUES (5, '龙湾路', 'A06', 1, 1652754055);
INSERT INTO `admin_site` VALUES (6, '会城大道', 'A05', 1, 1652754055);
INSERT INTO `admin_site` VALUES (7, '江门站', 'A01', 1, 1652754055);
INSERT INTO `admin_site` VALUES (8, '启超大道', 'A02', 1, 1652754055);
INSERT INTO `admin_site` VALUES (9, '中心南路', 'A03', 1, 1652754055);
INSERT INTO `admin_site` VALUES (10, '冈州大道', 'A04', 1, 1652754055);
INSERT INTO `admin_site` VALUES (11, '龙溪', 'A11', 1, 1652754055);
INSERT INTO `admin_site` VALUES (12, '市政府', 'A09', 1, 1652754055);
INSERT INTO `admin_site` VALUES (13, '华园路', 'A08', 1, 1652754055);
INSERT INTO `admin_site` VALUES (14, '白沙大道', 'A07', 1, 1652754055);
INSERT INTO `admin_site` VALUES (15, '五邑大学', 'A10', 1, 1652754055);
INSERT INTO `admin_site` VALUES (16, '北环路', 'A12', 1, 1652754055);
INSERT INTO `admin_site` VALUES (17, '水厂', 'A13', 1, 1652754055);
INSERT INTO `admin_site` VALUES (18, '滨江', 'A17', 1, 1652754055);
INSERT INTO `admin_site` VALUES (19, '周郡', 'A14', 1, 1652754055);
INSERT INTO `admin_site` VALUES (20, '华盛路', 'A16', 1, 1652754055);
INSERT INTO `admin_site` VALUES (21, '大林', 'A15', 1, 1652754055);
INSERT INTO `admin_site` VALUES (22, '棠下', 'A18', 1, 1652754055);
INSERT INTO `admin_site` VALUES (23, '竹溪', 'A19', 1, 1652754055);
INSERT INTO `admin_site` VALUES (24, '雅瑶', 'A20', 1, 1652754055);
INSERT INTO `admin_site` VALUES (25, '古桥', 'A23', 1, 1652754055);
INSERT INTO `admin_site` VALUES (26, '鹤山东站', 'A22', 1, 1652754055);
INSERT INTO `admin_site` VALUES (27, '鹤山行政中心', 'A24', 1, 1652754055);
INSERT INTO `admin_site` VALUES (28, '月光', 'A21', 1, 1652754055);
INSERT INTO `admin_site` VALUES (29, '新城路', 'A26', 1, 1652754055);
INSERT INTO `admin_site` VALUES (30, '古劳水乡', 'A27', 1, 1652754055);
INSERT INTO `admin_site` VALUES (31, '沙坪', 'A25', 1, 1652754055);
INSERT INTO `admin_site` VALUES (32, '礼东', 'B02', 2, 1652754055);
INSERT INTO `admin_site` VALUES (33, '江门站', 'B01', 2, 1652754055);
INSERT INTO `admin_site` VALUES (34, '东海路', 'B03', 2, 1652754055);
INSERT INTO `admin_site` VALUES (35, '新南里', 'B06', 2, 1652754055);
INSERT INTO `admin_site` VALUES (36, '东方广场', 'B08', 2, 1652754055);
INSERT INTO `admin_site` VALUES (37, '江门东站', 'B05', 2, 1652754055);
INSERT INTO `admin_site` VALUES (38, '江海', 'B04', 2, 1652754055);
INSERT INTO `admin_site` VALUES (39, '建设二路', 'B09', 2, 1652754056);
INSERT INTO `admin_site` VALUES (40, '潮江里', 'B11', 2, 1652754056);
INSERT INTO `admin_site` VALUES (41, '滨江', 'B13', 2, 1652754056);
INSERT INTO `admin_site` VALUES (42, '汽车站', 'B10', 2, 1652754056);
INSERT INTO `admin_site` VALUES (43, '新南路', 'B12', 2, 1652754056);
INSERT INTO `admin_site` VALUES (44, '虎岭', 'B16', 2, 1652754056);
INSERT INTO `admin_site` VALUES (45, '滨江尾', 'B17', 2, 1652754056);
INSERT INTO `admin_site` VALUES (46, '仙溪', 'B15', 2, 1652754056);
INSERT INTO `admin_site` VALUES (47, '滨江南', 'B14', 2, 1652754056);
INSERT INTO `admin_site` VALUES (48, '市政府', 'B07', 2, 1652754056);
INSERT INTO `admin_site` VALUES (49, '司前', 'C01', 3, 1652754056);
INSERT INTO `admin_site` VALUES (50, '五和', 'C04', 3, 1652754056);
INSERT INTO `admin_site` VALUES (51, '金泽路', 'C02', 3, 1652754056);
INSERT INTO `admin_site` VALUES (52, '大泽', 'C03', 3, 1652754056);
INSERT INTO `admin_site` VALUES (53, '繁华路', 'C07', 3, 1652754056);
INSERT INTO `admin_site` VALUES (54, '同仁', 'C05', 3, 1652754056);
INSERT INTO `admin_site` VALUES (55, '工业园', 'C06', 3, 1652754056);
INSERT INTO `admin_site` VALUES (56, '三和大道', 'C08', 3, 1652754056);
INSERT INTO `admin_site` VALUES (57, '中心南路', 'C09', 3, 1652754056);
INSERT INTO `admin_site` VALUES (58, '礼乐', 'C13', 3, 1652754056);
INSERT INTO `admin_site` VALUES (59, '汇源坊', 'C11', 3, 1652754056);
INSERT INTO `admin_site` VALUES (60, '侨兴路', 'C10', 3, 1652754056);
INSERT INTO `admin_site` VALUES (61, '断河', 'C12', 3, 1652754056);
INSERT INTO `admin_site` VALUES (62, '纳谷', 'C14', 3, 1652754056);
INSERT INTO `admin_site` VALUES (63, '东海路', 'C15', 3, 1652754056);
INSERT INTO `admin_site` VALUES (64, '高新区', 'C17', 3, 1652754056);
INSERT INTO `admin_site` VALUES (65, '广丰', 'C16', 3, 1652754056);
INSERT INTO `admin_site` VALUES (66, '兴宁', 'C18', 3, 1652754056);
INSERT INTO `admin_site` VALUES (67, '外海', 'C23', 3, 1652754056);
INSERT INTO `admin_site` VALUES (68, '江海站', 'C22', 3, 1652754056);
INSERT INTO `admin_site` VALUES (69, '科宛路', 'C20', 3, 1652754056);
INSERT INTO `admin_site` VALUES (70, '共和', 'D01', 4, 1652754056);
INSERT INTO `admin_site` VALUES (71, '横海', 'C19', 3, 1652754056);
INSERT INTO `admin_site` VALUES (72, '金瓯路', 'C21', 3, 1652754056);
INSERT INTO `admin_site` VALUES (73, '南户', 'D06', 4, 1652754057);
INSERT INTO `admin_site` VALUES (74, '松岭', 'D03', 4, 1652754057);
INSERT INTO `admin_site` VALUES (75, '龙安', 'D04', 4, 1652754057);
INSERT INTO `admin_site` VALUES (76, '松翠', 'D05', 4, 1652754057);
INSERT INTO `admin_site` VALUES (77, '蓬江站', 'D07', 4, 1652754057);
INSERT INTO `admin_site` VALUES (78, '杜阮', 'D02', 4, 1652754057);
INSERT INTO `admin_site` VALUES (79, '东方广场', 'D08', 4, 1652754057);
INSERT INTO `admin_site` VALUES (80, '万达', 'D09', 4, 1652754057);
INSERT INTO `admin_site` VALUES (81, '荷塘南', 'D12', 4, 1652754057);
INSERT INTO `admin_site` VALUES (82, '龙溪', 'D10', 4, 1652754057);
INSERT INTO `admin_site` VALUES (83, '民兴路', 'D13', 4, 1652754057);
INSERT INTO `admin_site` VALUES (84, '潮连', 'D11', 4, 1652754057);
INSERT INTO `admin_site` VALUES (85, '荷塘', 'D16', 4, 1652754057);
INSERT INTO `admin_site` VALUES (86, '中泰路', 'D15', 4, 1652754057);
INSERT INTO `admin_site` VALUES (87, '中兴三路', 'D14', 4, 1652754057);

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统用户' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES (1, '813347016@qq.com', 'bebe6548be6b249b8e1a28f2ddfd30ee', '2019-09-12 10:21:33', '2021-09-12 17:09:02');
INSERT INTO `admin_user` VALUES (4, '测试', 'be669a3c9e5f868e3496537e4598a87c', '2021-09-12 17:13:36', '2021-09-12 17:13:36');

-- ----------------------------
-- Table structure for home_cart
-- ----------------------------
DROP TABLE IF EXISTS `home_cart`;
CREATE TABLE `home_cart`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(8) NULL DEFAULT NULL,
  `start` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `end` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `distance` decimal(10, 2) NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `pass` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `change_time` int(4) NULL DEFAULT NULL,
  `site_num` int(4) NULL DEFAULT NULL,
  `estimate_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of home_cart
-- ----------------------------
INSERT INTO `home_cart` VALUES (46, 3, 'D16', 'A02', 30.00, 6.80, 'D16,D15,D14,D13,D12,D11,A11,A10,A09,A08,A07,A06,A05,A04,A03,A02', 1, 16, '25.6min', '2022-05-18 18:41:46');
INSERT INTO `home_cart` VALUES (47, 3, 'B08', 'B03', 10.00, 3.50, 'B08,A09,B06,B05,B04,B03', 0, 6, '7.5min', '2022-05-18 20:46:52');
INSERT INTO `home_cart` VALUES (49, 3, 'D03', 'B11', 16.00, 4.70, 'D03,D04,D05,D06,D07,B08,B09,B10,B11', 1, 9, '15.0min', '2022-05-19 22:28:27');
INSERT INTO `home_cart` VALUES (51, 3, 'A26', 'A24', 4.00, 2.00, 'A26,A25,A24', 0, 3, '3.0min', '2022-05-20 21:36:50');
INSERT INTO `home_cart` VALUES (52, 3, 'D02', 'A24', 36.00, 7.50, 'D02,D03,D04,D05,D06,D07,B08,B09,B10,B11,B12,A17,A18,A19,A20,A21,A22,A23,A24', 2, 19, '33.1min', '2022-05-20 21:36:58');

-- ----------------------------
-- Table structure for home_order
-- ----------------------------
DROP TABLE IF EXISTS `home_order`;
CREATE TABLE `home_order`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_id` int(8) NULL DEFAULT NULL,
  `start` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `end` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `status` tinyint(1) NULL DEFAULT NULL COMMENT '1:购买成功 2:申请退票中 3:退票成功 4:退票失败',
  `reason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '退票原因',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of home_order
-- ----------------------------
INSERT INTO `home_order` VALUES (1, 'OD6284F98EAD295', 3, 'D03', 'D06', 2.50, '2022-05-18 21:50:06', 4, '没钱交房租了');
INSERT INTO `home_order` VALUES (7, 'OD6285F5669A394', 3, 'C08', 'C17', 4.80, '2022-05-19 15:44:38', 3, '买错票了');
INSERT INTO `home_order` VALUES (8, 'OD62865411E3B24', 3, 'A23', 'A01', 7.50, '2022-05-19 22:28:33', 4, '没钱了谢谢你');
INSERT INTO `home_order` VALUES (11, 'OD62879976294C8', 3, 'A26', 'A24', 2.00, '2022-05-20 21:36:54', 3, '然后呢');
INSERT INTO `home_order` VALUES (12, 'OD62879984AB423', 3, 'A15', 'A06', 5.20, '2022-05-20 21:37:08', 4, '哦哦哦');
INSERT INTO `home_order` VALUES (13, 'OD6287998C0D34E', 3, 'A15', 'B03', 5.50, '2022-05-20 21:37:16', 4, '厉害厉害');
INSERT INTO `home_order` VALUES (14, 'OD6287999A4586A', 3, 'A15', 'C23', 7.60, '2022-05-20 21:37:30', 4, '有什么意见吗');
INSERT INTO `home_order` VALUES (15, 'OD6287999FD9D64', 3, 'A15', 'D16', 6.90, '2022-05-20 21:37:35', 3, '地铁票买不起？');
INSERT INTO `home_order` VALUES (29, 'OD62886E8B76AE9', 3, 'A27', 'D05', 7.50, '2022-05-21 12:46:03', 2, '没钱QAQ');

-- ----------------------------
-- Table structure for home_user
-- ----------------------------
DROP TABLE IF EXISTS `home_user`;
CREATE TABLE `home_user`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_time` int(10) NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统用户' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of home_user
-- ----------------------------
INSERT INTO `home_user` VALUES (2, 'Dramas', 'thanks.0921', NULL, 0, '813347016@qq.com');
INSERT INTO `home_user` VALUES (3, 'airHui', '123456', NULL, 0, '1849200876@qq.com');

SET FOREIGN_KEY_CHECKS = 1;
