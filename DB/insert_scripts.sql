-- Insert data into Artist table
INSERT INTO Artist (name, bio, imageUrl) VALUES
('John Doe', 'A famous artist known for his abstract paintings.', 'http://example.com/images/johndoe.jpg'),
('Jane Smith', 'A contemporary artist with numerous awards.', 'http://example.com/images/janesmith.jpg'),
('Emily White', 'An emerging artist in the modern art scene.', 'http://example.com/images/emilywhite.jpg'),
('Michael Brown', 'A sculptor with a unique perspective on form.', 'http://example.com/images/michaelbrown.jpg'),
('Sarah Johnson', 'An artist who focuses on digital art.', 'http://example.com/images/sarahjohnson.jpg'),
('David Wilson', 'Known for his large-scale installations.', 'http://example.com/images/davidwilson.jpg'),
('Laura Martinez', 'A photographer capturing urban landscapes.', 'http://example.com/images/lauramartinez.jpg'),
('James Taylor', 'A mixed-media artist exploring new materials.', 'http://example.com/images/jamestaylor.jpg'),
('Linda Moore', 'A painter with a focus on realism.', 'http://example.com/images/lindamoore.jpg'),
('Robert Anderson', 'An artist known for his thought-provoking works.', 'http://example.com/images/robertanderson.jpg');

-- Insert data into User table
INSERT INTO User (name, email, password) VALUES
('Alice Johnson', 'alice@example.com', 'password123'),
('Bob Smith', 'bob@example.com', 'password123'),
('Charlie Brown', 'charlie@example.com', 'password123'),
('Diana Prince', 'diana@example.com', 'password123'),
('Evan Davis', 'evan@example.com', 'password123'),
('Fiona Clark', 'fiona@example.com', 'password123'),
('George King', 'george@example.com', 'password123'),
('Hannah Scott', 'hannah@example.com', 'password123'),
('Ian Baker', 'ian@example.com', 'password123'),
('Jack Wilson', 'jack@example.com', 'password123');

-- Insert data into Venue table
INSERT INTO Venue (name, address, location, capacity) VALUES
('Grand Hall', '123 Main St', 'Downtown', 500),
('Art Center', '456 Elm St', 'Uptown', 300),
('Open Space', '789 Oak St', 'Midtown', 700),
('The Arena', '101 Maple St', 'Northside', 1000);

-- Insert data into Event table
INSERT INTO Event (name, description, eventDate, category, venueId, imageUrl) VALUES
('Art Exhibition', 'An exhibition of contemporary art.', '2024-07-01 18:00:00', 'Exhibition', 1, 'http://example.com/images/artexhibition.jpg'),
('Sculpture Showcase', 'A showcase of modern sculptures.', '2024-07-05 19:00:00', 'Showcase', 2, 'http://example.com/images/sculptureshowcase.jpg'),
('Photography Gallery', 'A gallery of urban landscape photos.', '2024-07-10 20:00:00', 'Gallery', 3, 'http://example.com/images/photogallery.jpg'),
('Digital Art Expo', 'An expo of digital art works.', '2024-07-15 17:00:00', 'Expo', 4, 'http://example.com/images/digitalartexpo.jpg'),
('Mixed Media Exhibit', 'An exhibit of mixed media art.', '2024-07-20 18:30:00', 'Exhibit', 1, 'http://example.com/images/mixedmedia.jpg'),
('Realism Art Show', 'A show featuring realist paintings.', '2024-07-25 19:30:00', 'Show', 2, 'http://example.com/images/realismart.jpg'),
('Abstract Art Display', 'A display of abstract art.', '2024-07-30 18:00:00', 'Display', 3, 'http://example.com/images/abstractart.jpg'),
('Urban Art Exhibition', 'An exhibition of urban art.', '2024-08-01 18:00:00', 'Exhibition', 4, 'http://example.com/images/urbanart.jpg'),
('Installation Art Show', 'A show featuring installation art.', '2024-08-05 19:00:00', 'Show', 1, 'http://example.com/images/installationart.jpg'),
('Contemporary Art Fair', 'A fair of contemporary art.', '2024-08-10 20:00:00', 'Fair', 2, 'http://example.com/images/contemporaryart.jpg');

-- Insert data into event_artists_artist table
INSERT INTO Event_Artist (eventId, artistId) VALUES
(1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6),
(4, 7), (4, 8), (5, 9), (5, 10), (6, 1), (6, 3),
(7, 5), (7, 7), (8, 2), (8, 4), (9, 6), (9, 8),
(10, 9), (10, 10);

-- Insert data into Bookings table
INSERT INTO Booking (userId, eventId, bookingDate,price) VALUES
(1, 1, '2024-06-01 10:00:00',150), (2, 2, '2024-06-02 11:00:00',150), (3, 3, '2024-06-03 12:00:00',150),
(4, 4, '2024-06-04 13:00:00',150), (5, 5, '2024-06-05 14:00:00',150), (6, 6, '2024-06-06 15:00:00',150),
(7, 7, '2024-06-07 16:00:00',150), (8, 8, '2024-06-08 17:00:00',150), (9, 9, '2024-06-09 18:00:00',150),
(10, 10, '2024-06-10 19:00:00',150);

-- Insert data into Ticket table
INSERT INTO Ticket (seatNo, bookingId) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
(6, 6), (7, 7), (8, 8), (9, 9), (10, 10);

-- Insert data into Review table
INSERT INTO Review (userId, eventId, rating, comment) VALUES
(1, 1, 5, 'Amazing event, really enjoyed it!'),
(2, 2, 4, 'Great event, well organized.'),
(3, 3, 3, 'It was okay, expected more.'),
(4, 4, 5, 'Fantastic event, highly recommend!'),
(5, 5, 4, 'Good event, had a nice time.'),
(6, 6, 5, 'Loved it, will attend again.'),
(7, 7, 3, 'It was decent, but could be better.'),
(8, 8, 4, 'Enjoyed the event, well done.'),
(9, 9, 5, 'Excellent event, very impressive.'),
(10, 10, 4, 'Good event, nice arrangements.');

commit;