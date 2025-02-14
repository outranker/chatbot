
CREATE TABLE `items` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`image_url` varchar(1000),
	`category` varchar(100),
	`condition` varchar(100),
	`min_acceptable_price` decimal(10,2) NOT NULL,
	`is_out_of_stock` boolean NOT NULL DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `items_id` PRIMARY KEY(`id`)
);
CREATE TABLE `messages` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`session_id` varchar(255) NOT NULL,
	`item_id` bigint unsigned NOT NULL,
	`role` varchar(50) NOT NULL,
	`content` text NOT NULL,
	`image_url` varchar(1000),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
CREATE TABLE `sessions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`session_id` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `sessions_session_id_unique` UNIQUE(`session_id`)
);
ALTER TABLE `messages` ADD CONSTRAINT `messages_item_id_items_id_fk` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE no action ON UPDATE no action;

INSERT INTO items (
  name, description, price, image_url, category, `condition`, min_acceptable_price
) VALUES (
  'Victorian Silver Hand Mirror',
  'An ornate Victorian-era silver hand mirror with intricate floral engravings. Manufactured in the late 19th century, this piece is in excellent condition and makes for a beautiful collectible or functional decor item.',
  249.99,
  'https://example.com/images/victorian-mirror.jpg',
  'Vintage Decor',
  'Excellent',
  200.00
);


INSERT INTO items (
  name, description, price, image_url, category, `condition`, min_acceptable_price, created_at, updated_at
) VALUES
('1920s Art Deco Table Clock', 'A stunning Art Deco mantel clock with brass details, still in working condition.', 189.99, 'https://example.com/images/art-deco-clock.jpg', 'Clocks', 'Good', 150.00, NOW(), NOW()),
('Antique Persian Rug', 'Handwoven Persian rug from the early 1900s with intricate floral patterns.', 799.00, 'https://example.com/images/persian-rug.jpg', 'Home Furnishings', 'Very Good', 700.00, NOW(), NOW()),
('WWII Military Compass', 'A rare military-issued compass from World War II, still functional.', 129.50, 'https://example.com/images/wwii-compass.jpg', 'Military Memorabilia', 'Fair', 100.00, NOW(), NOW()),
('Early 1900s Typewriter', 'Vintage Remington typewriter in full working condition.', 375.00, 'https://example.com/images/vintage-typewriter.jpg', 'Office Equipment', 'Excellent', 320.00, NOW(), NOW()),
('Edwardian Mahogany Writing Desk', 'A well-preserved Edwardian mahogany writing desk with brass handles.', 950.00, 'https://example.com/images/edwardian-desk.jpg', 'Furniture', 'Good', 850.00, NOW(), NOW()),
('Antique Brass Telescope', 'A 19th-century brass telescope with wooden tripod, perfect for collectors.', 425.00, 'https://example.com/images/brass-telescope.jpg', 'Scientific Instruments', 'Good', 375.00, NOW(), NOW()),
('Georgian Sterling Silver Tea Set', 'A complete Georgian-era sterling silver tea set, includes teapot, sugar bowl, and creamer.', 1250.00, 'https://example.com/images/silver-tea-set.jpg', 'Silverware', 'Excellent', 1100.00, NOW(), NOW()),
('19th Century Porcelain Doll', 'A delicate hand-painted porcelain doll with original Victorian dress.', 195.00, 'https://example.com/images/porcelain-doll.jpg', 'Collectibles', 'Good', 160.00, NOW(), NOW()),
('French Rococo Gilded Mirror', 'An exquisite 18th-century Rococo-style mirror with gold leaf detailing.', 850.00, 'https://example.com/images/rococo-mirror.jpg', 'Home Furnishings', 'Excellent', 750.00, NOW(), NOW()),
('Vintage Leather-Bound Shakespeare Collection', 'A complete collection of Shakespeare plays in a 19th-century leather binding.', 600.00, 'https://example.com/images/shakespeare-books.jpg', 'Books & Manuscripts', 'Good', 500.00, NOW(), NOW()),
('Antique Nautical Sextant', 'A brass sextant used by sailors in the 1800s for navigation.', 295.00, 'https://example.com/images/nautical-sextant.jpg', 'Maritime', 'Good', 250.00, NOW(), NOW()),
('Edwardian Crystal Chandelier', 'A luxurious Edwardian crystal chandelier with brass fittings.', 1450.00, 'https://example.com/images/crystal-chandelier.jpg', 'Lighting', 'Excellent', 1300.00, NOW(), NOW()),
('Victorian Rosewood Jewelry Box', 'A handcrafted Victorian rosewood jewelry box with velvet lining.', 325.00, 'https://example.com/images/jewelry-box.jpg', 'Decorative Items', 'Very Good', 275.00, NOW(), NOW()),
('Hand-Painted Japanese Kutani Vase', 'A late 19th-century Kutani porcelain vase with intricate hand-painted details.', 275.00, 'https://example.com/images/kutani-vase.jpg', 'Ceramics', 'Good', 225.00, NOW(), NOW()),
('Art Nouveau Bronze Sculpture', 'A signed bronze sculpture of a woman, made during the Art Nouveau period.', 1100.00, 'https://example.com/images/art-nouveau-sculpture.jpg', 'Sculptures', 'Excellent', 950.00, NOW(), NOW()),
('Antique Music Box', 'A Swiss music box from the 1800s, still plays a sweet melody.', 450.00, 'https://example.com/images/music-box.jpg', 'Musical Instruments', 'Fair', 400.00, NOW(), NOW()),
('Early American Quilted Blanket', 'A hand-stitched quilt from the 19th century, showcasing intricate patterns.', 350.00, 'https://example.com/images/american-quilt.jpg', 'Textiles', 'Good', 300.00, NOW(), NOW()),
('18th Century Chinese Porcelain Plate', 'A hand-painted Qing Dynasty porcelain plate with traditional motifs.', 650.00, 'https://example.com/images/chinese-porcelain.jpg', 'Ceramics', 'Excellent', 550.00, NOW(), NOW()),
('Vintage Copper Cooking Pot', 'A large French copper cooking pot from the 19th century.', 225.00, 'https://example.com/images/copper-pot.jpg', 'Kitchenware', 'Good', 190.00, NOW(), NOW()),
('Antique Brass Candle Holders', 'A pair of solid brass candle holders from the early 1800s.', 185.00, 'https://example.com/images/brass-candle-holders.jpg', 'Decorative Items', 'Very Good', 150.00, NOW(), NOW()),
('Victorian Cameo Brooch', 'A hand-carved Victorian cameo brooch with a gold frame.', 495.00, 'https://example.com/images/cameo-brooch.jpg', 'Jewelry', 'Excellent', 450.00, NOW(), NOW()),
('French Louis XV Armchair', 'An authentic Louis XV-style armchair with original upholstery.', 1750.00, 'https://example.com/images/louis-xv-armchair.jpg', 'Furniture', 'Very Good', 1600.00, NOW(), NOW()),
('Antique Pocket Watch', 'A 19th-century gold pocket watch, still in working condition.', 975.00, 'https://example.com/images/pocket-watch.jpg', 'Watches & Timepieces', 'Excellent', 900.00, NOW(), NOW());


update items set image_url = 'http://localhost:3212/static/victorian_silver_hand_mirror.jpg' where id = 1;
update items set image_url = 'http://localhost:3212/static/art_deco_table_clock.webp' where id = 2;
update items set image_url = 'http://localhost:3212/static/antique-persian-bakshaish_rug.jpg' where id = 3;
update items set image_url = 'http://localhost:3212/static/wwii-military-compass.webp' where id = 4;
update items set image_url = 'http://localhost:3212/static/antique_typewriter.jpg' where id = 5;
update items set image_url = 'http://localhost:3212/static/antique_edwardian_writing_desk.avif' where id = 6;
update items set image_url = 'http://localhost:3212/static/antique_brass_telescope.jpg' where id = 7;
update items set image_url = 'http://localhost:3212/static/georgian_sterling_silver_tea_set.jpg' where id = 8;
update items set image_url = 'http://localhost:3212/static/19th_centur_porcelain_doll.jpg' where id = 9;
update items set image_url = 'http://localhost:3212/static/french_rococo_gilded_mirror.jpg' where id = 10;
update items set image_url = 'http://localhost:3212/static/vintage_leather_bound_shakespeare_collection.jpg' where id = 11;
update items set image_url = 'http://localhost:3212/static/antique_nautical_sextant.jpg' where id = 12;
update items set image_url = 'http://localhost:3212/static/edwardian_crystal_chandelier.jpg' where id = 13;
update items set image_url = 'http://localhost:3212/static/victorian_rosewood_jewelry_box.jpeg' where id = 14;
update items set image_url = 'http://localhost:3212/static/hand_painted_japanese_kutanivase_vase.jpg' where id = 15;
update items set image_url = 'http://localhost:3212/static/art_nouveau_bronze_sculpture.jpg' where id = 16;
update items set image_url = 'http://localhost:3212/static/antique_music_box.jpeg' where id = 17;
update items set image_url = 'http://localhost:3212/static/early_american_quilted_blanket.jpeg' where id = 18;
update items set image_url = 'http://localhost:3212/static/18th_century_chinese_porcelain_plate.jpg' where id = 19;
update items set image_url = 'http://localhost:3212/static/vintage_copper_cooking_pot.jpeg' where id = 20;
update items set image_url = 'http://localhost:3212/static/antique_brass_candle_holders.jpg' where id = 21;
update items set image_url = 'http://localhost:3212/static/victorian_cameo_brooch.webp' where id = 22;
update items set image_url = 'http://localhost:3212/static/french_louis_xv_armchair.jpg' where id = 23;
update items set image_url = 'http://localhost:3212/static/antique_pocket_watch.jpg' where id = 24;