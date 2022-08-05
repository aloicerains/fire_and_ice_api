-- creating database
CREATE DATABASE IF NOT EXISTS topup_mama;

-- create user@localhost
-- CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON topup_mama.* TO 'aloice'@'localhost';
FLUSH PRIVILEGES;

-- creating comments table
USE topup_mama;

CREATE TABLE IF NOT EXISTS `comments`(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    book_name VARCHAR(127) NOT NULL,
    public_ip VARCHAR(60) NOT NULL,
    comment VARCHAR(500),
    comment_date VARCHAR(60)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
FLUSH PRIVILEGES;
