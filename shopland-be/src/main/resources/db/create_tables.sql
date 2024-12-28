CREATE TABLE app_users
(
    id       SERIAL PRIMARY KEY,
    email    VARCHAR(256) NOT NULL UNIQUE,
    name     VARCHAR(256) NOT NULL,
    surname  VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    role     VARCHAR(20)  NOT NULL
);

CREATE TABLE products
(
    id                SERIAL PRIMARY KEY,
    name              VARCHAR(256) NOT NULL,
    short_description VARCHAR(512),
    long_description  VARCHAR(1024),
    price             INTEGER CHECK (price >= 0),
    available_amount  INTEGER CHECK (available_amount >= 0),
    image             BYTEA
);

CREATE TABLE carts
(
    user_id    INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity   INTEGER CHECK (quantity > 0),
    CONSTRAINT fk_user_carts FOREIGN KEY (user_id) REFERENCES app_users (id) ON DELETE CASCADE,
    CONSTRAINT fk_product_carts FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
    CONSTRAINT unique_user_product UNIQUE (user_id, product_id),
    PRIMARY KEY (user_id, product_id)
);

CREATE TABLE orders
(
    id            SERIAL PRIMARY KEY,
    user_id       INTEGER   NOT NULL,
    date          TIMESTAMP NOT NULL,
    summary_price INTEGER CHECK ( summary_price >= 0),
    CONSTRAINT fk_user_orders FOREIGN KEY (user_id) REFERENCES app_users (id) ON DELETE CASCADE
);

CREATE TABLE order_products
(
    order_id   INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
    CONSTRAINT fk_product_orders FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
    PRIMARY KEY (order_id, product_id)
);

CREATE TABLE opinions
(
    id         SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    user_id    INTEGER NOT NULL,
    value      INTEGER CHECK (value >= 1 AND value <= 5),
    content    VARCHAR(512),
    CONSTRAINT unique_product_user UNIQUE (product_id, user_id),
    CONSTRAINT fk_product_opinions FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
    CONSTRAINT fk_user_opinions FOREIGN KEY (user_id) REFERENCES app_users (id) ON DELETE CASCADE
);

CREATE INDEX idx_carts_user_id ON carts (user_id);
CREATE INDEX idx_order_products_order_id ON order_products (order_id);
CREATE INDEX idx_users_email ON app_users (email);
