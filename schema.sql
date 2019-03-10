-- Adminer 4.6.3 PostgreSQL dump

DROP TABLE IF EXISTS "fileSystem";
DROP SEQUENCE IF EXISTS "fileSystem_id_seq";
CREATE SEQUENCE "fileSystem_id_seq" INCREMENT  MINVALUE  MAXVALUE  START 1 CACHE ;

CREATE TABLE "public"."fileSystem" (
    "id" integer DEFAULT nextval('"fileSystem_id_seq"') NOT NULL,
    "name" character varying NOT NULL,
    "path" character varying NOT NULL,
    "status" integer NOT NULL,
    "type" character varying NOT NULL
) WITH (oids = false);

INSERT INTO "fileSystem" ("id", "name", "path", "status", "type") VALUES
(10,	'trash',	'./ui/Desktop/trash',	0,	'folder'),
(11,	'sample.txt',	'./ui/Desktop/sample.txt',	0,	'file'),
(12,	'venky',	'./ui/Desktop/venky',	0,	'folder'),
(13,	'appdata',	'./ui/Desktop/venky/appdata',	0,	'folder'),
(14,	'sample.docx',	'./ui/Desktop/venky/sample.docx',	0,	'file'),
(15,	'sample.pptx',	'./ui/Desktop/venky/appdata/sample.pptx',	0,	'file');

-- 2019-03-11 03:49:03.383616+05:30
