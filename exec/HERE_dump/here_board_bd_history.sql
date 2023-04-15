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
-- Table structure for table `board_bd_history`
--

DROP TABLE IF EXISTS `board_bd_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_bd_history` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `board_id` int unsigned NOT NULL,
  `quantity` int NOT NULL,
  `sender_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_bd_history`
--

LOCK TABLES `board_bd_history` WRITE;
/*!40000 ALTER TABLE `board_bd_history` DISABLE KEYS */;
INSERT INTO `board_bd_history` (`id`, `board_id`, `quantity`, `sender_id`) VALUES (31,103,3,'8793cd9d-4986-410c-bb3f-f9bd347ce5d7'),(34,104,1,'813241d8-ac46-49d8-87f0-fa8f92a00168'),(36,104,1,'c620bbb2-7c52-4e83-8368-de667d9f1f28'),(39,102,4,'3c3a46dd-da35-4acc-829b-d8e4bb40683f'),(41,105,3,'2cb4a9f8-d750-4bb0-b282-cd35d4af70f6'),(42,105,2,'3c3a46dd-da35-4acc-829b-d8e4bb40683f'),(43,105,2,'813241d8-ac46-49d8-87f0-fa8f92a00168'),(44,106,2,'813241d8-ac46-49d8-87f0-fa8f92a00168'),(45,106,2,'3c3a46dd-da35-4acc-829b-d8e4bb40683f'),(46,106,2,'2cb4a9f8-d750-4bb0-b282-cd35d4af70f6'),(47,106,2,'7fadaead-bf24-466b-a642-24f191e54e86'),(48,106,2,'c620bbb2-7c52-4e83-8368-de667d9f1f28'),(49,108,1,'3c3a46dd-da35-4acc-829b-d8e4bb40683f'),(50,108,1,'c620bbb2-7c52-4e83-8368-de667d9f1f28'),(51,108,1,'813241d8-ac46-49d8-87f0-fa8f92a00168'),(52,108,1,'7fadaead-bf24-466b-a642-24f191e54e86'),(53,108,1,'2cb4a9f8-d750-4bb0-b282-cd35d4af70f6'),(54,109,1,'7fadaead-bf24-466b-a642-24f191e54e86'),(55,109,1,'2cb4a9f8-d750-4bb0-b282-cd35d4af70f6'),(56,111,1,'7fadaead-bf24-466b-a642-24f191e54e86'),(57,111,1,'2cb4a9f8-d750-4bb0-b282-cd35d4af70f6'),(58,113,3,'8793cd9d-4986-410c-bb3f-f9bd347ce5d7'),(59,116,2,'7fadaead-bf24-466b-a642-24f191e54e86'),(60,116,2,'95067026-cfcc-458c-8bbe-e59eb235aea7'),(61,117,3,'95067026-cfcc-458c-8bbe-e59eb235aea7'),(62,118,2,'2cb4a9f8-d750-4bb0-b282-cd35d4af70f6'),(63,119,1,'95067026-cfcc-458c-8bbe-e59eb235aea7'),(64,119,2,'2cb4a9f8-d750-4bb0-b282-cd35d4af70f6'),(65,120,4,'ae4c93d4-67f0-4502-9a0c-04d003ce6f0c'),(66,122,1,'39172801-4937-4f54-9872-f46664b34472'),(67,134,2,'42fe7697-498b-4ea0-bb40-5553c50c26fd'),(68,135,2,'42fe7697-498b-4ea0-bb40-5553c50c26fd'),(69,124,1,'3c3a46dd-da35-4acc-829b-d8e4bb40683f'),(70,125,1,'67bae835-43bc-4b7f-a4e9-a15438ddd3cf'),(71,125,1,'9d7b030b-59f9-4b66-9374-c0072399d9fc');
/*!40000 ALTER TABLE `board_bd_history` ENABLE KEYS */;
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
