-- Create Customers Table
CREATE OR REPLACE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20)
);

-- Create Products Table
CREATE OR REPLACE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity_available INT
);

-- Create Orders Table
CREATE OR REPLACE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    customer_id INT,
    CONSTRAINT fk_customers FOREIGN KEY (customer_id) 
        REFERENCES customers(customer_id)
);

-- Create Order_Products Table (Junction Table)
CREATE OR REPLACE TABLE order_products (
    order_id INT,
    product_id INT,
    quantity_ordered INT NOT NULL,
    PRIMARY KEY (order_id, product_id),
    CONSTRAINT fk_order FOREIGN KEY (order_id) 
        REFERENCES orders(order_id),
    CONSTRAINT fk_products FOREIGN KEY (product_id) 
        REFERENCES products(product_id)
);


-- Insert a new customer
INSERT INTO customers (name, email, phone)
VALUES ('Michael Amare', 'michael.amare@gmail.com', '123-456-7890');

INSERT INTO customers (name, email, phone)
VALUES ('Amiin Samatar ', 'amiin.samatar@outlook.com', '098-765-4321');

INSERT INTO customers (name, email, phone)
VALUES ('Anthony Edwards', 'ant.man@timberwolves.com', NULL);


-- Insert a new product
INSERT INTO products (name, price, quantity_available)
VALUES  ('Electric Scooter Model A', 599.99, 100);

INSERT INTO products (name, price, quantity_available)
VALUES ('Electric Scooter Model B', 799.99, 50);

INSERT INTO products (name, price, quantity_available)
VALUES ('Electric Scooter Model C', 699.99, 80);

-- Insert a new order for a customer
INSERT INTO orders (order_date, total_amount, customer_id)
VALUES ('2023-10-01', 1199.98, 1);

INSERT INTO orders (order_date, total_amount, customer_id)
VALUES ('2023-10-02', 1599.97, 2);

INSERT INTO orders (order_date, total_amount, customer_id)
VALUES ('2023-10-03', 1399.96, 1);


-- Insert products into an order
INSERT INTO order_products (order_id, product_id, quantity_ordered)
VALUES (1, 1, 2);  

INSERT INTO order_products (order_id, product_id, quantity_ordered)
VALUES (1, 2, 1); 

INSERT INTO order_products (order_id, product_id, quantity_ordered)
VALUES (2, 2, 3);

INSERT INTO order_products (order_id, product_id, quantity_ordered)
VALUES (3, 1, 1);

INSERT INTO order_products (order_id, product_id, quantity_ordered)
VALUES (3, 3, 2);

