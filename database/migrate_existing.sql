-- Run ONLY if the replies table already exists without choice.
ALTER TABLE replies ADD COLUMN choice ENUM('read','time') NULL;
