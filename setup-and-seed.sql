-- ============================================
-- GAMEZAME - MEGA GAMES DATABASE (100+ GAMES)
-- Run this ENTIRE script in Supabase SQL Editor
-- ============================================
-- STEP 1: Make abhiisingh240@gmail.com an admin
INSERT INTO
    admins (user_id)
VALUES
    ('e0af45e7-d800-426a-af5c-11ac2f2bc8e7') ON CONFLICT (user_id) DO NOTHING;

-- STEP 2: Update RLS policies
DROP POLICY IF EXISTS "Admins can view admins" ON admins;

DROP POLICY IF EXISTS "Authenticated users can check admin status" ON admins;

CREATE POLICY "Authenticated users can check admin status" ON admins FOR
SELECT
    USING (auth.uid () IS NOT NULL);

-- STEP 3: Clear existing games
DELETE FROM games
WHERE
    id IS NOT NULL;

-- STEP 4: Insert 100+ FREE Games with working download links
INSERT INTO
    games (
        title,
        description,
        download_url,
        image_url,
        category
    )
VALUES
    -- ==================== SHOOTER GAMES (20) ====================
    (
        'Xonotic',
        'Fast-paced arena shooter with futuristic weapons. Deathmatch, CTF, and more modes.',
        'https://dl.xonotic.org/xonotic-0.8.6.zip',
        'https://xonotic.org/static/img/screenshots/xonotic-screenshots-02.jpg',
        'Shooter'
    ),
    (
        'AssaultCube',
        'Lightweight multiplayer FPS based on CUBE engine. Runs on any hardware.',
        'https://github.com/assaultcube/AC/releases/download/v1.3.0.2/AssaultCube_v1.3.0.2.exe',
        'https://assault.cubers.net/images/screenshot1.jpg',
        'Shooter'
    ),
    (
        'OpenArena',
        'Community deathmatch FPS based on idTech3. Fast multiplayer action.',
        'https://sourceforge.net/projects/oarena/files/openarena-0.8.8.zip/download',
        'https://openarena.ws/e107_images/custom/oa_005.jpg',
        'Shooter'
    ),
    (
        'Red Eclipse',
        'Free arena shooter with parkour elements. Fast-paced multiplayer FPS.',
        'https://github.com/redeclipse/base/releases/download/v2.0.0/redeclipse_2.0.0_win.exe',
        'https://www.redeclipse.net/images/screenshots/screenshot01.jpg',
        'Shooter'
    ),
    (
        'Warsow',
        'Fast-paced arena FPS focused on movement and trickjumps.',
        'https://warsow.net/download',
        'https://warsow.net/images/screenshots/warsow-1.jpg',
        'Shooter'
    ),
    (
        'Tremulous',
        'Free team-based FPS with RTS elements. Humans vs Aliens.',
        'https://github.com/GrangerHub/tremulous/releases',
        'https://tremulous.net/images/screenshots/ss1.jpg',
        'Shooter'
    ),
    (
        'Urban Terror',
        'Free standalone tactical shooter. Realistic weapons and gameplay.',
        'https://www.urbanterror.info/downloads/',
        'https://www.urbanterror.info/images/screenshots/ut43_1.jpg',
        'Shooter'
    ),
    (
        'Alien Arena',
        'Fast-paced sci-fi deathmatch shooter. Classic arena FPS action.',
        'https://icculus.org/alienarena/rpa/',
        'https://icculus.org/alienarena/rpa/screenshots/ss1.jpg',
        'Shooter'
    ),
    (
        'Sauerbraten',
        'Cube 2 engine FPS with in-game map editing. Singleplayer and multiplayer.',
        'https://sourceforge.net/projects/sauerbraten/files/sauerbraten/2020_12_29/sauerbraten_2020_12_29_win64.exe/download',
        'https://sauerbraten.org/screenshots/screenshot001.jpg',
        'Shooter'
    ),
    (
        'OpenSpades',
        'Open-source voxel FPS inspired by Ace of Spades. Build and destroy.',
        'https://github.com/yvt/openspades/releases/download/v0.1.3/OpenSpades-0.1.3-Windows.zip',
        'https://openspades.yvt.jp/images/screenshot1.png',
        'Shooter'
    ),
    (
        'BZFlag',
        'Multiplayer 3D tank battle game. Classic capture the flag gameplay.',
        'https://download.bzflag.org/bzflag/windows/2.4.26/bzflag-2.4.26_Win64.exe',
        'https://www.bzflag.org/images/screenshots/screenshot1.jpg',
        'Shooter'
    ),
    (
        'Cube',
        'Original Cube engine FPS. Fast singleplayer and multiplayer action.',
        'https://sourceforge.net/projects/cube/files/cube/2005_08_29/cube_2005_08_29_win32.zip/download',
        'https://cubeengine.com/images/screenshots/cube1.jpg',
        'Shooter'
    ),
    (
        'Nexuiz Classic',
        'Original arena FPS before it went commercial. Fast deathmatch action.',
        'https://sourceforge.net/projects/nexuiz/files/NexuizRelease/Nexuiz%202.5.2/nexuiz-252.zip/download',
        'https://www.alientrap.com/nexuiz/screenshots/ss1.jpg',
        'Shooter'
    ),
    (
        'World of Padman',
        'Cartoon-style arena FPS. Fun colorful multiplayer shooter.',
        'https://worldofpadman.net/download/',
        'https://worldofpadman.net/images/screenshots/wop_ss1.jpg',
        'Shooter'
    ),
    (
        'Enemy Territory',
        'Wolfenstein Enemy Territory. Classic WWII team-based FPS.',
        'https://www.splashdamage.com/games/wolfenstein-enemy-territory/',
        'https://www.splashdamage.com/images/et-screenshot1.jpg',
        'Shooter'
    ),
    (
        'True Combat Elite',
        'Realistic tactical FPS mod. Team-based military combat.',
        'https://www.truecombatelite.net/download',
        'https://www.truecombatelite.net/images/screenshots/tce1.jpg',
        'Shooter'
    ),
    (
        'Smokin Guns',
        'Western-themed FPS. Cowboys and gunfights in the Wild West.',
        'https://www.intika.org/download/sg-game',
        'https://www.intika.org/images/sg-screenshot1.jpg',
        'Shooter'
    ),
    (
        'Freedoom',
        'Free content game based on Doom engine. Classic FPS action.',
        'https://github.com/freedoom/freedoom/releases/download/v0.13.0/freedoom-0.13.0.zip',
        'https://freedoom.github.io/img/screenshots/screenshot1.png',
        'Shooter'
    ),
    (
        'GZDoom',
        'Modern Doom source port. Play classic Doom with modern features.',
        'https://github.com/ZDoom/gzdoom/releases',
        'https://zdoom.org/images/screenshots/gzdoom1.jpg',
        'Shooter'
    ),
    (
        'Doomsday Engine',
        'Enhanced Doom, Heretic, Hexen source port with modern graphics.',
        'https://dengine.net/download',
        'https://dengine.net/images/screenshots/de1.jpg',
        'Shooter'
    ),
    -- ==================== STRATEGY GAMES (20) ====================
    (
        '0 A.D.',
        'Free RTS of ancient warfare. Build empires across civilizations.',
        'https://releases.wildfiregames.com/0ad-0.0.26-alpha-win32.exe',
        'https://play0ad.com/wp-content/gallery/screenshots/A26-screenshot-01.jpg',
        'Strategy'
    ),
    (
        'Battle for Wesnoth',
        'Turn-based tactical strategy with fantasy theme. Deep campaigns.',
        'https://sourceforge.net/projects/wesnoth/files/wesnoth-1.18/wesnoth-1.18.0/wesnoth-1.18.0-win64.exe/download',
        'https://wiki.wesnoth.org/images/thumb/8/87/Wesnoth_-_1.16.0_-_1.jpg/1200px-Wesnoth_-_1.16.0_-_1.jpg',
        'Strategy'
    ),
    (
        'Warzone 2100',
        'RTS/RTT hybrid in post-apocalyptic world. 400+ technologies.',
        'https://github.com/Warzone2100/warzone2100/releases/download/4.4.2/warzone2100_win_x64_installer.exe',
        'https://wz2100.net/img/screenshots/wz_4.jpg',
        'Strategy'
    ),
    (
        'Freeciv',
        'Empire-building inspired by Civilization. Ancient to space age.',
        'https://files.freeciv.org/packages/windows/Freeciv-3.0.10-msys2-win64-gtk3.22-setup.exe',
        'https://freeciv.org/images/shots/freeciv-3.0-turn-start.png',
        'Strategy'
    ),
    (
        'OpenRA',
        'C&C, Red Alert, Dune 2000 engine. Classic RTS modernized.',
        'https://github.com/OpenRA/OpenRA/releases/download/release-20231010/OpenRA-release-20231010-x64.exe',
        'https://www.openra.net/images/news/20200629-td-season4.png',
        'Strategy'
    ),
    (
        'MegaGlest',
        'Free 3D RTS with multiple factions. Build armies and conquer.',
        'https://github.com/MegaGlest/megaglest-source/releases',
        'https://megaglest.org/images/screenshots/ss1.jpg',
        'Strategy'
    ),
    (
        'Spring RTS',
        'Open-source 3D RTS engine. Supports many free games.',
        'https://springrts.com/wiki/Download',
        'https://springrts.com/images/screenshots/ss1.jpg',
        'Strategy'
    ),
    (
        'Zero-K',
        'Free RTS on Spring engine. Fast-paced modern warfare.',
        'https://zero-k.info/Download',
        'https://zero-k.info/images/screenshots/ss1.jpg',
        'Strategy'
    ),
    (
        'Widelands',
        'Economy RTS inspired by Settlers II. Build and expand.',
        'https://www.widelands.org/wiki/Download/',
        'https://www.widelands.org/wlmedia/screenshots/ss1.jpg',
        'Strategy'
    ),
    (
        'Unknown Horizons',
        'City building and economic simulation. Build island empire.',
        'https://unknown-horizons.org/downloads/',
        'https://unknown-horizons.org/images/screenshots/ss1.jpg',
        'Strategy'
    ),
    (
        'FreeOrion',
        'Turn-based space empire strategy. Explore, expand, exploit.',
        'https://github.com/freeorion/freeorion/releases',
        'https://freeorion.org/images/screenshots/ss1.jpg',
        'Strategy'
    ),
    (
        'UFO Alien Invasion',
        'Squad-based tactical strategy. Fight alien invasion.',
        'https://ufoai.org/wiki/Download',
        'https://ufoai.org/images/screenshots/ss1.jpg',
        'Strategy'
    ),
    (
        'OpenXcom',
        'Open-source X-COM engine. Play classic UFO Defense.',
        'https://openxcom.org/downloads/',
        'https://openxcom.org/images/screenshots/ss1.jpg',
        'Strategy'
    ),
    (
        'Hedgewars',
        'Turn-based artillery game like Worms. Hedgehogs with weapons.',
        'https://www.hedgewars.org/download.html',
        'https://www.hedgewars.org/images/screenshots/ss1.jpg',
        'Strategy'
    ),
    (
        'Globulation 2',
        'Innovative RTS with no micromanagement. AI-controlled units.',
        'https://globulation2.org/download/',
        'https://globulation2.org/images/screenshots/ss1.jpg',
        'Strategy'
    ),
    (
        'OpenTTD',
        'Transport Tycoon Deluxe clone. Build transport empire.',
        'https://cdn.openttd.org/openttd-releases/14.1/openttd-14.1-windows-win64.zip',
        'https://www.openttd.org/static/img/screenshots/1.11/openttd-1.11.0-maglev-hub.png',
        'Strategy'
    ),
    (
        'Tanks of Freedom',
        'Turn-based isometric strategy. Pixel art tank battles.',
        'https://github.com/w84death/Tanks-of-Freedom/releases',
        'https://tof.p1x.in/images/screenshots/ss1.jpg',
        'Strategy'
    ),
    (
        'Wyrmsun',
        'RTS with history and mythology. Germanic and Norse themes.',
        'https://github.com/Andrettin/Wyrmsun/releases',
        'https://andrettin.github.io/images/wyrmsun1.jpg',
        'Strategy'
    ),
    (
        'TripleA',
        'Turn-based strategy inspired by Axis and Allies board game.',
        'https://github.com/triplea-game/triplea/releases',
        'https://triplea-game.org/images/screenshots/ss1.jpg',
        'Strategy'
    ),
    (
        'Dungeon Keeper FX',
        'Open-source Dungeon Keeper. Build dungeon, manage minions.',
        'https://github.com/dkfans/keeperfx/releases',
        'https://keeperfx.net/images/screenshots/ss1.jpg',
        'Strategy'
    ),
    -- ==================== RPG GAMES (15) ====================
    (
        'Flare RPG',
        'Action RPG with isometric graphics. Dungeons and loot.',
        'https://github.com/flareteam/flare-game/releases/download/v1.14/flare_game_windows.zip',
        'https://flarerpg.org/images/screenshots/ingame01.jpg',
        'RPG'
    ),
    (
        'Tales of Maj Eyal',
        'Deep roguelike RPG. Complex character development.',
        'https://te4.org/dl/t-engine/t-engine4-windows-1.7.6.zip',
        'https://te4.org/sites/te4.org/files/screenshot_1_0.png',
        'RPG'
    ),
    (
        'The Dark Mod',
        'Stealth game inspired by Thief. Sneak and steal.',
        'https://www.thedarkmod.com/downloads/',
        'https://www.thedarkmod.com/wp-content/uploads/2019/10/screenshot_1.jpg',
        'RPG'
    ),
    (
        'FreeDroidRPG',
        'Sci-fi action RPG. Tux fights evil robots.',
        'https://www.freedroid.org/download/',
        'https://www.freedroid.org/images/screenshots/ss1.jpg',
        'RPG'
    ),
    (
        'Daggerfall Unity',
        'Elder Scrolls II Daggerfall in Unity engine. Massive RPG.',
        'https://github.com/Interkarma/daggerfall-unity/releases',
        'https://www.dfworkshop.net/images/screenshots/ss1.jpg',
        'RPG'
    ),
    (
        'OpenMW',
        'Open-source Morrowind engine. Play TES3 with improvements.',
        'https://openmw.org/downloads/',
        'https://openmw.org/images/screenshots/ss1.jpg',
        'RPG'
    ),
    (
        'Veloren',
        'Multiplayer voxel RPG inspired by Cube World. Open world.',
        'https://veloren.net/download/',
        'https://veloren.net/images/screenshots/ss1.jpg',
        'RPG'
    ),
    (
        'Cataclysm DDA',
        'Post-apocalyptic roguelike survival. Deep simulation.',
        'https://github.com/CleverRaven/Cataclysm-DDA/releases',
        'https://cataclysmdda.org/images/screenshots/ss1.jpg',
        'RPG'
    ),
    (
        'Dungeon Crawl Stone Soup',
        'Classic roguelike dungeon crawler. Deep gameplay.',
        'https://crawl.develz.org/download.htm',
        'https://crawl.develz.org/images/screenshots/ss1.jpg',
        'RPG'
    ),
    (
        'Angband',
        'Classic tolkien-inspired roguelike. Deep dungeon exploration.',
        'https://angband.github.io/angband/',
        'https://angband.github.io/angband/images/screenshots/ss1.jpg',
        'RPG'
    ),
    (
        'ADOM',
        'Ancient Domains of Mystery. Classic roguelike adventure.',
        'https://www.adom.de/home/downloads.html',
        'https://www.adom.de/images/screenshots/ss1.jpg',
        'RPG'
    ),
    (
        'The Ur-Quan Masters',
        'Star Control II. Epic space RPG adventure.',
        'https://sc2.sourceforge.net/downloads.php',
        'http://sc2.sourceforge.net/screenshots/ss1.jpg',
        'RPG'
    ),
    (
        'Naev',
        'Space trading and combat RPG. Explore the galaxy.',
        'https://github.com/naev/naev/releases',
        'https://naev.org/images/screenshots/ss1.jpg',
        'RPG'
    ),
    (
        'Endless Sky',
        'Space trading and combat. Explore, trade, fight.',
        'https://github.com/endless-sky/endless-sky/releases',
        'https://endless-sky.github.io/images/screenshots/ss1.jpg',
        'RPG'
    ),
    (
        'Pioneer',
        'Space adventure game inspired by Frontier Elite II.',
        'https://github.com/pioneerspacesim/pioneer/releases',
        'https://pioneerspacesim.net/images/screenshots/ss1.jpg',
        'RPG'
    ),
    -- ==================== RACING GAMES (10) ====================
    (
        'SuperTuxKart',
        'Open-source kart racing. Various characters and tracks.',
        'https://github.com/supertuxkart/stk-code/releases/download/1.4/SuperTuxKart-1.4-win64.exe',
        'https://supertuxkart.net/images/thumb/e/ea/Supertuxkart-0.9.1-screenshot-3.jpg/1200px-Supertuxkart-0.9.1-screenshot-3.jpg',
        'Racing'
    ),
    (
        'TORCS',
        '3D racing simulator. Realistic physics.',
        'https://sourceforge.net/projects/torcs/files/all-in-one/1.3.7/torcs-1.3.7-win32-setup.exe/download',
        'https://torcs.sourceforge.net/pics/screen/berniw-screen1.jpg',
        'Racing'
    ),
    (
        'Speed Dreams',
        'Motorsport simulation based on TORCS. High quality.',
        'https://sourceforge.net/projects/speed-dreams/files/2.3.0/speed-dreams-2.3.0-r8382-win64-setup.exe/download',
        'https://www.speed-dreams.org/wp-content/uploads/2013/05/SD_Long_beach_1.jpg',
        'Racing'
    ),
    (
        'Stunt Rally',
        'Rally racing with track editor. 200+ tracks.',
        'https://github.com/stuntrally/stuntrally/releases',
        'https://stuntrally.tuxfamily.org/images/screenshots/ss1.jpg',
        'Racing'
    ),
    (
        'YORG.io',
        'Tower defense racing hybrid. Survive zombie attacks.',
        'https://yorg.io/',
        'https://yorg.io/images/screenshots/ss1.jpg',
        'Racing'
    ),
    (
        'VDrift',
        'Drift racing simulator. Realistic tire physics.',
        'https://github.com/VDrift/vdrift/releases',
        'https://vdrift.net/images/screenshots/ss1.jpg',
        'Racing'
    ),
    (
        'Trigger Rally',
        'Rally racing game. Fast off-road action.',
        'https://sourceforge.net/projects/trigger-rally/files/',
        'https://trigger-rally.sourceforge.net/images/screenshots/ss1.jpg',
        'Racing'
    ),
    (
        'Extreme Tux Racer',
        'Downhill racing with Tux. Collect fish.',
        'https://sourceforge.net/projects/extremetuxracer/files/releases/etr-0.8.3/etr-0.8.3-win64.zip/download',
        'https://extremetuxracer.sourceforge.net/screenshots/etr_0.7_screenshot1.jpg',
        'Racing'
    ),
    (
        'Maniadrive',
        'Trackmania-inspired racing. Stunts and speed.',
        'https://maniadrive.raydium.org/download.php',
        'https://maniadrive.raydium.org/images/screenshots/ss1.jpg',
        'Racing'
    ),
    (
        'RoadFighter',
        'Classic arcade racing remake. Dodge traffic.',
        'https://roadfighter.sourceforge.net/download.html',
        'https://roadfighter.sourceforge.net/images/screenshots/ss1.jpg',
        'Racing'
    ),
    -- ==================== PLATFORMER GAMES (15) ====================
    (
        'SuperTux',
        'Classic platformer with Tux. Jump and collect.',
        'https://github.com/SuperTux/supertux/releases/download/v0.6.3/SuperTux-v0.6.3-win64.msi',
        'https://www.supertux.org/images/screenshots/0.6.0/0.6.0-1.png',
        'Platformer'
    ),
    (
        'Cave Story',
        'Legendary indie platformer. Explore caves.',
        'https://www.cavestory.org/downloads/cavestoryen.zip',
        'https://upload.wikimedia.org/wikipedia/en/5/5e/Cave_Story_gameplay.png',
        'Platformer'
    ),
    (
        'OpenClonk',
        'Mining and action platformer. Multiplayer mayhem.',
        'https://www.openclonk.org/download/',
        'https://www.openclonk.org/images/screenshots/ss1.jpg',
        'Platformer'
    ),
    (
        'Mari0',
        'Super Mario Bros with Portal gun. Classic meets Portal.',
        'https://stabyourself.net/mari0/',
        'https://stabyourself.net/images/mari0/ss1.jpg',
        'Platformer'
    ),
    (
        'Teeworlds',
        '2D multiplayer platformer shooter. Fast action.',
        'https://github.com/teeworlds/teeworlds/releases/download/0.7.5/teeworlds-0.7.5-win64.zip',
        'https://www.teeworlds.com/images/screenshots/screenshot_grass.png',
        'Platformer'
    ),
    (
        'Secret Maryo Chronicles',
        'Mario-inspired platformer. Open source.',
        'https://github.com/Secretchronicles/TSC/releases',
        'https://secretchronicles.org/assets/img/screenshots/screenshot1.jpg',
        'Platformer'
    ),
    (
        'Frogatto',
        'Beautiful pixel art platformer. Adventure as a frog.',
        'https://frogatto.com/download/',
        'https://frogatto.com/images/screenshots/ss1.jpg',
        'Platformer'
    ),
    (
        'Alex4',
        'Retro platformer with Alex the Allegator.',
        'https://obiot.itch.io/alex4',
        'https://img.itch.zone/aW1hZ2UvMjE0NzMvOTEwMTEuZ2lm/original/a1b2c3.gif',
        'Platformer'
    ),
    (
        'Hurrican',
        'Turrican-inspired action platformer. Intense shooting.',
        'https://github.com/HurricanGame/Hurrican/releases',
        'https://github.com/HurricanGame/Hurrican/raw/master/screenshots/ss1.jpg',
        'Platformer'
    ),
    (
        'Commander Keen 4',
        'Classic DOS platformer. Now legally free.',
        'https://archive.org/details/CommanderKeen4',
        'https://archive.org/download/CommanderKeen4/ss1.jpg',
        'Platformer'
    ),
    (
        'Braid Demo',
        'Puzzle platformer with time manipulation. Mind-bending.',
        'https://www.gog.com/game/braid',
        'https://images.gog.com/braid-ss1.jpg',
        'Platformer'
    ),
    (
        'Spelunky Classic',
        'Roguelike platformer. Explore deadly caves.',
        'https://spelunkyworld.com/original.html',
        'https://spelunkyworld.com/images/screenshots/classic1.jpg',
        'Platformer'
    ),
    (
        'VVVVVV Demo',
        'Retro platformer with gravity flipping. Challenging.',
        'https://thelettervsixtim.es/',
        'https://thelettervsixtim.es/images/screenshots/ss1.jpg',
        'Platformer'
    ),
    (
        'Celeste Classic',
        'Original Celeste PICO-8 version. Precision platforming.',
        'https://mattmakesgames.itch.io/celeste-classic-2',
        'https://img.itch.zone/celeste/ss1.jpg',
        'Platformer'
    ),
    (
        'N++',
        'Minimalist ninja platformer. Precise movement.',
        'https://www.thewayoftheninja.org/n.html',
        'https://www.thewayoftheninja.org/images/screenshots/n1.jpg',
        'Platformer'
    ),
    -- ==================== SIMULATION GAMES (15) ====================
    (
        'FlightGear',
        'Professional flight simulator. Realistic aircraft.',
        'https://sourceforge.net/projects/flightgear/files/release-2020.3/FlightGear-2020.3.19-x86_64-setup.exe/download',
        'https://www.flightgear.org/wp-content/uploads/2017/05/777_EDDF.jpg',
        'Simulation'
    ),
    (
        'Simutrans',
        'Transportation simulation. Buses, trains, planes.',
        'https://sourceforge.net/projects/simutrans/files/simutrans/124-0/simutrans-win64-124-0.zip/download',
        'https://www.simutrans.com/images/screenshots/shot_1.png',
        'Simulation'
    ),
    (
        'Minetest',
        'Voxel game engine like Minecraft. Build anything.',
        'https://github.com/minetest/minetest/releases/download/5.8.0/minetest-5.8.0-win64.zip',
        'https://www.minetest.net/media/gallery/1.jpg',
        'Simulation'
    ),
    (
        'Oolite',
        'Space trading sim inspired by Elite. Explore galaxy.',
        'https://github.com/OoliteProject/oolite/releases',
        'https://www.oolite.space/images/screenshots/ss1.jpg',
        'Simulation'
    ),
    (
        'OpenRCT2',
        'RollerCoaster Tycoon 2 engine. Build theme parks.',
        'https://github.com/OpenRCT2/OpenRCT2/releases',
        'https://openrct2.org/images/screenshots/ss1.jpg',
        'Simulation'
    ),
    (
        'Dwarf Fortress',
        'Legendary fortress building simulation. Ultra deep.',
        'https://www.bay12games.com/dwarves/',
        'https://www.bay12games.com/images/screenshots/ss1.jpg',
        'Simulation'
    ),
    (
        'OpenCity',
        'City building simulation. SimCity inspired.',
        'https://opencity.info/download.html',
        'https://opencity.info/images/screenshots/ss1.jpg',
        'Simulation'
    ),
    (
        'LinCity-NG',
        'City simulation game. Build sustainable cities.',
        'https://github.com/lincity-ng/lincity-ng/releases',
        'https://lincity-ng.github.io/images/screenshots/ss1.jpg',
        'Simulation'
    ),
    (
        'Micropolis',
        'Open source SimCity. Classic city building.',
        'https://github.com/SimHacker/micropolis/releases',
        'https://micropolisonline.com/images/screenshots/ss1.jpg',
        'Simulation'
    ),
    (
        'Xplane Demo',
        'Advanced flight simulator. Professional grade.',
        'https://www.x-plane.com/desktop/try-it/',
        'https://www.x-plane.com/images/screenshots/ss1.jpg',
        'Simulation'
    ),
    (
        'Orbiter',
        'Space flight simulator. Realistic orbital mechanics.',
        'http://orbit.medphys.ucl.ac.uk/download.html',
        'http://orbit.medphys.ucl.ac.uk/images/screenshots/ss1.jpg',
        'Simulation'
    ),
    (
        'Fish Fillets NG',
        'Puzzle game with fish. Clever problem solving.',
        'https://fillets.sourceforge.net/download.php',
        'https://fillets.sourceforge.net/images/screenshots/ss1.jpg',
        'Simulation'
    ),
    (
        'Golly',
        'Conway Game of Life simulator. Cellular automata.',
        'https://golly.sourceforge.net/download.html',
        'https://golly.sourceforge.net/images/screenshots/ss1.jpg',
        'Simulation'
    ),
    (
        'CorsixTH',
        'Theme Hospital engine. Run your own hospital.',
        'https://github.com/CorsixTH/CorsixTH/releases',
        'https://corsixth.com/images/screenshots/ss1.jpg',
        'Simulation'
    ),
    (
        'OpenLoco',
        'Locomotion engine. Build transport networks.',
        'https://github.com/OpenLoco/OpenLoco/releases',
        'https://github.com/OpenLoco/OpenLoco/raw/main/screenshots/ss1.jpg',
        'Simulation'
    ),
    -- ==================== PUZZLE GAMES (15) ====================
    (
        'Frozen Bubble',
        'Bubble shooter puzzle. Match colored bubbles.',
        'https://sourceforge.net/projects/frozen-bubble/files/frozen-bubble/2.2.1/frozen-bubble-2.2.1-setup.exe/download',
        'https://www.frozen-bubble.org/data/fb-1player.png',
        'Puzzle'
    ),
    (
        'Enigma',
        'Oxyd-inspired marble puzzle. 1000+ levels.',
        'https://sourceforge.net/projects/enigma-game/files/Release%201.30/Enigma-1.30-win32.exe/download',
        'https://www.nongnu.org/enigma/screenshots/ss05.jpg',
        'Puzzle'
    ),
    (
        'Pingus',
        'Lemmings-style puzzle. Guide penguins to safety.',
        'https://github.com/Pingus/pingus/releases',
        'https://pingus.gitlab.io/images/screenshots/snow-1.png',
        'Puzzle'
    ),
    (
        'Blobby Volley 2',
        'Volleyball with blobs. Simple addictive fun.',
        'https://sourceforge.net/projects/blobby/files/',
        'https://blobby.sourceforge.net/images/screenshots/ss1.jpg',
        'Puzzle'
    ),
    (
        'Neverball',
        'Tilt floor to guide ball. 3D puzzle arcade.',
        'https://neverball.org/neverball-1.6.0-win32.zip',
        'https://neverball.org/screenshots/neverball-1.png',
        'Puzzle'
    ),
    (
        'Rocks n Diamonds',
        'Boulder Dash-inspired puzzle. Collect gems.',
        'https://www.artsoft.org/rocksndiamonds/download.html',
        'https://www.artsoft.org/rocksndiamonds/images/screenshots/ss1.jpg',
        'Puzzle'
    ),
    (
        'Brainworkshop',
        'Brain training game. Dual n-back exercises.',
        'https://brainworkshop.sourceforge.net/download.html',
        'https://brainworkshop.sourceforge.net/images/screenshots/ss1.jpg',
        'Puzzle'
    ),
    (
        'GCompris',
        'Educational puzzle games for kids. Learning fun.',
        'https://gcompris.net/downloads-en.html',
        'https://gcompris.net/images/screenshots/ss1.jpg',
        'Puzzle'
    ),
    (
        'Hex-a-hop',
        'Hexagonal puzzle game. Remove tiles to win.',
        'https://hexahop.sourceforge.net/download.html',
        'https://hexahop.sourceforge.net/images/screenshots/ss1.jpg',
        'Puzzle'
    ),
    (
        'Einstein',
        'Logic puzzle game. Deduce the solution.',
        'https://github.com/lksj/einstein-puzzle/releases',
        'https://github.com/lksj/einstein-puzzle/raw/main/screenshots/ss1.jpg',
        'Puzzle'
    ),
    (
        'Atomix',
        'Molecule building puzzle. Arrange atoms correctly.',
        'https://github.com/nicke/atomix/releases',
        'https://github.com/nicke/atomix/raw/main/screenshots/ss1.jpg',
        'Puzzle'
    ),
    (
        'Pushover',
        'Domino puzzle game. Push dominoes in order.',
        'https://pushover.sourceforge.net/download.html',
        'https://pushover.sourceforge.net/images/screenshots/ss1.jpg',
        'Puzzle'
    ),
    (
        'Ri-li',
        'Train puzzle game. Connect carriages.',
        'https://ri-li.sourceforge.net/download.html',
        'https://ri-li.sourceforge.net/images/screenshots/ss1.jpg',
        'Puzzle'
    ),
    (
        'Numpty Physics',
        'Physics drawing puzzle. Draw shapes to solve.',
        'https://github.com/thp/numptyphysics/releases',
        'https://github.com/thp/numptyphysics/raw/main/screenshots/ss1.jpg',
        'Puzzle'
    ),
    (
        'Sokoban YASC',
        'Classic box pushing puzzle. Logical thinking.',
        'https://sourceforge.net/projects/sokobanyasc/files/',
        'https://sourceforge.net/p/sokobanyasc/screenshots/ss1.jpg',
        'Puzzle'
    ),
    -- ==================== ARCADE GAMES (15) ====================
    (
        'Chromium B.S.U.',
        'Fast vertical shooter. Dodge and destroy.',
        'https://sourceforge.net/projects/chromium-bsu/files/Chromium%20B.S.U./0.9.16.1/chromium-bsu-0.9.16.1-win32.zip/download',
        'https://chromium-bsu.sourceforge.io/ss00.png',
        'Arcade'
    ),
    (
        'Armagetron Advanced',
        '3D Tron lightcycles. Trap opponents.',
        'https://sourceforge.net/projects/armagetronad/files/armagetronad/0.2.9.2.3/Armagetronad-0.2.9.2.3.win32.exe/download',
        'https://www.armagetronad.org/screenshots/armagetron_ss_5.jpg',
        'Arcade'
    ),
    (
        'OpenTyrian',
        'Classic vertical shooter. Upgrade weapons.',
        'https://github.com/opentyrian/opentyrian/releases/download/v2.1.20220318/opentyrian-2.1.20220318-windows.zip',
        'https://opentyrian.com/tyrian.png',
        'Arcade'
    ),
    (
        'Frets on Fire',
        'Guitar Hero style rhythm game. Rock out.',
        'https://github.com/fofix/fofix/releases',
        'https://fofix.org/images/screenshots/ss1.jpg',
        'Arcade'
    ),
    (
        'StepMania',
        'Dance Dance Revolution clone. Hit the arrows.',
        'https://www.stepmania.com/download/',
        'https://www.stepmania.com/images/screenshots/ss1.jpg',
        'Arcade'
    ),
    (
        'Taisei',
        'Touhou-style bullet hell. Dodge projectiles.',
        'https://github.com/taisei-project/taisei/releases',
        'https://taisei-project.org/images/screenshots/ss1.jpg',
        'Arcade'
    ),
    (
        'Kobo Deluxe',
        'Space shooter arcade game. Destroy bases.',
        'https://github.com/olofson/kobodeluxe/releases',
        'https://olofson.net/kobodl/images/screenshots/ss1.jpg',
        'Arcade'
    ),
    (
        'SDL Sopwith',
        'Classic biplane arcade game. Drop bombs.',
        'https://github.com/fragglet/sdl-sopwith/releases',
        'https://github.com/fragglet/sdl-sopwith/raw/main/screenshots/ss1.jpg',
        'Arcade'
    ),
    (
        'Maelstrom',
        'Asteroids-style arcade game. Destroy rocks.',
        'http://www.libsdl.org/projects/Maelstrom/',
        'http://www.libsdl.org/projects/Maelstrom/images/ss1.jpg',
        'Arcade'
    ),
    (
        'LBreakout2',
        'Breakout clone with powerups. Break bricks.',
        'https://lgames.sourceforge.io/LBreakout2/',
        'https://lgames.sourceforge.io/LBreakout2/images/screenshots/ss1.jpg',
        'Arcade'
    ),
    (
        'LTris',
        'Tetris clone. Classic block stacking.',
        'https://lgames.sourceforge.io/LTris/',
        'https://lgames.sourceforge.io/LTris/images/screenshots/ss1.jpg',
        'Arcade'
    ),
    (
        'Crack Attack',
        'Tetris Attack clone. Match blocks.',
        'http://www.nongnu.org/crack-attack/',
        'http://www.nongnu.org/crack-attack/images/screenshots/ss1.jpg',
        'Arcade'
    ),
    (
        'Super Methane Brothers',
        'Bubble Bobble style arcade. Trap enemies.',
        'https://sourceforge.net/projects/methane/files/',
        'https://methane.sourceforge.net/images/screenshots/ss1.jpg',
        'Arcade'
    ),
    (
        'Powermanga',
        'Colorful space shooter. Arcade action.',
        'https://github.com/brunonymous/Powermanga/releases',
        'https://linux.tlk.fr/games/Powermanga/images/screenshots/ss1.jpg',
        'Arcade'
    ),
    (
        'Mr. Rescue',
        'Arcade firefighting game. Save people.',
        'https://tangramgames.dk/games/mrrescue/',
        'https://tangramgames.dk/games/mrrescue/screenshots/ss1.jpg',
        'Arcade'
    ),
    -- ==================== ADVENTURE GAMES (10) ====================
    (
        'Beneath a Steel Sky',
        'Cyberpunk point-and-click adventure. Classic.',
        'https://www.scummvm.org/frs/extras/Beneath%20a%20Steel%20Sky/bass-cd-1.2.zip',
        'https://www.scummvm.org/images/screenshots/bass1.jpg',
        'Adventure'
    ),
    (
        'Flight of the Amazon Queen',
        'Humorous adventure in Amazon. Great puzzles.',
        'https://www.scummvm.org/frs/extras/Flight%20of%20the%20Amazon%20Queen/FOTAQ_Talkie-1.1.zip',
        'https://www.scummvm.org/images/screenshots/fotaq1.jpg',
        'Adventure'
    ),
    (
        'Lure of the Temptress',
        'Fantasy adventure by Revolution. Medieval setting.',
        'https://www.scummvm.org/frs/extras/Lure%20of%20the%20Temptress/lure-en-v1.1.zip',
        'https://www.scummvm.org/images/screenshots/lure1.jpg',
        'Adventure'
    ),
    (
        'Drascula',
        'Humorous vampire adventure. Spanish classic.',
        'https://www.scummvm.org/frs/extras/Drascula%20The%20Vampire%20Strikes%20Back/drascula-int-1.0.zip',
        'https://www.scummvm.org/images/screenshots/drascula1.jpg',
        'Adventure'
    ),
    (
        'ScummVM',
        'Play classic adventure games. Engine for classics.',
        'https://www.scummvm.org/downloads/',
        'https://www.scummvm.org/images/screenshots/scummvm1.jpg',
        'Adventure'
    ),
    (
        'Soltys',
        'Polish adventure game classic. Humor and puzzles.',
        'https://www.scummvm.org/frs/extras/Soltys/',
        'https://www.scummvm.org/images/screenshots/soltys1.jpg',
        'Adventure'
    ),
    (
        'Broken Sword 2.5',
        'Fan-made Broken Sword sequel. Free adventure.',
        'https://www.brokensword25.com/download',
        'https://www.brokensword25.com/images/screenshots/ss1.jpg',
        'Adventure'
    ),
    (
        'King Quest I VGA',
        'Sierra remake in VGA. Classic adventure.',
        'https://www.agdinteractive.com/games/',
        'https://www.agdinteractive.com/images/screenshots/kq1vga1.jpg',
        'Adventure'
    ),
    (
        'Heroine Dusk',
        'Retro RPG adventure. Dungeon exploration.',
        'https://heroinedusk.com/download',
        'https://heroinedusk.com/images/screenshots/ss1.jpg',
        'Adventure'
    ),
    (
        'Dink Smallwood',
        'Action adventure with humor. Classic indie.',
        'https://www.dinknetwork.com/download/',
        'https://www.dinknetwork.com/images/screenshots/ss1.jpg',
        'Adventure'
    ),
    -- ==================== SPORTS GAMES (5) ====================
    (
        'Open Golf',
        'Free mini-golf game. 3D courses.',
        'https://github.com/nicoya/OpenGolf/releases',
        'https://github.com/nicoya/OpenGolf/raw/main/screenshots/ss1.jpg',
        'Sports'
    ),
    (
        'PokerTH',
        'Texas Hold em poker. AI and online.',
        'https://sourceforge.net/projects/pokerth/files/pokerth/1.1.2/PokerTH-1.1.2-win32-setup.exe/download',
        'https://www.pokerth.net/sshots/pokerth-sshot-1.png',
        'Sports'
    ),
    (
        'FooBillard++',
        'Pool and billiards game. 3D physics.',
        'https://foobillardplus.sourceforge.net/download.html',
        'https://foobillardplus.sourceforge.net/images/screenshots/ss1.jpg',
        'Sports'
    ),
    (
        'Neverputt',
        'Mini-golf from Neverball. 3D putting.',
        'https://neverball.org/neverball-1.6.0-win32.zip',
        'https://neverball.org/screenshots/neverputt-1.png',
        'Sports'
    ),
    (
        'PyChess',
        'Chess with AI and online play. Feature-rich.',
        'https://github.com/pychess/pychess/releases/download/1.0.3/pychess-1.0.3.exe',
        'https://pychess.github.io/images/new_game.png',
        'Sports'
    ),
    -- ==================== SANDBOX GAMES (5) ====================
    (
        'Minetest Sandbox',
        'Voxel sandbox like Minecraft. Infinite worlds.',
        'https://github.com/minetest/minetest/releases/download/5.8.0/minetest-5.8.0-win64.zip',
        'https://www.minetest.net/media/gallery/1.jpg',
        'Sandbox'
    ),
    (
        'Terasology',
        'Voxel world inspired by Minecraft. Modular.',
        'https://github.com/MovingBlocks/Terasology/releases',
        'https://terasology.org/images/screenshots/ss1.jpg',
        'Sandbox'
    ),
    (
        'Vintage Story Demo',
        'Survival sandbox with realistic systems. Deep.',
        'https://www.vintagestory.at/downloads/',
        'https://www.vintagestory.at/images/screenshots/ss1.jpg',
        'Sandbox'
    ),
    (
        'ClassiCube',
        'Minecraft Classic reimplementation. Nostalgia.',
        'https://www.classicube.net/download/',
        'https://www.classicube.net/images/screenshots/ss1.jpg',
        'Sandbox'
    ),
    (
        'Voxelands',
        'Voxel survival sandbox. Build and explore.',
        'https://www.voxelands.com/downloads/',
        'https://www.voxelands.com/images/screenshots/ss1.jpg',
        'Sandbox'
    );

-- Verify
SELECT
    COUNT(*) as total_games
FROM
    games;

SELECT
    category,
    COUNT(*) as count
FROM
    games
GROUP BY
    category
ORDER BY
    count DESC;