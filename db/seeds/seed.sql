USE myplaces_db;

INSERT INTO categories(category_name) VALUES
	("Food/Drink"),
    ("Entertainment"),
    ("Health/Beauty"),
    ("Animals/Pets"),
    ("Gas Station"),
    ("Park"),
    ("Church"),
    ("Farm"),
    ("Dock"),
    ("Hospital"),
    ("Home"),
    ("Lake"),
    ("Mall"),
    ("Institution"),
    ("Stadium"),
    ("Water Park"),
    ("Public Building"),
    ("Hotel"),
    ("Factory"),
    ("Warehouse"),
    ("Museum"),
    ("Golf Course");

INSERT INTO user(username, password, email) VALUES
	("admin", "password", "admin@email.com"),
	("DSmith10", "password", "DS10@email.com"),
    ("JHoland09", "pass", "JH09@email.com"),
    ("user", "password", "user@email.com");
    
INSERT INTO places(name, address, latitude, longitude, category_id) VALUES
	("McDonald's", "2075 Snelling Ave N, Roseville, MN 55113", "45.00567656948145", "-93.16708803642425", 1),
    ("Minnehaha Dog Park", "5399 Minnehaha Park Dr S, Minneapolis, MN 55417", "44.90666039665647", "-93.19784725396477", 4),
    ("The Puttery", "240 Hennepin Ave, Minneapolis, MN 55401", "45.276449060501925", "-93.22595859646668", 2),
    ("St. Michael Cinema", "4300 O'Day Ave NE, St Michael, MN 55376", "45.21652613681753", "-93.5959734354139", 2),
    ("Champlin Mann", "11500 Theatre Dr N, Champlin, MN 55316", "45.16191179081768", "-93.39370980288508", 2),
    ("Willy McCoys", "6415 US-10, Ramsey, MN 55303", "45.22304230213781", "-93.43044811766102", 1),
    ("McDuffs On the Rum", "16659 St Francis Blvd NW, Ramsey, MN 55303", "45.27344387344587", "-93.4148323163742", 1),
    ("Rum River Hills Golf Club", "16659 St Francis Blvd NW, Ramsey, MN 55303", "45.273427822700846", "-93.41471550288041", 22),
    ("Green Haven Golf Course", "2800 Greenhaven Rd, Anoka, MN 55303", "45.20912388194617", "-93.39905666424961", 22);
    
INSERT INTO comments(text, user_id, place_id, time_created) VALUES
	("Lovely place. I love McDonald's.", 1, 1, NOW()),
    ("Love the park. Take my dog there daily.", 2, 2, NOW());
    
INSERT INTO favorite_places(user_id, places_id) VALUES
	(2,1),
    (2,2),
    (1,1);