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
-- Table structure for table `paper_bd_cert`
--

DROP TABLE IF EXISTS `paper_bd_cert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paper_bd_cert` (
  `id` varchar(20) NOT NULL,
  `name` char(20) NOT NULL,
  `birth` datetime(6) NOT NULL,
  `gender_type` char(10) NOT NULL,
  `blood_type` char(20) NOT NULL,
  `blood` char(10) NOT NULL,
  `rh_type` char(10) NOT NULL,
  `blood_volume` int unsigned NOT NULL,
  `place` char(20) NOT NULL,
  `bd_date` datetime(6) NOT NULL,
  `status` char(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paper_bd_cert`
--

LOCK TABLES `paper_bd_cert` WRITE;
/*!40000 ALTER TABLE `paper_bd_cert` DISABLE KEYS */;
INSERT INTO `paper_bd_cert` (`id`, `name`, `birth`, `gender_type`, `blood_type`, `blood`, `rh_type`, `blood_volume`, `place`, `bd_date`, `status`) VALUES ('092213878101','양희제','1997-04-21 00:00:00.000000','male','WHOLE','B','RHPLUS',400,'대전.세종.충남혈액원','2022-10-21 00:00:00.000000','INACTIVE'),('092300705901','이현구','1996-11-04 00:00:00.000000','male','WHOLE','B','RHPLUS',400,'대전.세종.충남혈액원','2023-03-30 00:00:00.000000','INACTIVE'),('092300706001','이경택','1995-03-08 00:00:00.000000','male','WHOLE','A','RHPLUS',400,'대전.세종.충남혈액원','2023-03-30 00:00:00.000000','INACTIVE'),('092300706101','최규림','1996-01-16 00:00:00.000000','male','WHOLE','A','RHPLUS',400,'대전.세종.충남혈액원','2023-03-30 00:00:00.000000','INACTIVE');
/*!40000 ALTER TABLE `paper_bd_cert` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-06  3:08:34
