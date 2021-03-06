//////////////// GlOBALS
////////////////

//global debug flags
var g_enableCSVout = true;
var g_enableDebugLevelSelect = false;
var g_enableDebugMenu = true;
//g_data_init filled globals
var g_LEVEL_GRID = { //LEVELS' GRID SIZE (filled in by g_data_init)
	"TUTORIAL": [
			{"x":2,"y":2}
		]
};
var g_LEVEL_CLUES = { //LEVELS' TARGET CLUES (filled in by g_data_init)
	"TUTORIAL": [
				["hill","mountain"]
			]
};
var g_LEVEL_ELEPHANT = { //LEVELS' DEFAULT ELEPHANT LOCATION (filled in by g_data_init)
	"TUTORIAL": [
				[0,1,"south"] //[y,x]
			]
};
var g_CLUE_ABSTRACTION = { //LEVELS' CLUE DISPLAY TYPE (filled in by g_data_init)
	"TUTORIAL": [
				{"forest":"nonAbstract","mountain":"nonAbstract","desert":"nonAbstract","hill":"nonAbstract"}
			]
};
var g_LEVEL_NULL = { //keeps track of which levels are using null data so the level selection screen doesn't choke
	"TUTORIAL":[],
	"EASY":[],
	"MEDIUM":[],
	"HARD":[]
};
//other globals
var g_LevelTerrain = "LAND"; //current terrain type
var g_selectedDifficulty = "TUTORIAL"; //current level difficulty
var g_selectedLevel = 0; //current level index
var g_activeTile = [0,0]; //current exploration or search tile [y,x]
var g_heading = "north"; //current 360 view heading
var g_activeGrid = g_LEVEL_GRID[g_selectedDifficulty][g_selectedLevel]; //only used to determine level's grid size
var g_tilesRemaining = {};  //keep track of tiles that have yet to be visited in exploration view
var g_directionsRemaining = "nesw"; //keep track of directions visited in 360 view
var g_currentClue = ""; //current clue phase clue
var g_hasDrag = false; //has user attempted drag-drop yet
var g_clueUrlPost = {"nonAbstract":"_non-abstract-symbol.jpg","partialAbstract":"_partial-abstract-symbol.jpg","fullAbstract":"_abstract-symbol.jpg"}; //clue type url mapper
var g_modalLevel = 0; //keeps track of how many modals are open
var g_currentSet = 1; //current level mapset
var g_volumeLevel = 1; //currently used as global volume level for mute/unmute etc.
var g_mapscalex = 950; //dimensions of map images
var g_mapscaley = 620; //dimensions of map images
var g_cluescalex = 750; //dimensions of clue/search map old:725
var g_cluescaley = 489; //dimensions of clue/search map old:575
var g_currentDrag = ""; //clue type currently being used in drag/drop
var g_isRandomElephant = false; //toggle random elephant on/off
var g_randomElephantHeading = "north"; //use when elephant heading is to be random
var g_savestate = {
	"tutorial_complete": {"LAND":false,"WATER":false,"MANMADE":false,"EXPERT":false},
	"terrain_unlocked": {"LAND":true,"WATER":false,"MANMADE":false,"EXPERT":false},
	"game_state": {"landType": "LAND", "diff": "TUTORIAL", "level": 0, "phase": "levelselect"},
	"telemetry": {"session_id":0},
	"clue_mastery_p1": "0",
	"clue_mastery_p2": "0",
	"search_mastery": "0",
	"clue_track_p1": [[],[],[],[]],
	"clue_track_p2": [[],[],[],[]],
	"search_track": [[],[],[],[]],
	"legendLocks": {
		//"bridge": "none",
		"building": "none",
		"desert": "none",
		"forest": "none",
		//"hill": "none",
		"lake": "none",
		"mountain": "none",
		"ocean": "none",
		"park": "none",
		"road": "none",
		"stream": "none"
		//"waterfall": "none"
	},
	"levelsComplete": [],
	"chunkComplete": {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false},
	"stars": {
		"LAND": {"AS1":false,"AS2":false,"RL":false,"legend":false},
		"WATER": {"AS1":false,"AS2":false,"RL":false,"legend":false},
		"MANMADE": {"AS1":false,"AS2":false,"RL":false,"legend":false},
		"EXPERT": {"AS1":false,"AS2":false,"RL":false,"legend":false}
	},
	"showStars": false,
	"firstplay": true,
	"lastLevelPlayed": ""
};
var g_telemetry_cache = []; //for telemetry output from the client
var g_startTime = (new Date).getTime(); //for tracking time played
var g_searchAttempts = []; //telemetry
//fill in level data variables for specified land type
var g_data_init = function(landType) {
	if(landType === undefined){landType = "LAND"}
	g_LevelTerrain = landType.toUpperCase(); //keep case the same
	var difficultyTypes = ["TUTORIAL","EASY","MEDIUM","HARD"];
	for(var i = 0; i < difficultyTypes.length; i++) {
		var cDiff = difficultyTypes[i];
		g_LEVEL_GRID[cDiff] = [];
		g_LEVEL_CLUES[cDiff] = [];
		g_LEVEL_ELEPHANT[cDiff] = [];
		g_CLUE_ABSTRACTION[cDiff] = [];
		g_LEVEL_NULL[cDiff] = [];
		for(var indx = 0; indx < g_leveldata[landType][cDiff].length; indx++) {
			var cObj = g_leveldata[landType][cDiff][indx];
			if(cObj.gridSize === undefined) { //sanity check (will fill in dummy data for empty levels)
				g_LEVEL_GRID[cDiff].push( {"x": 1,"y": 1 } );
				g_LEVEL_CLUES[cDiff].push([]);
				g_LEVEL_ELEPHANT[cDiff].push([]);
				g_CLUE_ABSTRACTION[cDiff].push({});
				g_LEVEL_NULL[cDiff].push(true);
				continue;
			}
			g_LEVEL_GRID[cDiff].push( {"x": parseInt(cObj.gridSize.split("x")[0]),"y": parseInt(cObj.gridSize.split("x")[1])} );
			g_LEVEL_CLUES[cDiff].push(cObj.clues);
			g_LEVEL_ELEPHANT[cDiff].push(cObj.elephantLocation);
			g_CLUE_ABSTRACTION[cDiff].push(cObj.symbolStyle);
			g_LEVEL_NULL[cDiff].push(false);
		}
	}
};
g_data_init();

//////////////// Misc functions
////////////////

//used to start the next subLevel in sequence
var gotoNextLevelSequential = function() {
	if(typeof g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel+1] !== "undefined") {
		g_selectedLevel++;
		if(g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].hasExploration) {
			setStateExplore();
		} else {
			setStateClue();
		}
	} else {
		if(g_selectedDifficulty == "HARD") {
			setStateLevelSelect();
		} else {
			setStateSubLevelSelect(g_LevelTerrain);
		}
	}
};

//helper function for filling in level select screen
var fillLevels = function(ltype) {
	var diffmap = {"LAND":1,"WATER":4,"MANMADE":7,"EXPERT":10};
	var titlemap = {"LAND":"A","WATER":"B","MANMADE":"C","EXPERT":"D"};
	var htmlout = "<div class='difficultyTitle'>"+titlemap[ltype]+"</div>";
	htmlout += "<div class='missionBoxContainer' >";
	htmlout += "<center><table style='width:900px;"+(g_enableDebugLevelSelect ? "":"height:570px;")+"'>";
	var tutorial_len = g_LEVEL_GRID["TUTORIAL"].length;
	var difflen = g_LEVEL_GRID["EASY"].length + tutorial_len;
	difflen = difflen > g_LEVEL_GRID["MEDIUM"].length ? difflen : g_LEVEL_GRID["MEDIUM"].length;
	difflen = difflen > g_LEVEL_GRID["HARD"].length ? difflen : g_LEVEL_GRID["HARD"].length;
	var cNull;
	if(g_enableDebugLevelSelect) {
		//see all levels at once
		for(var a = 0; a < g_LEVEL_GRID["TUTORIAL"].length; a++) {
			htmlout += "<tr><td><center><div class='missionBox tutorial level d1' difficulty='TUTORIAL' level='"+a+"' id='tutorial"+(a+1)+"btn'>TUTORIAL "+(a+1)+"</div></center></td>";
			htmlout += "<td><center><div class='missionBox tutorial level d2' difficulty='TUTORIAL' level='"+a+"' style='opacity:0'></div></center></td>";
			htmlout += "<td><center><div class='missionBox tutorial level d3' difficulty='TUTORIAL' level='"+a+"' style='opacity:0'></div></center></td></tr>";
		}
		for(var i = 0; i < difflen; i++) {
			cNull = g_LEVEL_NULL["EASY"][i];
			htmlout += "<tr><td><center><div class='missionBox level "+(cNull ? "x":"d1")+"' difficulty='EASY' level='"+(i)+"' style='opacity:"+(i < g_LEVEL_GRID["EASY"].length ? 1 : 0)+"' id='easy"+(i+1)+"btn'>"+diffmap[ltype]+"." +(i+1)+"</div></center></td>";
			cNull = g_LEVEL_NULL["MEDIUM"][i];
			htmlout += "<td><center><div class='missionBox level "+(cNull ? "x":"d2")+"' difficulty='MEDIUM' level='"+i+"' style='opacity:"+(i < g_LEVEL_GRID["MEDIUM"].length ? 1 : 0)+"' id='medium"+(i+1)+"btn'>"+(diffmap[ltype]+1)+"."+(i+1)+"</div></center></td>";
			cNull = g_LEVEL_NULL["HARD"][i];
			htmlout += "<td><center><div class='missionBox level "+(cNull ? "x":"d3")+"' difficulty='HARD' level='"+i+"' style='opacity:"+(i < g_LEVEL_GRID["HARD"].length ? 1 : 0)+"' id='hard"+(i+1)+"btn'>"+(diffmap[ltype]+2)+"."+(i+1)+"</div></center></td></tr>";
		}
		htmlout += "</table></center>";
		htmlout += "</div>";
		jQuery("#difficultySelect").html(htmlout);
		//bind
		jQuery(".missionBox.level").click(function(){
			if(jQuery(this).hasClass("x")) {return;}
			playClickSFX();		
			g_selectedDifficulty = jQuery(this).attr("difficulty");
			g_selectedLevel = +jQuery(this).attr("level");
			g_activeGrid = g_LEVEL_GRID[g_selectedDifficulty][g_selectedLevel];
			g_currentSet = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].mapset;
			if(g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].hasExploration) {
				setStateExplore();
			} else {
				setStateClue();
			}
		});
	} else {
		//one box per mapset
		cNull = false;
		if(g_LevelTerrain === "EXPERT") {
			var iscomplete = g_savestate["chunkComplete"][diffmap[ltype]];
			htmlout += "<td><center><div class='missionBox chunk level "+(iscomplete ? "done ":"")+(cNull ? "x":"d2")+"' difficulty='MEDIUM' levelnum='"+(diffmap[ltype]+1)+"' style='opacity:"+1+"' id='medium"+"btn'>"+"Level 10</div></center></td>";
		} else {
			var iscomplete = g_savestate["chunkComplete"][diffmap[ltype]];
			htmlout += "<td><center><div class='missionBox chunk level "+(iscomplete ? "done ":"")+(cNull ? "x":"d2")+"' difficulty='EASY' levelnum='"+diffmap[ltype]+"' style='opacity:"+1+"' id='easy"+"btn'>"+"Level "+diffmap[ltype]+"</div></center></td>";
			iscomplete = g_savestate["chunkComplete"][diffmap[ltype]+1];
			htmlout += "<td><center><div class='missionBox chunk level "+(iscomplete ? "done ":"")+(cNull ? "x":"d2")+"' difficulty='MEDIUM' levelnum='"+(diffmap[ltype]+1)+"' style='opacity:"+1+"' id='medium"+"btn'>"+"Level "+(diffmap[ltype]+1)+"</div></center></td>";
			iscomplete = g_savestate["chunkComplete"][diffmap[ltype]+2];
			htmlout += "<td><center><div class='missionBox chunk level "+(iscomplete ? "done ":"")+(cNull ? "x":"d2")+"' difficulty='HARD' levelnum='"+(diffmap[ltype]+2)+"' style='opacity:"+1+"' id='hard"+"btn'>"+"Level "+(diffmap[ltype]+2)+"</div></center></td>";
		}

		htmlout += "</table></center>";
		htmlout += "</div>";
		jQuery("#difficultySelect").html(htmlout);
		//STARS
		var numYellow = 0;
		var numGray = 0;
		jQuery.each(g_savestate.stars[g_LevelTerrain], function(key, value) {
			if(value) {
				numYellow++;
			} else {
				numGray++;
			}
		});
		if(g_LevelTerrain == "MANMADE") {
			if(numYellow == 4) {
				numYellow--;
			} else {
				numGray--;
			}
		}
		if(g_LevelTerrain == "EXPERT") {
			numYellow = 0;
			numGray = 0;
		}
		starout = "<div class='stars'><center>";
		for(var i = 0; i < numYellow; i++) {
			starout += "<img src='assets/images/star-y.png' style='width:50px;height:50px;'/>";
		}
		for(var i = 0; i < numGray; i++) {
			starout += "<img src='assets/images/star-g.png' style='width:50px;height:50px;'/>";
		}
		starout += "</center></div>";
		jQuery("#menuContainer").append(starout);
		//bind
		jQuery(".missionBox.level").click(function(){
			if(jQuery(this).hasClass("x")) {return;}
			playClickSFX();		
			g_selectedDifficulty = jQuery(this).attr("difficulty");
			//select random level if already complete, otherwise go sequential
			if(g_savestate["chunkComplete"][jQuery(this).attr("levelnum")]) {
				g_selectedLevel = util.getRandomInt(0, g_leveldata[g_LevelTerrain][g_selectedDifficulty].length);
				//prevent doing exploration levels or the same level twich in a row
				while(g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].hasExploration || g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].taskid == g_savestate.lastLevelPlayed) {
					g_selectedLevel = util.getRandomInt(0, g_leveldata[g_LevelTerrain][g_selectedDifficulty].length);
				}
			} else {
				g_selectedLevel = 0;
				for(var i=0; i < g_leveldata[g_LevelTerrain][g_selectedDifficulty].length; i++) {
					var lvlId = g_leveldata[g_LevelTerrain][g_selectedDifficulty][i].taskid;
					if(g_savestate.levelsComplete.indexOf(lvlId) == -1) {
						g_selectedLevel = i;
						break;
					}
				}
			}
			g_activeGrid = g_LEVEL_GRID[g_selectedDifficulty][g_selectedLevel];
			g_currentSet = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].mapset;
			if(g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].hasExploration) {
				setStateExplore();
			} else {
				setStateClue();
			}
		});
	}

	jQuery("#menuCloseBtn").show();
	jQuery("#menuCloseBtn").unbind().click(function(){
		playClickSFX();
		jQuery(".stars").remove();
		tutorial.setLevelSelectText("");
		jQuery(this).hide();
		jQuery("#difficultySelect").hide();
		jQuery("#missionSelect").show();
	});
};

//debug option
var toggleDebugMenu = function() {
	if(jQuery("#debugBtn").css("opacity") == 1) {
		jQuery("#debugBtn").css("opacity",0);
		jQuery("#debugMenu").hide();
	} else {
		jQuery("#debugBtn").css("opacity",1);
		jQuery("#debugMenu").show();
	}
};

//debug option
var toggleRandom = function() {
	if(jQuery("#debugRandom").hasClass("random")) {
		jQuery("#debugRandom").removeClass("random");
		g_isRandomElephant = false;
	} else {
		jQuery("#debugRandom").addClass("random");
		g_isRandomElephant = true;
	}
};

//debug option
var toggleMute = function() {
	if(jQuery("#debugSound").hasClass("mute")) {
		jQuery("#debugSound").removeClass("mute");
		g_volumeLevel = 1;
		g_music["music_menu"].volume = 1;
		g_music["music_game"].volume = 1;
	} else {
		jQuery("#debugSound").addClass("mute");
		g_volumeLevel = 0;
		g_music["music_menu"].volume = 0;
		g_music["music_game"].volume = 0;
	}
};

//debug option
var toggleLevelSelect = function() {
	if(jQuery("#debugLevelSelect").hasClass("lson")) {
		jQuery("#debugLevelSelect").removeClass("lson");
		g_enableDebugLevelSelect = false;
	} else {
		jQuery("#debugLevelSelect").addClass("lson");
		g_enableDebugLevelSelect = true;
	}
};

//sound and music
var playMenuMusic = function() {
	if(g_music["music_game"].isPlaying) {
		g_music["music_game"].stop();
	}
	if(!g_music["music_menu"].isPlaying) {
		g_music["music_menu"].play(undefined,undefined,g_volumeLevel);
	}
};

var playGameMusic = function() {
	if(g_music["music_menu"].isPlaying) {
		g_music["music_menu"].stop();
	}
	if(!g_music["music_game"].isPlaying) {
		g_music["music_game"].play(undefined,undefined,g_volumeLevel);
	}
};

var playClickSFX = function() {
	g_sfx.clicksfx.play(undefined,undefined,g_volumeLevel);
};

var playCurrentLevelSearchVoice = function() {
	if(typeof g_sfx[util.currentLevelId()] === "undefined") {
		return;
	}
	if(g_sfx[util.currentLevelId()].isPlaying) {
		g_sfx[util.currentLevelId()].stop();
	}
	g_sfx[ util.currentLevelId() ].play(undefined,undefined,g_volumeLevel);
};

var playClueVoice = function(clue) {
	g_sfx[ clue ].play(undefined,undefined,g_volumeLevel);
};

//////////////// State Transition functions
////////////////

var saveState = function() {
	g_savestate.game_state.landType = g_LevelTerrain;
	g_savestate.game_state.diff = g_selectedDifficulty;
	g_savestate.game_state.level = g_selectedLevel;
	//save local
	localStorage.setItem("savestate", JSON.stringify(g_savestate));
	//save remote
	app.container.send("game_data_save", {is_second_player: false, "game_data": JSON.stringify(g_savestate)});
	app.container.send("game_data_save", {is_second_player: true, "game_data": JSON.stringify(g_savestate)});
};
var loadState = function() {
	//load save from BE if availible, otherwise fall back to localstorage
	if(typeof g_BEuserdata === "undefined") {
		g_savestate = (localStorage.getItem("savestate") == null) ? g_savestate : JSON.parse(localStorage.getItem("savestate"));
	} else {
		if(g_BEuserdata.data[0].game_data == "") {
			//use empty savedata rather than falling back to localstorage for now
			//g_savestate = (localStorage.getItem("savestate") == null) ? g_savestate : JSON.parse(localStorage.getItem("savestate"));
		} else {
			g_savestate = JSON.parse(g_BEuserdata.data[0].game_data);
		}
	}
	g_LevelTerrain = g_savestate.game_state.landType;
	g_selectedDifficulty = g_savestate.game_state.diff;
	g_selectedLevel = g_savestate.game_state.level;
	if(g_savestate.telemetry === undefined) {
		g_savestate.telemetry = {};
		g_savestate.telemetry.session_id = 0;
	} else {
		g_savestate.telemetry.session_id += 1;
	}
};
var resumeState = function() {
	if(g_savestate.game_state !== undefined) {
		setToLevel(g_savestate.game_state.landType, g_savestate.game_state.diff, g_savestate.game_state.level, g_savestate.game_state.phase);
	} else {
		console.log("missing game state data");
	}	
};
var setStateTitle = function() {
	playMenuMusic();
	loadState();
	util.template.getHTML("assets/js/title.html", function(data){
		jQuery("#uiLayer").removeClass("bg1").removeClass("cluePhase").html(data);
		//init here
		jQuery("#playBtn").unbind().click(function(){
			g_startTime = (new Date).getTime();
			elephantTelemetry.createEvent("start_game");
			playClickSFX();
			//setStateLevelSelect();
			if(g_savestate.firstplay) {
				var htmlout = "<div id='firstplaynext' class='firstNextBtn'></div>";
				htmlout += "<center><div style='position:absolute;top:180px;width:100%;'><span style='font-size:40px;'>In this game, sometimes we need to take turns and sometimes we need to work together.</span></div></center>";
				util.openModal(htmlout);
				jQuery(".modalContainer._"+g_modalLevel+" .closeBtn").click(function(){
					setToTutorialLevel();
				});
				jQuery("#firstplaynext").click(function(){
					jQuery(".modalContainer._"+g_modalLevel+" .closeBtn").click();
				});
				g_savestate.firstplay = false;
			} else {
				resumeState();
			}
		});
		if(g_enableDebugMenu) {
			jQuery("#debugBtn").unbind().click(function(){playClickSFX();toggleDebugMenu();});
			jQuery("#debugLock").unbind().click(function(){playClickSFX();util.clearSave();});
			jQuery("#debugUnlock").unbind().click(function(){playClickSFX();util.unlockAll();});
			jQuery("#debugSound").unbind().click(function(){playClickSFX();toggleMute();});
			jQuery("#debugRandom").unbind().click(function(){playClickSFX();toggleRandom();});
			jQuery("#debugLevelSelect").unbind().click(function(){playClickSFX();toggleLevelSelect();});
		}
		toggleRandom(); //random is now the default
	});
};
var setToTutorialLevel = function() {
	g_selectedDifficulty = "TUTORIAL";
	g_selectedLevel = 0;
	g_activeGrid = g_LEVEL_GRID[g_selectedDifficulty][g_selectedLevel];
	g_currentSet = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].mapset;
	if(g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].hasExploration) {
		setStateExplore();
	} else {
		setStateClue();
	}
};
//jump to a specific part of a level
var setToLevel = function(landType, diff, level, phase) {
	g_data_init(landType);
	g_selectedDifficulty = diff;
	g_selectedLevel = level;
	g_activeGrid = g_LEVEL_GRID[g_selectedDifficulty][g_selectedLevel];
	g_currentSet = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].mapset;
	if(phase == "explore") {
		setStateExplore();
	} else if(phase == "clue") {
		setStateClue();
	} else if(phase == "clue2") {
		setStateClueTwo();
	} else if(phase == "search") {
		setStateSearchSelect();
	} else if(phase.indexOf("searchfp") != -1) {
		var coordVals = phase.split("_");
		if(coordVals.length == 3) {
			g_activeTile[0] = parseInt(coordVals[1]);
			g_activeTile[1] = parseInt(coordVals[2]);
		}
		setStateSearchFirstPerson();
	} else if(phase == "levelselect") {
		setStateLevelSelect();
	} else {
		setStateTitle();
	}
};
var setStateSubLevelSelect = function(landtype) { //jump directly to second half of level selection
	if(landtype === undefined){landtype = g_LevelTerrain;}
	setStateLevelSelect(function(){
		g_data_init(landtype);
		fillLevels(landtype);
		jQuery("#missionSelect").hide();
		jQuery("#difficultySelect").show();
	});
};
var setStateLevelSelect = function(cb) {
	g_savestate.game_state.phase = "levelselect";
	saveState();
	playMenuMusic();
	if(cb === undefined){cb = function(){};}
	util.template.getHTML("assets/js/menu.html", function(data){
		jQuery("#uiLayer").removeClass("bg1").removeClass("cluePhase").html(data);
		if(g_savestate.terrain_unlocked.WATER) {
			jQuery(".missionBoxOverlay.l2").css("opacity",0);
		}
		if(g_savestate.terrain_unlocked.MANMADE) {
			jQuery(".missionBoxOverlay.l3").css("opacity",0);
		}
		if(g_savestate.terrain_unlocked.EXPERT) {
			jQuery(".missionBoxOverlay.l4").css("opacity",0);
			jQuery(".missionBox.b4").css("display","");
		}
		//bind buttons
		jQuery(".missionBox").click(function(){
			playClickSFX();
			if(jQuery(this).hasClass("b1")) {
				if(jQuery(".missionBoxOverlay.l1").css("opacity") != 0){return;}
				g_data_init("LAND");
				if(g_savestate.tutorial_complete["LAND"]) {
					fillLevels("LAND");
				} else {
					setToTutorialLevel();
				}
			} else if(jQuery(this).hasClass("b2")) {
				if(jQuery(".missionBoxOverlay.l2").css("opacity") != 0){return;}
				g_data_init("WATER");
				if(g_savestate.tutorial_complete["WATER"]) {
					fillLevels("WATER");
				} else {
					setToTutorialLevel();
				}
			} else if(jQuery(this).hasClass("b3")) {
				if(jQuery(".missionBoxOverlay.l3").css("opacity") != 0){return;}
				g_data_init("MANMADE");
				if(g_savestate.tutorial_complete["MANMADE"]) {
					fillLevels("MANMADE");
				} else {
					setToTutorialLevel();
				}
			} else if(jQuery(this).hasClass("b4")) {
				if(jQuery(".missionBoxOverlay.l4").css("opacity") != 0){return;}
				g_data_init("EXPERT");
				if(g_savestate.tutorial_complete["EXPERT"]) {
					fillLevels("EXPERT");
				} else {
					setToTutorialLevel();
				}
			}
			jQuery("#missionSelect").hide();
			jQuery("#difficultySelect").show();
		});
		cb();
	});
};
//set state to exploration
var setStateExplore = function() {
	g_savestate.game_state.phase = "explore";
	saveState();
	playGameMusic();
	util.template.getHTML("assets/js/explore.html", function(data){
		jQuery("#uiLayer").html(data);
		if(util.currentLevelId() === "1_T1") {
			util.player.setPlayerNoModal(1);
			tutorial.a1();
		} else if(util.currentLevelId() === "1_T2") {
			util.player.setPlayerNoModal(1);
			tutorial.b1();
		} else {
			util.player.setPlayer(1);
		}
		jQuery("#uiLayer").addClass("bg1");
		createExploreMap();
	});
};
//set state to first clue
var setStateClue = function() {
	g_savestate.game_state.phase = "clue";
	saveState();
	g_clueAttempts = []; //reset try number telemetry
	playGameMusic();
	jQuery("#uiLayer").html("");
	if(util.currentLevelId() === "1_T3") {
		util.template.getHTML("assets/js/clue.html", function(data){
			jQuery("#uiLayer").removeClass("bg1").addClass("cluePhase").html(data);
			util.player.setPlayerNoModal(1);
			tutorial.d1();
			//init here
			createClueMap();
			jQuery("#clueLegend").unbind().click(function(){
				playClickSFX();
				openLegendModal();
			});
			jQuery(".clueBar .clueDrop2").unbind().click(function(){
				playClickSFX();
				openClueModal();
				elephantTelemetry.createEvent("clue_repeat",{"correct_selection":g_currentClue});
			});
			jQuery(".clueBar .clueDoneBtn").unbind().click(function(){
				playClickSFX();
				confirmClue();
			});
			openClueModal(function(){
				util.animation.dragDropAnim();
				tutorial.setAvatarText("Player 1, do you see the clue on the map? Drag it to the box.",undefined,"ta10");
			});
		});
	} else {
		util.timer.resetTimer(); //timer for help
		util.template.getHTML("assets/js/clue.html", function(data){
			jQuery("#uiLayer").removeClass("bg1").addClass("cluePhase").html(data);
			util.player.setPlayer(1);
			//init here
			createClueMap();
			jQuery("#clueLegend").unbind().click(function(){
				playClickSFX();
				openLegendModal();
			});
			jQuery(".clueBar .clueDrop2").unbind().click(function(){
				playClickSFX();
				openClueModal();
				elephantTelemetry.createEvent("clue_repeat",{"correct_selection":g_currentClue});
			});
			jQuery(".clueBar .clueDoneBtn").unbind().click(function(){
				playClickSFX();
				confirmClue();
			});
			openClueModal();
		});
	}
};
//set state to second clue
var setStateClueTwo = function() {
	g_savestate.game_state.phase = "clue2";
	saveState();
	util.timer.resetTimer(); //timer for help
	playGameMusic();
	jQuery("#uiLayer").html("");
	util.template.getHTML("assets/js/clue.html", function(data){
		jQuery("#uiLayer").removeClass("bg1").addClass("cluePhase").html(data);
		if(util.currentLevelId() === "1_T3") {
			util.player.setPlayerNoModal(2);
			tutorial.e1();
		} else {
			util.player.setPlayer(2);
		}
		//init here
		createClueMap();
		g_currentClue = g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][1];
		jQuery("#clueLegend").unbind().click(function(){
			playClickSFX();
			openLegendModal();
		});
		jQuery(".clueBar .clueDrop2").unbind().click(function(){
			playClickSFX();
			openClueModal();
			elephantTelemetry.createEvent("clue_repeat");
		});
		jQuery(".clueBar .clueDoneBtn").unbind().click(function(){
			playClickSFX();
			confirmClue();
		});
		if(util.currentLevelId() === "1_T3") {
			openClueModal(util.animation.dragDropAnim);
		} else {
			openClueModal();
		}
	});
};
//set state to map square selection
var setStateSearchSelect = function() {
	g_savestate.game_state.phase = "search";
	saveState();
	g_searchAttempts = []; //reset try number (telemetry)
	util.timer.resetTimer(); //timer for help
	playGameMusic();
	jQuery("#uiLayer").html("");
	util.template.getHTML("assets/js/searchmap.html", function(data){
		jQuery("#uiLayer").removeClass("bg1").addClass("cluePhase").html(data);
		//init here
		if(util.currentLevelId() === "1_T3") {
			util.player.setPlayerNoModal(0);
			tutorial.f1();
		} else {
			util.player.setPlayer(0);
		}
		//play search sound on focus
		jQuery(".playerModalContainer .closeBtn, .playerModalContainer .playerNextBtn").click(function(){
			playCurrentLevelSearchVoice();
		});
		createSearchMap();
		//clue icons
		var clue1 = g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][0];
		var clue2 = g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][1];
		var clue1post = util.getCluePath(clue1);
		var clue2post = util.getCluePath(clue2);
		//set clue urls
		var clueurl1 = "<img style='width:100%;height:100%;' src='"+"assets/images/clue/"+clue1.toUpperCase()+clue1post+"'>";
		var clueurl2 = "<img style='width:100%;height:100%;' src='"+"assets/images/clue/"+clue2.toUpperCase()+clue2post+"'>";
		jQuery("#clueDrop1").html(clueurl1);
		jQuery("#clueDrop2").html(clueurl2);
		//clue modifiers
		if(typeof g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].clueMod !== "undefined") {
			var clueMods = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].clueMod;
			if(clueMods[0] != "none") {
				jQuery("#clueDrop1txt").html(clueMods[0]);
			} else {
				jQuery("#clueDrop1txt").html("");
			}
			if(clueMods[1] != "none") {
				jQuery("#clueDrop2txt").html(clueMods[1]);
			} else {
				jQuery("#clueDrop2txt").html("");
			}
		}
		//show overlay grid (dotted line)
		jQuery(".clueGridOverlay").show();
		//show instructional text
		var clevelid = util.currentLevelId();
		if(typeof g_searchText[clevelid] !== "undefined") {
			tutorial.setAvatarText(g_searchText[clevelid]);
			jQuery("#clueTutorialTextMap").after("<div class='searchVoicebtn'></div>");
			jQuery(".searchVoicebtn").click(function(){
				playCurrentLevelSearchVoice();
			});
		}
		//bind overlay grid
		jQuery(".clueOverlayBox").unbind().click(function(){
			playClickSFX();
			jQuery("#clueDoneBtn").show();
			if( jQuery(this).hasClass("active") ){
				//
			} else {
				jQuery(".clueOverlayBox").removeClass("active");
				jQuery(this).addClass("active");
				var tilecoords = [jQuery(this).attr("coordinant").split("_")[0], jQuery(this).attr("coordinant").split("_")[1]];
				var clueData = [ g_LEVEL_ELEPHANT[g_selectedDifficulty][g_selectedLevel][0], g_LEVEL_ELEPHANT[g_selectedDifficulty][g_selectedLevel][1] ];
				elephantTelemetry.createEvent("search_select",{"player_selection":util.strCoordToInt(tilecoords),"correct_selection":clueData});
				if(util.currentLevelId() === "1_T3") {
					tutorial.f3();
				}
			}
		});
		jQuery("#clueDoneBtn").click(function(){
			playClickSFX();
			var isCorrect = false; //for telemetry
			//OPEN FPS VIEW
			var cTile = jQuery(".clueOverlayBox.active");
			if(cTile.length > 0) {
				g_activeTile = [cTile.attr("coordinant").split("_")[0], cTile.attr("coordinant").split("_")[1]];
				g_heading = "north";
				var clueData = [ g_LEVEL_ELEPHANT[g_selectedDifficulty][g_selectedLevel][0], g_LEVEL_ELEPHANT[g_selectedDifficulty][g_selectedLevel][1] ];
				if(clueData[0] == g_activeTile[0] && clueData[1] == g_activeTile[1]) {
					util.animation.correctAnim(setStateSearchFirstPerson);
					isCorrect = true;
					if(util.currentLevelId() === "1_T3") {
						tutorial.f5();
					}
				} else {
					if(util.currentLevelId() === "1_T3") {
						tutorial.f4();
					}
					util.animation.incorrectAnim();
				}
				g_searchAttempts.push(isCorrect);
				//mastery check/////////
				var masteryUp = false;
				var isDuplicate = false;
				if(util.currentLevelId().indexOf("T") == -1 &&
					g_savestate.search_track[util.getMasteryIndex()].indexOf(util.currentLevelId()) == -1) {
					if(isCorrect) {
						g_savestate.search_track[util.getMasteryIndex()].push(util.currentLevelId());
					} else {
						g_savestate.search_track[util.getMasteryIndex()].push(false);
					}
					var correctCount = 0;
					for(var i = 0; i < g_savestate.search_track[util.getMasteryIndex()].length; i++) {
						if(g_savestate.search_track[util.getMasteryIndex()][i]) {
							correctCount++;
						}
					}
					if(g_savestate.search_track[util.getMasteryIndex()].length >= 5 || correctCount >= 3) {
						if(correctCount >= 3) {
							//do correct
							masteryUp = true;
						} else {
							//do failure
							masteryUp = false;
						}
						if( (util.getLowerMastery(g_savestate.search_mastery,util.getMasteryTargets()[1]) == g_savestate.search_mastery) && (g_savestate.search_mastery != util.getMasteryTargets()[1])) {
							//check to see if target mastery level has already been obtained
							isDuplicate = false;
						} else {
							isDuplicate = true;
						}
						if(!isDuplicate) {
							//one objective complete event for each player
							app.container.send("objective_complete", {
								"op_label": "rl_mastery_" + util.getMasteryTargets()[1],
								"success": masteryUp,
								"is_second_player": false
							});
							app.container.send("objective_complete", {
								"op_label": "rl_mastery_" + util.getMasteryTargets()[1],
								"success": masteryUp,
								"is_second_player": true
							});
							g_savestate.showStars = true;
						}
						if(masteryUp) {
							g_savestate.search_mastery = util.getHigherMasteryRL(util.getMasteryTargets()[1], g_savestate.search_mastery);
							g_savestate.stars[g_LevelTerrain]["RL"] = true;
						}
						console.log("search mastery:" + masteryUp);
						//reset tracking
						g_savestate.search_track[util.getMasteryIndex()] = [];
					}
				}
				////////////////////////
				saveState();
				if(isDuplicate){
					masteryUp = false;
				}
				elephantTelemetry.createEvent("search_done", {"pass_fail":isCorrect,"player_selection":util.strCoordToInt(g_activeTile),"correct_selection":clueData,"attempt_num":g_searchAttempts.length,"mastery_up":masteryUp});
			} else {
				//if no space selected
			}
		});
	});
};
//set state to elephant search first person
var setStateSearchFirstPerson = function() {
	g_savestate.game_state.phase = "searchfp_"+g_activeTile[0]+"_"+g_activeTile[1];
	saveState();
	util.timer.stopTimer(); //don't think we'll need the timer for this section?
	playGameMusic();
	if(g_isRandomElephant) {
		switch(util.getRandomInt(0,4)) {
			case 0:
				g_randomElephantHeading = "north";
				break;
			case 1:
				g_randomElephantHeading = "east";
				break;
			case 2:
				g_randomElephantHeading = "south";
				break;
			case 3:
				g_randomElephantHeading = "west";
				break;
		}
	}
	util.template.getHTML("assets/js/search.html", function(data){
		g_directionsRemaining = "nesw".replace(g_heading[0], "");
		jQuery("#uiLayer").html(data);
		//init here
		if(util.currentLevelId() === "1_T3") {
			tutorial.g1();
		} else {
			util.player.setPlayer(0);
		}
		jQuery("#uiLayer").addClass("bg1").removeClass("cluePhase");
		createSearchView();
	});
};