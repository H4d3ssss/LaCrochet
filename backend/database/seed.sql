-- =====================================================================
-- La Crochet — starting data. Run AFTER schema.sql.
-- Products come from your old phpMyAdmin dump and the checkout preview.
-- Edit freely in the Supabase Table Editor afterwards.
-- =====================================================================

insert into categories (name, slug, description, sort_order) values
  ('Yarn & Fibers',     'yarn-and-fibers',     'Cotton, acrylic and wool yarns',          1),
  ('Hooks & Notions',   'hooks-and-notions',   'Hooks, needles, markers and tools',       2),
  ('Crochet Kits',      'crochet-kits',        'Everything you need for one project',     3),
  ('Patterns & Guides', 'patterns-and-guides', 'Step-by-step patterns',                   4),
  ('Finished Goods',    'finished-goods',      'Handmade crochet pieces, ready to use',   5);

insert into products (category_id, name, slug, description, price, image_url, stock_qty, is_featured)
select c.category_id, p.name, p.slug, p.description, p.price, p.image_url, p.stock_qty, p.is_featured
from (values
  (1, 'finished-goods',  'Crochet Daisy Tote Bag',     'crochet-daisy-tote-bag',     'Handmade cotton tote bag with a daisy pattern.',          450.00, '/images/products/daisy-tote.jpg',          12, true),
  (2, 'finished-goods',  'Crochet Tulip Bouquet',      'crochet-tulip-bouquet',      'A handmade bouquet of three crochet tulips.',             350.00, '/images/products/tulip-bouquet.jpg',       20, true),
  (3, 'finished-goods',  'Crochet Sunflower Keychain', 'crochet-sunflower-keychain', 'Handmade sunflower keychain for bags and keys.',            95.00, '/images/products/sunflower-keychain.jpg',  25, false),
  (4, 'finished-goods',  'Crochet Bucket Hat',         'crochet-bucket-hat',         'Soft cotton crochet bucket hat for everyday wear.',       380.00, '/images/products/bucket-hat.jpg',          10, true),
  (5, 'finished-goods',  'Crochet Coaster Set',        'crochet-coaster-set',        'A set of four handmade cotton flower coasters.',          220.00, '/images/products/coaster-set.jpg',         18, false),
  (6, 'finished-goods',  'Crochet Phone Pouch',        'crochet-phone-pouch',        'Lightweight crochet phone pouch with a shoulder strap.',  280.00, '/images/products/phone-pouch.jpg',         15, false),
  (7, 'yarn-and-fibers', 'Dishie Yarn',                'dishie-yarn',                '100% cotton yarn, 100g per skein.',                       250.00, '/images/products/dishie-yarn.jpg',         30, true),
  (8, 'yarn-and-fibers', 'Brava Worsted Yarn',         'brava-worsted-yarn',         '100% premium acrylic yarn, 100g per skein.',              180.00, '/images/products/brava-worsted-yarn.jpg',  30, false)
) as p(position, category_slug, name, slug, description, price, image_url, stock_qty, is_featured)
join categories c on c.slug = p.category_slug
order by p.position;  -- keeps product numbers 1-8 in the order listed
