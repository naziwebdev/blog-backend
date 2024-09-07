CREATE TABLE articles_tags (
    id int(10) unsigned NOT NULL AUTO_INCREMENT,
    article_id int(10) unsigned NOT NULL,
    tag_id int(10) unsigned NOT NULL,

    PRIMARY KEY(id),
    UNIQUE KEY tags_articles_unique (article_id, tag_id),
    KEY articles_tags_article_fk (article_id),
    CONSTRAINT articles_tags_article_fk FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE,
    KEY articles_tags_tag_fk (tag_id),
    CONSTRAINT articles_tags_tag_fk FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
)ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_general_ci;