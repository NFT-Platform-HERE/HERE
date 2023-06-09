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
-- Table structure for table `bd_history`
--

DROP TABLE IF EXISTS `bd_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bd_history` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `bd_type` char(20) NOT NULL,
  `issued_date` datetime(6) NOT NULL,
  `place` varchar(50) NOT NULL,
  `status` char(10) NOT NULL DEFAULT 'INACTIVE',
  `member_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkb3i6fubji4ai9o3gve8ghdmp` (`member_id`),
  CONSTRAINT `FKkb3i6fubji4ai9o3gve8ghdmp` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bd_history`
--

LOCK TABLES `bd_history` WRITE;
/*!40000 ALTER TABLE `bd_history` DISABLE KEYS */;
INSERT INTO `bd_history` (`id`, `bd_type`, `issued_date`, `place`, `status`, `member_id`) VALUES (118,'PLASMA','2023-04-04 22:14:48.407879','ssafy','INACTIVE','8793cd9d-4986-410c-bb3f-f9bd347ce5d7'),(119,'WHOLE','2023-04-04 22:19:09.573426','ssafy','INACTIVE','8959a09c-308c-47cc-bbd8-73bc006c853a'),(120,'WHOLE','2023-04-04 23:25:57.892477','이현구 혈액원','INACTIVE','813241d8-ac46-49d8-87f0-fa8f92a00168'),(121,'PLASMA','2023-04-04 23:27:53.088195','집','INACTIVE','8793cd9d-4986-410c-bb3f-f9bd347ce5d7'),(123,'WHOLE','2023-04-05 00:25:47.801483','도언이 테스트중','INACTIVE','7fadaead-bf24-466b-a642-24f191e54e86'),(124,'WHOLE','2023-04-05 00:38:13.539114','123','INACTIVE','9d7b030b-59f9-4b66-9374-c0072399d9fc'),(126,'WHOLE','2023-04-05 14:04:26.356060','충남대 혈액원','INACTIVE','813241d8-ac46-49d8-87f0-fa8f92a00168'),(127,'WHOLE','2023-04-05 14:39:39.505789','오이 혐오 협회','INACTIVE','7fadaead-bf24-466b-a642-24f191e54e86'),(128,'WHOLE','2023-04-05 14:45:30.370508','진짜임 비맞을 거','INACTIVE','95067026-cfcc-458c-8bbe-e59eb235aea7'),(129,'PLASMA','2023-04-05 15:58:25.812149','충남혈액원','INACTIVE','3c3a46dd-da35-4acc-829b-d8e4bb40683f'),(130,'WHOLE','2023-04-05 17:23:57.029975','대전혈액원','INACTIVE','3c3a46dd-da35-4acc-829b-d8e4bb40683f'),(132,'WHOLE','2023-04-05 17:37:04.318796','오이 혐오 협회123','INACTIVE','95067026-cfcc-458c-8bbe-e59eb235aea7'),(133,'WHOLE','2023-04-05 17:39:16.385842','진짜임 비맞을 거','INACTIVE','95067026-cfcc-458c-8bbe-e59eb235aea7'),(134,'PLASMA','2023-04-05 17:45:35.876875','도언이네집','INACTIVE','ae4c93d4-67f0-4502-9a0c-04d003ce6f0c'),(135,'WHOLE','2023-04-05 17:55:56.025968','dㅇㅇ','INACTIVE','2cb4a9f8-d750-4bb0-b282-cd35d4af70f6'),(136,'WHOLE','2023-04-05 19:51:53.926837','유온','INACTIVE','39172801-4937-4f54-9872-f46664b34472'),(137,'WHOLE','2023-04-05 20:17:34.950326','충남대 혈액원','INACTIVE','813241d8-ac46-49d8-87f0-fa8f92a00168'),(138,'WHOLE','2023-04-05 20:20:51.382240','충남대 혈액원','INACTIVE','813241d8-ac46-49d8-87f0-fa8f92a00168'),(139,'WHOLE','2023-04-05 21:15:56.963934','충남대 혈액원','INACTIVE','813241d8-ac46-49d8-87f0-fa8f92a00168'),(140,'WHOLE','2023-04-05 22:19:17.352899','대전.세종.충남혈액원','INACTIVE','3c3a46dd-da35-4acc-829b-d8e4bb40683f'),(141,'WHOLE','2023-04-05 22:24:58.070329','싸피 혈액원','INACTIVE','67bae835-43bc-4b7f-a4e9-a15438ddd3cf'),(142,'WHOLE','2023-04-05 22:27:20.821127','싸피싸피','INACTIVE','3c3a46dd-da35-4acc-829b-d8e4bb40683f'),(143,'WHOLE','2023-04-05 22:27:48.610242','구스 혈액원','INACTIVE','813241d8-ac46-49d8-87f0-fa8f92a00168'),(144,'WHOLE','2023-04-05 22:27:50.789040','싸피 혈액원','INACTIVE','67bae835-43bc-4b7f-a4e9-a15438ddd3cf'),(145,'WHOLE','2023-04-05 22:31:03.521922','구스 혈액원','INACTIVE','813241d8-ac46-49d8-87f0-fa8f92a00168'),(146,'WHOLE','2023-04-05 22:31:39.377607','1','INACTIVE','67bae835-43bc-4b7f-a4e9-a15438ddd3cf'),(147,'WHOLE','2023-04-05 22:33:11.968630','용용 혈액원','INACTIVE','813241d8-ac46-49d8-87f0-fa8f92a00168'),(148,'WHOLE','2023-04-05 22:34:12.079567','구스 혈액원','INACTIVE','42fe7697-498b-4ea0-bb40-5553c50c26fd'),(149,'WHOLE','2023-04-05 22:34:45.541001','ssafy','INACTIVE','67bae835-43bc-4b7f-a4e9-a15438ddd3cf'),(150,'WHOLE','2023-04-05 22:37:20.045587','1','INACTIVE','67bae835-43bc-4b7f-a4e9-a15438ddd3cf'),(151,'WHOLE','2023-04-05 22:40:07.469285','123123','INACTIVE','4aeab502-be31-45a7-91ab-cfcaec0bb14e'),(152,'WHOLE','2023-04-05 22:45:57.321088','123123123','INACTIVE','4aeab502-be31-45a7-91ab-cfcaec0bb14e'),(153,'WHOLE','2023-04-05 22:47:06.669827','구스 혈액원','INACTIVE','42fe7697-498b-4ea0-bb40-5553c50c26fd'),(154,'WHOLE','2023-04-05 22:48:50.672250','싸피 혈액원','INACTIVE','ae4c93d4-67f0-4502-9a0c-04d003ce6f0c'),(155,'WHOLE','2023-04-05 22:50:10.864036','싸피 혈액원','INACTIVE','42fe7697-498b-4ea0-bb40-5553c50c26fd'),(156,'WHOLE','2023-04-05 22:50:41.909427','구스 혈액원','INACTIVE','813241d8-ac46-49d8-87f0-fa8f92a00168'),(157,'WHOLE','2023-04-05 23:08:20.102688','싸피 혈액원','INACTIVE','67bae835-43bc-4b7f-a4e9-a15438ddd3cf'),(158,'PLASMA','2023-04-05 23:41:04.954860','도언 혈액원','INACTIVE','42fe7697-498b-4ea0-bb40-5553c50c26fd'),(159,'WHOLE','2023-04-05 23:45:46.781692','도언 혈액원','INACTIVE','42fe7697-498b-4ea0-bb40-5553c50c26fd'),(160,'PLASMA','2023-04-05 23:47:48.687334','도언이네집','INACTIVE','42fe7697-498b-4ea0-bb40-5553c50c26fd'),(161,'PLASMA','2023-04-05 23:50:49.076878','정ON바보','INACTIVE','42fe7697-498b-4ea0-bb40-5553c50c26fd');
/*!40000 ALTER TABLE `bd_history` ENABLE KEYS */;
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
