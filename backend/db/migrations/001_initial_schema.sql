-- Create the users table to store user information
CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,               -- Primary key for the user
username VARCHAR(50) NOT NULL,                  -- User's display name
email VARCHAR(100) NOT NULL UNIQUE,             -- Unique email for each user
password VARCHAR(255) NOT NULL,                 -- Encrypted password
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the user was created
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Auto-updating timestamp for modifications
);

-- Create the habits table to store user habits
CREATE TABLE IF NOT EXISTS habits (
id INT AUTO_INCREMENT PRIMARY KEY,                -- Primary key for the habit
user_id INT NOT NULL,                             -- Foreign key referencing the user
title VARCHAR(100) NOT NULL,                      -- Title of the habit
description TEXT,                                 -- Description of the habit
frequency ENUM('daily', 'weekly', 'monthly'),     -- Frequency of the habit
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Timestamp for habit creation
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Timestamp for updates
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Cascade delete when the user is removed
);

-- Add any additional tables here in future migrations
