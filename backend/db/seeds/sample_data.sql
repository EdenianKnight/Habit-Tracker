-- Insert sample users into the users table
INSERT INTO users (username, email, password)
VALUES
('john_doe', 'john@example.com', '$2b$10$hashedpassword1'), -- Replace with actual hashed passwords
('jane_smith', 'jane@example.com', '$2b$10$hashedpassword2');

-- Insert sample habits for the first user (john_doe)
INSERT INTO habits (user_id, title, description, frequency)
VALUES
(1, 'Morning Run', 'Run 5km every morning to stay fit.', 'daily'),
(1, 'Read a Book', 'Read at least one chapter from a book.', 'daily');

-- Insert sample habits for the second user (jane_smith)
INSERT INTO habits (user_id, title, description, frequency)
VALUES
(2, 'Yoga Practice', 'Do a 30-minute yoga session.', 'weekly'),
(2, 'Weekly Budget Review', 'Review and adjust weekly budget.', 'weekly');
