-- =========================
-- CLEAN DATA
-- =========================
DELETE FROM product_size;
DELETE FROM product;
DELETE FROM menu;
DELETE FROM category;

-- =========================
-- INSERT CATEGORY
-- =========================
INSERT INTO category (id, name, description, created_at)
VALUES
    (NEWID(), N'Đồ uống', N'Tất cả đồ uống', GETDATE()),
    (NEWID(), N'Đồ ăn', N'Tất cả đồ ăn', GETDATE());

-- =========================
-- INSERT MENU
-- =========================
INSERT INTO menu (id, name, description, category_id, created_at)
VALUES
    (NEWID(), N'Trà', N'Các loại trà', (SELECT TOP 1 id FROM category WHERE name = N'Đồ uống'), GETDATE()),
    (NEWID(), N'Cà phê', N'Các loại cà phê', (SELECT TOP 1 id FROM category WHERE name = N'Đồ uống'), GETDATE()),
    (NEWID(), N'LATTE & FRAPPE', N'Cà phê sữa Ý và đá xay', (SELECT TOP 1 id FROM category WHERE name = N'Đồ uống'), GETDATE()),
    (NEWID(), N'PASTRY & MORE', N'Các loại bánh ngọt và bánh mặn', (SELECT TOP 1 id FROM category WHERE name = N'Đồ ăn'), GETDATE());

-- =========================
-- INSERT PRODUCT
-- =========================
-- Trà
INSERT INTO product (id, name, description, image_url, component, discount_amount, is_best_seller, menu_id, created_at)
VALUES
(NEWID(), N'Trà Đào Cam Sả - Đá', N'Vị thanh ngọt của đào, vị chua dịu của Cam Vàng nguyên vỏ, vị chát của trà đen tươi được ủ mới mỗi 4 tiếng, cùng hương thơm nồng đặc trưng của sả chính là điểm sáng làm nên sức hấp dẫn của thức uống này.', 'https://cdn.hstatic.net/products/1000075078/1751597661_tra-dao-cam-sa_1bdb3bb3399f4d7180184023d50a24a3_master.png', N'Trà đào', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'Trà'), GETDATE()),
(NEWID(), N'Trà Đào Cam Sả - Nóng', N'Vị thanh ngọt của đào, vị chua dịu của Cam Vàng nguyên vỏ, vị chát của trà đen tươi được ủ mới mỗi 4 tiếng, cùng hương thơm nồng đặc trưng của sả chính là điểm sáng làm nên sức hấp dẫn của thức uống này', 'https://cdn.hstatic.net/products/1000075078/1751598310_tra-dao-cam-sa-nong_aa25518876ac422d9ad5d1b55ee8df35_master.png', N'Trà đào', 0, 0, (SELECT TOP 1 id FROM menu WHERE name=N'Trà'), GETDATE()),
(NEWID(), N'Trà oolong tứ quý sen nóng (HiTea)', N'Sự kết hợp tinh tế giữa trà Oolong vùng cao và hương sen tự nhiên', 'https://product.hstatic.net/1000075078/product/1737356382_oolong-tu-quy-sen-nong-copy_79b957510bcb4e6f8bb7d938f0448ab9_master.png', N'Trà oolong tứ quý sen nóng (HiTea)', 0, 0, (SELECT TOP 1 id FROM menu WHERE name=N'Trà'), GETDATE());



-- Cà phê
INSERT INTO product (id, name, description, image_url, component, discount_amount, is_best_seller, menu_id, created_at)
VALUES
(NEWID(), N'A-Mê Đào', N'Mê ly với Americano từ 100% Arabica kết hợp cùng Đào ngọt thanh, dậy vị tươi mát.', 'https://cdn.hstatic.net/products/1000075078/americano_dao_3ad44119ea024ca78d1d1f7710bef2e0_master.png', N'A-Mê Đào', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'Cà phê'), GETDATE()),
(NEWID(), N'A-Mê Tuyết Quất', N'Đá tuyết Quất thơm mát, kết hợp cùng Americano đắng nhẹ. Uống là mê! *Khuấy đều để thưởng thức trọn vị', 'https://cdn.hstatic.net/products/1000075078/1751602577_a-me-tuyet-quat_53b824b96c2543a09d1fdf5ed0d9bea7_master.png', N'A-Mê Tuyết Quất', 0, 0, (SELECT TOP 1 id FROM menu WHERE name=N'Cà phê'), GETDATE()),
(NEWID(), N'A-Mê Classic', N'Thức uống Americano nguyên bản từ 100% Arabica, tươi tỉnh tức thì. Uống là mê!', 'https://cdn.hstatic.net/products/1000075078/a-me_classic_dfbdc3b2b0124ca7bb3b177fb12871c1_master.png', N'A-Mê Classic', 0, 0, (SELECT TOP 1 id FROM menu WHERE name=N'Cà phê'), GETDATE()),
(NEWID(), N'A-Mê Mơ', N'Mê say với Americano từ 100% Arabica kết hợp cùng Mơ chua ngọt, tươi mới mỗi ngày. *Khuấy đều để thưởng thức trọn vị', 'https://cdn.hstatic.net/products/1000075078/americano_mo_5c282c669192440abd9853c4d261fe2f_master.png', N'A-Mê Mơ', 0, 0, (SELECT TOP 1 id FROM menu WHERE name=N'Cà phê'), GETDATE()),
(NEWID(), N'A-Mê Yuzu', N'Mê tít với Americano từ 100% Arabica kết hợp cùng Thanh Yên chua dịu, sảng khoái tức thì. *Khuấy đều để thưởng thức trọn vị', 'https://cdn.hstatic.net/products/1000075078/americano_thanh_yen_35e4c9612d944fab83c2a386f8d72cab_master.png', N'A-Mê Yuzu', 0, 0, (SELECT TOP 1 id FROM menu WHERE name=N'Cà phê'), GETDATE()),
(NEWID(), N'A-Mê Vải', N'Mê ly với Americano từ 100% Arabica kết hợp cùng Vải ngọt thanh, dậy vị tươi mát.', 'https://cdn.hstatic.net/products/1000075078/1762841499_americano-vai_55fde655943249dbaa878b4677571875_master.png', N'A-Mê Vải', 0, 0, (SELECT TOP 1 id FROM menu WHERE name=N'Cà phê'), GETDATE());




-- LATTE & FRAPPE
INSERT INTO product (id, name, description, image_url, component, discount_amount, is_best_seller, menu_id, created_at)
VALUES
(NEWID(), N'Matcha Latte Tây Bắc', N'Một ly matcha khổng lồ 1 lít, mang trọn vị xanh ngát của núi rừng Tây Bắc. Vị đậm đà, thanh mát từ bột matcha bản địa, khi kết hợp cùng sữa béo ngậy tạo nên hương vị vừa quen vừa lạ: vừa mộc mạc, vừa tinh tế.', 'https://cdn.hstatic.net/products/1000075078/1755682813_matcha1l_174d959349dd4794914977fa1464d080_master.png', N'Matcha Latte Tây Bắc', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'LATTE & FRAPPE'), GETDATE()),
(NEWID(), N'Latte Caramel Cold Foam', N'Latte Caramel Cold Foam là sự kết hợp giữa espresso đậm đà, lớp bọt sữa mịn màng và caramel ngọt dịu phủ trên mặt, mang đến hương vị cân bằng giữa đắng nhẹ của cà phê và vị ngọt béo đặc trưng. Lớp cold foam tan chậm, mát lạnh trong từng ngụm, để lại hậu vị thơm caramel kéo dài.', 'https://cdn.hstatic.net/products/1000075078/1760522769_latte-caremel-cold-foam_411e1dae8157454c8295cc21a8e779e3_master.png', N'Latte Caramel Cold Foam', 0, 0, (SELECT TOP 1 id FROM menu WHERE name=N'LATTE & FRAPPE'), GETDATE()),
(NEWID(), N'Matcha Latte Tây Bắc Sữa Yến Mạch', N'Một ly matcha khổng lồ 1 lít, mang trọn vị xanh ngát của núi rừng Tây Bắc. Vị đậm đà, thanh mát từ bột matcha bản địa, khi kết hợp cùng sữa béo ngậy tạo nên hương vị vừa quen vừa lạ: vừa mộc mạc, vừa tinh tế.', 'https://cdn.hstatic.net/products/1000075078/1755682874_matcha1l_3da96ba855be45f28bf80185d9adfbe8_master.png', N'Matcha Latte Tây Bắc Sữa Yến Mạch', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'LATTE & FRAPPE'), GETDATE()),
(NEWID(), N'Cheesecake Frappe', N'*Tặng kèm cốc Hologram khi mua sản phẩm (số lượng cốc giới hạn). Hương vị béo mịn, ngọt ngậy thêm cà phê thơm và đắng nhẹ, creamy mát lạnh', 'https://cdn.hstatic.net/products/1000075078/1765772046_cheese-cake-frappe_1252a76716d74cdbbb7230316846119a_master.png', N'Cheesecake Frappe', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'LATTE & FRAPPE'), GETDATE()),
(NEWID(), N'Cheesecake Hot Latte', N'Hương vị ngọt ấm, cheesecake béo ngậy.', 'https://cdn.hstatic.net/products/1000075078/1765880754_cheese-cake-hot-latte_8c626a2ffb06445593869f65891c2cfc_master.png', N'Cheesecake Hot Latte', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'LATTE & FRAPPE'), GETDATE()),
(NEWID(), N'Frappe Almond', N'Frappe Almond là sự kết hợp giữa cà phê đậm đà và hạnh nhân xay, tạo ra một món thức uống vừa có vị cà phê mạnh mẽ, vừa thơm bùi với hương vị ngọt nhẹ của hạnh nhân. Được xay với đá, món này mang lại cảm giác mát lạnh, dễ uống, phù hợp cho những ai yêu thích sự sang trọng và tinh tế trong hương vị.', 'https://cdn.hstatic.net/products/1000075078/1746443342_almond-frappe_1fb4c2599c284b7ab9bca67c581005d8_master.png', N'Frappe Almond', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'LATTE & FRAPPE'), GETDATE()),
(NEWID(), N'Frappe Choco Chip', N'Frappe Choco Chip, thử là đã! Lớp whipping cream bồng bềnh, beo béo lại có thêm bột sô cô la và sô cô la chip trên cùng. Gấp đôi vị ngon với sô cô la thật xay với đá sánh mịn, đậm đà đến tận ngụm cuối cùng.', 'https://cdn.hstatic.net/products/1000075078/1746460836_choco-chip-frappe_b7287bbb458c439eba0bc69597368173_master.png', N'Frappe Choco Chip', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'LATTE & FRAPPE'), GETDATE()),
(NEWID(), N'Frappe Matcha Tây Bắc', N'Frappe Matcha kết hợp trà xanh matcha xay mịn với sữa và đá xay, mang lại một thức uống mát lạnh với hương vị thanh nhẹ đặc trưng của trà xanh. Sự kết hợp này mang đến cảm giác thư giãn, dễ chịu nhưng vẫn có chút đắng nhẹ của matcha, hoàn hảo cho những ai muốn thưởng thức một món đồ uống không quá ngọt', 'https://cdn.hstatic.net/products/1000075078/1746441845_matcha-frappe_178c807d212f4a11ac21266f97468bfb_master.png', N'Frappe Matcha Tây Bắc', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'LATTE & FRAPPE'), GETDATE()),
(NEWID(), N'Latte Bạc Xỉu', N'Hương vị ngọt ấm, cheesecake béo ngậy.', 'https://cdn.hstatic.net/products/1000075078/1767588144_latte-bac-xiu_01079019ce3d4c9fa385cb30ed33cd46_master.png', N'Latte Bạc Xỉu', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'LATTE & FRAPPE'), GETDATE());




-- PASTRY & MORE
INSERT INTO product (id, name, description, image_url, component, discount_amount, is_best_seller, menu_id, created_at)
VALUES
(NEWID(), N'Butter Croissant Sữa Đặc', N'Bánh Butter Croissant bạn đã yêu, nay yêu không lối thoát khi được chấm cùng sữa đặc. Thơm bơ mịn sữa, ngọt ngào lòng nhau!', 'https://cdn.hstatic.net/products/1000075078/1737355374_croissant-sua-dac_a0b1d694b76d48709adbb5bec61307c3_master.png', N'Butter Croissant Sữa Đặc', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'PASTRY & MORE'), GETDATE()),
(NEWID(), N'Bánh Mì Que Bò Nấm Xốt Bơ', N'Bò mềm thấm vị, nấm đông cô dai giòn. Rộp rộp vỏ bánh giòn rụm nóng hổi, thêm ngấu nghiến với xốt bơ béo bùi ngon số dzách.', 'https://cdn.hstatic.net/products/1000075078/1737355257_bmq-bo-nam_005c18f44b3c4dcb9e1586cb46f3786e_master.png', N'Bánh Mì Que Bò Nấm Xốt Bơ', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'PASTRY & MORE'), GETDATE()),
(NEWID(), N'Bánh Mì Que Chà Bông Phô Mai Bơ Cay', N'Aiiiii Bánh Mì Chà Bông Phô Mai hônggg? Chà bông tơi mịn đẫm phô mai Mozzarella kéo sợi, cay hít hà. Rộp rộp vỏ bánh giòn rụm nóng hổi, thêm ngấu nghiến với xốt bơ đậm đà.', 'https://cdn.hstatic.net/products/1000075078/1737355270_bmq-cha-bong-pm_78dbe3ccd8294315ae49c56581c6448f_master.png', N'Bánh Mì Que Chà Bông Phô Mai Bơ Cay', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'PASTRY & MORE'), GETDATE()),
(NEWID(), N'Burnt Cheesecake', N'Phô mai béo mịn, thơm lừng với lớp vỏ cháy xém đặc trưng, tan chảy ngay đầu lưỡi.', 'https://cdn.hstatic.net/products/1000075078/1743674500_burnt-cheesecake_c67d9e4bbf6f497485c9408d21891d19_master.png', N'Burnt Cheesecake', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'PASTRY & MORE'), GETDATE()),
(NEWID(), N'Croissant trứng muối', N'Croissant trứng muối thơm lừng, bên ngoài vỏ bánh giòn hấp dẫn bên trong trứng muối vị ngon khó cưỡng.', 'https://cdn.hstatic.net/products/1000075078/1737355222_croissant-trung-muoi_4958331178d84424839e0c153259ef8d_master.png', N'Croissant trứng muối', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'PASTRY & MORE'), GETDATE()),
(NEWID(), N'Matcha Tây Bắc Mochi', N'Matcha Tây Bắc đậm đà kết hợp cùng sữa tươi béo mịn và mochi dẻo thơm, mang đến trải nghiệm thú vị giữa vị thanh mát của trà xanh và vị ngọt dẻo đặc trưng. Từng ngụm là sự hòa quyện hài hòa giữa hương vị tự nhiên của matcha và mochi mềm dẻo, tạo nên thức uống vừa lạ vừa quen.', 'https://cdn.hstatic.net/products/1000075078/1760523505_matcha-tay-bac-mochi_14a0c9334882436098c76bc61aadeb78_master.png', N'Matcha Tây Bắc Mochi', 0, 1, (SELECT TOP 1 id FROM menu WHERE name=N'PASTRY & MORE'), GETDATE()),
(NEWID(), N'Mochi Kem Trà Sữa Trân Châu', N'Ngoài dẻo thơm, trong mát lạnh với kem vị trà sữa. Một cắn là say đắm, hai cắn là ngất ngây với trân châu giòn dai. *Bánh cần được bảo quản mát và dùng ngon nhất trong vòng 2 giờ sau khi nhận hàng.', 'https://cdn.hstatic.net/products/1000075078/1737355411_mochi-tra-sua_bd68fdd9fe844f24b6d0fb772486263e_master.png', N'Mochi Kem Trà Sữa Trân Châu', 0, 0, (SELECT TOP 1 id FROM menu WHERE name=N'PASTRY & MORE'), GETDATE());

-- =========================
-- INSERT PRODUCT SIZE
-- =========================

-- Trà
INSERT INTO product_size (id, size, price, note, product_id, created_at) VALUES
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'Trà Đào Cam Sả - Đá'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'Trà Đào Cam Sả - Đá'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'Trà Đào Cam Sả - Đá'), GETDATE()),
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'Trà Đào Cam Sả - Nóng'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'Trà Đào Cam Sả - Nóng'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'Trà Đào Cam Sả - Nóng'), GETDATE()),
(NEWID(), 'S', 30000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'Trà oolong tứ quý sen nóng (HiTea)'), GETDATE()),
(NEWID(), 'M', 40000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'Trà oolong tứ quý sen nóng (HiTea)'), GETDATE()),
(NEWID(), 'L', 50000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'Trà oolong tứ quý sen nóng (HiTea)'), GETDATE());

-- Cà phê
INSERT INTO product_size (id, size, price, note, product_id, created_at) VALUES
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Đào'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Đào'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Đào'), GETDATE()),
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Tuyết Quất'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Tuyết Quất'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Tuyết Quất'), GETDATE()),
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Classic'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Classic'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Classic'), GETDATE()),
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Mơ'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Mơ'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Mơ'), GETDATE()),
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Yuzu'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Yuzu'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Yuzu'), GETDATE()),
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Vải'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Vải'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'A-Mê Vải'), GETDATE());

-- LATTE & FRAPPE
INSERT INTO product_size (id, size, price, note, product_id, created_at) VALUES
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'Matcha Latte Tây Bắc'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'Matcha Latte Tây Bắc'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'Matcha Latte Tây Bắc'), GETDATE()),
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'Latte Caramel Cold Foam'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'Latte Caramel Cold Foam'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'Latte Caramel Cold Foam'), GETDATE()),
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'Matcha Latte Tây Bắc Sữa Yến Mạch'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'Matcha Latte Tây Bắc Sữa Yến Mạch'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'Matcha Latte Tây Bắc Sữa Yến Mạch'), GETDATE()),
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'Cheesecake Frappe'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'Cheesecake Frappe'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'Cheesecake Frappe'), GETDATE()),
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'Cheesecake Hot Latte'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'Cheesecake Hot Latte'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'Cheesecake Hot Latte'), GETDATE()),
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'Frappe Almond'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'Frappe Almond'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'Frappe Almond'), GETDATE()),
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'Frappe Choco Chip'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'Frappe Choco Chip'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'Frappe Choco Chip'), GETDATE()),
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'Frappe Matcha Tây Bắc'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'Frappe Matcha Tây Bắc'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'Frappe Matcha Tây Bắc'), GETDATE()),
(NEWID(), 'S', 35000, N'Nhỏ', (SELECT TOP 1 id FROM product WHERE name=N'Latte Bạc Xỉu'), GETDATE()),
(NEWID(), 'M', 45000, N'Vừa', (SELECT TOP 1 id FROM product WHERE name=N'Latte Bạc Xỉu'), GETDATE()),
(NEWID(), 'L', 55000, N'Lớn', (SELECT TOP 1 id FROM product WHERE name=N'Latte Bạc Xỉu'), GETDATE());

-- PASTRY & MORE
INSERT INTO product_size (id, size, price, note, product_id, created_at) VALUES
(NEWID(), 'One size', 40000, N'Chỉ một loại', (SELECT TOP 1 id FROM product WHERE name=N'Butter Croissant Sữa Đặc'), GETDATE()),
(NEWID(), 'One size', 19000, N'Chỉ một loại', (SELECT TOP 1 id FROM product WHERE name=N'Mochi Kem Trà Sữa Trân Châu'), GETDATE()),
(NEWID(), 'One size', 19000, N'Chỉ một loại', (SELECT TOP 1 id FROM product WHERE name=N'Bánh Mì Que Bò Nấm Xốt Bơ'), GETDATE()),
(NEWID(), 'One size', 19000, N'Chỉ một loại', (SELECT TOP 1 id FROM product WHERE name=N'Bánh Mì Que Chà Bông Phô Mai Bơ Cay'), GETDATE()),
(NEWID(), 'One size', 19000, N'Chỉ một loại', (SELECT TOP 1 id FROM product WHERE name=N'Burnt Cheesecake'), GETDATE()),
(NEWID(), 'One size', 19000, N'Chỉ một loại', (SELECT TOP 1 id FROM product WHERE name=N'Croissant trứng muối'), GETDATE()),
(NEWID(), 'One size', 19000, N'Chỉ một loại', (SELECT TOP 1 id FROM product WHERE name=N'Matcha Tây Bắc Mochi'), GETDATE());