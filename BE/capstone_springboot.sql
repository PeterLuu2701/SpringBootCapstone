

-- Bảng role (Vai trò người dùng)
CREATE TABLE role (
                      role_id INT AUTO_INCREMENT PRIMARY KEY,
                      name VARCHAR(255) NOT NULL,
                      description TEXT
);

-- Bảng user (Người dùng)
CREATE TABLE user (
                      user_id INT AUTO_INCREMENT PRIMARY KEY,
                      username VARCHAR(255) UNIQUE NOT NULL,
                      password VARCHAR(255) NOT NULL,
                      email VARCHAR(255) UNIQUE NOT NULL,
                      phone VARCHAR(20),
                      address TEXT,
                      imageURL TEXT,
                      createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      role_id INT,
                      FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE SET NULL
);

-- Bảng contact (Liên hệ)
CREATE TABLE contact (
                         contact_id INT AUTO_INCREMENT PRIMARY KEY,
                         imageURL TEXT,
                         createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         message TEXT,
                         user_id INT,
                         FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- Bảng destination (Điểm đến)
CREATE TABLE destination (
                             destination_id INT AUTO_INCREMENT PRIMARY KEY,
                             name VARCHAR(255) NOT NULL,
                             description TEXT,
                             location VARCHAR(255),
                             imageURL TEXT
);

-- Bảng tour (Chuyến đi)
CREATE TABLE tour (
                      tour_id INT AUTO_INCREMENT PRIMARY KEY,
                      destination_id INT,
                      name VARCHAR(255) NOT NULL,
                      price DECIMAL(10,2) NOT NULL,
                      rating FLOAT DEFAULT 0,
                      imageURL TEXT,
                      start_date DATE NOT NULL,
                      end_date DATE NOT NULL,
                      guest INT NOT NULL,
                      FOREIGN KEY (destination_id) REFERENCES destination(destination_id) ON DELETE CASCADE
);

-- Bảng booking (Đặt tour)
CREATE TABLE booking (
                         booking_id INT AUTO_INCREMENT PRIMARY KEY,
                         booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         total_price DECIMAL(10,2) NOT NULL,
                         payment_status VARCHAR(50),
                         imageURL TEXT,
                         tour_id INT,
                         user_id INT,
                         FOREIGN KEY (tour_id) REFERENCES tour(tour_id) ON DELETE CASCADE,
                         FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- Bảng promotion (Khuyến mãi)
CREATE TABLE promotion (
                           promotion_id INT AUTO_INCREMENT PRIMARY KEY,
                           start_date DATE NOT NULL,
                           end_date DATE NOT NULL,
                           description TEXT,
                           discount DECIMAL(5,2) NOT NULL,
                           quantity INT NOT NULL,
                           booking_id INT,
                           FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
);

-- Bảng checkout (Thanh toán)
CREATE TABLE checkout (
                          payment_id INT AUTO_INCREMENT PRIMARY KEY,
                          user_id INT,
                          amount DECIMAL(10,2) NOT NULL,
                          payment_method VARCHAR(50) NOT NULL,
                          status VARCHAR(50),
                          payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          booking_id INT,
                          FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
                          FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
);

-- Bảng history (Lịch sử giao dịch)
CREATE TABLE history (
                         history_id INT AUTO_INCREMENT PRIMARY KEY,
                         status VARCHAR(50),
                         payment_id INT,
                         user_id INT,
                         booking_id INT,
                         FOREIGN KEY (payment_id) REFERENCES checkout(payment_id) ON DELETE CASCADE,
                         FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
                         FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
);

-- Bảng review (Đánh giá)
CREATE TABLE review (
                        review_id INT AUTO_INCREMENT PRIMARY KEY,
                        rating FLOAT NOT NULL CHECK (rating BETWEEN 1 AND 5),
                        tour_id INT,
                        user_id INT,
                        FOREIGN KEY (tour_id) REFERENCES tour(tour_id) ON DELETE CASCADE,
                        FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- Bảng blog (Bài viết)
CREATE TABLE blog (
                      blog_id INT AUTO_INCREMENT PRIMARY KEY,
                      title VARCHAR(255) NOT NULL,
                      description TEXT,
                      create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      imageURL TEXT,
                      user_id INT,
                      tour_id INT,
                      FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE SET NULL,
                      FOREIGN KEY (tour_id) REFERENCES tour(tour_id) ON DELETE SET NULL
);

-- Bảng comment (Bình luận)
CREATE TABLE comment (
                         comment_id INT AUTO_INCREMENT PRIMARY KEY,
                         user_id INT,
                         rating FLOAT CHECK (rating BETWEEN 1 AND 5),
                         comment TEXT,
                         tour_id INT,
                         FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
                         FOREIGN KEY (tour_id) REFERENCES tour(tour_id) ON DELETE CASCADE
);
