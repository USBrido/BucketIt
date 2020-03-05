-- set categories for the items to be sorted by
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  category VARCHAR(255) NOT NULL
);
