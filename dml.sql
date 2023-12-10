-- Update a customer's phone number
UPDATE customers
SET phone = '987-654-3210'
WHERE customer_id = 3;
-- Update the price of a product
UPDATE products
SET price = 849.99
WHERE product_id = 2;
-- Insert a new customer
INSERT INTO customers (name, email, phone)
VALUES (
        'Karl Anthony Towns',
        'kat@timberwolves.com',
        '952-123-4567'
    );
-- Insert a new product
INSERT INTO products (name, price, quantity_available)
VALUES ('Electric Scooter Model D', 899.99, 25);
-- Create a new order for a customer
INSERT INTO orders (order_date, total_amount, customer_id)
VALUES ('2023-10-04', 699.95, 3);
-- Insert products into an order
-- Adding two Electric Scooter Model C to order 4
INSERT INTO order_products (order_id, product_id, quantity_ordered)
VALUES (4, 3, 2);
-- Adding an Electric Scooter Model D to order  4
INSERT INTO order_products (order_id, product_id, quantity_ordered)
VALUES (4, 4, 1);
-- Delete a customer (and their associated orders and products)
-- First delete associated entries in the order_products table
DELETE FROM order_products
WHERE order_id IN (
        SELECT order_id
        FROM orders
        WHERE customer_id = 3
    );
-- Then delete the associated orders for the customer
DELETE FROM orders
WHERE customer_id = 3;
-- Finally delete the customer
DELETE FROM customers
WHERE customer_id = 3;