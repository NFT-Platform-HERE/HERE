-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: j8b209.p.ssafy.io    Database: here
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `nft`
--

DROP TABLE IF EXISTS `nft`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nft` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `hash_value` varchar(200) NOT NULL,
  `img_url` varchar(200) NOT NULL,
  `issuer_id` varchar(36) NOT NULL,
  `owner_id` varchar(36) NOT NULL,
  `token_id` int unsigned NOT NULL,
  `type` char(10) NOT NULL,
  `place` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=453 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nft`
--

LOCK TABLES `nft` WRITE;
/*!40000 ALTER TABLE `nft` DISABLE KEYS */;
INSERT INTO `nft` (`id`, `created_date`, `hash_value`, `img_url`, `issuer_id`, `owner_id`, `token_id`, `type`, `place`) VALUES (319,'2023-04-04 22:14:48.337979','0x37a94b90e83f9d3c7907f11c9494acf57f9d3933bd7b9f62438aedf46faf285c','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','8793cd9d-4986-410c-bb3f-f9bd347ce5d7','8793cd9d-4986-410c-bb3f-f9bd347ce5d7',125,'AGENCY','ssafy'),(320,'2023-04-04 22:14:48.470664','0xddc2e9bffe52d3df97e5f3003c4b441090ad60bdc6c9f5023eb094f709e2ebd9','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','8793cd9d-4986-410c-bb3f-f9bd347ce5d7','c9efb656-9848-4c03-9822-587b66c6bd92',126,'HOSPITAL','ssafy'),(321,'2023-04-04 22:19:09.567119','0xbb7abd1bd3c2574e2e826320f5a66db66b0306d78bcf8f1f3f71901a42d72720','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_3.gif','8959a09c-308c-47cc-bbd8-73bc006c853a','8959a09c-308c-47cc-bbd8-73bc006c853a',127,'AGENCY','ssafy'),(322,'2023-04-04 22:19:09.607638','0xb23338082004c49a2336a21e094eb918e89a4e2fa4d2cb7a5b97530f8eacb4e9','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_3.gif','8959a09c-308c-47cc-bbd8-73bc006c853a','c9efb656-9848-4c03-9822-587b66c6bd92',128,'HOSPITAL','ssafy'),(323,'2023-04-04 23:25:57.886203','0x9aae519079cc0e31877a32a98ba4d5eea215bda8fc5ccbac7aaeae3185d5ca7c','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_9.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',129,'AGENCY','이현구 혈액원'),(324,'2023-04-04 23:25:57.931200','0x2bcd3fd2f20a1c0b5fc2ed63ab9a191fac678a17275fa03fe3c9d9f861b5c62e','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_9.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','c9efb656-9848-4c03-9822-587b66c6bd92',130,'HOSPITAL','이현구 혈액원'),(325,'2023-04-04 23:26:44.946309','0x850ea0483172ba3ccd0c16ec9305bc6c492aa91f30f07818805f2cf549d4999c','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_12.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',131,'AGENCY','구스 혈액원'),(326,'2023-04-04 23:26:44.949665','0x26caf45b683eb8c3d2b52d0474d1e3db6928d9919848c7785921a483adbbe77e','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_5.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',133,'AGENCY','구스 혈액원'),(327,'2023-04-04 23:26:44.986841','0x85a33948cbfc5df9eea7f548ee4ffe25a5fbad011e6e5ee586636bf0b0f9b070','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_5.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','c9efb656-9848-4c03-9822-587b66c6bd92',134,'HOSPITAL','구스 혈액원'),(328,'2023-04-04 23:26:44.988114','0xe177158f2ebcbbd25ebdd4dc9bd337bcf79cdd0d685621b6f5d77c6e2b4b6cc5','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_12.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','c9efb656-9848-4c03-9822-587b66c6bd92',132,'HOSPITAL','구스 혈액원'),(329,'2023-04-04 23:27:53.082884','0xc782127181cec46a936e84c66b91d3466984791b0d5c6a5cadd9551f003bb81f','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_10.gif','8793cd9d-4986-410c-bb3f-f9bd347ce5d7','8793cd9d-4986-410c-bb3f-f9bd347ce5d7',135,'AGENCY','집'),(330,'2023-04-04 23:27:53.121821','0x6a91f6b2c0647b7d2a8937ecf953a2bddcb955f9e3d34d8af42bcdfabf1b6314','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_10.gif','8793cd9d-4986-410c-bb3f-f9bd347ce5d7','c9efb656-9848-4c03-9822-587b66c6bd92',136,'HOSPITAL','집'),(331,'2023-04-04 23:28:33.370545','0x7fb631db5610905b5172ba2905b552feeb9ea1ab3c09057a925f48c0dadfdaf3','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_10.gif','8793cd9d-4986-410c-bb3f-f9bd347ce5d7','8793cd9d-4986-410c-bb3f-f9bd347ce5d7',137,'AGENCY','흠'),(332,'2023-04-04 23:28:33.403219','0x92ad1349b05c6d5d5eefea03ed000830b772075691030e0ee540a3256797a073','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_10.gif','8793cd9d-4986-410c-bb3f-f9bd347ce5d7','c9efb656-9848-4c03-9822-587b66c6bd92',138,'HOSPITAL','흠'),(333,'2023-04-04 23:29:13.169275','0xda96e2a1273bcd36aadd9742ef671172a7769b0b8e90a89155ea7bfcedb60cb1','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_12.gif','8793cd9d-4986-410c-bb3f-f9bd347ce5d7','8793cd9d-4986-410c-bb3f-f9bd347ce5d7',139,'AGENCY','홈홈홈'),(334,'2023-04-04 23:29:13.201224','0xab98fca88cc82dbca9cce9c9ee92acda3116da7fae8a9009e1472158825cbd69','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_12.gif','8793cd9d-4986-410c-bb3f-f9bd347ce5d7','8793cd9d-4986-410c-bb3f-f9bd347ce5d7',140,'HOSPITAL','홈홈홈'),(339,'2023-04-05 00:25:47.796937','0x5766a38e8f9162a85f4a5088c72fb487dd76da753019fa2d831ef95ba6674af7','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_5.gif','7fadaead-bf24-466b-a642-24f191e54e86','7fadaead-bf24-466b-a642-24f191e54e86',145,'AGENCY','도언이 테스트중'),(340,'2023-04-05 00:25:47.847572','0xd069c0fdd3c3a576da1c00c4c3b11d6dd32273f2caa2d23fe701ff3c63fe89a9','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_5.gif','7fadaead-bf24-466b-a642-24f191e54e86','c9efb656-9848-4c03-9822-587b66c6bd92',146,'HOSPITAL','도언이 테스트중'),(341,'2023-04-05 00:26:47.882901','0xba5ffe182009569b1ddef10e8db842e1d0894e507e2f2bc40b2e4252570b818c','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_2.gif','7fadaead-bf24-466b-a642-24f191e54e86','7fadaead-bf24-466b-a642-24f191e54e86',147,'AGENCY','도언아 힘내'),(342,'2023-04-05 00:26:47.926467','0x6f43adb386f8f4a271c4daacd04392e78e47885558949347ba764adde3aaaa4d','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_2.gif','7fadaead-bf24-466b-a642-24f191e54e86','c9efb656-9848-4c03-9822-587b66c6bd92',148,'HOSPITAL','도언아 힘내'),(343,'2023-04-05 00:38:13.534772','0x71a361aaab66c3d540f33cbf1331112f80207cdc7483119aa0e70d4f6cd01a62','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_1.gif','9d7b030b-59f9-4b66-9374-c0072399d9fc','9d7b030b-59f9-4b66-9374-c0072399d9fc',149,'AGENCY','123'),(344,'2023-04-05 00:38:13.570670','0xb4fc4e851b7585dba071f983cb95a42b8f841e0b7586318e0f02fcb2cdd7ebd5','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_1.gif','9d7b030b-59f9-4b66-9374-c0072399d9fc','c9efb656-9848-4c03-9822-587b66c6bd92',150,'HOSPITAL','123'),(345,'2023-04-05 00:39:11.288807','0xa08f3e1a402c2292eee2aa962fcb5297cda3fe403c187fc9ab40d9047211157b','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_4.gif','9d7b030b-59f9-4b66-9374-c0072399d9fc','9d7b030b-59f9-4b66-9374-c0072399d9fc',151,'AGENCY','123123'),(346,'2023-04-05 00:39:11.324658','0x3d0cb52d4a32231f10f00d36e5360f4416256533a5529172a23f98abb0235890','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_4.gif','9d7b030b-59f9-4b66-9374-c0072399d9fc','c9efb656-9848-4c03-9822-587b66c6bd92',152,'HOSPITAL','123123'),(351,'2023-04-05 14:04:26.318671','0xfcf1534f6063e2f69f8e5d20f97340dd438ce440039582b2e19ea7d11a7db858','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_12.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',157,'AGENCY','충남대 혈액원'),(352,'2023-04-05 14:04:26.459323','0x82bf93357c0d90a4740f4e8a61a270d744a593f7a01d9dc9e43ba345547284d9','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_12.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',158,'HOSPITAL','충남대 혈액원'),(353,'2023-04-05 14:39:39.475902','0xec509117522a0e971d3640a323ba5f58a781178516a03e00fff51bd25e2dfb66','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_5.gif','7fadaead-bf24-466b-a642-24f191e54e86','7fadaead-bf24-466b-a642-24f191e54e86',159,'AGENCY','오이 혐오 협회'),(354,'2023-04-05 14:39:39.557525','0x6af1786624e66c68e12fe390525b2729f7100e78af88b3637503179c446d32ed','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_5.gif','7fadaead-bf24-466b-a642-24f191e54e86','7fadaead-bf24-466b-a642-24f191e54e86',160,'HOSPITAL','오이 혐오 협회'),(355,'2023-04-05 14:40:15.731552','0x53651d8c0e570aeacba8d9947c629c07f3b534aabf5eff86fe17b2768aebb727','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_12.gif','7fadaead-bf24-466b-a642-24f191e54e86','7fadaead-bf24-466b-a642-24f191e54e86',161,'AGENCY','코끼리를 지켜주세요'),(356,'2023-04-05 14:40:15.802995','0x98435bd0a97abb544255d728150e331282833f7898bef3164e1a687545831d02','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_12.gif','7fadaead-bf24-466b-a642-24f191e54e86','7fadaead-bf24-466b-a642-24f191e54e86',162,'HOSPITAL','코끼리를 지켜주세요'),(357,'2023-04-05 14:45:30.361391','0xfe68d5aa23c284888a8350c2e8a905670cb00dec88fd6e09ac01e49e236e1ef5','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_7.gif','95067026-cfcc-458c-8bbe-e59eb235aea7','95067026-cfcc-458c-8bbe-e59eb235aea7',163,'AGENCY','진짜임 비맞을 거'),(358,'2023-04-05 14:45:30.405641','0xd6ef52c49070bcccaae9acd19473537421c547257a6192978900a8194afa7d16','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_7.gif','95067026-cfcc-458c-8bbe-e59eb235aea7','c9efb656-9848-4c03-9822-587b66c6bd92',164,'HOSPITAL','진짜임 비맞을 거'),(359,'2023-04-05 14:45:56.847101','0x7a0455a05d127367e44de745122c9d82a6c401624c854f1dd5295c71d33e1b85','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_11.gif','95067026-cfcc-458c-8bbe-e59eb235aea7','95067026-cfcc-458c-8bbe-e59eb235aea7',165,'AGENCY','도언이 비 안맞을 예정'),(360,'2023-04-05 14:45:56.884403','0x6c03cbcc6ed21e3614ceea518e8519edace5d736ee1b238b58a85b9e2b8660f3','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_11.gif','95067026-cfcc-458c-8bbe-e59eb235aea7','c9efb656-9848-4c03-9822-587b66c6bd92',166,'HOSPITAL','도언이 비 안맞을 예정'),(361,'2023-04-05 15:58:25.747648','0xf143fdabd782ae8e1408862262293b72db05540330b31ae40ab2f94862f99568','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_10.gif','3c3a46dd-da35-4acc-829b-d8e4bb40683f','3c3a46dd-da35-4acc-829b-d8e4bb40683f',167,'AGENCY','충남혈액원'),(362,'2023-04-05 15:58:25.886306','0xfec63c8b1e2bf980de399cc590cdfb9e82883e5f4ba36f2eeeb88754bcf78ee9','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_10.gif','3c3a46dd-da35-4acc-829b-d8e4bb40683f','17ad4ae8-57ef-48d2-986d-81763f10b800',168,'HOSPITAL','충남혈액원'),(363,'2023-04-05 17:23:56.999840','0x2f6992c70dd26ebebe4986acaf3b22e029a9e30a95b06b79a7a4ced79056ee40','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_6.gif','3c3a46dd-da35-4acc-829b-d8e4bb40683f','3c3a46dd-da35-4acc-829b-d8e4bb40683f',169,'AGENCY','대전혈액원'),(364,'2023-04-05 17:23:57.097384','0xd004e55269ce1b9a4fcb2287ade459c1115f670dd6350c5f0c454b5b61bd5587','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_6.gif','3c3a46dd-da35-4acc-829b-d8e4bb40683f','3c3a46dd-da35-4acc-829b-d8e4bb40683f',170,'HOSPITAL','대전혈액원'),(367,'2023-04-05 17:37:04.311183','0xc4fa2afa644743a49b2a6a722b68a283612eccee212e62a89f261c9cdd653a8b','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_7.gif','95067026-cfcc-458c-8bbe-e59eb235aea7','95067026-cfcc-458c-8bbe-e59eb235aea7',173,'AGENCY','오이 혐오 협회123'),(368,'2023-04-05 17:37:04.362353','0xf655beeeed7908189320c191c7a72928078eee79e6fa408aa9b2cc1d45d7abe5','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_7.gif','95067026-cfcc-458c-8bbe-e59eb235aea7','c9efb656-9848-4c03-9822-587b66c6bd92',174,'HOSPITAL','오이 혐오 협회123'),(371,'2023-04-05 17:38:49.737605','0x8dba42dfff0f3f75da8d5f5136458ae9b2ba527e2f0eecfa9db5102db6f9fc4b','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_1.gif','95067026-cfcc-458c-8bbe-e59eb235aea7','95067026-cfcc-458c-8bbe-e59eb235aea7',179,'AGENCY','코끼리를 지켜주세요123'),(372,'2023-04-05 17:38:49.778033','0x399e17a9bbec482579054192d358f38677f333e9cb054cc2e646c117a952466a','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_1.gif','95067026-cfcc-458c-8bbe-e59eb235aea7','95067026-cfcc-458c-8bbe-e59eb235aea7',180,'HOSPITAL','코끼리를 지켜주세요123'),(373,'2023-04-05 17:39:16.378074','0x21c7157d969ac900915910ef64f8e3fd6ebca9912d339ff8aca356dde2744d76','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_7.gif','95067026-cfcc-458c-8bbe-e59eb235aea7','95067026-cfcc-458c-8bbe-e59eb235aea7',181,'AGENCY','진짜임 비맞을 거'),(374,'2023-04-05 17:39:16.423154','0xb4f0552d187defee5f20561c338f96507aa05e5053837990e8d43d0e6abbb1dc','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_7.gif','95067026-cfcc-458c-8bbe-e59eb235aea7','c9efb656-9848-4c03-9822-587b66c6bd92',182,'HOSPITAL','진짜임 비맞을 거'),(375,'2023-04-05 17:45:35.869608','0x1b08d969977519e23774b24fdb5c41ad689e68bdaf820cd8516d9eb61519a5ad','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_2.gif','ae4c93d4-67f0-4502-9a0c-04d003ce6f0c','ae4c93d4-67f0-4502-9a0c-04d003ce6f0c',183,'AGENCY','도언이네집'),(376,'2023-04-05 17:45:35.914239','0xa279e95df74916820d68f9c648b10da826e852b68bc9236a13b9da2f091ac250','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_2.gif','ae4c93d4-67f0-4502-9a0c-04d003ce6f0c','c9efb656-9848-4c03-9822-587b66c6bd92',184,'HOSPITAL','도언이네집'),(377,'2023-04-05 17:55:56.019497','0xe2d2dffe0a491a59f6bf70b638ca95ea340f4f2a09c5956c8fb07c5986d32555','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','2cb4a9f8-d750-4bb0-b282-cd35d4af70f6','2cb4a9f8-d750-4bb0-b282-cd35d4af70f6',185,'AGENCY','dㅇㅇ'),(378,'2023-04-05 17:55:56.057956','0xc707704be811700a2aa9a3e6e5325e1a84099c7496a676f80ff19d332428e7ef','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','2cb4a9f8-d750-4bb0-b282-cd35d4af70f6','c9efb656-9848-4c03-9822-587b66c6bd92',186,'HOSPITAL','dㅇㅇ'),(379,'2023-04-05 17:56:34.061013','0xcfa75e97635b036dac3d3766412b547beeb21ac4180b52d2c9c515f4cd95a459','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','2cb4a9f8-d750-4bb0-b282-cd35d4af70f6','2cb4a9f8-d750-4bb0-b282-cd35d4af70f6',187,'AGENCY','ㅋㅋ'),(380,'2023-04-05 17:56:34.061013','0x2e4ac2ab73321dbba763839362eec5ed5b089b1071bf3dae6301bd6056cf76ff','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_4.gif','2cb4a9f8-d750-4bb0-b282-cd35d4af70f6','2cb4a9f8-d750-4bb0-b282-cd35d4af70f6',189,'AGENCY','ㅋㅋ'),(381,'2023-04-05 17:56:34.100521','0xe0b2a4df741c43fc6239e26bd3f81e01341cf6e9b0f69c43ad42eb91fa546ff5','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_4.gif','2cb4a9f8-d750-4bb0-b282-cd35d4af70f6','2cb4a9f8-d750-4bb0-b282-cd35d4af70f6',190,'HOSPITAL','ㅋㅋ'),(382,'2023-04-05 17:56:34.100517','0xb18f4bbca1606a4c1292e56f2d269b79eaa965f9c2b6bf6625af5216a7cdd72d','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','2cb4a9f8-d750-4bb0-b282-cd35d4af70f6','2cb4a9f8-d750-4bb0-b282-cd35d4af70f6',188,'HOSPITAL','ㅋㅋ'),(383,'2023-04-05 19:51:53.920092','0xfa3c458056749f359314c8560a55c621301d0933b7be1547b310d3d7fa774895','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_4.gif','39172801-4937-4f54-9872-f46664b34472','39172801-4937-4f54-9872-f46664b34472',191,'AGENCY','유온'),(384,'2023-04-05 19:51:53.964017','0x107de570af9cae6f0580f7f9d77fc25b10d961abe60205cdc0bf2085a41b59c0','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_4.gif','39172801-4937-4f54-9872-f46664b34472','c9efb656-9848-4c03-9822-587b66c6bd92',192,'HOSPITAL','유온'),(385,'2023-04-05 20:17:34.944477','0xfb63e4befebdc4708e33a95c0939e68dc411257a93f7302fb957820f5b54147e','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_6.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',193,'AGENCY','충남대 혈액원'),(386,'2023-04-05 20:17:34.986887','0x72258aba8beee489ba430f643d160b23108349d66060d75a94bf09a0d692ea29','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_6.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',194,'HOSPITAL','충남대 혈액원'),(387,'2023-04-05 20:20:51.376398','0xa6a8d1aad7275f85aec7f084440610c64c3f10a9f274108b785cc7abd4399554','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_3.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',195,'AGENCY','충남대 혈액원'),(388,'2023-04-05 20:20:51.412510','0xb494d7d3fd416104dda5e8f1db85f1e5d1a092ef690ac1cb53396562bf7e094e','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_3.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',196,'HOSPITAL','충남대 혈액원'),(389,'2023-04-05 21:15:56.957979','0xff4ec1602495a78a635448b5d9e205c0c63fd90af268647268ca72e42b43ad84','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_9.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',197,'AGENCY','충남대 혈액원'),(390,'2023-04-05 21:15:56.996957','0x2ba7b06331e71969a5a79269f35b80fed1d0ee6a34ee66d4dbfd9478b4aa32fc','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_9.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',198,'HOSPITAL','충남대 혈액원'),(391,'2023-04-05 22:19:17.286651','0xfba76b4335cc06ffa0c1f15ca796717cec0f5d0addc9e0c1dad93fbadda376f1','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','3c3a46dd-da35-4acc-829b-d8e4bb40683f','3c3a46dd-da35-4acc-829b-d8e4bb40683f',199,'AGENCY','대전.세종.충남혈액원'),(392,'2023-04-05 22:19:17.547099','0x8c616d0a2c08de88c065eb2a3c8ebeabb60756780ab911a31153576713670682','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','3c3a46dd-da35-4acc-829b-d8e4bb40683f','3c3a46dd-da35-4acc-829b-d8e4bb40683f',200,'HOSPITAL','대전.세종.충남혈액원'),(393,'2023-04-05 22:24:58.061196','0x97ab13c83abddcb4043bddf159869fd5ae508324e3fd82fcea90d89951eaacc9','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_9.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',201,'AGENCY','싸피 혈액원'),(394,'2023-04-05 22:24:58.107912','0x506e2f051b7affdaa441656254ed7b0c5b3208afc78b8dd1bbacd3a5463914aa','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_9.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','17ad4ae8-57ef-48d2-986d-81763f10b800',202,'HOSPITAL','싸피 혈액원'),(395,'2023-04-05 22:25:54.028171','0x39fe5ece082bc810b13bfeb79a3d4d64b9cd3146289473bd80fe8b74c8f7fb00','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_5.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',203,'AGENCY','싸피 혈액원'),(396,'2023-04-05 22:25:54.067924','0x8e55dd83682de0435066639f2619ead8f31ec0b2395297aba60155062e2f9b89','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_5.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','17ad4ae8-57ef-48d2-986d-81763f10b800',204,'HOSPITAL','싸피 혈액원'),(397,'2023-04-05 22:27:20.811472','0x7718255b8ec21ec4a5b1a908aa26e9209734df1d9a780d2e6ae5e6c66bb72e40','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_6.gif','3c3a46dd-da35-4acc-829b-d8e4bb40683f','3c3a46dd-da35-4acc-829b-d8e4bb40683f',205,'AGENCY','싸피싸피'),(398,'2023-04-05 22:27:20.853794','0x877ad829d84e0051208d40a11d1a96e3bb781066d9c32e58645a21720660592c','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_6.gif','3c3a46dd-da35-4acc-829b-d8e4bb40683f','3c3a46dd-da35-4acc-829b-d8e4bb40683f',206,'HOSPITAL','싸피싸피'),(399,'2023-04-05 22:27:48.602570','0x448887b76b203fc886a333f7ffa4abc6f7e7fca374680995020fa048c76237c9','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_2.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',209,'AGENCY','구스 혈액원'),(400,'2023-04-05 22:27:48.641036','0x5a9f065d5b8e83eadcf676644cbf665ee6c2e03aa43efade43fbed6d8c99313d','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_2.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',210,'HOSPITAL','구스 혈액원'),(401,'2023-04-05 22:27:50.782233','0x14ffb89b803d2623b42f9bc62669d78defc135ad1c00203395286a0d61c49fd2','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_10.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',207,'AGENCY','싸피 혈액원'),(402,'2023-04-05 22:27:50.832454','0x682521e7e2c8729cb677c70deb151ead369ba332a912232771faf497e209271e','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_10.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','17ad4ae8-57ef-48d2-986d-81763f10b800',208,'HOSPITAL','싸피 혈액원'),(403,'2023-04-05 22:28:38.646224','0x0bc2a300ccd3dc90f8be3ccd51595decd3e0323d272147f990ba674bb58f649e','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_3.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',211,'AGENCY','dㅇㅇ'),(404,'2023-04-05 22:28:38.679190','0xd85872ff1b34f8d7346db5314bf25431dc21182ad2e9133c15dd389c926f1797','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_3.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','17ad4ae8-57ef-48d2-986d-81763f10b800',212,'HOSPITAL','dㅇㅇ'),(405,'2023-04-05 22:29:38.765716','0xa2010e22d1c6854c4d6e15ea8cba5e7e5b708bed056cc7f0cf3965aea35d851d','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_11.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',213,'AGENCY','싸피 혈액원'),(406,'2023-04-05 22:29:38.798736','0x9665c8d88f41a9d496937d347844d613e0520fb4069f9f57de240b396bf337cd','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_11.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',214,'HOSPITAL','싸피 혈액원'),(407,'2023-04-05 22:31:03.515407','0x98c2a3f24cbdf7687d50b8e5c547ac7c1f3cc0fad10f7c00723d049dd0f1f74b','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_6.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',215,'AGENCY','구스 혈액원'),(408,'2023-04-05 22:31:03.555656','0x91d51900067c7043f29ac181e57bdf3470d6a386def010d23aa3440399ca74f7','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_6.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',216,'HOSPITAL','구스 혈액원'),(409,'2023-04-05 22:31:39.370991','0x5ff9edb5a0d2d6ce383057aaf27d313d2b24826b3626bd372a7a16cec7de0ff0','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_12.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',217,'AGENCY','1'),(410,'2023-04-05 22:31:39.445236','0x1a40d49c84ef7cfd8eda512c540d10a672c9a138756d4e5182e1cd2df40b0a0e','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_12.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',218,'HOSPITAL','1'),(411,'2023-04-05 22:32:44.145368','0x3c842e641853dfdce002168ef0f9d6cff875e63ee56f4e40d5564535710a4103','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_11.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',219,'AGENCY','구스 혈액원'),(412,'2023-04-05 22:32:44.176899','0x6caa786852d210b3c1a356023de41ab5b452a0f339b90392722c6536a17dcde1','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_11.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',220,'HOSPITAL','구스 혈액원'),(413,'2023-04-05 22:33:11.962338','0x6c1aa63f1d0de0f9cab4411c5a7ebd437969ca36ff61cf09312f36a75d6b2974','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_9.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',221,'AGENCY','용용 혈액원'),(414,'2023-04-05 22:33:11.998220','0x81144de5f179a555d63e1d767422c5fb1025dba5c88522f154faef3cade959cb','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_9.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',222,'HOSPITAL','용용 혈액원'),(415,'2023-04-05 22:34:12.073251','0xeb33f0a0169bf689d9f7e343c02768c6420ca2cc1ee9178b4f39b401fd44b676','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','42fe7697-498b-4ea0-bb40-5553c50c26fd',223,'AGENCY','구스 혈액원'),(416,'2023-04-05 22:34:12.108723','0x296da765184ac54fcd49e09893621872bfe3662a82f260becaf582df12ece387','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','17ad4ae8-57ef-48d2-986d-81763f10b800',224,'HOSPITAL','구스 혈액원'),(417,'2023-04-05 22:34:45.535071','0xa6a73a3f867488dd39ebc6265a16c38cddb37f726210971870a8443082fe0ce6','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_10.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',225,'AGENCY','ssafy'),(418,'2023-04-05 22:34:45.572429','0xf8cb4f7ae68696cdd456b6c6f0e7961fb431176ea31b5611720c33e78a5133b3','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_10.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',226,'HOSPITAL','ssafy'),(419,'2023-04-05 22:35:33.557260','0x3c1e6ac274b9b04b7dfebbaf42d300bdfc83dabcb8022f57fb41d53d27c2d83b','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_6.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',227,'AGENCY','ddd'),(420,'2023-04-05 22:35:33.585944','0xead5772221ec2d118053bd8c25916d16858c14b40993b6419709a7c854ec16cb','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_6.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',228,'HOSPITAL','ddd'),(421,'2023-04-05 22:36:13.610050','0xab879bcceb955fe05e0315dc133cd4fa46491e9981266ad2869723ec65187ea5','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_2.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',229,'AGENCY','333'),(422,'2023-04-05 22:36:13.639954','0xe4577a41781b5d4494a5257b1018555ac80415e28c2743a8f089e95928210066','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_2.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',230,'HOSPITAL','333'),(423,'2023-04-05 22:37:20.039637','0x28ad08e6211bca6646aa540f9b5e747781be78cebd361154b413247f40fdf493','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_9.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',231,'AGENCY','1'),(424,'2023-04-05 22:37:20.077980','0xea0e9981c4888f53478b3dfb9a6e9b87bec2b97e40fe61e550891f51c9549e59','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_9.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',232,'HOSPITAL','1'),(425,'2023-04-05 22:40:07.463517','0x747ebb80284c4b329114717f5c31306baddc6e2efd0f18b9fbcdfbf05c1290be','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','4aeab502-be31-45a7-91ab-cfcaec0bb14e','4aeab502-be31-45a7-91ab-cfcaec0bb14e',233,'AGENCY','123123'),(426,'2023-04-05 22:40:07.517007','0x7f4b0867dfd71f85016333ba620157d9cc6c60c684f244ba0edeea1a3735d67e','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','4aeab502-be31-45a7-91ab-cfcaec0bb14e','4aeab502-be31-45a7-91ab-cfcaec0bb14e',234,'HOSPITAL','123123'),(427,'2023-04-05 22:45:57.315104','0x134b9204fed8b783610fa3033793f9d05867264a1100fbff16e431612640edcb','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_5.gif','4aeab502-be31-45a7-91ab-cfcaec0bb14e','4aeab502-be31-45a7-91ab-cfcaec0bb14e',235,'AGENCY','123123123'),(428,'2023-04-05 22:45:57.370802','0xc8fedc4330f74046bbc7a96af8c07b4dbc7f69d19145d446c41d1785b30348e8','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_5.gif','4aeab502-be31-45a7-91ab-cfcaec0bb14e','4aeab502-be31-45a7-91ab-cfcaec0bb14e',236,'HOSPITAL','123123123'),(429,'2023-04-05 22:46:28.045577','0xf0ae7134c65a7840011dd4c614ea4ae34987d2c7fd0765596f314c5352093992','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_1.gif','4aeab502-be31-45a7-91ab-cfcaec0bb14e','4aeab502-be31-45a7-91ab-cfcaec0bb14e',237,'AGENCY','123'),(430,'2023-04-05 22:46:28.315955','0xbcd758fe32db812c0738da5291986eb782f0147a99f5624fba7a657655c7a7e1','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_1.gif','4aeab502-be31-45a7-91ab-cfcaec0bb14e','4aeab502-be31-45a7-91ab-cfcaec0bb14e',238,'HOSPITAL','123'),(431,'2023-04-05 22:47:06.664215','0x15364ee783b796690a8ea2f0a0b5db7e30b87a7a4016bbba8583e639826e65d6','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','42fe7697-498b-4ea0-bb40-5553c50c26fd',239,'AGENCY','구스 혈액원'),(432,'2023-04-05 22:47:06.697024','0x75b83fbacd75684f5cfa327d406a806ca711c130e71a37b64538de8c9e5405af','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','17ad4ae8-57ef-48d2-986d-81763f10b800',240,'HOSPITAL','구스 혈액원'),(433,'2023-04-05 22:48:50.666688','0x828232d67c8672bfdd95f32c933b99ed2256a7269dcc80d8a4eb11dfa2e9cdae','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_3.gif','ae4c93d4-67f0-4502-9a0c-04d003ce6f0c','ae4c93d4-67f0-4502-9a0c-04d003ce6f0c',241,'AGENCY','싸피 혈액원'),(434,'2023-04-05 22:48:50.701026','0xd74a1bbdefc36101da68c6b34aa3b3547a92294fd3409104ab8eb0ac59f5fb52','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_3.gif','ae4c93d4-67f0-4502-9a0c-04d003ce6f0c','ae4c93d4-67f0-4502-9a0c-04d003ce6f0c',242,'HOSPITAL','싸피 혈액원'),(435,'2023-04-05 22:50:10.857865','0x92dce1075ac01ee963dc0ff2a8e1aba9eef2a0fc86c632ff86c37cff4bd7baa9','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_12.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','42fe7697-498b-4ea0-bb40-5553c50c26fd',243,'AGENCY','싸피 혈액원'),(436,'2023-04-05 22:50:10.897391','0x2002d9f13fb6e465f9650315c580153120338f00b4a512e7b9cf6c6f7a4f883b','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_12.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','2cb4a9f8-d750-4bb0-b282-cd35d4af70f6',244,'HOSPITAL','싸피 혈액원'),(437,'2023-04-05 22:50:41.903761','0x9a9583f755a81c4adbcf9d995adea2dbcecca6b8c06e3252df20e9a7eab77530','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',245,'AGENCY','구스 혈액원'),(438,'2023-04-05 22:50:41.944452','0xc3da4b9278b54e6088d4a2bfefb1e2b0a31deec534d0a1563964fc9c73004fc8','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_8.gif','813241d8-ac46-49d8-87f0-fa8f92a00168','813241d8-ac46-49d8-87f0-fa8f92a00168',246,'HOSPITAL','구스 혈액원'),(439,'2023-04-05 22:51:05.907659','0x2b6b39b11866b6355487892c8188c96a4cba825bb0b7d10054fc1fc7f3d8e088','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_1.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','42fe7697-498b-4ea0-bb40-5553c50c26fd',247,'AGENCY','aaa'),(440,'2023-04-05 22:51:05.937742','0x17d3396e5cf9bc52ee0a4c21599250686d89a42eae8412bf90e3d4db8e13d196','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_1.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',248,'HOSPITAL','aaa'),(441,'2023-04-05 23:08:20.096856','0x74de4c50aa78cf2740e7950c2e14a71971eec071bd315b56053c1d08e21b8496','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_6.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',249,'AGENCY','싸피 혈액원'),(442,'2023-04-05 23:08:20.137384','0x554fa3afe8ca53efecf691a5cad298869f1aa67c5459b3d29c3ab4497dded5b9','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_6.gif','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','67bae835-43bc-4b7f-a4e9-a15438ddd3cf',250,'HOSPITAL','싸피 혈액원'),(443,'2023-04-05 23:41:04.949403','0x1afd543cf0dab10f233992460321deb7a51537b69769ee779b08131900dd16a8','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_1.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','42fe7697-498b-4ea0-bb40-5553c50c26fd',251,'AGENCY','도언 혈액원'),(444,'2023-04-05 23:41:04.986103','0x9737aa3d08d4b0176333056af121022b5d87bcc67f0beb375fcfbdc91b5706d8','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_1.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','42fe7697-498b-4ea0-bb40-5553c50c26fd',252,'HOSPITAL','도언 혈액원'),(445,'2023-04-05 23:45:46.776266','0xa9216ad55763ccc68b8587745fdfaa4d2249f5ecd50186e208c7391965d0a6d8','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_6.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','42fe7697-498b-4ea0-bb40-5553c50c26fd',253,'AGENCY','도언 혈액원'),(446,'2023-04-05 23:45:46.809266','0x948ecb5731f68d7c564749e1592f665cbccb27db71ac007bbfb30130994107ea','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_6.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','42fe7697-498b-4ea0-bb40-5553c50c26fd',254,'HOSPITAL','도언 혈액원'),(447,'2023-04-05 23:46:28.546467','0xe5e47cafdd27abcc4be016c47e7eafbdc9d2f4113e8793f2939b8b9691906eb2','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_11.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','42fe7697-498b-4ea0-bb40-5553c50c26fd',255,'AGENCY','도언이네집'),(448,'2023-04-05 23:46:28.576966','0x31df9e7c06fd9c7a175ab5525c5e492be44dab49da6f05e77f882e23fc92207e','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_11.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','42fe7697-498b-4ea0-bb40-5553c50c26fd',256,'HOSPITAL','도언이네집'),(449,'2023-04-05 23:47:48.681904','0x3855e611063258799def7e9b893320c3d85b3578a10b9cf9ddf56c82cb2809ac','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_9.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','42fe7697-498b-4ea0-bb40-5553c50c26fd',257,'AGENCY','도언이네집'),(450,'2023-04-05 23:47:48.718738','0xcab8b6e2c29395f8f9fa338c752fd6af63f04adcdc37ba57d098c784a6073ba7','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_9.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','42fe7697-498b-4ea0-bb40-5553c50c26fd',258,'HOSPITAL','도언이네집'),(451,'2023-04-05 23:50:49.071631','0x0815b0d1c49b05ae08e2373722f90ce0c6f282e3416c57935b4fa7d01a9e3535','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_2.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','42fe7697-498b-4ea0-bb40-5553c50c26fd',259,'AGENCY','정ON바보'),(452,'2023-04-05 23:50:49.107843','0xfaafc8a096ff7423fdf514cf537c0a7cb27440b1a2e3c7476778fabdf6041a28','https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-nft/NFT_bg_2.gif','42fe7697-498b-4ea0-bb40-5553c50c26fd','42fe7697-498b-4ea0-bb40-5553c50c26fd',260,'HOSPITAL','정ON바보');
/*!40000 ALTER TABLE `nft` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-06  3:08:30