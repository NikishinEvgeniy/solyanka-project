INSERT INTO solyanka.recipes (title, description, image_url, author_id, created_at, updated_at)
VALUES ('Борщ',           'Классический борщ',        NULL, '11111111-1111-1111-1111-111111111111', NOW(), NOW());

INSERT INTO solyanka.products (title, image_url)
VALUES ('P1',   NULL),
       ('P2', NULL),
       ('P3',   NULL);

INSERT INTO solyanka.ingredients (recipe_id, product_id, amount, unit)
VALUES
    ((SELECT id FROM solyanka.recipes  WHERE title = 'Борщ'   LIMIT 1),
     (SELECT id FROM solyanka.products WHERE title = 'P1' LIMIT 1), 200.0, 'г'),
    ((SELECT id FROM solyanka.recipes  WHERE title = 'Борщ'   LIMIT 1),
     (SELECT id FROM solyanka.products WHERE title = 'P2' LIMIT 1), 300.0, 'г'),
    ((SELECT id FROM solyanka.recipes  WHERE title = 'Борщ'   LIMIT 1),
     (SELECT id FROM solyanka.products WHERE title = 'P3' LIMIT 1), 100.0, 'г');