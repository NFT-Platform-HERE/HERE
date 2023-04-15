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
-- Table structure for table `board_img`
--

DROP TABLE IF EXISTS `board_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_img` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `img_url` varchar(200) DEFAULT NULL,
  `board_id` int unsigned DEFAULT NULL,
  `status` char(10) NOT NULL DEFAULT 'ACTIVE',
  `orders` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKey99sxtgmf5fpa0dfs2r2hxaa` (`board_id`),
  CONSTRAINT `FKey99sxtgmf5fpa0dfs2r2hxaa` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_img`
--

LOCK TABLES `board_img` WRITE;
/*!40000 ALTER TABLE `board_img` DISABLE KEYS */;
INSERT INTO `board_img` (`id`, `img_url`, `board_id`, `status`, `orders`) VALUES (105,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/e4abe21c-eeaa-436f-b01e-5b144b0418ee.png',102,'ACTIVE',0),(106,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/52835a30-74ae-42a9-89a1-bea4282f60d3.png',103,'ACTIVE',0),(107,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/331dbeb6-cb4c-438c-abd5-2b8e84ff55e0.png',104,'ACTIVE',0),(108,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/f6c538f7-345e-4682-a049-0c125f30b38d.png',105,'INACTIVE',0),(109,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/f57bacc9-580c-4122-b172-3f2b8c3f5dd2.jpg',106,'ACTIVE',0),(110,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/9263d0d6-e372-4d35-826a-52c5bab2f356.jpg',107,'ACTIVE',0),(111,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/55c65c53-2c5c-415c-87f5-ffab279e3eac.PNG',108,'ACTIVE',0),(112,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/ab189371-dc1f-4acd-881d-cebc242e3f8a.png',109,'ACTIVE',0),(113,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/2cab52d9-0b61-4f04-9b21-dfa9287abff1.gif',110,'ACTIVE',0),(114,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/386535d5-d65d-4d74-9b29-eb01546d376c.png',111,'ACTIVE',0),(115,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/9ac9c807-1e41-4e53-9ae1-74c04239dd5c.gif',105,'INACTIVE',0),(116,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/75dda128-b49d-43df-8077-cad77520741a.jpg',105,'ACTIVE',0),(117,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/7a5b9333-ba04-4877-a3bc-dfa91d6bd35b.gif',112,'ACTIVE',0),(118,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/57e2a9a6-71fc-4e2f-9f75-21f7ce37398f.png',113,'ACTIVE',0),(119,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/50f7e1cd-8ead-4e9a-801e-a34187ae68b4.png',114,'ACTIVE',0),(120,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/ee591c4e-49b3-4344-ad86-fc074fe6aed4.png',115,'ACTIVE',0),(121,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/b7503a2c-3cf0-4f03-8f18-ff9bf2ea62fc.png',115,'ACTIVE',1),(122,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/56fe63d5-90e3-4dab-a20f-5f0a9a00013e.png',116,'ACTIVE',0),(123,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/77d9eceb-d1af-4244-b380-b1991fc27dca.png',117,'ACTIVE',0),(124,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/9ec38317-0f6a-4938-93c9-708981808517.png',118,'ACTIVE',0),(125,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/765df4e6-9474-4fcd-a355-dbdcfa1e8b1c.gif',119,'ACTIVE',0),(126,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/e3cb4022-ab76-43ef-bbc2-4406bd1066c0.png',120,'ACTIVE',0),(127,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/16a320aa-db0b-4fea-a5a3-cef30ed98925.png',121,'ACTIVE',0),(128,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/485ef1f2-9f21-4400-8955-7e26fa8a2498.png',121,'ACTIVE',1),(129,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/9c57dd14-6784-4a9f-ae69-69ea7e0f9731.png',122,'ACTIVE',0),(130,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/821b9761-eb88-4378-b021-ac048dfb747c.jpg',123,'ACTIVE',0),(131,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/27d46376-4190-4298-9d79-92498ab21c25.jpg',124,'ACTIVE',0),(132,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/4f8591ab-6fa0-416c-9631-74d6182e1ab6.jpg',125,'ACTIVE',0),(133,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/221eb25e-2351-4d6c-8490-cc0667371694.jpg',126,'ACTIVE',0),(134,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/f0d3f881-e71e-4320-a18c-72498499d18b.png',127,'ACTIVE',0),(135,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/97797b39-372b-497c-9618-067553e965a2.png',127,'ACTIVE',1),(136,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/172aa996-347e-4a05-a294-563e6eba5463.png',127,'ACTIVE',2),(137,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/1e4b5208-3b34-4a10-afe2-c90360910dc1.png',128,'ACTIVE',0),(138,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/2e47dd69-1c4e-492f-be0a-95f6a728f546.png',128,'ACTIVE',1),(139,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/566cfe60-84a5-4344-8146-ec787e17dd5a.png',128,'ACTIVE',2),(140,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/510cb248-cb0c-4f17-8bdf-9b3a606e14e7.jpg',129,'ACTIVE',0),(141,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/28cc841d-c534-4b3d-8f80-a4f918d1a7f3.jpg',130,'ACTIVE',0),(142,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/84a46d8a-9b91-40ce-9a41-5f4393bafcee.jpg',131,'ACTIVE',0),(143,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/fa46f535-ff81-4619-9224-c50b7cfa206f.jpg',132,'ACTIVE',0),(144,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/37f3baae-a9d4-4ed0-841b-f39b65858eec.jpg',133,'ACTIVE',0),(145,'https://s3.ap-northeast-2.amazonaws.com/here-bucket/post/image/119b3049-18e4-48c7-a179-a3623594be42.jpg',135,'ACTIVE',0);
/*!40000 ALTER TABLE `board_img` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-06  3:08:28
