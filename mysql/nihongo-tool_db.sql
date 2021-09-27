-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: dbnihongodev
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `dbnihongodev`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `dbnihongodev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `dbnihongodev`;

--
-- Table structure for table `counter`
--

DROP TABLE IF EXISTS `counter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `counter` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `kanjis` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `number_of_use` int DEFAULT NULL,
  `summary` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `use_column` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_qtvuy0g4rjm31uec5s4pshpoa` (`kanjis`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counter`
--

LOCK TABLES `counter` WRITE;
/*!40000 ALTER TABLE `counter` DISABLE KEYS */;
INSERT INTO `counter` VALUES (1,'つ',1,'Counts just about everything.','I\'ve listed 〜つ as a counter, but actually it\'s just the original wago (Japanese) form of counting. \nProbably thanks to the fact that this \"counter\" is just numbers, it can be used to count just about anything in Japanese. Things with shape, things without shape, abstract things, number order, little kids\' ages, thoughts, ideas, and pretty much everything else. It\'s extremely versatile and helpful for when you don\'t know the specific counter for something.',0),(2,'個',1,'Counts pretty much anything with a distinct shape or boundary.','個 is just the kango, a.k.a. Chinese version of 〜つ. Like 〜つ, you can count almost anything with this counter, though it\'s slightly less versatile. Think of it this way: if the thing you\'re counting has a boundary to it, you can use 個. If it doesn\'t have a distinct boundary, or it\'s too abstract, it\'s an age, or it\'s related to number order, it\'s more common to use 〜つ',0),(3,'本',1,'Counts \"stick-shaped or long\" things','Usually, the 本 counter is taught as the counter for \"stick-shaped or long\" things. That covers most of its use, but 本 can actually count seven different categories of things.\n\nCounts: pens, pencils, asparagus, soba, darts, firewood, trees, bamboo, cords, threads, dumplings, water wells, injections, folding fans, eels, tails, nail clippers, icicles, fishing rods, film, chimneys, tenugui, trains, sashes, telephone poles, cylindrical batteries, bottles, tires, ribbons, cacti, soda cans, and much, much more.',1),(4,'枚',1,'Counts flat things','The main thing that 〜枚 does is count flat things. With that, you\'ll be fine most of the time. This counter counts a really wide variety of things. Like 本, it is quite versatile considering it\'s a pretty specific counter.\n\nCounts: paper, photos, rafts, bath mats, shells, playing cards, credit cards, t-shirts, pants, other clothes, dust cloths, walls, a single serving of soba, a single serving of gyoza, and much, much more.',1),(5,'匹',1,'Counts small or medium-sized animals.','The counter 〜匹 is used to count small or medium-sized animals. If you can pick the animal, fish, bird, or insect up, you can probably count it with 匹. For larger animals, 頭 (とう) is the more common counter, though for some reason Godzilla is still counted with 匹.\n\nCounts: dogs, cats, monkeys, fish, prawns, shrimps, lobsters, wolves, rabbits (unless they\'re counted with 羽), mosquitoes, shellfish, deer, worms, caterpillars, silkworms, earthworms, frogs, snails, crabs, tortoises, turtles, octopuses, animals, insects, dragonflies, sea otters, ogres, monsters, naughty children, animal-like people, etc.',0),(6,'頭',1,'Counts large-sized animals.','As we mentioned in the 匹 section, 頭 is generally used for large-sized animals. If you can\'t pick the animal up, chances are you could count it with 頭. That being said, there are some exceptions where 頭 is used for smaller animals, and 匹 gets used for bigger ones (like Godzilla).\n\nCounts: cows, horses, livestock, elephants, gorillas, whales, camels, tigers, \"professional\" animals, insects on display, animals for sale, etc.',0);
/*!40000 ALTER TABLE `counter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `counter_pronunciation`
--

DROP TABLE IF EXISTS `counter_pronunciation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `counter_pronunciation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pronunciation` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `pronunciation_number` int NOT NULL,
  `version` int NOT NULL,
  `counter_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjw7qjw0b8k6hpx1dkjx56p4y7` (`counter_id`),
  CONSTRAINT `FKjw7qjw0b8k6hpx1dkjx56p4y7` FOREIGN KEY (`counter_id`) REFERENCES `counter` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counter_pronunciation`
--

LOCK TABLES `counter_pronunciation` WRITE;
/*!40000 ALTER TABLE `counter_pronunciation` DISABLE KEYS */;
INSERT INTO `counter_pronunciation` VALUES (1,'つ',0,0,1),(2,'こ',0,0,2),(3,'ほん',0,0,3),(4,'まい',0,0,4),(5,'ひき',0,0,5),(6,'とう',0,0,6);
/*!40000 ALTER TABLE `counter_pronunciation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grammar_rule`
--

DROP TABLE IF EXISTS `grammar_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grammar_rule` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_key_word` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fourth_key_word` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `html_description` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `second_key_word` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `third_key_word` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grammar_rule`
--

LOCK TABLES `grammar_rule` WRITE;
/*!40000 ALTER TABLE `grammar_rule` DISABLE KEYS */;
INSERT INTO `grammar_rule` VALUES (1,'は','','<ol>\n        <li><strong>Particle は</strong></li>\n        <p>\n          The particle <strong>は</strong> indicates that the preceding noun\n          (N1) is the topic of the sentence. To construct a sentence, the\n          speaker first chooses the topic he or she wants to evoke by marking it\n          with <strong>は</strong>, and then adds various descriptions.\n        </p>\n        <p><strong>わたしはマイク・ミラーです。</strong></p>\n        <p>I am Mike Miller.</p>\n        <p>\n          [Note] La particule <strong>は</strong> se prononce\n          <strong>わ</strong>.\n        </p>\n        <li><strong>です</strong></li>\n        <p>\n          Nouns used with <strong>です</strong> form predicates.\n          <strong>です</strong> establishes a judgment or an assertion.\n          <strong>です</strong> also expresses the speaker&apos;s politeness\n          towards the interlocutor. <strong>です</strong> changes form in a\n          negative sentence or in a past tense sentence.\n        </p>\n        <p><strong>わたしは会社員です。</strong></p>\n        <p>I am a company employee.</p>\n      </ol>','です','','N1はN2です',3),(2,'は','','<div>\n    <p>\n      <strong>じゃありません</strong> is the negative form of\n      <strong>です</strong> in common conversation.\n    </p>\n    <p><strong>サントスさんは学生じゃありません。</strong></p>\n    <p>Mr. Santos is not a student.</p>\n</div>','じゃありません','','N1はN2じゃありません',0),(3,'は','','<div>\n    <p>\n       <strong>ではありません</strong> is the negative form of\n       <strong>です</strong> in a formal speech.\n    </p>\n     <p>\n       <strong>サントスさんは学生ではありません。</strong>\n    </p>\n     <p>Mr. Santos is not a student.</p>\n     <p>\n      [Note] <strong>は</strong> from <strong>では</strong> is pronounced\n      <strong>わ</strong>\n     </p>\n</div>','ではありません','','N1はN2ではありません',0),(4,'は','','<ol>\n        <li><strong>Paticle か</strong></li>\n        <p>\n          The particle <strong>か</strong> is used to show the speaker&apos;s\n          uncertainty or questioning. An interrogative sentence can be obtained\n          by adding <strong>か</strong> to the end of a sentence. The\n          interrogative sentence is usually accompanied by a rising intonation\n          at the end of the sentence.\n        </p>\n        <p>わたしはマイク・ミラーです。</p>\n        <p>I am Mike Miller.</p>\n        <p>\n          [Note] La particule <strong>は</strong> se prononce\n          <strong>わ</strong>.\n        </p>\n        <li>\n          <strong>Interrogative sentence asking whether the content of the statement is\n          correct or not</strong>\n        </li>\n        <p>\n          The interrogative sentence is constructed by adding\n          <strong>か</strong> to the end of a sentence. The order of the words\n          in the sentence does not change. The point is to ask whether the\n          content of the statement is correct or not. If it is correct, answer\n          <strong>はい</strong> and <strong>いいえ</strong> if it is false.\n        </p>\n        <p>\n          <strong>\n            ミラーさんはアメリカ人ですか。\n            <br />\n            ......はい、アメリカ人です。\n          </strong>\n        </p>\n        <p>\n          Is Mr. Miller an American?\n          <br />\n          ...... Yes, he is an American.\n        </p>\n        <p>\n          <strong>\n            ミラーさんは先生ですか。。\n            <br />\n            ......いいえ、先生じゃありません\n          </strong>\n        </p>\n        <p>\n          Is Mr. Miller a teacher?\n          <br />\n          ...... No, he is not a teacher.\n        </p>\n        <li><strong>Interrogative sentence with an interrogative pronoun</strong></li>\n        <p>\n          The part about which you want to ask the question is replaced by an\n          interrogative word. The order of the words in the sentence does not\n          change. You must add <strong>か</strong> at the end of the sentence.\n        </p>\n        <p>\n          <strong>\n            あの方はどなたですか。。\n            <br />\n            ......[あの方は]ミラーさんです。\n          </strong>\n        </p>\n        <p>\n        Who is this person?\n          <br />\n          ...... [Cette personne,] it&apos;s Mr. Miller.\n        </p>\n      </ol>','です','か','N1はN2ですか',2),(5,'も','','<p>「も」is used when the sentence validates the same thing as mentioned previously.</p>\n<p>ミラーさんは会社員です。グプタさんも会社員です。<br/>\nミラーさんはかいしゃいんです。グプタさんもかいしゃいんです。<br/>\nMr. Miller is a corporate employee. Mr. Guputa is also a corporate employee.</p>','','','Nも',1),(6,'の','','<h4>When the first noun, N1 qualifies the second noun N2, these two nouns are connected using <strong>の</strong>.</h4>\n<p>\nみきさんはIBMの社員です。<br/>\nみきさんはのしゃいんです。<br/>\nMr. Miki is an employee of IBM.</p>\n<br/>\n<h4>N1 explains what N2 refers to</h4>\n<p>これはコンピューターの本です。<br/>\nこれはコンピューターのほんです。<br/>\nThis is a computer book.\n</p>\n<br/>\n<h4>N1 indicates who is the owner of N2</h4>\n<p>これはわたしの本です。<br/>\nこれはわたしのほんです。<br/>\nThis is my book.\n</p>\n<br/>\n<h4>N1 indicates the origin of N2</h4>\n<p>When N1 is the name of a country and N2 is a product, N1 <strong>の</strong> means that the product is manufactured in that country. \nWhen N1 is the name of a company and N2 is a product, N1 <strong>の</strong> means that the product is manufactured by that company.  \nFor both cases, the interrogative word <strong>どこ</strong> is used to ask where or by which company the product is made.</p>\n<p>これはどこのコンピューターですか。<br/>\nWhere is this computer made? / Who is the manufacturer of this computer? <br/>\n......日本のコンピューターです。<br/>\n......It is a Japanese computer. <br/>\n......パワー電気のコンピュータ-です。<br/>\n......It is a computer from Power Electric. \n</p>\n','','','N1のN2',5),(7,'そう','','<p>In a nominal sentence , we can use そう to answer in the affirmative.<br/>\nそれは辞書ですか。<br/>\n......はい、そうです。<br/>\nそれはじしょですか。<br/>\n......はい、そうです。<br/>\nIs this a dictionary?<br/>\n......Yes, it is.\n</p>\n','です','','そうです',1),(8,'か','','<p>It is a question asking the interlocutor to choose an answer between two or more interrogative sentences. To answer it, the chosen sentence is announced directly without using either はい or いいえ.<br/>\nこれは「9」ですか、「7」ですか。<br/>\n......「9」です。<br/>\nIs it a \"9\" or a \"7\"?<br/>\n......It is a \"9\".\n</p>','か','','〜か、〜か',0),(9,'そう','','<p>This expression is used when you have learned new information to show that you have understood it. It is pronounced with a descending intonation. <br/>\nこの傘はあなたのですか。 <br/>\n......いいえ違います。シュミットさんのです。 <br/>\nそうですか。 <br/>\nIs this umbrella yours ? <br/>\n......No, it\'s Mr. Schmidt\'s.<br/>\nOh, I see.\n</p>','です','か','そうですか',0),(10,'ここ','','<p><strong>ここ</strong> refers to the location of the speaker.</p>','','','ここ',1),(11,'そこ','','<p><strong>そこ</strong> refers to the location of the speaker.</p>','','','そこ',0),(12,'あそこ','','<p><strong>あそこ</strong> designates a place that is far from the speaker and the interlocutor.</p>','','','あそこ',0),(13,'こちら','','<p><strong>こちら</strong> est un démonstratif de la direction, mais il est également utilisé pour montrer un lieu à la place de <strong>ここ</strong>. In this case the sentence is more polite.</p>','','','こちら',0),(14,'そちら','','<p><strong>そちら</strong> est un démonstratif de la direction, mais il est également utilisé pour montrer un lieu à la place de <strong>そこ</strong>. In this case the sentence is more polite.</p>','','','そちら',0),(15,'あちら','','<p><strong>あちら</strong> est un démonstratif de la direction, mais il est également utilisé pour montrer un lieu à la place de <strong>あそこ</strong>. In this case the sentence is more polite.</p>','','','あちら',0),(16,'どこ','','<p><strong>どこ</strong> est un mot interrogatif pour demander le lieu. <br/>\nお手洗いはどこでか。<br/>\n......あそこです。<br/>\nWhere are the toilets ? <br/>\n......It\'s there. </p>\n<p>Pour demander le nom d\'un lieu ou d\'une organisation auquel l\'interlocuteur appartient, tel que le pays, l\'entreprise et l\'école, etc..., on utilise <strong>どこ</strong> et pas <strong>なん</strong>.<br/>\n学校はどこですか。<br/>\nがっこはどこですか。<br/>\nWhat is the name of your school ?\n</p>','','','どこ',3),(17,'どちら','','<p><strong>どちら</strong> est un mot interrogatif pour demander le lieu. It is more polite than with <strong>どこ</strong>.<br/>\nエレベーターはどちらですか。<br/>\n......あちらです。<br/>\nWhere is the elevator ? <br/>\n......It\'s over there. </p>\n<p>Pour demander le nom d\'un lieu ou d\'une organisation auquel l\'interlocuteur appartient, tel que le pays, l\'entreprise et l\'école, etc..., on utilise <strong>どこ</strong> ou <strong>どちら</strong> et pas <strong>なん</strong>.<br/>\n会社はどちらですか。<br/>\nかいしゃはどちらですか。<br/>\nIn which company do you work?\n</p>','','','どちら',0);
/*!40000 ALTER TABLE `grammar_rule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iadjective`
--

DROP TABLE IF EXISTS `iadjective`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iadjective` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `kanjis` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `number_of_use` int DEFAULT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_l4317elt3hn9bnrwbxj5k1e30` (`kanjis`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iadjective`
--

LOCK TABLES `iadjective` WRITE;
/*!40000 ALTER TABLE `iadjective` DISABLE KEYS */;
INSERT INTO `iadjective` VALUES (1,'大きい',1,0),(2,'いい',1,0),(3,'すごい',1,0),(4,'かっこいい',1,0),(5,'正しい',1,0),(6,'優しい',1,0),(7,'嬉しい',1,0),(8,'楽しい',1,2),(9,'素晴らしい',1,0);
/*!40000 ALTER TABLE `iadjective` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iadjective_meaning`
--

DROP TABLE IF EXISTS `iadjective_meaning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iadjective_meaning` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `meaning` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meaning_number` int NOT NULL,
  `version` int NOT NULL,
  `i_adjective_id` bigint DEFAULT NULL,
  `iadjective_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcqy8yiwn9j3h1up5mq54o7bgo` (`i_adjective_id`),
  KEY `FKmed2nnpt3ddi3oplxoe44lr99` (`iadjective_id`),
  CONSTRAINT `FKcqy8yiwn9j3h1up5mq54o7bgo` FOREIGN KEY (`i_adjective_id`) REFERENCES `iadjective` (`id`),
  CONSTRAINT `FKmed2nnpt3ddi3oplxoe44lr99` FOREIGN KEY (`iadjective_id`) REFERENCES `iadjective` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iadjective_meaning`
--

LOCK TABLES `iadjective_meaning` WRITE;
/*!40000 ALTER TABLE `iadjective_meaning` DISABLE KEYS */;
INSERT INTO `iadjective_meaning` VALUES (1,'loud',1,0,1,1),(2,'important; decisive; valuable',3,0,1,1),(3,'big; large; great',0,0,1,1),(4,'extensive; spacious',2,0,1,1),(5,'older; grown up',4,0,1,1),(6,'OK',3,0,2,2),(7,'sufficient (can be used to turn down an offer); ready; prepared ',1,0,2,2),(8,'good; excellent; fine; nice; pleasant; agreeable',0,0,2,2),(9,'profitable (e.g. deal, business offer, etc.); beneficial',2,0,2,2),(10,'terrible; dreadful',0,0,3,3),(11,'amazing (e.g. of strength); great (e.g. of skills); wonderful; terrific',1,0,3,3),(12,'to a great extent; vast (in numbers)',2,0,3,3),(13,'attractive; good-looking; stylish; cool; smooth; neat; with-it; groovy',0,0,4,4),(14,'right; correct',0,0,5,5),(15,'proper; righteous; just; honest; truthful; lawful',1,0,5,5),(16,'tender; kind; gentle; graceful; affectionate; amiable',0,0,6,6),(17,'happy; glad; pleasant',0,0,7,7),(19,'enjoyable; fun; pleasant; happy; delightful',0,1,8,8),(20,'wonderful; splendid; magnificent',0,0,9,9);
/*!40000 ALTER TABLE `iadjective_meaning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iadjective_pronunciation`
--

DROP TABLE IF EXISTS `iadjective_pronunciation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iadjective_pronunciation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pronunciation` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `pronunciation_number` int NOT NULL,
  `version` int NOT NULL,
  `i_adjective_id` bigint DEFAULT NULL,
  `iadjective_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKet413xcrv8u69am9q4xqcw7ev` (`i_adjective_id`),
  KEY `FKmvx11m1unt007oi6y9847lcr8` (`iadjective_id`),
  CONSTRAINT `FKet413xcrv8u69am9q4xqcw7ev` FOREIGN KEY (`i_adjective_id`) REFERENCES `iadjective` (`id`),
  CONSTRAINT `FKmvx11m1unt007oi6y9847lcr8` FOREIGN KEY (`iadjective_id`) REFERENCES `iadjective` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iadjective_pronunciation`
--

LOCK TABLES `iadjective_pronunciation` WRITE;
/*!40000 ALTER TABLE `iadjective_pronunciation` DISABLE KEYS */;
INSERT INTO `iadjective_pronunciation` VALUES (1,'おおきい',0,0,1,1),(2,'いい',0,0,2,2),(3,'すごい',0,0,3,3),(4,'かっこいい',0,0,4,4),(5,'ただしい',0,0,5,5),(6,'やさしい',0,0,6,6),(7,'うれしい',0,0,7,7),(8,'たのしい',0,1,8,8),(9,'すんばらしい',1,0,9,9),(10,'すばらしい',0,0,9,9);
/*!40000 ALTER TABLE `iadjective_pronunciation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kanji`
--

DROP TABLE IF EXISTS `kanji`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kanji` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `kanji` char(1) COLLATE utf8mb4_general_ci NOT NULL,
  `number_of_use` int DEFAULT NULL,
  `radicals` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `stroke_number` int NOT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_rkrhjrdr7gsavite6kc4uvxjb` (`kanji`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kanji`
--

LOCK TABLES `kanji` WRITE;
/*!40000 ALTER TABLE `kanji` DISABLE KEYS */;
INSERT INTO `kanji` VALUES (1,'人',1,'⺅人',2,0),(2,'一',1,'一',1,0),(3,'二',1,'二',2,0),(4,'三',1,'一',3,0),(5,'日',1,'日',4,0),(6,'四',1,'囗儿',5,0),(7,'五',1,'二',4,0),(8,'六',1,'亠ハ',2,0),(9,'七',1,'一',2,0),(10,'八',1,'ハ',2,0),(11,'九',1,'九',1,0),(12,'十',1,'十',1,0),(13,'円',1,'冂',3,0),(14,'百',1,'白一',6,0),(15,'千',1,'十',3,0),(16,'万',1,'力一',3,0),(17,'月',1,'月',4,0),(18,'明',1,'日月',8,0),(19,'曜',1,'ヨ日隹',17,0),(20,'火',1,'火',4,0),(21,'水',1,'水',2,0),(22,'木',1,'木',4,0),(23,'金',1,'金',8,0),(24,'土',1,'土',2,0),(25,'本',1,'木',5,0),(26,'大',1,'大',3,0),(27,'小',1,'小',3,0),(28,'中',1,'口',4,0),(29,'風',1,'風',9,0),(30,'雨',1,'雨',8,0),(31,'下',1,'一卜',3,0),(32,'上',1,'一卜',3,0),(33,'川',1,'川',3,0),(34,'山',1,'山',3,0),(35,'田',1,'田',5,0),(36,'畑',1,'火田',9,0),(37,'刀',1,'刀',2,0),(38,'分',1,'ハ刀',3,0),(39,'切',1,'匕刀',4,0),(40,'国',1,'囗王',8,0),(41,'寺',1,'寸土',6,0),(42,'時',1,'日寸土',9,0),(43,'間',1,'門日',12,0),(44,'生',1,'生',5,0),(45,'年',1,'干ノ',6,0),(46,'以',1,'人⺅',5,0),(47,'前',1,'刂月一',9,0),(48,'後',1,'彳夂幺',9,0),(49,'午',1,'十',4,0);
/*!40000 ALTER TABLE `kanji` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kanji_meaning`
--

DROP TABLE IF EXISTS `kanji_meaning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kanji_meaning` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `meaning` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meaning_number` int NOT NULL,
  `version` int NOT NULL,
  `kanji_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqe936g0vg08n2go4hay6ykggo` (`kanji_id`),
  CONSTRAINT `FKqe936g0vg08n2go4hay6ykggo` FOREIGN KEY (`kanji_id`) REFERENCES `kanji` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kanji_meaning`
--

LOCK TABLES `kanji_meaning` WRITE;
/*!40000 ALTER TABLE `kanji_meaning` DISABLE KEYS */;
INSERT INTO `kanji_meaning` VALUES (1,'person',0,0,1),(2,'one radical (no.1)',1,0,2),(3,'one',0,0,2),(4,'two',0,0,3),(5,'two radical (no. 7)',1,0,3),(6,'three',0,0,4),(7,'sun',1,0,5),(8,'counter for days',3,0,5),(9,'Japan',2,0,5),(10,'day',0,0,5),(11,'four',0,0,6),(12,'five',0,0,7),(13,'six',0,0,8),(14,'seven',0,0,9),(15,'eight',0,0,10),(16,'eight radical (no. 12)',1,0,10),(17,'nine',0,0,11),(18,'ten',0,0,12),(19,'yen',0,0,13),(20,'round',2,0,13),(21,'circle',1,0,13),(22,'hundred',0,0,14),(23,'thousand',0,0,15),(24,'10 000',1,0,16),(25,'ten thousand',0,0,16),(26,'moon',1,0,17),(27,'month',0,0,17),(28,'bright',0,0,18),(29,'light',1,0,18),(30,'weekday',0,0,19),(31,'fire',0,0,20),(32,'water',0,0,21),(33,'wood',1,0,22),(34,'tree',0,0,22),(35,'gold',0,0,23),(36,'argent',2,0,23),(37,'metal',1,0,23),(38,'earth',1,0,24),(39,'ground',2,0,24),(40,'soil',0,0,24),(41,'Turkey',3,0,24),(42,'real',5,0,25),(43,'counter for long cylindrical things',6,0,25),(44,'main',2,0,25),(45,'origin',3,0,25),(46,'present',1,0,25),(47,'true',4,0,25),(48,'book',0,0,25),(49,'large; big',0,0,26),(50,'little; small',0,0,27),(51,'mean',2,0,28),(52,'in; inside',0,0,28),(53,'center',3,0,28),(54,'middle',1,0,28),(55,'air',1,0,29),(56,'wind',0,0,29),(57,'style',2,0,29),(58,'manner',3,0,29),(59,'rain',0,0,30),(60,'below',0,0,31),(61,'inferior',5,0,31),(62,'down',1,0,31),(63,'descend',2,0,31),(64,'give',3,0,31),(65,'low',4,0,31),(66,'up',1,0,32),(67,'above',0,0,32),(68,'river',1,0,33),(69,'river or three-stroke river radical (no. 47)',2,0,33),(70,'stream',0,0,33),(71,'mountain',0,0,34),(72,' rice paddy',1,0,35),(73,'rice field',0,0,35),(74,'garden',2,0,36),(75,'farm',0,0,36),(76,'field',1,0,36),(77,'one\'s specialty',3,0,36),(78,'sword; saber; knife',0,0,37),(79,'minute of time',1,0,38),(80,'segment',2,0,38),(81,'understand',7,0,38),(82,'part',0,0,38),(83,'share',3,0,38),(84,'duty',6,0,38),(85,'know',8,0,38),(86,'one\'s lot',5,0,38),(87,'degree',4,0,38),(88,'be sharp',2,0,39),(89,'cut',0,0,39),(90,'cutoff',1,0,39),(91,'country',0,0,40),(92,'Buddhist temple',0,0,41),(93,'hour',1,0,42),(94,'time',0,0,42),(95,'interval',0,0,43),(96,'space',1,0,43),(97,'life',0,0,44),(98,'genuine',1,0,44),(99,'birth',2,0,44),(100,'year',0,0,45),(101,'counter for years',1,0,45),(102,'in view of',2,0,46),(103,'by means of',0,0,46),(104,'compared with',3,0,46),(105,'because',1,0,46),(106,'in front',0,0,47),(107,'before',1,0,47),(108,'behind',0,0,48),(109,'back',1,0,48),(110,'later',2,0,48),(111,'sign of the horse',1,0,49),(112,'seventh sign of Chinese zodiac',3,0,49),(113,'11AM-1PM',2,0,49),(114,'noon',0,0,49);
/*!40000 ALTER TABLE `kanji_meaning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kanji_pronunciation`
--

DROP TABLE IF EXISTS `kanji_pronunciation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kanji_pronunciation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pronunciation` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `pronunciation_number` int NOT NULL,
  `version` int NOT NULL,
  `kanji_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKg7cxdmb5tl22cbyvctjcd6y3r` (`kanji_id`),
  CONSTRAINT `FKg7cxdmb5tl22cbyvctjcd6y3r` FOREIGN KEY (`kanji_id`) REFERENCES `kanji` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kanji_pronunciation`
--

LOCK TABLES `kanji_pronunciation` WRITE;
/*!40000 ALTER TABLE `kanji_pronunciation` DISABLE KEYS */;
INSERT INTO `kanji_pronunciation` VALUES (1,'~と',4,0,1),(2,'ニン',1,0,1),(3,'ひと',2,0,1),(4,'ジン',0,0,1),(5,'~り',3,0,1),(6,'ひと~',2,0,2),(7,'イツ',1,0,2),(8,'イチ',0,0,2),(9,'ニ',0,0,3),(10,'ふたたび',3,0,3),(11,'ふた',2,0,3),(12,'ジ',1,0,3),(13,'みっ',3,0,4),(14,'み',2,0,4),(15,'ゾウ',1,0,4),(16,'サン',0,0,4),(17,'ニチ',0,0,5),(18,'~び',3,0,5),(19,'ひ',2,0,5),(20,'ジツ',1,0,5),(21,'~か',4,0,5),(22,'よっ',2,0,6),(23,'よん',3,0,6),(24,'シ',0,0,6),(25,'よ',1,0,6),(26,'いつ',1,0,7),(27,'ゴ',0,0,7),(28,'むい',4,0,8),(29,'ロク',0,0,8),(30,'むっ',3,0,8),(31,'リク',1,0,8),(32,'む',2,0,8),(33,'なの',2,0,9),(34,'シチ',0,0,9),(35,'なな',1,0,9),(36,'ハチ',0,0,10),(37,'よう',3,0,10),(38,'や',1,0,10),(39,'やっ',2,0,10),(40,'ここの',2,0,11),(41,'ク',1,0,11),(42,'キュウ',0,0,11),(43,'ジュウ',0,0,12),(44,'ジュッ',2,0,12),(45,'ジッ',1,0,12),(46,'とお',3,0,12),(47,'と',4,0,12),(48,'エン',0,0,13),(49,'まど',2,0,13),(50,'まろ',3,0,13),(51,'まる',1,0,13),(52,'もも',2,0,14),(53,'ビャク',1,0,14),(54,'ヒャク',0,0,14),(55,'ち',1,0,15),(56,'セン',0,0,15),(57,'よろず',2,0,16),(58,'バン',1,0,16),(59,'マン',0,0,16),(60,'ゲツ',0,0,17),(61,'つき',2,0,17),(62,'ガツ',1,0,17),(63,'ミン',2,0,18),(64,'メイ',0,0,18),(65,'あか',4,0,18),(66,'あ',3,0,18),(67,'ミョウ',1,0,18),(68,'ヨウ',0,0,19),(69,'カ',0,0,20),(70,'~び',2,0,20),(71,'ひ',1,0,20),(72,'ほ~',3,0,20),(73,'スイ',0,0,21),(74,'みず',1,0,21),(75,'ボク',0,0,22),(76,'こ~',3,0,22),(77,'き',2,0,22),(78,'モク',1,0,22),(79,'~がね',5,0,23),(80,'キン',0,0,23),(81,'かね',3,0,23),(82,'コン',1,0,23),(83,'かな~',4,0,23),(84,'ゴン',2,0,23),(85,'ド',0,0,24),(86,'ト',1,0,24),(87,'つち',2,0,24),(88,'もと',1,0,25),(89,'ホン',0,0,25),(90,'~おお',3,0,26),(91,'ダイ',0,0,26),(92,'タイ',1,0,26),(93,'おお~',2,0,26),(94,'こ~',2,0,27),(95,'ちい',1,0,27),(96,'ショウ',0,0,27),(97,'お~',3,0,27),(98,'なか',1,0,28),(99,'チュウ',0,0,28),(100,'うち',2,0,28),(101,'あた',3,0,28),(102,'フウ',0,0,29),(103,'かざ~',3,0,29),(104,'かぜ',2,0,29),(105,'フ',1,0,29),(106,'あま~',2,0,30),(107,'あめ',1,0,30),(108,'~さめ',3,0,30),(109,'ウ',0,0,30),(110,'もと',4,0,31),(111,'カ',0,0,31),(112,'した',2,0,31),(113,'ゲ',1,0,31),(114,'さ',5,0,31),(115,'お',7,0,31),(116,'しも',3,0,31),(117,'くだ',6,0,31),(118,'のぼ',7,0,32),(119,'あ',6,0,32),(120,'たてまつ',8,0,32),(121,'うわ~',4,0,32),(122,'ショウ',1,0,32),(123,'シャン',2,0,32),(124,'ジョウ',0,0,32),(125,'うえ',3,0,32),(126,'かみ',5,0,32),(127,'かわ',1,0,33),(128,'セン',0,0,33),(129,'セン',1,0,34),(130,'やま',2,0,34),(131,'サン',0,0,34),(132,'た',1,0,35),(133,'デン',0,0,35),(134,'はた',0,0,36),(135,'~ばたけ',2,0,36),(136,'はたけ',1,0,36),(137,'かたな',1,0,37),(138,'トウ',0,0,37),(139,'そり',2,0,37),(140,'わ',3,0,38),(141,'ブ',2,0,38),(142,'フン',1,0,38),(143,'ブン',0,0,38),(144,'き',2,0,39),(145,'~ぎ',3,0,39),(146,'セツ',0,0,39),(147,'サイ',1,0,39),(148,'コク',0,0,40),(149,'くに',1,0,40),(150,'てら',1,0,41),(151,'ジ',0,0,41),(152,'ジ',0,0,42),(153,'とき',1,0,42),(154,'~どき',2,0,42),(155,'ま',3,0,43),(156,'ケン',1,0,43),(157,'あいだ',2,0,43),(158,'あい',4,0,43),(159,'カン',0,0,43),(160,'うま',4,0,44),(161,'は',6,0,44),(162,'な',9,0,44),(163,'ショウ',1,0,44),(164,'う',3,0,44),(165,'い',2,0,44),(166,'セイ',0,0,44),(167,'うまれ',5,0,44),(168,'む',10,0,44),(169,'なま',8,0,44),(170,'き',7,0,44),(171,'ネン',0,0,45),(172,'とし',1,0,45),(173,'もっ',1,0,46),(174,'イ',0,0,46),(175,'ゼン',0,0,47),(176,'まえ',1,0,47),(177,'コウ',1,0,48),(178,'のち',2,0,48),(179,'あと',5,0,48),(180,'うしろ',4,0,48),(181,'うし',3,0,48),(182,'おく',6,0,48),(183,'ゴ',0,0,48),(184,'うま',1,0,49),(185,'ゴ',0,0,49);
/*!40000 ALTER TABLE `kanji_pronunciation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `date_creation` date NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `na_adjective`
--

DROP TABLE IF EXISTS `na_adjective`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `na_adjective` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `kanjis` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `number_of_use` int DEFAULT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6y0la34kljpnon2qneugo6b9p` (`kanjis`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `na_adjective`
--

LOCK TABLES `na_adjective` WRITE;
/*!40000 ALTER TABLE `na_adjective` DISABLE KEYS */;
INSERT INTO `na_adjective` VALUES (1,'きれい',1,0),(2,'簡単',1,0),(3,'元気',1,0);
/*!40000 ALTER TABLE `na_adjective` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `na_adjective_meaning`
--

DROP TABLE IF EXISTS `na_adjective_meaning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `na_adjective_meaning` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `meaning` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meaning_number` int NOT NULL,
  `version` int NOT NULL,
  `na_adjective_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK76h3ynfs3dok0yslwvugr8ktu` (`na_adjective_id`),
  CONSTRAINT `FK76h3ynfs3dok0yslwvugr8ktu` FOREIGN KEY (`na_adjective_id`) REFERENCES `na_adjective` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `na_adjective_meaning`
--

LOCK TABLES `na_adjective_meaning` WRITE;
/*!40000 ALTER TABLE `na_adjective_meaning` DISABLE KEYS */;
INSERT INTO `na_adjective_meaning` VALUES (1,'clean; clear; pure; tidy; neat',1,0,1),(2,'pretty; lovely; beautiful; fair',0,0,1),(3,'completely; entirely - as きれいに',2,0,1),(4,'brief; quick; light',1,0,2),(5,'simple; easy; uncomplicated',0,0,2),(6,'healthy; well; fit; in good health',1,0,3),(7,'lively; full of spirit; energetic; vigorous; vital; spirited',0,0,3);
/*!40000 ALTER TABLE `na_adjective_meaning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `na_adjective_pronunciation`
--

DROP TABLE IF EXISTS `na_adjective_pronunciation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `na_adjective_pronunciation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pronunciation` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `pronunciation_number` int NOT NULL,
  `version` int NOT NULL,
  `na_adjective_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKc57q5ne51oimltncu2n90avds` (`na_adjective_id`),
  CONSTRAINT `FKc57q5ne51oimltncu2n90avds` FOREIGN KEY (`na_adjective_id`) REFERENCES `na_adjective` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `na_adjective_pronunciation`
--

LOCK TABLES `na_adjective_pronunciation` WRITE;
/*!40000 ALTER TABLE `na_adjective_pronunciation` DISABLE KEYS */;
INSERT INTO `na_adjective_pronunciation` VALUES (1,'きれい',0,0,1),(2,'かんたん',0,0,2),(3,'げんき',0,0,3);
/*!40000 ALTER TABLE `na_adjective_pronunciation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `name`
--

DROP TABLE IF EXISTS `name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `name` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `kanjis` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `number_of_use` int DEFAULT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_begrj9j29nrjl2fq4iickwuxw` (`kanjis`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `name`
--

LOCK TABLES `name` WRITE;
/*!40000 ALTER TABLE `name` DISABLE KEYS */;
INSERT INTO `name` VALUES (1,'八木',1,0),(2,'三木',1,0),(3,'中川',1,0),(4,'山本',1,0),(5,'田中',1,0),(6,'本田',1,0),(7,'中田',1,0),(8,'下田',1,0),(9,'小畑',1,0),(10,'四国',1,0),(11,' 寺田',1,0);
/*!40000 ALTER TABLE `name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `name_meaning`
--

DROP TABLE IF EXISTS `name_meaning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `name_meaning` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `meaning` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meaning_number` int NOT NULL,
  `version` int NOT NULL,
  `name_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgtkwcciw82ci31ck2s8ycogad` (`name_id`),
  CONSTRAINT `FKgtkwcciw82ci31ck2s8ycogad` FOREIGN KEY (`name_id`) REFERENCES `name` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `name_meaning`
--

LOCK TABLES `name_meaning` WRITE;
/*!40000 ALTER TABLE `name_meaning` DISABLE KEYS */;
INSERT INTO `name_meaning` VALUES (1,'はちぼく',2,0,1),(2,'Hagi -family name',0,0,1),(3,'やき',3,0,1),(4,'やぎ',4,0,1),(5,'Hachiki',1,0,1),(6,'やつき',5,0,1),(7,'やつぎ',6,0,1),(8,'Miki - family name',0,0,2),(9,'Nakagawa -place / family name',0,0,3),(10,'Yamomato -family name',2,0,4),(11,'Inoue -family name',0,0,4),(12,'Yamamoto -place / family name',1,0,4),(13,'Nataka -family name',5,0,5),(14,'Nonaka -family name',7,0,5),(15,'Tanata -family name',1,0,5),(16,'Yanaka -family name',9,0,5),(17,'Tanaka -place / family name / female given name',0,0,5),(18,'Tanka -family name',2,0,5),(19,'Danaka -family name',3,0,5),(20,'Hiroka -family name',8,0,5),(21,'Nunaka -family name',6,0,5),(22,'Denchuu -family name / given name',4,0,5),(23,'Honda -place / family name',1,0,6),(24,'Honden -place / family name',2,0,6),(25,'Honta -family name',0,0,6),(26,'Motoda -family name',3,0,6),(27,'Chuuden -place',2,0,7),(28,'Nakata -place / family name',3,0,7),(29,'Chuuda -family name',1,0,7),(30,'Nakada -place / family name',4,0,7),(31,'Uchida',0,0,7),(32,'Shimoda -place / family name',3,0,8),(33,'Misada -place',4,0,8),(34,'Shimota -place / family name',2,0,8),(35,'Geda -place',0,0,8),(36,'Shitada -place / family name',1,0,8),(37,'Kobata -place / family name',5,0,9),(38,'Obatake -place / family name',3,0,9),(39,'Kohata -family name',4,0,9),(40,'Shoubata -place',7,0,9),(41,'Kobatake -family name',6,0,9),(42,'Obata -place / family name',2,0,9),(43,'Emiriya -family name',0,0,9),(44,'Ohata -family name',1,0,9),(45,'Shikoku (smallest of the four main islands of Japan)',0,0,10),(46,'Terata -family name',0,0,11),(47,'Terada -place / family name',1,0,11),(48,'Terado -family name',2,0,11),(49,'Mizuno -family name',3,0,11);
/*!40000 ALTER TABLE `name_meaning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `name_pronunciation`
--

DROP TABLE IF EXISTS `name_pronunciation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `name_pronunciation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pronunciation` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `pronunciation_number` int NOT NULL,
  `version` int NOT NULL,
  `name_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKoqlrpulsv8iorgupa3uqbe389` (`name_id`),
  CONSTRAINT `FKoqlrpulsv8iorgupa3uqbe389` FOREIGN KEY (`name_id`) REFERENCES `name` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `name_pronunciation`
--

LOCK TABLES `name_pronunciation` WRITE;
/*!40000 ALTER TABLE `name_pronunciation` DISABLE KEYS */;
INSERT INTO `name_pronunciation` VALUES (1,'はちぼく',2,0,1),(2,'はちき',1,0,1),(3,'やぎ',4,0,1),(4,'やき',3,0,1),(5,'はぎ',0,0,1),(6,'やつぎ',6,0,1),(7,'やつき',5,0,1),(8,'みき',0,0,2),(9,'なかがわ',0,0,3),(10,'やまもと',1,0,4),(11,'いのうえ',0,0,4),(12,'やもまと',2,0,4),(13,'なたか',5,0,5),(14,'たんか',2,0,5),(15,'たなた',1,0,5),(16,'ひろか',8,0,5),(17,'ぬなか',6,0,5),(18,'たなか',0,0,5),(19,'でんちゅう',4,0,5),(20,'のなか',7,0,5),(21,'だなか',3,0,5),(22,'やなか',9,0,5),(23,'もとだ',3,0,6),(24,'ほんでん',2,0,6),(25,'ほんだ',1,0,6),(26,'ほんた',0,0,6),(27,'うちだ',0,0,7),(28,'ちゅうでん',2,0,7),(29,'なかた',3,0,7),(30,'なかだ',4,0,7),(31,'ちゅうだ',1,0,7),(32,'しもた',2,0,8),(33,'しもだ',3,0,8),(34,'げだ',0,0,8),(35,'しただ',1,0,8),(36,'みさだ',4,0,8),(37,'こばた',5,0,9),(38,'おばたけ',3,0,9),(39,'こはた',4,0,9),(40,'しょうばた',7,0,9),(41,'おばた',2,0,9),(42,'えみりや',0,0,9),(43,'おはた',1,0,9),(44,'こばたけ',6,0,9),(45,'しこく',0,0,10),(46,'てらど',2,0,11),(47,'みずの',3,0,11),(48,'てらだ',1,0,11),(49,'てらた',0,0,11);
/*!40000 ALTER TABLE `name_pronunciation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `particule`
--

DROP TABLE IF EXISTS `particule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `particule` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `kanjis` varchar(5) COLLATE utf8mb4_general_ci NOT NULL,
  `summary` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `version` int NOT NULL,
  `html_page` longtext COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `particule`
--

LOCK TABLES `particule` WRITE;
/*!40000 ALTER TABLE `particule` DISABLE KEYS */;
INSERT INTO `particule` VALUES (1,'は','The particle は – wa indicates  the main topic of a sentence.',12,'<h4><strong>は</strong> indicates that the preceding noun (N1) is the topic of the sentence</h4>\n<p>\nThe particle <strong>は</strong> indicates that the preceding noun (N1) is the topic of the sentence. To construct a sentence, the speaker first chooses the topic he or she wants to evoke by marking it with <strong>は</strong>, and then adds various descriptions.\n</p>\n<p>\n私はマイク・ミラーです。<br/>\nわたしはマイク・ミラーです。<br/>\nI am Mike Miller.<br/>\n[Note] <strong>は</strong> is prononced <strong>わ</strong>.<br/>\n</p>'),(2,'か','This particle か – ka is used to express a question.',2,''),(3,'が','The particle が – GA indicates  the subject of a sentence when it is new information for the listener or when subject is emphasized.',0,''),(4,'に','Indicates a location, Indicates time or frequency, Indicates the indirect object of a verb, Indicates a point of arrival ...',0,''),(5,'も','Validates the same thing as mentioned previously.',0,'<h4>「も」is used when the sentence validates the same thing as mentioned previously</h4>\n<p>\nミラーさんは会社員です。グプタさんも会社員です。<br/>\nミラーさんはかいしゃいんです。グプタさんもかいしゃいんです。<br/>\nMr. Miller is a corporate employee. Mr. Guputa is also a corporate employee.</p>'),(6,'の','Indicates ownership, explains what N2 refers to, N1 qualifies the second noun N2',3,'<h4>N1のN2, the first noun N1 qualifies the second noun N2</h4>\n<p>When the first noun, N1 qualifies the second noun N2, these two nouns are connected using <strong>の</strong>.<br/>\nみきさんはIBMの社員です。<br/>\nみきさんはのしゃいんです。<br/>\nMr. Miki is an employee of IBM.</p>\n<br/>\n<h4>N1 explains what N2 refers to</h4>\n<p>これはコンピューターの本です。<br/>\nこれはコンピューターのほんです。<br/>\nThis is a computer book.\n</p>\n<br/>\n<h4>N1 indicates who is the owner of N2</h4>\n<p>これはわたしの本です。<br/>\nこれはわたしのほんです。<br/>\nThis is my book.\n</p>\n<h4>N1 indicates the origin of N2</h4>\n<p>When N1 is the name of a country and N2 is a product, N1 <strong>の</strong> means that the product is manufactured in that country. \nWhen N1 is the name of a company and N2 is a product, N1 <strong>の</strong> means that the product is manufactured by that company.  \nFor both cases, the interrogative word <strong>どこ</strong> is used to ask where or by which company the product is made.</p>\n<p>これはどこのコンピューターですか。<br/>\nWhere is this computer made? / Who is the manufacturer of this computer? <br/>\n......日本のコンピューターです。<br/>\n......It is a Japanese computer. <br/>\n......パワー電気のコンピュータ-です。<br/>\n......It is a computer from Power Electric. \n</p>');
/*!40000 ALTER TABLE `particule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_USER'),(2,'ROLE_MODERATOR'),(3,'ROLE_ADMIN');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sentence`
--

DROP TABLE IF EXISTS `sentence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sentence` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `kanjis` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meaning` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `pronunciation` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `topic` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_8kvqcd1rh74idiknqa9kwhfhf` (`kanjis`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sentence`
--

LOCK TABLES `sentence` WRITE;
/*!40000 ALTER TABLE `sentence` DISABLE KEYS */;
INSERT INTO `sentence` VALUES (1,'おはようございます。','good morning','おはようございます','Communicate',0),(2,'こんにちは。','Good afternoon','こんにちは','Communicate',0),(3,'こんばんは。','good evening','こんばんは','Communicate',0),(4,'さようなら。','goodbye','さようなら','Communicate',0),(5,'またあとで!','see you later','またあとで!','Communicate',0),(6,'また明日!','see you tomorrow','またあした','Communicate',0),(7,'また今度!','see you next time','またこんど','Communicate',0);
/*!40000 ALTER TABLE `sentence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suffix`
--

DROP TABLE IF EXISTS `suffix`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suffix` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `kanjis` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `summary` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `use_column` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_1k8af8ghi4fp9o10smpf7suno` (`kanjis`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suffix`
--

LOCK TABLES `suffix` WRITE;
/*!40000 ALTER TABLE `suffix` DISABLE KEYS */;
INSERT INTO `suffix` VALUES (1,'さん','It’s a neutral term, which most closely resembles “Sir/Madam“.','San is probably the first honorific you’ll learn how to use and it is one of the most commonly used. You can use it with anyone you don’t really know, regardless of their gender, age or social status. It’s a neutral term, which most closely resembles “Sir/Madam“. This suffix is also added to company or business names, like a pastry shop (パン屋さん, pan-ya-san).',0),(2,'ちゃん','It is used to refer to young women (or children, babies, a grandmother, or an animal) you’re close with','This is the most familiar honorific and is supposedly derived from children who couldn’t say “San” properly. This small mistake was considered cute and stayed in the language. It is used to refer to young women you’re close with, children, babies, a grandmother, or even an animal you’re especially fond of. It can also be used in a couple or when talking about someone you like a lot. You therefore need to be careful who you use it with and avoid using it for people you’re not so close to.',0),(3,'くん','This is a suffix used for teenagers and young men. It’s usually used by people seen as superior.','This is a suffix seen as masculine, used for teenagers and young men. Sometimes, it is used to refer to young women, but only in very specific situations. It’s usually used by people seen as superior, since this honorific is mostly used when one person of higher status is talking to a younger person. The politeness level is low and its kanji is the same as the one used for kimi (君), which is an informal way of saying “you”. Kun can be used when talking with a classmate, a younger brother or younger man. Men only use it with women they are close to and likewise, women will use it with men.',0),(4,'様','It is used in situations towards people who have a high status, such as with customers.','The use of the word -sama is the most formal, and is very special. This higher version of -san is used in very specific situations towards people who have a high status, such as with customers in the customer service industry, but more commonly when talking about Japanese deities 神様 (kami-sama). This Japanese honorific bears a sense of social superiority, as in the case of “the customer is king”, and customers are therefore referred to as お客様 (okyakusama).\n\nIts English equivalent would be an extremely polite form of “Mister/Madam Customer.” Sometimes, this honorific will be attached to a word referring to a group of people or an audience, such as is the case with 皆様 (mina-sama; everyone), giving an extra layer of politeness to the group. Finally, you’ll also find this honorific in Japanese expressions, such as the famous お疲れ様です (otsukaresama desu), which is used to thank someone for their hard work.',0);
/*!40000 ALTER TABLE `suffix` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suffix_pronunciation`
--

DROP TABLE IF EXISTS `suffix_pronunciation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suffix_pronunciation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pronunciation` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `pronunciation_number` int NOT NULL,
  `version` int NOT NULL,
  `suffix_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmt6fdx9tqotf1f2m518j24lco` (`suffix_id`),
  CONSTRAINT `FKmt6fdx9tqotf1f2m518j24lco` FOREIGN KEY (`suffix_id`) REFERENCES `suffix` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suffix_pronunciation`
--

LOCK TABLES `suffix_pronunciation` WRITE;
/*!40000 ALTER TABLE `suffix_pronunciation` DISABLE KEYS */;
INSERT INTO `suffix_pronunciation` VALUES (1,'さん',0,0,1),(2,'ちゃん',0,0,2),(3,'くん',0,0,3),(4,'さま',0,0,4);
/*!40000 ALTER TABLE `suffix_pronunciation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,3);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(120) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'thepaut_antoine@outlook.fr','$2a$10$Sj3UV0ko9K9anBZd/zbFXee9GZbsf/S2/CQyaQBH.EDJwESc3slWa','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verb`
--

DROP TABLE IF EXISTS `verb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verb` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `groupe` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `neutral_form` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `number_of_use` int DEFAULT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_n69n2q1gdvllxl3gl5785buqn` (`neutral_form`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verb`
--

LOCK TABLES `verb` WRITE;
/*!40000 ALTER TABLE `verb` DISABLE KEYS */;
INSERT INTO `verb` VALUES (1,'Irregulars','です',1,0),(2,'Ichidan','食べる',1,0),(3,'Ichidan','起きる',1,0),(4,'Ichidan','寝る',1,0),(5,'Godan','働く',1,0),(6,'Godan','休む',1,0),(7,'Godan','終わる',1,0);
/*!40000 ALTER TABLE `verb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verb_meaning`
--

DROP TABLE IF EXISTS `verb_meaning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verb_meaning` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `meaning` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meaning_number` int NOT NULL,
  `version` int NOT NULL,
  `verb_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqaldneqwivsx2g4quo1102ab2` (`verb_id`),
  CONSTRAINT `FKqaldneqwivsx2g4quo1102ab2` FOREIGN KEY (`verb_id`) REFERENCES `verb` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verb_meaning`
--

LOCK TABLES `verb_meaning` WRITE;
/*!40000 ALTER TABLE `verb_meaning` DISABLE KEYS */;
INSERT INTO `verb_meaning` VALUES (1,'be; is',0,0,1),(2,'to live on (e.g. a salary); to live off; to subsist on',1,0,2),(3,'to eat',0,0,2),(4,'to wake up; to be awake; to stay awake',1,0,3),(5,'to get up; to rise; to blaze up (fire)',0,0,3),(6,'to occur (usu. of unfavourable incidents); to happen; to take place',2,0,3),(7,'to go to bed; to lie in bed',1,0,4),(8,'to lie down',0,0,4),(9,'to sleep (with someone, i.e. have intercourse)',2,0,4),(10,'to lie idle',3,0,4),(11,'to be conjugated - Linguistics term',3,0,5),(12,'to commit (e.g. a crime); to perpetrate; to do; to act; to practise; to practice',2,0,5),(13,'to work; to labor; to labour',0,0,5),(14,'to function; to operate; to be effective; to work (i.e. ... works); to come into play',1,0,5),(15,'to stop doing some ongoing activity for a time; to suspend business',3,0,6),(16,'to rest; to have a break',1,0,6),(17,'to go to bed; to (lie down to) sleep; to turn in; to retire',2,0,6),(18,'to be absent; to take a day off',0,0,6),(19,'to finish; to end; to close',0,0,7);
/*!40000 ALTER TABLE `verb_meaning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verb_pronunciation`
--

DROP TABLE IF EXISTS `verb_pronunciation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verb_pronunciation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pronunciation` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pronunciation_number` int NOT NULL,
  `version` int NOT NULL,
  `verb_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmlf6gxgy4yx3pabqskfl2jk5r` (`verb_id`),
  CONSTRAINT `FKmlf6gxgy4yx3pabqskfl2jk5r` FOREIGN KEY (`verb_id`) REFERENCES `verb` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verb_pronunciation`
--

LOCK TABLES `verb_pronunciation` WRITE;
/*!40000 ALTER TABLE `verb_pronunciation` DISABLE KEYS */;
INSERT INTO `verb_pronunciation` VALUES (1,'です',0,0,1),(2,'たべる',0,0,2),(3,'おきる',0,0,3),(4,'ねる',0,0,4),(5,'はたらく',0,0,5),(6,'やすむ',0,0,6),(7,'おわる',0,0,7);
/*!40000 ALTER TABLE `verb_pronunciation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit_stats`
--

DROP TABLE IF EXISTS `visit_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit_stats` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_visit` date NOT NULL,
  `ip` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit_stats`
--

LOCK TABLES `visit_stats` WRITE;
/*!40000 ALTER TABLE `visit_stats` DISABLE KEYS */;
INSERT INTO `visit_stats` VALUES (1,'2021-08-21','$2a$10$0fw5DeEMqc27uRWyD4VW.e18ehxgUvqjRRs9Nvw95I7.Pqm5P9CiS',0),(2,'2021-09-05','$2a$10$giw80zoFJiqb241ZbQly1uHV5hZ0JMKz4cGB21VbxxWTO9zTQTnJO',0);
/*!40000 ALTER TABLE `visit_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word`
--

DROP TABLE IF EXISTS `word`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `kanjis` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `number_of_use` int DEFAULT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_eokt772dix54mwetq3f0se0ah` (`kanjis`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word`
--

LOCK TABLES `word` WRITE;
/*!40000 ALTER TABLE `word` DISABLE KEYS */;
INSERT INTO `word` VALUES (1,'フランス人',1,0),(2,'あの人',1,0),(3,'一人',1,0),(4,'二人',1,0),(5,'二人とも',1,0),(6,'一日',1,0),(7,'二日',1,0),(8,'四人',1,0),(9,'四日',1,0),(10,'五人',1,0),(11,'六日',1,0),(12,'七日',1,0),(13,'八日',1,0),(14,'九日',1,0),(15,'九九',1,0),(16,'十日',1,0),(17,'二十日',1,0),(18,'十四日',1,0),(19,'十八日',1,0),(20,'万一',1,0),(21,'月',1,0),(22,'一月',1,0),(23,'二月',1,0),(24,'一ヶ月',1,0),(25,'三月',1,0),(26,'四月',1,0),(27,'五月',1,0),(28,'六月',1,0),(29,'七月',1,0),(30,'八月',1,0),(31,'九月',1,0),(32,'十月',1,0),(33,'十一月',1,0),(34,'十二月',1,0),(35,'明日',1,0),(36,'明くる日',1,0),(37,'日曜日',1,0),(38,'月曜日',1,0),(39,'火曜日',1,0),(40,'水曜日',1,0),(41,'木曜日',1,0),(42,'金曜日',1,0),(43,'土曜日',1,0),(44,'水',1,0),(45,'金メダル',1,0),(46,'日本',1,0),(47,'日本人',1,0),(48,'本日',1,0),(49,'大きさ',1,0),(50,'大人',1,0),(51,'小人',1,0),(52,'日本中',1,0),(53,'風土',1,0),(54,'日本風',1,0),(55,'中風',1,0),(56,'風雨',1,0),(57,'大雨',1,0),(58,'小雨',1,0),(59,'下水',1,0),(60,'水上',1,0),(61,'上下',1,0),(62,'川上',1,0),(63,'川下',1,0),(64,'山水',1,0),(65,'火山',1,0),(66,'水田',1,0),(67,'田畑',1,0),(68,'日本刀',1,0),(69,'十分',1,0),(70,'大切',1,0),(71,'切り上げ',1,0),(72,'切り下げ',1,0),(73,'大国',1,0),(74,'万国',1,0),(75,'中国',1,0),(76,'国分寺',1,0),(77,'時々',1,0),(78,'日時',1,0),(79,'時間',1,0),(80,'中間',1,0),(81,'人間',1,0),(82,'人生',1,0),(83,'一生',1,0),(84,'生年月日',1,0),(85,'年金',1,0),(86,'以上',1,0),(87,'以下',1,0),(88,'前もって',1,0),(89,'人前',1,0),(90,'分け前',1,0),(91,'以後',1,0),(92,'前後',1,0),(93,'その後',1,0),(94,'午前',1,0),(95,'午後',1,0),(96,'午前中',1,0);
/*!40000 ALTER TABLE `word` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word_meaning`
--

DROP TABLE IF EXISTS `word_meaning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_meaning` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `meaning` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meaning_number` int NOT NULL,
  `version` int NOT NULL,
  `word_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKn82dc76bpc8qheunavowxm7y5` (`word_id`),
  CONSTRAINT `FKn82dc76bpc8qheunavowxm7y5` FOREIGN KEY (`word_id`) REFERENCES `word` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word_meaning`
--

LOCK TABLES `word_meaning` WRITE;
/*!40000 ALTER TABLE `word_meaning` DISABLE KEYS */;
INSERT INTO `word_meaning` VALUES (1,'Frenchman; Frenchwoman',0,0,1),(2,'you - archaism',1,0,2),(3,'he; she; that person - sometimes of one\'s spouse or partner',0,0,2),(4,'alone; unmarried; solitary',1,0,3),(5,'one person',0,0,3),(6,'two persons; two people; pair; couple',0,0,4),(7,'both (people)',0,0,5),(8,'first day of the month ➜ ついたち',1,0,6),(9,'one day',0,0,6),(10,'second day of the month',0,0,7),(11,'two days',1,0,7),(12,'four people',0,0,8),(13,'four days',1,0,9),(14,'fourth day of the month',0,0,9),(15,'five persons',0,0,10),(16,'six days',1,0,11),(17,'sixth day of the month',0,0,11),(18,'the seventh day of the month',0,0,12),(19,'seven days',1,0,12),(20,'eight days',1,0,13),(21,'the eighth day of the month',0,0,13),(22,'nine days',1,0,14),(23,'the ninth day of the month',0,0,14),(24,'multiplication table; times table',0,0,15),(25,'the tenth day of the month',0,0,16),(26,'ten days',1,0,16),(27,'twentieth day of the month',0,0,17),(28,'twenty days',1,0,17),(29,'fourteen days',1,0,18),(30,'fourteenth day of the month',0,0,18),(31,'eighteenth day of the month',0,0,19),(32,'eighteen days',1,0,19),(33,'by some chance; by some possibility',1,0,20),(34,'emergency; unlikely event - lit. 1 in 10,000',0,0,20),(35,'month',1,0,21),(36,'moon',0,0,21),(37,'January',1,0,22),(38,'one month',0,0,22),(39,'February',0,0,23),(40,'2 month',1,0,23),(41,'one month',0,0,24),(42,'March',0,0,25),(43,'April',0,0,26),(44,'May',0,0,27),(45,'June',0,0,28),(46,'July',0,0,29),(47,'August',0,0,30),(48,'September',0,0,31),(49,'October',0,0,32),(50,'November',0,0,33),(51,'December',0,0,34),(52,'near future ［あす］',1,0,35),(53,'tomorrow',0,0,35),(54,'next day; following day',0,0,36),(55,'Sunday',0,0,37),(56,'Monday',0,0,38),(57,'Tuesday',0,0,39),(58,'Wednesday',0,0,40),(59,'Thursday',0,0,41),(60,'Friday',0,0,42),(61,'Saturday',0,0,43),(62,'water (esp. cool, fresh water, e.g. drinking water)',0,0,44),(63,'flood; floodwaters',2,0,44),(64,'fluid (esp. in an animal tissue); liquid',1,0,44),(65,'gold medal',0,0,45),(66,'Japan',0,0,46),(67,'Japanese people',1,0,47),(68,'Japanese person',0,0,47),(69,'today',0,0,48),(70,'dimensions',2,0,49),(71,'volume',1,0,49),(72,'size',0,0,49),(73,'adult',0,0,50),(74,'dwarf; midget ［こびと］ Antonym: 巨人',1,0,51),(75,'narrow-minded person; mean person ［しょうじん］Antonym: 君子',2,0,51),(76,'child; small person Antonym: 大人【おとな】',0,0,51),(77,'throughout Japan',0,0,52),(78,'spiritual features',3,0,53),(79,'natural features',0,0,53),(80,'topography',1,0,53),(81,'climate',2,0,53),(82,'Japanesque',1,0,54),(83,'Japanese style',0,0,54),(84,'Japanism',2,0,54),(85,'palsy',0,0,55),(86,'paralysis',1,0,55),(87,'wind and rain',0,0,56),(88,'heavy rain',0,0,57),(89,'light rain',0,0,58),(90,'drizzle',1,0,58),(91,'drainage; ditch; gutter; sewerage',0,0,59),(92,'sewage; black water',1,0,59),(93,'on the water',1,0,60),(94,'aquatic',0,0,60),(95,'top and bottom; high and low; above and below; upper and lower ends; up and down',0,0,61),(96,'going and coming back',2,0,61),(97,'first and second volumes',4,0,61),(98,'upper and lower classes; ruler and ruled; the government and the people',3,0,61),(99,'going up and down; rising and falling; fluctuating',1,0,61),(100,'upstream',1,0,62),(101,'upper reaches of a river',0,0,62),(102,'downstream ',0,0,63),(103,'garden which contains an artificial hill and a pond ［さんすい］ ➜ 築山',3,0,64),(104,'mountain and water; landscape (containing hills and rivers)',0,0,64),(105,'landscape picture ［さんすい］ - abbreviation ➜ 山水画',1,0,64),(106,'mountain stream; water that flows down from a mountain',2,0,64),(107,'volcano',0,0,65),(108,'(water-filled) paddy field',0,0,66),(109,'fields (of rice and other crops)',0,0,67),(110,'Japanese sword',0,0,68),(111,'sufficiently; fully; thoroughly; well; perfectly',1,0,69),(112,'division into ten ［十分］',2,0,69),(113,'enough; sufficient; plenty; adequate; satisfactory',0,0,69),(114,'beloved; precious; dear; cherished; valuable',1,0,70),(115,'careful - usu. adverb, as ～に',2,0,70),(116,'important; necessary; indispensable',0,0,70),(117,'end; conclusion',0,0,71),(118,'revaluation',1,0,71),(119,'devaluation (e.g. of currency); markdown; write-down; undercutting',0,0,72),(120,'province of the highest rank (ritsuryo system)',1,0,73),(121,'large country; major nation; great power',0,0,73),(122,'all countries; the whole world; universal; all nations',0,0,74),(123,'province of the second lowest rank (ritsuryo system)',3,0,75),(124,'China ［ちゅうごく］',0,0,75),(125,'Chūgoku region of western Honshu (incl. Okayama, Hiroshima, Shimane, Tottori and Yamaguchi prefectures) ［ちゅうごく］',1,0,75),(126,'central part of a country; main region ［ちゅうごく］',2,0,75),(127,'state-supported provincial temple (Nara period)',0,0,76),(128,'sometimes; at times',0,0,77),(129,'date and time',0,0,78),(130,'hour',1,0,79),(131,'time',0,0,79),(132,'middle; midway; interim',0,0,80),(133,'character (of a person)',1,0,81),(134,'human being; person; man; mankind; humankind',0,0,81),(135,'(human) life (i.e. conception to death)',0,0,82),(136,'(the only, the greatest, etc.) of one\'s life',1,0,83),(137,'whole life; a lifetime; all through life; one existence; a generation; an age; the whole world; the era',0,0,83),(138,'birth date; date of birth; DOB',0,0,84),(139,'annuity; pension',0,0,85),(140,'since ...; seeing that ...',3,0,86),(141,'beyond ... (e.g. one\'s means); further (e.g. nothing further to say); more than ... (e.g. cannot pay more than that)',1,0,86),(142,'above-mentioned; foregoing',2,0,86),(143,'not less than; ... and more; ... and upwards',0,0,86),(144,'this is all; that is the end; the end',4,0,86),(145,'below (e.g. standard); under (e.g. a level)',1,0,87),(146,'not exceeding; and downward; ... and below',0,0,87),(147,'the below-mentioned; the following; the rest',2,0,87),(148,'in advance; beforehand; previously',0,0,88),(149,'the public; company',0,0,89),(150,'share; portion; quota; cut',0,0,90),(151,'after this; from now on; hereafter',0,0,91),(152,'thereafter; since (then); after - esp. after あれ, それ or the -te form of a verb',1,0,91),(153,'around; about; approximately',2,0,92),(154,'order; context',3,0,92),(155,'co-occurring',7,0,92),(156,'just when; around the time of',5,0,92),(157,'consequences',4,0,92),(158,'inversion; reversion; getting out of order',6,0,92),(159,'before and after',1,0,92),(160,'front and rear; front and back; before and behind; back and forth',0,0,92),(161,'after that; afterwards; thereafter',0,0,93),(162,'morning; a.m.',0,0,94),(163,'afternoon; p.m.',0,0,95),(164,'in the morning; during the morning',0,0,96);
/*!40000 ALTER TABLE `word_meaning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word_pronunciation`
--

DROP TABLE IF EXISTS `word_pronunciation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_pronunciation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pronunciation` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `pronunciation_number` int NOT NULL,
  `version` int NOT NULL,
  `word_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdvixice52sbdw172j4m99sd69` (`word_id`),
  CONSTRAINT `FKdvixice52sbdw172j4m99sd69` FOREIGN KEY (`word_id`) REFERENCES `word` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word_pronunciation`
--

LOCK TABLES `word_pronunciation` WRITE;
/*!40000 ALTER TABLE `word_pronunciation` DISABLE KEYS */;
INSERT INTO `word_pronunciation` VALUES (1,'フランスじん',0,0,1),(2,'あのひと',0,0,2),(3,'ひとり',0,0,3),(4,'いちにん',1,0,3),(5,'ににん',1,0,4),(6,'ふたり',0,0,4),(7,'ふたりとも',0,0,5),(8,'ついたち',1,0,6),(9,'いちにち',0,0,6),(10,'ふつか',0,0,7),(11,'よにん',0,0,8),(12,'よったり',1,0,8),(13,'よたり',2,0,8),(14,'よっか',0,0,9),(15,'ごにん',0,0,10),(16,'むいか',0,0,11),(17,'なのか',0,0,12),(18,'ようか',0,0,13),(19,'ここのか',0,0,14),(20,'くく',0,0,15),(21,'とおか',0,0,16),(22,'はつか',0,0,17),(23,'じゅうよっか',0,0,18),(24,'じゅうはちにち',0,0,19),(25,'まんいち',0,0,20),(26,'がつ',1,0,21),(27,'つき',0,0,21),(28,'いちがつ',1,0,22),(29,'ひとつき',0,0,22),(30,'にがつ',0,0,23),(31,'いっかげつ',0,0,24),(32,'さんがつ',0,0,25),(33,'しがつ',0,0,26),(34,'ごがつ',0,0,27),(35,'ろくがつ',0,0,28),(36,'しちがつ',0,0,29),(37,'はちがつ',0,0,30),(38,'くがつ',0,0,31),(39,'じゅうがつ',0,0,32),(40,'じゅういちがつ',0,0,33),(41,'じゅうにがつ',0,0,34),(42,'あす',2,0,35),(43,'みょうにち',0,0,35),(44,'あした',1,0,35),(45,'あくるひ',0,0,36),(46,'にちようび',0,0,37),(47,'げつようび',0,0,38),(48,'かようび',0,0,39),(49,'すいようび',0,0,40),(50,'もくようび',0,0,41),(51,'きんようび',0,0,42),(52,'どようび',0,0,43),(53,'み',1,0,44),(54,'みず',0,0,44),(55,'きんメダル',0,0,45),(56,'にほん',0,0,46),(57,'にっぽん',1,0,46),(58,'にほんじん',0,0,47),(59,'にっぽんじん',1,0,47),(60,'ほんじつ',0,0,48),(61,'おおきさ',0,0,49),(62,'おとな',0,0,50),(63,'しょうにん',0,0,51),(64,'しょうじん',2,0,51),(65,'こびと',1,0,51),(66,'にほんじゅう',0,0,52),(67,'にっぽんじゅう',1,0,52),(68,'ふうど',0,0,53),(69,'にほんふう',0,0,54),(70,'ちゅうふう',0,0,55),(71,'ちゅうぶう',1,0,55),(72,'ふうう',0,0,56),(73,'おおあめ',0,0,57),(74,'こさめ',0,0,58),(75,'しょうう',1,0,58),(76,'こあめ',2,0,58),(77,'げすい',0,0,59),(78,'すいじょう',0,0,60),(79,'じょうげ',0,0,61),(80,'かわかみ',0,0,62),(81,'かわしも',0,0,63),(82,'さんすい',0,0,64),(83,'やまみず',1,0,64),(84,'かざん',0,0,65),(85,'すいでん',0,0,66),(86,'でんぱた',1,0,67),(87,'たはた',0,0,67),(88,'たはたけ',2,0,67),(89,'にほんとう',0,0,68),(90,'じゅうぶん',0,0,69),(91,'たいせつ',0,0,70),(92,'きりあげ',0,0,71),(93,'きりさげ',0,0,72),(94,'たいこく',0,0,73),(95,'ばんこく',0,0,74),(96,'ちゅうごく',0,0,75),(97,'ちゅうこく',1,0,75),(98,'こくぶんじ',0,0,76),(99,'ときどき',0,0,77),(100,'にちじ',0,0,78),(101,'じかん',0,0,79),(102,'ちゅうかん',0,0,80),(103,'にんげん',0,0,81),(104,'じんせい',0,0,82),(105,'いっしょう',0,0,83),(106,'せいねんがっぴ',0,0,84),(107,'ねんきん',0,0,85),(108,'いじょう',0,0,86),(109,'いか',0,0,87),(110,'まえもって',0,0,88),(111,'ひとまえ',0,0,89),(112,'わけまえ',0,0,90),(113,'いご',0,0,91),(114,'ぜんご',0,0,92),(115,'そのご',1,0,93),(116,'そののち',2,0,93),(117,'そのあと',0,0,93),(118,'ごぜん',0,0,94),(119,'ごご',0,0,95),(120,'ごぜんちゅう',0,0,96);
/*!40000 ALTER TABLE `word_pronunciation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-19 16:31:00
