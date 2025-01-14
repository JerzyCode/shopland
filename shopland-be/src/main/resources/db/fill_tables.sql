INSERT INTO products (name, short_description, long_description, price, available_amount, image)
VALUES ('ProductBox 1', 'Short description for ProductBox 1', 'Detailed description of ProductBox 1', 100, 10, NULL),
       ('ProductBox 2', 'Short description for ProductBox 2', 'Detailed description of ProductBox 2', 200, 5, NULL),
       ('ProductBox 3', 'Short description for ProductBox 3', 'Detailed description of ProductBox 3', 150, 20, NULL);

INSERT INTO opinions (product_id, user_id, value, content)
VALUES (1, 1, 4, 'Good product, meets expectations.'),
       (2, 1, 5, 'Excellent quality, highly recommend!'),
       (3, 1, 3, 'Decent product, but could be improved.');

INSERT INTO carts (user_id, product_id, quantity)
VALUES (1, 1, 2),
       (1, 2, 1),
       (1, 3, 3);

INSERT INTO orders (user_id, date, summary_price)
VALUES (1, '2025-01-08 10:00:00', 750);

INSERT INTO order_products (order_id, product_id)
VALUES (1, 1),
       (1, 2),
       (1, 3);
