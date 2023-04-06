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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` varchar(36) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `cur_exp` int NOT NULL DEFAULT '0',
  `email` char(50) NOT NULL,
  `goal_exp` int NOT NULL DEFAULT '50',
  `level` int NOT NULL DEFAULT '1',
  `name` char(20) NOT NULL,
  `nickname` char(20) NOT NULL,
  `role` char(10) NOT NULL DEFAULT 'USER',
  `wallet_address` char(100) NOT NULL,
  `character_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKa3fpe5454y4mo76jmwg9cgcxn` (`character_id`),
  CONSTRAINT `FKa3fpe5454y4mo76jmwg9cgcxn` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` (`id`, `created_date`, `cur_exp`, `email`, `goal_exp`, `level`, `name`, `nickname`, `role`, `wallet_address`, `character_id`) VALUES ('041d4b7e-4ca8-4097-829a-32521e5f2bc7','2023-04-05 14:29:17.232265',0,'agency@ssafy.com',50,1,'싸피전자','싸피전자','AGENCY','0x516D8c200fF4fd9e7437569B637eaFAe7Ca2b70f',16),('17ad4ae8-57ef-48d2-986d-81763f10b800','2023-04-05 14:27:47.488683',0,'hospital@ssafy.com',50,1,'싸피병원','싸피병원','HOSPITAL','0xE2271bD181eFbAB90813b84CB495862887123BAD',10),('2cb4a9f8-d750-4bb0-b282-cd35d4af70f6','2023-03-27 13:09:42.897434',540,'dobobe6022@gmail.com',550,11,'김도언','언도','USER','0xf307806E792035604a67c772cCFdc1B5c78A1Cc7',21),('32252db6-d09a-4f9e-8123-f26402362f58','2023-04-04 16:56:49.153989',0,'test_agency@ssafy.com',50,1,'기관T','기관T','AGENCY','0xc926d375823336585a91F25EfD21e4FA5c45c29b',16),('33674ae5-e7ae-4619-a7c4-ac4d11ac3b44','2023-03-28 13:33:15.680017',0,'test13@naver.com',50,1,'이승진 의료 센터','이승진 의료 센터','HOSPITAL','1234',4),('39172801-4937-4f54-9872-f46664b34472','2023-03-28 22:04:53.179936',40,'seoyoon528@gmail.com',50,1,'박서윤','뿡뿡짱','USER','0x5C81ED9CB3Bda3Bb44D82AA4CE6F1B13F7e18C17',4),('3c3a46dd-da35-4acc-829b-d8e4bb40683f','2023-03-29 08:50:41.766199',655,'skylove0911@naver.com',700,14,'이경택','블루베리','USER','0xa42Af011FC4936651f1A0410B5eb98334A9c4aDd',9),('411cd1f3-a32a-441c-945c-ecc9d8239367','2023-03-28 13:32:56.233469',0,'test12@naver.com',50,1,'김경민 의원','김경민 의원','HOSPITAL','1234',4),('423fb96b-e4fe-4f2f-a8d7-24e79a245a3d','2023-04-04 17:01:50.605140',0,'test_user2@ssafy.com',50,1,'유저2T','유저2T','USER','0xd96A8b0bC01FDB49be953fF69D8eEbBa18435d08',16),('42fe7697-498b-4ea0-bb40-5553c50c26fd','2023-04-05 14:26:39.049005',320,'yong@ssafy.com',350,7,'조용현','조용현','USER','0x4eD2d1b284AdAfc03F42ac953058550153f1E1A7',21),('4aeab502-be31-45a7-91ab-cfcaec0bb14e','2023-04-03 23:30:49.810372',90,'gusrnas@gmail.com',100,2,'리현구','꾸꾸스','USER','0xD9E5ea08448478241f6c6E38DC6e57bc09a887B8',5),('52cfbf8f-e95e-4493-a7cb-4bbd622d7a6c','2023-04-04 15:53:02.278341',0,'adcdm1111@gmail.com',50,1,'최규림','Choi','USER','0xBe8fdCc7A8F29647b7d70C784E5e1BF207f45b6C',10),('62e0a15a-8dbb-4ed1-b554-88b8aaeb72cf','2023-04-04 15:52:50.106119',0,'dobobe602@gmail.com',50,1,'김언도','언도더씨','USER','0xda464db47C6b91be4599472Fe6E3C8f3e89C495C',4),('67bae835-43bc-4b7f-a4e9-a15438ddd3cf','2023-04-05 14:20:20.558938',335,'gusrnqq@ssafy.com',350,7,'이현구','이현구','USER','0x94a1eB8687A5Ae40DF888D83f02d66Be3C50c57d',9),('696d4121-ab33-45c0-9413-f744d6a241c2','2023-03-28 13:25:07.885137',0,'test7@naver.com',50,1,'중앙대학교','중앙대학교','AGENCY','1234',4),('6f4e5482-0031-445f-9747-9030380b201e','2023-03-28 13:24:46.345270',0,'test5@naver.com',50,1,'성균관대학교','성균관대학교','AGENCY','1234',4),('768b2fee-6587-4eb4-bb9a-b5a10ce6446f','2023-03-30 02:17:47.005609',0,'adcdm87@gmail.com',50,1,'최규림','최규림 의원','HOSPITAL','0x7855C93560c50C0e20466c532D583272Dfd945A9',4),('7ae3bb59-e1b7-468c-a036-3de50522c888','2023-03-28 14:26:59.908318',0,'test19@naver.com',50,1,'조용현의 용한 용용병원','조용현의 용용병원','HOSPITAL','1234',4),('7fadaead-bf24-466b-a642-24f191e54e86','2023-04-04 10:02:14.767231',395,'grchoi1087@gmail.com',400,8,'최규림','뀨림','USER','0xfbcc3AB9A4024Cb4f4107234c0d83d30B9F1E2AB',9),('813241d8-ac46-49d8-87f0-fa8f92a00168','2023-03-24 11:06:11.172604',890,'chjo0330@gmail.com',900,18,'최정온','치킨','USER','0x97f44Ce33B6279461b5F3f8aA7B182794B09b414',9),('8793cd9d-4986-410c-bb3f-f9bd347ce5d7','2023-03-26 01:48:18.162547',455,'gusrnqq@naver.com',500,10,'이현구','구스','USER','0xa28621F94f874ab8DfB7Da6e4e90c615ba53A462',9),('8959a09c-308c-47cc-bbd8-73bc006c853a','2023-04-04 17:00:08.476064',35,'test_user1@ssafy.com',50,1,'유저1T','유저1T','USER','0x7C8DbDdb5D9921BE89d8FF0d0d1a14dFe60D3705',4),('8da87823-d9a4-4131-937f-7281d682a406','2023-03-28 14:25:55.879650',0,'test18@naver.com',50,1,'이경택의 선병원','이경택의 선병원','HOSPITAL','1234',4),('8dcdcece-1387-40a0-8a75-ab9bbb0d9131','2023-04-05 14:32:15.805224',0,'redcross@ssafy.com',50,1,'적십자','싸피혈액원','REDCROSS','0x8cCFf4c6B97472aF70d3F26c7DeE7B709F181B57',4),('95067026-cfcc-458c-8bbe-e59eb235aea7','2023-03-23 13:47:56.670120',185,'adcdm77@naver.com',200,4,'최규림','choi1087','USER','0x0055DE88baD70aa88a19D85E11B2e81d15B9E003',7),('9d7b030b-59f9-4b66-9374-c0072399d9fc','2023-04-03 22:55:07.069768',80,'adcdm1087@daum.net',100,2,'최규림림','최규림','USER','0x1244982bd584E7f4a5b3e9710a94a09dC5b4AE53',5),('a25ea60d-1e9e-4936-ba0e-503394eed91f','2023-03-28 13:24:07.561458',0,'test2@naver.com',50,1,'연세대학교','연세대학교','AGENCY','1234',4),('aa00b7cf-b83b-4cec-8d72-63b3f4849d13','2023-03-28 13:23:57.997656',0,'test1@naver.com',50,1,'서울대학교','서울대학교','AGENCY','1234',4),('ac8340ec-7280-4797-882b-87ed9d0d03e9','2023-03-28 14:25:10.851917',0,'test17@naver.com',50,1,'최정온 인천 병원','회정온 인천 병원','HOSPITAL','1234',4),('ae4c93d4-67f0-4502-9a0c-04d003ce6f0c','2023-03-23 17:13:38.254026',80,'chyh0218@naver.com',100,2,'조용현','용용','USER','0x79956F70D399e07c903e736Ebf897F9696DEA336',5),('ae4f8845-83ce-45d6-b60c-1b36b2c0c7fd','2023-04-05 20:43:39.806617',10,'chms03330@naver.com',50,1,'김정온','제이오','USER','0x08F89F017E403b093d8ae30A70B2f46371170876',16),('b0a25158-dc98-4bca-962c-29c88d8774aa','2023-03-28 13:24:56.439554',0,'test6@naver.com',50,1,'한양대학교','한양대학교','AGENCY','1234',4),('b47b7c91-f373-4f60-972c-8eb3454d8836','2023-03-28 13:34:15.910923',0,'test16@naver.com',50,1,'현구구 전문의','현구구 전문의','HOSPITAL','1234',4),('b8deb143-4643-4201-8484-53b96915e72d','2023-03-28 13:25:37.534539',0,'test9@naver.com',50,1,'서울시립대학교','서울시립대학교','AGENCY','1234',4),('b9dbb0ef-ef09-420a-be0c-ea1cf3ec3f95','2023-04-05 20:51:48.685646',5,'jhy7547@naver.com',50,1,'장현영','Janghy','USER','0x379F2aC8B1B0e153ac2449153C3a1410764b0F3d',10),('c0155ef6-4747-491e-ba63-55ee26854838','2023-03-28 13:33:33.683789',0,'test14@naver.com',50,1,'김도언 의원','김도언 의원','HOSPITAL','1234',4),('c620bbb2-7c52-4e83-8368-de667d9f1f28','2023-04-03 22:06:31.707879',230,'chyh9218@gmail.com',250,5,'조용현투','용용투','AGENCY','0xa2Fe420Bb5a692C27747959e45A2693652A4e275',8),('c6a53d5a-401e-49ac-8b91-992d0b56e0ba','2023-04-04 16:42:38.964342',0,'test_redcross@ssafy.com',50,1,'적십자T','적십자T','REDCROSS','0x979ca7E2c4dcB89D2f41cB78Db31283b880F9101',4),('c7e124f1-2cc3-4f48-8014-903cf125e272','2023-03-28 13:24:14.264690',0,'test3@naver.com',50,1,'고려대학교','고려대학교','AGENCY','1234',4),('c9efb656-9848-4c03-9822-587b66c6bd92','2023-04-04 16:58:07.071825',0,'test_hospital@ssafy.com',50,1,'병원T','병원T','HOSPITAL','0xFC961c04d11A770c66785987489438Bba89Cf749',10),('cc82e9bc-9549-4598-a34e-a3cb576ccd0a','2023-03-28 13:20:59.384989',0,'test@naver.com',50,1,'충남대학교','충남대학교','AGENCY','1234',4),('db513e34-57aa-4201-9680-0c672704f71f','2023-03-28 13:25:22.740967',0,'test8@naver.com',50,1,'경희대학교','경희대학교','AGENCY','1234',4),('ea69cb87-4551-40d2-a33b-1dcd904c3ef8','2023-03-23 17:01:39.273686',0,'chyh0218@naber.com',50,1,'dd','dd','USER','1234',4),('f7ce7d4e-e54a-46be-8b3b-65cae26b7d85','2023-03-28 13:32:39.194129',0,'test11@naver.com',50,1,'빛나는 병원','빛나는 병원','HOSPITAL','1234',4),('f84e2b03-ef87-4883-adc1-aa887618cdab','2023-04-05 20:53:34.249702',5,'dobobe602@naver.com',50,1,'김언더','언더더씨','USER','0x23b502d73CEAFf78056f293531b0F884DA3f1dB7',4),('fd8acf22-4492-475c-8de3-d872a4a023e7','2023-03-28 13:33:52.890719',0,'test15@naver.com',50,1,'킹규림 병원','킹규림 병원','HOSPITAL','1234',4),('feb8443f-3d56-493c-8b4e-91566281501e','2023-03-28 13:24:33.726664',0,'test4@naver.com',50,1,'서강대학교','서강대학교','AGENCY','1234',4);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-06  3:08:31
