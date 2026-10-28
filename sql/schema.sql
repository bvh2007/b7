CREATE TABLE IF NOT EXISTS admins (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 email VARCHAR(190) NOT NULL UNIQUE,
 password_hash VARCHAR(255) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS content (
 id TINYINT UNSIGNED PRIMARY KEY,
 json_data JSON NOT NULL,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS photos (
 id TINYINT UNSIGNED PRIMARY KEY,
 public_id VARCHAR(255) NULL,
 title VARCHAR(120) NOT NULL DEFAULT '',
 message TEXT NOT NULL,
 sort_order TINYINT UNSIGNED NOT NULL,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS replies (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 message VARCHAR(1000) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT IGNORE INTO photos (id,public_id,title,message,sort_order) VALUES
 (1,NULL,'','',1),(2,NULL,'','',2),(3,NULL,'','',3),(4,NULL,'','',4),(5,NULL,'','',5);
INSERT INTO admins (email, password_hash)
VALUES (
    'admin@sorrybloom.local',
    '$2a$12$./WRVlThdAUJZsrFntc7BuyQWQlbDcF1rFOORuPhPvK9j/pvyKhsC'
);
SELECT id, email FROM admins;
SELECT DATABASE();

SELECT id, email, LENGTH(password_hash) AS hash_length
FROM admins;
UPDATE admins
SET password_hash = '$2a$12$./WRVlThdAUJZsrFntc7BuyQWQlbDcF1rFOORuPhPvK9j/pvyKhsC'
WHERE email = 'admin@sorrybloom.local';
SELECT email, LENGTH(password_hash) AS hash_length
FROM admins;
UPDATE admins
SET password_hash = '$2a$12$./WRVlThdAUJZsrFntc7BuyQWQlbDcF1rFOORuPhPvK9j/pvyKhsC'
WHERE email = 'admin@sorrybloom.local';

UPDATE admins
SET password_hash = '$2a$12$./WRVlThdAUJZsrFntc7BuyQWQlbDcF1rFOORuPhPvK9j/pvyKhsC'
WHERE email = 'admin@sorrybloom.local';

UPDATE admins
SET password_hash = '$2a$12$TuSrelPAjIWT3X0epSxwyuJ9WHUYZV2oyJCdrdFmY16c1S2guBGjm'
WHERE email = 'admin@sorrybloom.local';
SELECT id, title, public_id
FROM photos
ORDER BY id;
UPDATE photos
SET title = 'Khoảnh khắc đầu tiên'
WHERE id = 1;

UPDATE photos
SET title = 'Nụ cười đáng nhớ'
WHERE id = 2;

UPDATE photos
SET title = 'Một ngày thật đẹp'
WHERE id = 3;

UPDATE photos
SET title = 'Kỷ niệm của chúng châmmm'
WHERE id = 4;

UPDATE photos
SET title = 'Điều muốn giữ mãi'
WHERE id = 5;
UPDATE photos
SET message = 'xì trummm'
WHERE id = 1;

UPDATE photos
SET message = 'thạch sùnggg'
WHERE id = 2;SELECT id, title, message
FROM photos
ORDER BY id;
UPDATE photos
SET title = 'Khoảnh khắc đầu tiên',
    message = 'chammxgaii'
WHERE id = 1;

UPDATE photos
SET title = 'Một ngày đáng nhớ',
    message = 'chamcute'
WHERE id = 2;

UPDATE photos
SET title = 'Nụ cười ấy',
    message = 'thuychamm'
WHERE id = 3;

UPDATE photos
SET title = 'Kỷ niệm đẹp',
    message = 'xitrummmm'
WHERE id = 4;

UPDATE photos
SET title = 'Điều muốn nói',
    message = 'thạch sùngg'
WHERE id = 5;
SELECT DATABASE();
SHOW DATABASES;
SELECT id, title, message
FROM photos
WHERE id = 4;
USE sorry_bloom;

SELECT DATABASE();

SELECT id, title, message
FROM photos
ORDER BY id;
USE sorry_bloom;

SELECT DATABASE();

SELECT id, title, message
FROM photos
ORDER BY id;
UPDATE sorry_bloom.photos
SET
    title = 'Kỷ niệm đẹp',
    message = 'Đây là lời nhắn mới của ảnh số 4.'
WHERE id = 4;
SELECT id, title, message
FROM sorry_bloom.photos
WHERE id = 4;

-- CHỈNH SỬA 5 ẢNH TRONG WEBSITE SORRY BLOOM

USE sorry_bloom;

-- ẢNH 1
UPDATE photos
SET
    title = 'Chamcute',
    message = 'xinnloii'
WHERE id = 1;

-- ẢNH 2
UPDATE photos
SET
    title = 'chamxgaiii',
    message = '..'
WHERE id = 2;

-- ẢNH 3
UPDATE photos
SET
    title = 'thuychammm',
    message = ''
WHERE id = 3;

-- ẢNH 4
UPDATE photos
SET
    title = 'xì trummm',
    message = ''
WHERE id = 4;

-- ẢNH 5
UPDATE photos
SET
    title = 'thạch sùng',
    message = ''
WHERE id = 5;

-- KIỂM TRA KẾT QUẢ
SELECT id, title, message
FROM sorry_bloom.photos
ORDER BY id;
