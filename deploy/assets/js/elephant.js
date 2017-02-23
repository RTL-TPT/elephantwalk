//////////////// GlOBALS
////////////////

var g_WIDTH = 1024; //unusued
var g_HEIGHT = 768; //unusued
var g_STATES = ["title","levelselect","explore","clue","search"]; //unusued
//LEVEL DATA
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
var g_LEVEL_NULL = { //keeps track of which levels are using null data, shouldn't be needed once everything is finished
	"TUTORIAL":[],
	"EASY":[],
	"MEDIUM":[],
	"HARD":[]
};
var g_LevelTerrain = "LAND"; //current terrain type
var g_selectedDifficulty = "TUTORIAL"; //current level difficulty
var g_selectedLevel = 0; //current level index
var g_activeTile = [0,0]; //current exploration or search tile [y,x]
var g_heading = "north"; //current 360 view heading
//other globals
var g_activeGrid = g_LEVEL_GRID[g_selectedDifficulty][g_selectedLevel]; //ONLY USED FOR LEVEL'S GRID SIZE
var g_tilesRemaining = {};  //keep track of tiles that have yet to be visited in exploration view
var g_directionsRemaining = "nesw"; //keep track of directions visited in 360 view
var g_currentClue = ""; //current clue phase clue
var g_hasDrag = false; //has user attempted drag-drop yet
var g_clueUrlPost = {"nonAbstract":"_non-abstract-symbol.jpg","partialAbstract":"_partial-abstract-symbol.jpg","fullAbstract":"_abstract-symbol.jpg"}; //clue type url mapper
var g_isAlpha = false; //alpha flag
var g_modalLevel = 0; //keeps track of how many modals are open
var g_currentSet = 1; //current level mapset
var g_tutorial_complete = (localStorage.getItem("g_tutorial_complete") == null) ? {"LAND":false,"WATER":false,"MANMADE":false,"EXPERT":false} : JSON.parse(localStorage.getItem("g_tutorial_complete")); //keep track of tutorial status
var g_terrain_unlocked = (localStorage.getItem("g_terrain_unlocked") == null) ? {"LAND":true,"WATER":false,"MANMADE":false,"EXPERT":false} : JSON.parse(localStorage.getItem("g_terrain_unlocked")); //keep track of land unlocks
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
			g_LEVEL_GRID[cDiff].push( {"x": parseInt(cObj.gridSize.split("x")[0]),"y": parseInt(cObj.gridSize.split("x")[1]) } );
			g_LEVEL_CLUES[cDiff].push(cObj.clues);
			g_LEVEL_ELEPHANT[cDiff].push(cObj.elephantLocation);
			g_CLUE_ABSTRACTION[cDiff].push(cObj.symbolStyle);
			g_LEVEL_NULL[cDiff].push(false);
		}
	}
};
g_data_init();

//////////////// UTILITY
////////////////

var util = {};
util.player = (function() {
	var currentplayer = 1;

	var openPlayerModal_ = function(closeCallback) {
		if(closeCallback === undefined) {closeCallback = function(){};}
		var htmlout = "";
		htmlout += "<div class='playerModalOverlay'></div>";
		htmlout += "<div class='playerModalContainer'>";
		htmlout += "<div class='closeBtn'></div>";
		htmlout += "<div class='playerNextBtn'></div>";

		htmlout += "<div style='position:absolute;top:180px;width:100%;'><span style='font-size:40px;'>It's your turn</span><br/><span style='font-size:100px;'>Player number</span></div>".replace("number",util.player.getPlayer());

		htmlout += "</div>";

		jQuery("#uiLayer").append(htmlout);
		jQuery(".playerModalContainer .closeBtn, .playerModalContainer .playerNextBtn").click(function(){
			jQuery(".playerModalContainer").remove();
			jQuery(".playerModalOverlay").remove();
			if(jQuery(".modalContainer._"+g_modalLevel+" .clueContainer").length > 0) {
				g_sfx[g_currentClue].play();
			}
			closeCallback();
		});
	};

	var setPlayerImg_ = function() {
		jQuery("#playerIcon").html("<img style='width:100%;height:100%' src='assets/images/icon_p"+currentplayer+".png'>");
	};
	var togglePlayer_ = function(callback) {
		currentplayer = currentplayer === 1 ? 2 : 1;
		setPlayerImg_();
		openPlayerModal_(callback);
	};
	var getPlayer_ = function() {
		return currentplayer;
	};
	var setPlayer_ = function(playerNum, callback) {
		currentplayer = playerNum;
		setPlayerImg_();
		openPlayerModal_(callback);
	};

	return {
		"togglePlayer":togglePlayer_,
		"getPlayer": getPlayer_,
		"setPlayer": setPlayer_
	};
})();

util.getRandomInt = function(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

util.template = (function() {
	var getHTML_ = function(cURL, callback, dataType) {
		if(callback === undefined) {callback = function(){};}
		var response_ = function(data,status,xhr) {
			if(status === "success" || status === "notmodified") {
				callback(data);
			} else {
				console.log("request failure: " + cURL);
			}
		};
		if(dataType === undefined) {dataType = "text"};
		jQuery.get(cURL,undefined,response_,dataType);
	};

	var setDOM_ = function(cURL, elementId) {
		getHTML_(cURL, function(data){
			jQuery("#"+elementId).html(data);
		});
	};

	return {
		"getHTML": getHTML_,
		"setDOM": setDOM_
	};
})();

util.getTilePath = function(indx,indy) {
	return "assets/images/lvlsets/"+g_leveldata[g_LevelTerrain][g_selectedDifficulty][parseInt(g_selectedLevel)].mapset+"/"+indx+"_"+indy+"_map.gif";
};
util.getFacingPath = function(indx,indy,direction) {
	return "assets/images/lvlsets/"+g_leveldata[g_LevelTerrain][g_selectedDifficulty][parseInt(g_selectedLevel)].mapset+"/"+indx+"_"+indy+"_"+direction+".jpg";
};
util.getFacingPathElephant = function(indx,indy,direction) {
	return "assets/images/lvlsets/"+g_leveldata[g_LevelTerrain][g_selectedDifficulty][parseInt(g_selectedLevel)].mapset+"/"+indx+"_"+indy+"_"+direction+"_elephant.jpg";
};
util.getCluePath = function(clue) {
	return g_clueUrlPost[ g_CLUE_ABSTRACTION[g_selectedDifficulty][g_selectedLevel][clue] ];
};

util.openModal = function(content) {
	g_modalLevel++;
	var htmlout = "";
	htmlout += "<div class='modalOverlay _"+g_modalLevel+"'></div>";
	htmlout += "<div class='modalContainer _"+g_modalLevel+"'>";
	htmlout += "<div class='closeBtn _"+g_modalLevel+"'></div>";

	htmlout += content;

	htmlout += "</div>";

	jQuery("#uiLayer").append(htmlout);
	jQuery(".modalContainer._"+g_modalLevel+" .closeBtn").click(function(){
		jQuery(".modalContainer._"+g_modalLevel).remove();
		jQuery(".modalOverlay._"+g_modalLevel).remove();
		g_modalLevel--;
	});
};

util.animation = (function() {
	var correctAnim = function(callback) {
		if(callback === undefined) {callback = function(){};}
		var combinedCallback = function(){
			jQuery("#answerOverlay").fadeOut(500,function(){jQuery("#answerOverlay").remove();callback();});
		};
		jQuery("#uiLayer").append("<div id='answerOverlay' class='correctOverlay'><div id='correctImg' class='correctImg'></div></div>");
		jQuery("#correctImg").animate({"background-size":"50%"},{"duration":750,"always":combinedCallback});
	};

	var incorrectAnim = function(callback) {
		if(callback === undefined) {callback = function(){};}
		var combinedCallback = function(){
			jQuery("#answerOverlay").fadeOut(500,function(){jQuery("#answerOverlay").remove();callback();});
		};
		jQuery("#uiLayer").append("<div id='answerOverlay' class='incorrectOverlay'><div id='incorrectImg' class='incorrectImg'></div></div>");
		jQuery("#incorrectImg").animate({"background-size":"50%"},{"duration":750,"always":combinedCallback});
	};

	var playerAnim = function(callback) {
		if(callback === undefined) {callback = function(){};}
		var combinedCallback = function(){
			jQuery("#playerTextOverlay").fadeOut(500,function(){jQuery("#playerTextOverlay").remove();callback();});
		};
		jQuery("#uiLayer").append("<div id='playerTextOverlay' class='playerTextOverlay'><div id='playerText' class='playerText'>Player "+util.player.getPlayer()+"</div></div>");
		jQuery("#playerText").animate({"font-size":"160px"},{"duration":750,"always":combinedCallback});
	};

	var dragDropAnim = function(callback) {
		if(callback === undefined) {callback = function(){};}
		if(g_hasDrag) {
			g_hasDrag = false; //reset for future use
			return;
		}
		var bounceDuration = 400;
		var animPart2 = function(){
			jQuery("#indicatorHand").animate({"left":"+=20px"},{"duration":bounceDuration}).animate({"left":"-=20px"},{"duration":bounceDuration}).animate({"left":"+=20px"},{"duration":bounceDuration}).animate({"left":"-=20px"},{"duration":bounceDuration,"always":lastCallback});
		};
		var lastCallback = function(){
			jQuery("#indicatorHand").fadeOut(400,function(){jQuery("#indicatorHand").remove();});
			callback();
			setTimeout(dragDropAnim, 2000);
		};
		jQuery("#clueBar").after("<div id='indicatorHand' class='indicatorHand'></div>");
		jQuery("#indicatorHand").animate({"left":"872px","top":"86px"},{"duration":1800,"always":animPart2});
	};

	return {
		"correctAnim": correctAnim,
		"incorrectAnim": incorrectAnim,
		"playerAnim": playerAnim,
		"dragDropAnim": dragDropAnim
	};
})();

//////////////// MISC
////////////////

var fillMissions = function() {
	//
};

var fillLevels = function(ltype) {
	var diffmap = {"LAND":1,"WATER":4,"MANMADE":7,"EXPERT":10};
	var htmlout = "<div class='difficultyTitle'>"+ltype+"</div>";
	htmlout += "<div class='missionBoxContainer' >";
	htmlout += "<center><table style='width:900px'>";
	var tutorial_len = g_LEVEL_GRID["TUTORIAL"].length;
	var difflen = g_LEVEL_GRID["EASY"].length + tutorial_len;
	difflen = difflen > g_LEVEL_GRID["MEDIUM"].length ? difflen : g_LEVEL_GRID["MEDIUM"].length;
	difflen = difflen > g_LEVEL_GRID["HARD"].length ? difflen : g_LEVEL_GRID["HARD"].length;
	/*for(var a = 0; a < g_LEVEL_GRID["TUTORIAL"].length; a++) {
		htmlout += "<tr><td><center><div class='missionBox level d1' difficulty='TUTORIAL' level='"+a+"' id='tutorial"+(a+1)+"btn'>TUTORIAL "+diffmap[ltype]+"." +(a+1)+"</div></center></td>";
		htmlout += "<td><center><div class='missionBox level d2' difficulty='TUTORIAL' level='"+a+"' style='opacity:0'></div></center></td>";
		htmlout += "<td><center><div class='missionBox level d3' difficulty='TUTORIAL' level='"+a+"' style='opacity:0'></div></center></td></tr>";
	}*/
	for(var i = 0; i < difflen; i++) {
		var cNull = g_LEVEL_NULL["TUTORIAL"][i];
		if(i < tutorial_len) {
			htmlout += "<tr><td><center><div class='missionBox level "+(cNull ? "x":"d1")+"' difficulty='TUTORIAL' level='"+i+"' style='opacity:"+(i < tutorial_len ? 1 : 0)+"' id='tutorial"+(i+1)+"btn'> TUTORIAL "+diffmap[ltype]+"." +(i+1)+"</div></center></td>";
		} else {
			cNull = g_LEVEL_NULL["EASY"][i-tutorial_len];
			htmlout += "<tr><td><center><div class='missionBox level "+(cNull ? "x":"d1")+"' difficulty='EASY' level='"+(i-tutorial_len)+"' style='opacity:"+(i-tutorial_len < g_LEVEL_GRID["EASY"].length ? 1 : 0)+"' id='easy"+(i-tutorial_len+1)+"btn'>"+diffmap[ltype]+"." +(i+1)+"</div></center></td>";
		}
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
	jQuery("#menuCloseBtn").show();
	jQuery("#menuCloseBtn").unbind().click(function(){
		jQuery(this).hide();
		jQuery("#difficultySelect").hide();
		jQuery("#missionSelect").show();
	});
};

//////////////// State Transitions
////////////////

var setStateTitle = function() {
	util.template.getHTML("assets/js/title.html", function(data){
		jQuery("#uiLayer").removeClass("bg1").removeClass("cluePhase").html(data);
		//init here
		jQuery("#playBtn").click(function(){setStateLevelSelect();});
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
	if(cb === undefined){cb = function(){};}
	util.template.getHTML("assets/js/menu.html", function(data){
		jQuery("#uiLayer").removeClass("bg1").removeClass("cluePhase").html(data);
		if(g_terrain_unlocked.WATER) {
			jQuery(".missionBoxOverlay.l2").css("opacity",0);
		}
		if(g_terrain_unlocked.MANMADE) {
			jQuery(".missionBoxOverlay.l3").css("opacity",0);
		}
		if(g_terrain_unlocked.EXPERT) {
			jQuery(".missionBoxOverlay.l4").css("opacity",0);
		}
		//bind buttons
		jQuery(".missionBox").click(function(){
			if(jQuery(this).hasClass("b1")) {
				g_data_init("LAND");
				if(g_tutorial_complete["LAND"]) {
					fillLevels("LAND");
				} else {
					setToTutorialLevel();
				}
			} else if(jQuery(this).hasClass("b2")) {
				g_data_init("WATER");
				if(g_tutorial_complete["WATER"]) {
					fillLevels("WATER");
				} else {
					setToTutorialLevel();
				}
			} else if(jQuery(this).hasClass("b3")) {
				g_data_init("MANMADE");
				if(g_tutorial_complete["MANMADE"]) {
					fillLevels("MANMADE");
				} else {
					setToTutorialLevel();
				}
			} else if(jQuery(this).hasClass("b4")) {
				g_data_init("EXPERT");
				if(g_tutorial_complete["EXPERT"]) {
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
var setStateExplore = function() {
	util.template.getHTML("assets/js/explore.html", function(data){
		jQuery("#uiLayer").html(data);
		//init here
		util.player.setPlayer(1);
		jQuery("#uiLayer").addClass("bg1");
		createExploreMap();
	});
};
var setStateClue = function() {
	//console.log("cluephase");
	jQuery("#uiLayer").html("");
	util.template.getHTML("assets/js/clue.html", function(data){
		jQuery("#uiLayer").removeClass("bg1").addClass("cluePhase").html(data);
		util.player.setPlayer(1);
		//init here
		createClueMap();
		jQuery("#clueLegend").unbind().click(function(){
			openLegendModal();
		});
		jQuery(".clueBar .clueDrop2").unbind().click(function(){
			openClueModal();
		});
		jQuery(".clueBar .clueDoneBtn").unbind().click(function(){
			confirmClue();
		});
		openClueModal(util.animation.dragDropAnim);
	});
};
var setStateSearchSelect = function() {
	jQuery("#uiLayer").html("");
	util.template.getHTML("assets/js/searchmap.html", function(data){
		jQuery("#uiLayer").removeClass("bg1").addClass("cluePhase").html(data);
		//init here
		//util.player.togglePlayer();
		util.player.setPlayer(1);
		createSearchMap();
		//clue icons
		var clue1 = g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][0];
		var clue2 = g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][1];
		var clue1post = util.getCluePath(clue1);
		var clue2post = util.getCluePath(clue2);
		//for custom positioning clues
		var extra = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].searchClues ? true : false;
		var mapset = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].mapset;
		//set clue urls
		var clueurl1 = "<img style='width:100%;height:100%;' src='"+"assets/images/clue/"+(extra ? "/"+mapset+"/" : "")+clue1.toUpperCase()+clue1post+"'>";
		var clueurl2 = "<img style='width:100%;height:100%;' src='"+"assets/images/clue/"+(extra ? "/"+mapset+"/" : "")+clue2.toUpperCase()+clue2post+"'>";
		jQuery("#clueDrop1").html(clueurl1);
		jQuery("#clueDrop2").html(clueurl2);
		//show overlay grid (dotted line)
		jQuery(".clueGridOverlay").show();
		//bind overlay grid
		jQuery(".clueOverlayBox").unbind().click(function(){
			jQuery("#clueDoneBtn").show();
			if( jQuery(this).hasClass("active") ){
				//
			} else {
				jQuery(".clueOverlayBox").removeClass("active");
				jQuery(this).addClass("active");
			}
		});
		jQuery("#clueDoneBtn").click(function(){
			//OPEN FPS VIEW
			var cTile = jQuery(".clueOverlayBox.active");
			if(cTile.length > 0) {
				g_activeTile = [cTile.attr("coordinant").split("_")[0], cTile.attr("coordinant").split("_")[1]];
				g_heading = "north";
				var clueData = g_LEVEL_ELEPHANT[g_selectedDifficulty][g_selectedLevel];
				if(clueData[0] == g_activeTile[0] && clueData[1] == g_activeTile[1]) {
					util.animation.correctAnim(setStateSearchFirstPerson);
				} else {
					util.animation.incorrectAnim();
				}
			} else {
				//
			}
		});
	});

};
var setStateSearchFirstPerson = function() {
	util.template.getHTML("assets/js/search.html", function(data){
		g_directionsRemaining = "nesw".replace(g_heading[0], "");
		jQuery("#uiLayer").html(data);
		//init here
		util.player.setPlayer(2);
		jQuery("#uiLayer").addClass("bg1").removeClass("cluePhase");
		createSearchView();
	});
};