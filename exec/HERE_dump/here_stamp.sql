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
-- Table structure for table `stamp`
--

DROP TABLE IF EXISTS `stamp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stamp` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `stage` int NOT NULL DEFAULT '1',
  `step` int NOT NULL DEFAULT '1',
  `member_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1oscorlxc4ywlhvbucl1j2q9q` (`member_id`),
  CONSTRAINT `FK1oscorlxc4ywlhvbucl1j2q9q` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stamp`
--

LOCK TABLES `stamp` WRITE;
/*!40000 ALTER TABLE `stamp` DISABLE KEYS */;
INSERT INTO `stamp` (`id`, `stage`, `step`, `member_id`) VALUES (1,1,4,'95067026-cfcc-458c-8bbe-e59eb235aea7'),(4,1,1,'ea69cb87-4551-40d2-a33b-1dcd904c3ef8'),(5,1,3,'ae4c93d4-67f0-4502-9a0c-04d003ce6f0c'),(6,4,2,'813241d8-ac46-49d8-87f0-fa8f92a00168'),(7,2,2,'8793cd9d-4986-410c-bb3f-f9bd347ce5d7'),(8,2,6,'2cb4a9f8-d750-4bb0-b282-cd35d4af70f6'),(9,1,1,'cc82e9bc-9549-4598-a34e-a3cb576ccd0a'),(10,1,1,'aa00b7cf-b83b-4cec-8d72-63b3f4849d13'),(11,1,1,'a25ea60d-1e9e-4936-ba0e-503394eed91f'),(12,1,1,'c7e124f1-2cc3-4f48-8014-903cf125e272'),(13,1,1,'feb8443f-3d56-493c-8b4e-91566281501e'),(14,1,1,'6f4e5482-0031-445f-9747-9030380b201e'),(15,1,1,'b0a25158-dc98-4bca-962c-29c88d8774aa'),(16,1,1,'696d4121-ab33-45c0-9413-f744d6a241c2'),(17,1,1,'db513e34-57aa-4201-9680-0c672704f71f'),(18,1,1,'b8deb143-4643-4201-8484-53b96915e72d'),(19,1,1,'f7ce7d4e-e54a-46be-8b3b-65cae26b7d85'),(20,1,1,'411cd1f3-a32a-441c-945c-ecc9d8239367'),(21,1,1,'33674ae5-e7ae-4619-a7c4-ac4d11ac3b44'),(22,1,1,'c0155ef6-4747-491e-ba63-55ee26854838'),(23,1,1,'fd8acf22-4492-475c-8de3-d872a4a023e7'),(24,1,1,'b47b7c91-f373-4f60-972c-8eb3454d8836'),(25,1,1,'ac8340ec-7280-4797-882b-87ed9d0d03e9'),(26,1,1,'8da87823-d9a4-4131-937f-7281d682a406'),(27,1,1,'7ae3bb59-e1b7-468c-a036-3de50522c888'),(28,1,2,'39172801-4937-4f54-9872-f46664b34472'),(29,3,6,'3c3a46dd-da35-4acc-829b-d8e4bb40683f'),(30,1,1,'768b2fee-6587-4eb4-bb9a-b5a10ce6446f'),(31,2,1,'c620bbb2-7c52-4e83-8368-de667d9f1f28'),(32,1,2,'9d7b030b-59f9-4b66-9374-c0072399d9fc'),(35,1,3,'4aeab502-be31-45a7-91ab-cfcaec0bb14e'),(36,2,4,'7fadaead-bf24-466b-a642-24f191e54e86'),(37,1,1,'62e0a15a-8dbb-4ed1-b554-88b8aaeb72cf'),(38,1,1,'52cfbf8f-e95e-4493-a7cb-4bbd622d7a6c'),(39,1,1,'c6a53d5a-401e-49ac-8b91-992d0b56e0ba'),(40,1,1,'32252db6-d09a-4f9e-8123-f26402362f58'),(41,1,1,'c9efb656-9848-4c03-9822-587b66c6bd92'),(42,1,2,'8959a09c-308c-47cc-bbd8-73bc006c853a'),(43,1,1,'423fb96b-e4fe-4f2f-a8d7-24e79a245a3d'),(44,2,1,'67bae835-43bc-4b7f-a4e9-a15438ddd3cf'),(45,2,2,'42fe7697-498b-4ea0-bb40-5553c50c26fd'),(46,1,1,'17ad4ae8-57ef-48d2-986d-81763f10b800'),(47,1,1,'041d4b7e-4ca8-4097-829a-32521e5f2bc7'),(48,1,1,'8dcdcece-1387-40a0-8a75-ab9bbb0d9131'),(49,1,1,'ae4f8845-83ce-45d6-b60c-1b36b2c0c7fd'),(50,1,1,'b9dbb0ef-ef09-420a-be0c-ea1cf3ec3f95'),(51,1,1,'f84e2b03-ef87-4883-adc1-aa887618cdab');
/*!40000 ALTER TABLE `stamp` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-06  3:08:32
