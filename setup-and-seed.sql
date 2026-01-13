-- ============================================
-- GAMEZAME - COMPLETE DATABASE SETUP + GAMES
-- Run this ENTIRE script in Supabase SQL Editor
-- ============================================
-- STEP 1: Make abhiisingh240@gmail.com an admin
-- (Your user ID: e0af45e7-d800-426a-af5c-11ac2f2bc8e7)
INSERT INTO
    admins (user_id)
VALUES
    ('e0af45e7-d800-426a-af5c-11ac2f2bc8e7') ON CONFLICT (user_id) DO NOTHING;

-- STEP 2: Update RLS policies to also allow any authenticated user to read admins table
-- (so the app can check if current user is admin)
DROP POLICY IF EXISTS "Admins can view admins" ON admins;

CREATE POLICY "Authenticated users can check admin status" ON admins FOR
SELECT
    USING (auth.uid () IS NOT NULL);

-- STEP 3: Clear existing games (optional - comment out if you want to keep existing)
DELETE FROM games
WHERE
    id IS NOT NULL;

-- STEP 4: Insert FREE Games with working download links and images
INSERT INTO
    games (
        title,
        description,
        download_url,
        image_url,
        category
    )
VALUES
    -- SHOOTER GAMES
    (
        'Xonotic',
        'Fast-paced first-person arena shooter with futuristic weapons. Features multiple game modes including deathmatch, CTF, and more.',
        'https://dl.xonotic.org/xonotic-0.8.6.zip',
        'https://xonotic.org/static/img/screenshots/xonotic-screenshots-02.jpg',
        'Shooter'
    ),
    (
        'AssaultCube',
        'FREE multiplayer first-person shooter based on the CUBE engine. Lightweight and runs on almost any hardware.',
        'https://github.com/assaultcube/AC/releases/download/v1.3.0.2/AssaultCube_v1.3.0.2.exe',
        'https://assault.cubers.net/images/screenshot1.jpg',
        'Shooter'
    ),
    (
        'OpenArena',
        'Community-produced deathmatch FPS based on GPL idTech3 technology. Fast action multiplayer shooter.',
        'https://sourceforge.net/projects/oarena/files/openarena-0.8.8.zip/download',
        'https://openarena.ws/e107_images/custom/oa_005.jpg',
        'Shooter'
    ),
    -- ACTION GAMES
    (
        'Teeworlds',
        'Free online multiplayer 2D shooter game with cute graphics but hardcore gameplay mechanics.',
        'https://github.com/teeworlds/teeworlds/releases/download/0.7.5/teeworlds-0.7.5-win64.zip',
        'https://www.teeworlds.com/images/screenshots/screenshot_grass.png',
        'Action'
    ),
    -- STRATEGY GAMES
    (
        '0 A.D.',
        'Free, open-source real-time strategy game of ancient warfare. Build empires and conquer enemies across historical civilizations.',
        'https://releases.wildfiregames.com/0ad-0.0.26-alpha-win32.exe',
        'https://play0ad.com/wp-content/gallery/screenshots/A26-screenshot-01.jpg',
        'Strategy'
    ),
    (
        'Battle for Wesnoth',
        'Turn-based tactical strategy game with a high fantasy theme. Features deep campaigns and multiplayer support.',
        'https://sourceforge.net/projects/wesnoth/files/wesnoth-1.18/wesnoth-1.18.0/wesnoth-1.18.0-win64.exe/download',
        'https://wiki.wesnoth.org/images/thumb/8/87/Wesnoth_-_1.16.0_-_1.jpg/1200px-Wesnoth_-_1.16.0_-_1.jpg',
        'Strategy'
    ),
    (
        'Warzone 2100',
        'Real-time strategy and real-time tactics hybrid game set in a post-apocalyptic world. Features 400+ technologies to research.',
        'https://github.com/Warzone2100/warzone2100/releases/download/4.4.2/warzone2100_win_x64_installer.exe',
        'https://wz2100.net/img/screenshots/wz_4.jpg',
        'Strategy'
    ),
    (
        'Freeciv',
        'Free empire-building strategy game inspired by Civilization series. Rule your civilization from ancient times to space age.',
        'https://files.freeciv.org/packages/windows/Freeciv-3.0.10-msys2-win64-gtk3.22-setup.exe',
        'https://freeciv.org/images/shots/freeciv-3.0-turn-start.png',
        'Strategy'
    ),
    (
        'OpenRA',
        'Free RTS game engine supporting Command and Conquer, Red Alert, and Dune 2000. Classic RTS gameplay with modern features.',
        'https://github.com/OpenRA/OpenRA/releases/download/release-20231010/OpenRA-release-20231010-x64.exe',
        'https://www.openra.net/images/news/20200629-td-season4.png',
        'Strategy'
    ),
    -- RPG GAMES
    (
        'Flare RPG',
        'Free action RPG with beautiful isometric graphics. Explore dungeons, fight monsters, and collect epic loot.',
        'https://github.com/flareteam/flare-game/releases/download/v1.14/flare_game_windows.zip',
        'https://flarerpg.org/images/screenshots/ingame01.jpg',
        'RPG'
    ),
    (
        'Tales of Maj Eyal',
        'Deep roguelike RPG with complex character development and tactical combat. Hundreds of hours of gameplay.',
        'https://te4.org/dl/t-engine/t-engine4-windows-1.7.6.zip',
        'https://te4.org/sites/te4.org/files/screenshot_1_0.png',
        'RPG'
    ),
    -- PLATFORMER GAMES
    (
        'SuperTux',
        'Classic 2D platformer featuring Tux the Linux penguin. Jump through worlds collecting items and defeating enemies.',
        'https://github.com/SuperTux/supertux/releases/download/v0.6.3/SuperTux-v0.6.3-win64.msi',
        'https://www.supertux.org/images/screenshots/0.6.0/0.6.0-1.png',
        'Platformer'
    ),
    (
        'Cave Story',
        'Legendary indie platformer. Explore mysterious caves, fight robots, and uncover the story. A true classic.',
        'https://www.cavestory.org/downloads/cavestoryen.zip',
        'https://upload.wikimedia.org/wikipedia/en/5/5e/Cave_Story_gameplay.png',
        'Platformer'
    ),
    -- RACING GAMES
    (
        'SuperTuxKart',
        '3D open-source kart racing game with various characters and tracks. Play solo or multiplayer.',
        'https://github.com/supertuxkart/stk-code/releases/download/1.4/SuperTuxKart-1.4-win64.exe',
        'https://supertuxkart.net/images/thumb/e/ea/Supertuxkart-0.9.1-screenshot-3.jpg/1200px-Supertuxkart-0.9.1-screenshot-3.jpg',
        'Racing'
    ),
    (
        'TORCS',
        '3D racing simulator focusing on realistic car physics. Create AI drivers or race yourself.',
        'https://sourceforge.net/projects/torcs/files/all-in-one/1.3.7/torcs-1.3.7-win32-setup.exe/download',
        'https://torcs.sourceforge.net/pics/screen/berniw-screen1.jpg',
        'Racing'
    ),
    (
        'Speed Dreams',
        'Open source motorsport simulation with high quality graphics and physics. Based on TORCS.',
        'https://sourceforge.net/projects/speed-dreams/files/2.3.0/speed-dreams-2.3.0-r8382-win64-setup.exe/download',
        'https://www.speed-dreams.org/wp-content/uploads/2013/05/SD_Long_beach_1.jpg',
        'Racing'
    ),
    -- SIMULATION GAMES
    (
        'OpenTTD',
        'Business simulation game based on Transport Tycoon Deluxe. Build your transport empire across land, sea, and air.',
        'https://cdn.openttd.org/openttd-releases/14.1/openttd-14.1-windows-win64.zip',
        'https://www.openttd.org/static/img/screenshots/1.11/openttd-1.11.0-maglev-hub.png',
        'Simulation'
    ),
    (
        'FlightGear',
        'Professional-grade open source flight simulator. Fly realistic aircraft around the entire world.',
        'https://sourceforge.net/projects/flightgear/files/release-2020.3/FlightGear-2020.3.19-x86_64-setup.exe/download',
        'https://www.flightgear.org/wp-content/uploads/2017/05/777_EDDF.jpg',
        'Simulation'
    ),
    (
        'Simutrans',
        'Transportation simulation game. Connect cities with buses, trains, ships, and aircraft.',
        'https://sourceforge.net/projects/simutrans/files/simutrans/124-0/simutrans-win64-124-0.zip/download',
        'https://www.simutrans.com/images/screenshots/shot_1.png',
        'Simulation'
    ),
    (
        'Minetest',
        'Open source voxel game engine. Build, explore, and survive in infinite blocky worlds. Like Minecraft, but free!',
        'https://github.com/minetest/minetest/releases/download/5.8.0/minetest-5.8.0-win64.zip',
        'https://www.minetest.net/media/gallery/1.jpg',
        'Sandbox'
    ),
    -- PUZZLE GAMES
    (
        'Frozen Bubble',
        'Addictive bubble shooter puzzle game. Match colored bubbles to clear the board before they reach the bottom.',
        'https://sourceforge.net/projects/frozen-bubble/files/frozen-bubble/2.2.1/frozen-bubble-2.2.1-setup.exe/download',
        'https://www.frozen-bubble.org/data/fb-1player.png',
        'Puzzle'
    ),
    (
        'Enigma',
        'Puzzle game inspired by Oxyd. Roll a marble through over 1000 challenging levels.',
        'https://sourceforge.net/projects/enigma-game/files/Release%201.30/Enigma-1.30-win32.exe/download',
        'https://www.nongnu.org/enigma/screenshots/ss05.jpg',
        'Puzzle'
    ),
    -- ARCADE GAMES
    (
        'Chromium B.S.U.',
        'Fast-paced vertical shooter. Dodge bullets, destroy enemies, and survive as long as you can.',
        'https://sourceforge.net/projects/chromium-bsu/files/Chromium%20B.S.U./0.9.16.1/chromium-bsu-0.9.16.1-win32.zip/download',
        'https://chromium-bsu.sourceforge.io/ss00.png',
        'Arcade'
    ),
    (
        'Armagetron Advanced',
        '3D Tron lightcycle game. Trap opponents with your trail in fast-paced multiplayer action.',
        'https://sourceforge.net/projects/armagetronad/files/armagetronad/0.2.9.2.3/Armagetronad-0.2.9.2.3.win32.exe/download',
        'https://www.armagetronad.org/screenshots/armagetron_ss_5.jpg',
        'Arcade'
    ),
    (
        'Neverball',
        '3D puzzle arcade game. Tilt the floor to guide the ball through challenging obstacle courses.',
        'https://neverball.org/neverball-1.6.0-win32.zip',
        'https://neverball.org/screenshots/neverball-1.png',
        'Arcade'
    ),
    (
        'OpenTyrian',
        'Classic vertical scrolling shooter. Upgrade your ship with powerful weapons and defeat epic bosses.',
        'https://github.com/opentyrian/opentyrian/releases/download/v2.1.20220318/opentyrian-2.1.20220318-windows.zip',
        'https://opentyrian.com/tyrian.png',
        'Arcade'
    ),
    -- SPORTS GAMES
    (
        'Extreme Tux Racer',
        'Downhill racing game featuring Tux. Slide down snowy mountains collecting fish.',
        'https://sourceforge.net/projects/extremetuxracer/files/releases/etr-0.8.3/etr-0.8.3-win64.zip/download',
        'https://extremetuxracer.sourceforge.net/screenshots/etr_0.7_screenshot1.jpg',
        'Sports'
    ),
    -- CARD & BOARD GAMES
    (
        'PokerTH',
        'Texas Hold em poker game. Play against AI or online with other players.',
        'https://sourceforge.net/projects/pokerth/files/pokerth/1.1.2/PokerTH-1.1.2-win32-setup.exe/download',
        'https://www.pokerth.net/sshots/pokerth-sshot-1.png',
        'Card'
    ),
    (
        'PyChess',
        'Feature-rich chess application with powerful AI engine and online play support.',
        'https://github.com/pychess/pychess/releases/download/1.0.3/pychess-1.0.3.exe',
        'https://pychess.github.io/images/new_game.png',
        'Board'
    );

-- Verify the games were inserted
SELECT
    COUNT(*) as total_games
FROM
    games;

SELECT
    title,
    category
FROM
    games
ORDER BY
    category,
    title;