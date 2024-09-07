CREATE TABLE tags (
    id int(10) unsigned NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY tags_unique (title)
) ENGINE = INNODB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;