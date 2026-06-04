-- Seed categories
INSERT INTO categories (id, name, slug) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Homme', 'homme'),
  ('22222222-2222-2222-2222-222222222222', 'Femme', 'femme'),
  ('33333333-3333-3333-3333-333333333333', 'Unisexe', 'unisexe')
ON CONFLICT (slug) DO NOTHING;

-- Seed products (using deterministic UUIDs)
INSERT INTO products (id, name, brand_inspiration, description, price, sizes, stock, top_notes, heart_notes, base_notes, longevity_hours, scent_family, images, featured, category_id) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Fruits Rouges', 'Tom Ford', 'Un santal crémeux et fumé qui évoque le luxe intemporel. Cette création s''ouvre sur des notes épicées de cardamome et de gingembre, avant de révéler un cœur de santal précieux enveloppé d''iris et de cèdre. Le fond chaud d''ambre, de vanille et de musc laisse une empreinte sensuelle et durable.', 89, '[{"size":"10ml","price":45},{"size":"50ml","price":89},{"size":"100ml","price":149}]', 50, ARRAY['Cardamome', 'Gingembre', 'Bergamote'], ARRAY['Santal', 'Iris', 'Cèdre'], ARRAY['Ambre', 'Vanille', 'Musc'], 10, 'Woody', ARRAY['/images/perfumes/perfume-1.png'], true, '33333333-3333-3333-3333-333333333333'),
  ('a2222222-2222-2222-2222-222222222222', 'Agrumes Luxe', 'Chanel', 'Une rose damascène veloutée, moderne et intemporelle. S''ouvre sur des notes fruitées avant de révéler un cœur de rose turque et de patchouli.', 79, '[{"size":"10ml","price":40},{"size":"50ml","price":79},{"size":"100ml","price":135}]', 35, ARRAY['Rose', 'Pivoine', 'Fruit de la passion'], ARRAY['Rose Turque', 'Patchouli', 'Litchi'], ARRAY['Musc blanc', 'Cèdre', 'Ambre'], 8, 'Floral', ARRAY['/images/perfumes/perfume-2.png'], true, '22222222-2222-2222-2222-222222222222'),
  ('a3333333-3333-3333-3333-333333333333', 'Coco Vanille', 'YSL', 'L''oud dans toute sa splendeur : profond, boisé, légèrement fumé. Un parfum de caractère pour ceux qui osent se démarquer.', 99, '[{"size":"10ml","price":50},{"size":"50ml","price":99},{"size":"100ml","price":169}]', 25, ARRAY['Oud', 'Safran', 'Poivre rose'], ARRAY['Oud Laotien', 'Roses', 'Encens'], ARRAY['Cuir', 'Ambre gris', 'Musc'], 12, 'Oriental', ARRAY['/images/perfumes/perfume-3.png'], true, '33333333-3333-3333-3333-333333333333'),
  ('a4444444-4444-4444-4444-444444444444', 'Sucré', 'Louis Vuitton', 'Un éclat citrus frais et sophistiqué, comme une matinée méditerranéenne. Léger mais mémorable.', 69, '[{"size":"10ml","price":35},{"size":"50ml","price":69},{"size":"100ml","price":119}]', 60, ARRAY['Bergamote', 'Citron', 'Mandarine'], ARRAY['Néroli', 'Fleur d''oranger', 'Gingembre'], ARRAY['Bois de cèdre', 'Musc', 'Ambre'], 6, 'Fresh', ARRAY['/images/perfumes/perfume-4.png'], false, '11111111-1111-1111-1111-111111111111'),
  ('a5555555-5555-5555-5555-555555555555', 'Vanille Royale', 'Kayali', 'Une vanille gourmande et enveloppante, parfaite pour les soirées. Chaude, sensuelle, irrésistible.', 75, '[{"size":"10ml","price":38},{"size":"50ml","price":75},{"size":"100ml","price":129}]', 40, ARRAY['Vanille', 'Fleur d''oranger', 'Musc'], ARRAY['Vanille de Madagascar', 'Patchouli', 'Jasmin'], ARRAY['Benzoin', 'Tonka', 'Santal'], 9, 'Gourmand', ARRAY['/images/perfumes/perfume-5.png'], true, '22222222-2222-2222-2222-222222222222'),
  ('a6666666-6666-6666-6666-666666666666', 'Ambre Doré', 'Prada', 'Un iris poudré et métallique, d''une élégance discrète. Pour ceux qui apprécient la sophistication minimaliste.', 85, '[{"size":"10ml","price":42},{"size":"50ml","price":85},{"size":"100ml","price":145}]', 30, ARRAY['Iris', 'Néroli', 'Mandarine'], ARRAY['Iris Pallida', 'Cèdre', 'Vétiver'], ARRAY['Benzoin', 'Ambre', 'Musc'], 8, 'Floral', ARRAY['/images/perfumes/perfume-6.png'], false, '22222222-2222-2222-2222-222222222222'),
  ('a7777777-7777-7777-7777-777777777777', 'Oud Impérial', 'Tom Ford', 'Un boisé profond et envoûtant, entre mystère et sophistication. Pour les amateurs de parfums statement.', 95, '[{"size":"10ml","price":48},{"size":"50ml","price":95},{"size":"100ml","price":159}]', 20, ARRAY['Bois de oud', 'Poivre noir', 'Encens'], ARRAY['Cèdre', 'Patchouli', 'Vétiver'], ARRAY['Bois de santal', 'Ambre', 'Musc'], 11, 'Woody', ARRAY['/images/perfumes/perfume-7.png'], true, '11111111-1111-1111-1111-111111111111'),
  ('a8888888-8888-8888-8888-888888888888', 'Rose Élixir', 'Chanel', 'Un bouquet floral frais et lumineux, comme une promenade au printemps. Élégant et féminin.', 72, '[{"size":"10ml","price":36},{"size":"50ml","price":72},{"size":"100ml","price":125}]', 45, ARRAY['Fleur d''oranger', 'Bergamote', 'Pêche'], ARRAY['Jasmin', 'Tubéreuse', 'Rose'], ARRAY['Santal', 'Musc', 'Cèdre'], 7, 'Floral', ARRAY['/images/perfumes/perfume-8.png'], false, '22222222-2222-2222-2222-222222222222')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sizes = EXCLUDED.sizes,
  stock = EXCLUDED.stock,
  images = EXCLUDED.images,
  featured = EXCLUDED.featured;

-- Seed reviews
INSERT INTO reviews (id, product_id, name, city, rating, comment) VALUES
  (uuid_generate_v4(), 'a1111111-1111-1111-1111-111111111111', 'Amina B.', 'Casablanca', 5, 'Je suis bluffée par la similarité avec l''original. Fruits Rouges est exactement comme celui de Tom Ford à 5x le prix. Livraison rapide et emballage luxueux.'),
  (uuid_generate_v4(), NULL, 'Karim E.', 'Rabat', 5, 'J''ai acheté le coffret 3 pour 200 MAD pour tester. Résultat : j''ai commandé 3 autres flacons de 50ml la semaine suivante. Qualité exceptionnelle.'),
  (uuid_generate_v4(), 'a2222222-2222-2222-2222-222222222222', 'Laila M.', 'Marrakech', 5, 'La tenue est impressionnante — 10 heures facilement sur mes vêtements. Agrumes Luxe est devenu mon signature scent. Merci EMAT SCENTS !'),
  (uuid_generate_v4(), NULL, 'Youssef T.', 'Tanger', 5, 'Service client au top. J''avais une question sur les notes olfactives, ils m''ont répondu en 10 minutes et m''ont conseillé parfaitement.'),
  (uuid_generate_v4(), NULL, 'Samira K.', 'Agadir', 5, 'J''offre régulièrement EMAT SCENTS à mes amies. C''est le cadeau parfait : luxueux, abordable, et tout le monde adore. L''emballage est sublime.'),
  (uuid_generate_v4(), 'a3333333-3333-3333-3333-333333333333', 'Omar H.', 'Fès', 4, 'Très bon rapport qualité-prix. Coco Vanille est puissant et sophistiqué. J''apprécie particulièrement la transparence sur les notes olfactives.');
