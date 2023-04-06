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
-- Table structure for table `cert_history`
--

DROP TABLE IF EXISTS `cert_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cert_history` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `hash_value` varchar(200) NOT NULL,
  `reason` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` char(20) NOT NULL,
  `token_id` int unsigned NOT NULL,
  `type` char(20) DEFAULT NULL,
  `agency_id` varchar(36) NOT NULL,
  `member_id` varchar(36) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKc3tonjjmtgnx8csw5ipuodho5` (`agency_id`),
  KEY `FKj0btspic9jjt0t3yv2jb65624` (`member_id`),
  CONSTRAINT `FKc3tonjjmtgnx8csw5ipuodho5` FOREIGN KEY (`agency_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKj0btspic9jjt0t3yv2jb65624` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cert_history`
--

LOCK TABLES `cert_history` WRITE;
/*!40000 ALTER TABLE `cert_history` DISABLE KEYS */;
INSERT INTO `cert_history` (`id`, `created_date`, `hash_value`, `reason`, `status`, `token_id`, `type`, `agency_id`, `member_id`, `updated_date`) VALUES (47,'2023-04-04 22:27:06.649241','0xbb7abd1bd3c2574e2e826320f5a66db66b0306d78bcf8f1f3f71901a42d72720','공가 제출','INACTIVE',127,'AGENCY','32252db6-d09a-4f9e-8123-f26402362f58','8959a09c-308c-47cc-bbd8-73bc006c853a','2023-04-04 22:27:06.649241'),(48,'2023-04-04 22:28:49.990604','0xb23338082004c49a2336a21e094eb918e89a4e2fa4d2cb7a5b97530f8eacb4e9',NULL,'ACTIVE',128,'HOSPITAL','c9efb656-9848-4c03-9822-587b66c6bd92','8959a09c-308c-47cc-bbd8-73bc006c853a','2023-04-04 23:54:22.590859'),(49,'2023-04-04 23:30:46.242874','0x37a94b90e83f9d3c7907f11c9494acf57f9d3933bd7b9f62438aedf46faf285c','공가 신청합니다','INACTIVE',125,'AGENCY','32252db6-d09a-4f9e-8123-f26402362f58','8793cd9d-4986-410c-bb3f-f9bd347ce5d7','2023-04-04 23:30:46.242874'),(50,'2023-04-04 23:31:19.977078','0x37a94b90e83f9d3c7907f11c9494acf57f9d3933bd7b9f62438aedf46faf285c','공가 신청합니다.','INACTIVE',125,'AGENCY','696d4121-ab33-45c0-9413-f744d6a241c2','8793cd9d-4986-410c-bb3f-f9bd347ce5d7','2023-04-04 23:31:19.977078'),(51,'2023-04-04 23:39:42.008699','0xddc2e9bffe52d3df97e5f3003c4b441090ad60bdc6c9f5023eb094f709e2ebd9',NULL,'ACTIVE',126,'HOSPITAL','c9efb656-9848-4c03-9822-587b66c6bd92','9d7b030b-59f9-4b66-9374-c0072399d9fc','2023-04-04 23:54:22.500860'),(52,'2023-04-04 23:39:42.013862','0x6a91f6b2c0647b7d2a8937ecf953a2bddcb955f9e3d34d8af42bcdfabf1b6314',NULL,'ACTIVE',136,'HOSPITAL','c9efb656-9848-4c03-9822-587b66c6bd92','9d7b030b-59f9-4b66-9374-c0072399d9fc','2023-04-04 23:54:22.495464'),(53,'2023-04-04 23:39:42.020700','0x92ad1349b05c6d5d5eefea03ed000830b772075691030e0ee540a3256797a073',NULL,'ACTIVE',138,'HOSPITAL','c9efb656-9848-4c03-9822-587b66c6bd92','9d7b030b-59f9-4b66-9374-c0072399d9fc','2023-04-04 23:54:22.489510'),(54,'2023-04-04 23:46:46.434875','0x2bcd3fd2f20a1c0b5fc2ed63ab9a191fac678a17275fa03fe3c9d9f861b5c62e',NULL,'ACTIVE',130,'HOSPITAL','c9efb656-9848-4c03-9822-587b66c6bd92','813241d8-ac46-49d8-87f0-fa8f92a00168','2023-04-04 23:58:43.098475'),(55,'2023-04-04 23:46:46.444264','0x85a33948cbfc5df9eea7f548ee4ffe25a5fbad011e6e5ee586636bf0b0f9b070',NULL,'ACTIVE',134,'HOSPITAL','c9efb656-9848-4c03-9822-587b66c6bd92','813241d8-ac46-49d8-87f0-fa8f92a00168','2023-04-04 23:58:43.066728'),(56,'2023-04-04 23:48:20.969166','0xe177158f2ebcbbd25ebdd4dc9bd337bcf79cdd0d685621b6f5d77c6e2b4b6cc5',NULL,'ACTIVE',132,'HOSPITAL','c9efb656-9848-4c03-9822-587b66c6bd92','813241d8-ac46-49d8-87f0-fa8f92a00168','2023-04-04 23:58:40.350080'),(57,'2023-04-05 00:45:58.449524','0xb4fc4e851b7585dba071f983cb95a42b8f841e0b7586318e0f02fcb2cdd7ebd5',NULL,'ACTIVE',150,'HOSPITAL','c9efb656-9848-4c03-9822-587b66c6bd92','9d7b030b-59f9-4b66-9374-c0072399d9fc','2023-04-05 15:39:07.831703'),(58,'2023-04-05 00:45:58.468964','0x3d0cb52d4a32231f10f00d36e5360f4416256533a5529172a23f98abb0235890',NULL,'ACTIVE',152,'HOSPITAL','c9efb656-9848-4c03-9822-587b66c6bd92','9d7b030b-59f9-4b66-9374-c0072399d9fc','2023-04-05 15:39:07.795069'),(59,'2023-04-05 13:38:09.385124','0x5766a38e8f9162a85f4a5088c72fb487dd76da753019fa2d831ef95ba6674af7','인증용 제출','INACTIVE',145,'AGENCY','32252db6-d09a-4f9e-8123-f26402362f58','7fadaead-bf24-466b-a642-24f191e54e86','2023-04-05 13:38:09.385124'),(60,'2023-04-05 13:39:09.503580','0x5766a38e8f9162a85f4a5088c72fb487dd76da753019fa2d831ef95ba6674af7','봉사활동 인증','INACTIVE',145,'AGENCY','32252db6-d09a-4f9e-8123-f26402362f58','7fadaead-bf24-466b-a642-24f191e54e86','2023-04-05 13:39:09.503580'),(61,'2023-04-05 13:40:16.132603','0x5766a38e8f9162a85f4a5088c72fb487dd76da753019fa2d831ef95ba6674af7','봉사활동 인증','INACTIVE',145,'AGENCY','32252db6-d09a-4f9e-8123-f26402362f58','7fadaead-bf24-466b-a642-24f191e54e86','2023-04-05 13:40:16.132603'),(62,'2023-04-05 13:41:24.352543','0x5766a38e8f9162a85f4a5088c72fb487dd76da753019fa2d831ef95ba6674af7','봉사활동 인증','INACTIVE',145,'AGENCY','32252db6-d09a-4f9e-8123-f26402362f58','7fadaead-bf24-466b-a642-24f191e54e86','2023-04-05 13:41:24.352543'),(68,'2023-04-05 17:59:08.259631','0xf655beeeed7908189320c191c7a72928078eee79e6fa408aa9b2cc1d45d7abe5',NULL,'ACTIVE',174,'HOSPITAL','c9efb656-9848-4c03-9822-587b66c6bd92','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','2023-04-05 17:59:24.678498'),(69,'2023-04-05 17:59:08.274386','0xb4f0552d187defee5f20561c338f96507aa05e5053837990e8d43d0e6abbb1dc',NULL,'ACTIVE',182,'HOSPITAL','c9efb656-9848-4c03-9822-587b66c6bd92','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','2023-04-05 17:59:24.561767'),(70,'2023-04-05 17:59:08.287578','0xa279e95df74916820d68f9c648b10da826e852b68bc9236a13b9da2f091ac250',NULL,'ACTIVE',184,'HOSPITAL','c9efb656-9848-4c03-9822-587b66c6bd92','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','2023-04-05 17:59:24.556338'),(71,'2023-04-05 17:59:08.293986','0xc707704be811700a2aa9a3e6e5325e1a84099c7496a676f80ff19d332428e7ef',NULL,'ACTIVE',186,'HOSPITAL','c9efb656-9848-4c03-9822-587b66c6bd92','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','2023-04-05 17:59:24.550831'),(72,'2023-04-05 19:54:13.897426','0x107de570af9cae6f0580f7f9d77fc25b10d961abe60205cdc0bf2085a41b59c0',NULL,'ACTIVE',192,'HOSPITAL','c9efb656-9848-4c03-9822-587b66c6bd92','8793cd9d-4986-410c-bb3f-f9bd347ce5d7','2023-04-05 19:54:33.174589'),(78,'2023-04-05 21:28:18.607596','0xff4ec1602495a78a635448b5d9e205c0c63fd90af268647268ca72e42b43ad84','ㅁㄴㅇㅁㄴㅇ','ACTIVE',197,'AGENCY','041d4b7e-4ca8-4097-829a-32521e5f2bc7','813241d8-ac46-49d8-87f0-fa8f92a00168','2023-04-05 21:28:25.636276'),(79,'2023-04-05 22:54:14.994711','0x97ab13c83abddcb4043bddf159869fd5ae508324e3fd82fcea90d89951eaacc9','공가','ACTIVE',201,'AGENCY','041d4b7e-4ca8-4097-829a-32521e5f2bc7','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','2023-04-05 22:54:31.037768'),(80,'2023-04-05 22:55:43.268657','0x506e2f051b7affdaa441656254ed7b0c5b3208afc78b8dd1bbacd3a5463914aa',NULL,'ACTIVE',202,'HOSPITAL','17ad4ae8-57ef-48d2-986d-81763f10b800','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','2023-04-05 22:55:55.980352'),(81,'2023-04-05 22:55:43.274472','0x8e55dd83682de0435066639f2619ead8f31ec0b2395297aba60155062e2f9b89',NULL,'ACTIVE',204,'HOSPITAL','17ad4ae8-57ef-48d2-986d-81763f10b800','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','2023-04-05 22:55:55.924601'),(82,'2023-04-05 22:55:43.281557','0x682521e7e2c8729cb677c70deb151ead369ba332a912232771faf497e209271e',NULL,'ACTIVE',208,'HOSPITAL','17ad4ae8-57ef-48d2-986d-81763f10b800','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','2023-04-05 22:55:55.918993'),(83,'2023-04-05 23:11:44.464469','0x14ffb89b803d2623b42f9bc62669d78defc135ad1c00203395286a0d61c49fd2','공가','ACTIVE',207,'AGENCY','041d4b7e-4ca8-4097-829a-32521e5f2bc7','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','2023-04-05 23:12:00.246767'),(84,'2023-04-05 23:13:09.955579','0x296da765184ac54fcd49e09893621872bfe3662a82f260becaf582df12ece387',NULL,'ACTIVE',224,'HOSPITAL','17ad4ae8-57ef-48d2-986d-81763f10b800','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','2023-04-05 23:13:19.562498'),(85,'2023-04-05 23:13:09.959652','0x75b83fbacd75684f5cfa327d406a806ca711c130e71a37b64538de8c9e5405af',NULL,'ACTIVE',240,'HOSPITAL','17ad4ae8-57ef-48d2-986d-81763f10b800','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','2023-04-05 23:13:19.496324'),(86,'2023-04-05 23:13:09.964534','0xd85872ff1b34f8d7346db5314bf25431dc21182ad2e9133c15dd389c926f1797',NULL,'ACTIVE',212,'HOSPITAL','17ad4ae8-57ef-48d2-986d-81763f10b800','67bae835-43bc-4b7f-a4e9-a15438ddd3cf','2023-04-05 23:13:19.491727'),(87,'2023-04-05 23:37:42.038194','0xfec63c8b1e2bf980de399cc590cdfb9e82883e5f4ba36f2eeeb88754bcf78ee9',NULL,'ACTIVE',168,'HOSPITAL','17ad4ae8-57ef-48d2-986d-81763f10b800','2cb4a9f8-d750-4bb0-b282-cd35d4af70f6','2023-04-05 23:37:52.151225');
/*!40000 ALTER TABLE `cert_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-06  3:08:33