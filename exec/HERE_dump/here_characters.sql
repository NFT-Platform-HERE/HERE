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
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characters` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `img_url` varchar(200) NOT NULL,
  `level` int NOT NULL DEFAULT '1',
  `type` char(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` (`id`, `img_url`, `level`, `type`) VALUES (4,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/cat1.png',1,'CAT'),(5,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/cat2.png',2,'CAT'),(6,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/cat3.png',3,'CAT'),(7,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/cat4.png',4,'CAT'),(8,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/cat5.png',5,'CAT'),(9,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/cat6.png',6,'CAT'),(10,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/deer1.png',1,'DEER'),(11,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/deer2.png',2,'DEER'),(12,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/deer3.png',3,'DEER'),(13,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/deer4.png',4,'DEER'),(14,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/deer5.png',5,'DEER'),(15,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/deer6.png',6,'DEER'),(16,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/dog1.png',1,'DOG'),(17,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/dog2.png',2,'DOG'),(18,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/dog3.png',3,'DOG'),(19,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/dog4.png',4,'DOG'),(20,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/dog5.png',5,'DOG'),(21,'https://here-bucket.s3.ap-northeast-2.amazonaws.com/here-characters/dog6.png',6,'DOG');
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-06  3:08:29
