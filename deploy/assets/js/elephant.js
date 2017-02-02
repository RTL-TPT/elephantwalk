//////////////// GlOBALS
////////////////

var g_WIDTH = 1024;
var g_HEIGHT = 768;
var g_STATES = ["title","levelselect","explore","clue","search"]; //unusued
//LEVEL DATA
var g_LEVEL_GRID = { //SET LEVEL'S GRID SIZE
	"TUTORIAL": [
			{"x":2,"y":2}
		]
};
var g_LEVEL_CLUE_LOCATION = { //SET CLUE LOCATIONS [y,x]
	"TUTORIAL": [
				[[1,0.5,"forest"],[0.5,1,"mountain"],[1.5,1,"desert"],[1,1.5,"hill"]]//{"forest":[1,0.5],"mountain":[0.5,1],"desert":[1.5,1],"hill":[1,1.5]}
			]
};
var g_LEVEL_CLUES = { //SET ASSIGNED CLUES
	"TUTORIAL": [
				["hill","mountain"]
			]
};
var g_LEVEL_ELEPHANT = { //SET ELEPHANT LOCATION
	"TUTORIAL": [
				[0,1,"south"] //[y,x]
			]
};
var g_CLUE_ABSTRACTION = {
	"TUTORIAL": [
				{"forest":"nonAbstract","mountain":"nonAbstract","desert":"nonAbstract","hill":"nonAbstract"}
			]
};
//current level/location variables from most wide to most narrow
var g_LevelTerrain = "land";
var g_selectedDifficulty = "TUTORIAL";
var g_selectedLevel = 0;
var g_activeTile = [0,0];
var g_heading = "north";
//other globals
var g_activeGrid = g_LEVEL_GRID[g_selectedDifficulty][g_selectedLevel]; //ONLY USED FOR LEVEL'S GRID SIZE
var g_tilesRemaining = {};
var g_directionsRemaining = "nesw";
var g_currentClue = "";
var g_hasDrag = false;
var g_clueUrlPost = {"nonAbstract":"_non-abstract-symbol.jpg","partialAbstract":"_partial-abstract-symbol.jpg","fullAbstract":"_abstract-symbol.jpg"};
var g_isAlpha = true;

var g_init = function(landType) {
	if(landType === undefined){landType = "LAND"}
	g_LevelTerrain = landType.toLowerCase();
	var difficultyTypes = ["TUTORIAL","EASY","MEDIUM","HARD"];
	for(var i = 0; i < difficultyTypes.length; i++) {
		var cDiff = difficultyTypes[i];
		g_LEVEL_GRID[cDiff] = [];
		g_LEVEL_CLUE_LOCATION[cDiff] = [];
		g_LEVEL_CLUES[cDiff] = [];
		g_LEVEL_ELEPHANT[cDiff] = [];
		g_CLUE_ABSTRACTION[cDiff] = [];
		for(var indx = 0; indx < g_leveldata[landType][cDiff].length; indx++) {
			var cObj = g_leveldata[landType][cDiff][indx];
			g_LEVEL_GRID[cDiff].push( {"x": parseInt(cObj.gridSize.split("x")[0]),"y": parseInt(cObj.gridSize.split("x")[1]) } );
			g_LEVEL_CLUE_LOCATION[cDiff].push(cObj.clueLocations);
			g_LEVEL_CLUES[cDiff].push(cObj.clues);
			g_LEVEL_ELEPHANT[cDiff].push(cObj.elephantLocation);
			g_CLUE_ABSTRACTION[cDiff].push(cObj.symbolStyle);
		}
	}
};
g_init();

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

		htmlout += "<div>" + "It's your turn Player number".replace("number",util.player.getPlayer()) + "</div>"

		htmlout += "</div>";

		jQuery("#uiLayer").append(htmlout);
		jQuery(".playerModalContainer .closeBtn").click(function(){
			jQuery(".playerModalContainer").remove();
			jQuery(".playerModalOverlay").remove();
			closeCallback();
		});
	};

	var setPlayerImg_ = function() {
		jQuery("#playerIcon").html("<img style='width:100%;height:100%' src='assets/images/icon_p"+currentplayer+".png'>");
	};
	var togglePlayer_ = function(callback) {
		if(callback === undefined) {callback = function(){};}
		currentplayer = currentplayer === 1 ? 2 : 1;
		setPlayerImg_();
		openPlayerModal_(callback);
		//util.animation.playerAnim(callback);
	};
	var getPlayer_ = function() {
		return currentplayer;
	};
	var setPlayer_ = function(playerNum, callback) {
		if(callback === undefined) {callback = function(){};}
		currentplayer = playerNum;
		setPlayerImg_();
		openPlayerModal_(callback);
		//util.animation.playerAnim(callback);
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
	//return "assets/images/"+g_LevelTerrain+"/"+g_selectedDifficulty.toLowerCase()+"/"+parseInt(g_selectedLevel+1)+"/"+indx+"_"+indy+"_map.gif";
	return "assets/images/lvlsets/"+g_leveldata[g_LevelTerrain.toUpperCase()][g_selectedDifficulty][parseInt(g_selectedLevel)].mapset+"/"+indx+"_"+indy+"_map.gif";
};
util.getFacingPath = function(indx,indy,direction) {
	//return "assets/images/"+g_LevelTerrain+"/"+g_selectedDifficulty.toLowerCase()+"/"+parseInt(g_selectedLevel+1)+"/"+indx+"_"+indy+"_"+direction+".jpg";
	return "assets/images/lvlsets/"+g_leveldata[g_LevelTerrain.toUpperCase()][g_selectedDifficulty][parseInt(g_selectedLevel)].mapset+"/"+indx+"_"+indy+"_"+direction+".jpg";
};
util.getFacingPathElephant = function(indx,indy,direction) {
	//return "assets/images/"+g_LevelTerrain+"/"+g_selectedDifficulty.toLowerCase()+"/"+parseInt(g_selectedLevel+1)+"/"+indx+"_"+indy+"_"+direction+"-elephant.jpg";
	return "assets/images/lvlsets/"+g_leveldata[g_LevelTerrain.toUpperCase()][g_selectedDifficulty][parseInt(g_selectedLevel)].mapset+"/"+indx+"_"+indy+"_"+direction+"_elephant.jpg";
};
util.getCluePath = function(clue) {
	return g_clueUrlPost[ g_CLUE_ABSTRACTION[g_selectedDifficulty][g_selectedLevel][clue] ];
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

var fillLevels = function() {
	var htmlout = "<div class='difficultyTitle'>Choose a Difficulty</div>";
	htmlout += "<div class='missionBoxContainer' >";
	htmlout += "<center><table style='width:900px'>";
	var difflen = g_LEVEL_GRID["EASY"].length;
	difflen = difflen > g_LEVEL_GRID["MEDIUM"].length ? difflen : g_LEVEL_GRID["MEDIUM"].length;
	difflen = difflen > g_LEVEL_GRID["HARD"].length ? difflen : g_LEVEL_GRID["HARD"].length;
	for(var i = 0; i < g_LEVEL_GRID["TUTORIAL"].length; i++) {
		htmlout += "<tr><td><center><div class='missionBox d1' difficulty='TUTORIAL' level='"+i+"' id='tutorial"+(i+1)+"btn'>TUTORIAL "+(i+1)+"</div></center></td>";
		htmlout += "<td><center><div class='missionBox d2' difficulty='TUTORIAL' level='"+i+"' style='opacity:0'></div></center></td>";
		htmlout += "<td><center><div class='missionBox d3' difficulty='TUTORIAL' level='"+i+"' style='opacity:0'></div></center></td></tr>";
	}
	for(var i = 0; i < difflen; i++) {
		htmlout += "<tr><td><center><div class='missionBox d1' difficulty='EASY' level='"+i+"' style='opacity:"+(i < g_LEVEL_GRID["EASY"].length ? 1 : 0)+"' id='easy"+(i+1)+"btn'>EASY "+(i+1)+"</div></center></td>";
		htmlout += "<td><center><div class='missionBox d2' difficulty='MEDIUM' level='"+i+"' style='opacity:"+(i < g_LEVEL_GRID["MEDIUM"].length ? 1 : 0)+"' id='medium"+(i+1)+"btn'>MEDIUM "+(i+1)+"</div></center></td>";
		htmlout += "<td><center><div class='missionBox d3' difficulty='HARD' level='"+i+"' style='opacity:"+(i < g_LEVEL_GRID["HARD"].length ? 1 : 0)+"' id='hard"+(i+1)+"btn'>HARD "+(i+1)+"</div></center></td></tr>";
	}
	htmlout += "</table></center>";
	htmlout += "</div>";
	jQuery("#difficultySelect").html(htmlout);
};

var fillLevelsAlpha = function() {
		var htmlout = "<div class='difficultyTitle'>Choose a Level</div>";
	htmlout += "<div class='missionBoxContainer' >";
	htmlout += "<center><table style='width:900px'>";
	var difflen = g_LEVEL_GRID["EASY"].length;
	var twidth = 0;
	for(var i = 0; i < difflen; i++) {
		if(twidth == 0) {
			htmlout += "<tr>";
		}
		htmlout += "<td><center><div class='missionBox d1' difficulty='EASY' level='"+i+"' style='' id='easy"+(i+1)+"btn'>LEVEL "+(i+1)+"</div></center></td>";
		if(twidth == 2) {
			htmlout += "</tr>";
		}
		twidth = (twidth + 1) % 3;
	}
	htmlout += "</table></center>";
	htmlout += "</div>";
	jQuery("#difficultySelect").html(htmlout);
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
var setStateLevelSelect = function() {
	util.template.getHTML("assets/js/menu.html", function(data){
		jQuery("#uiLayer").removeClass("bg1").removeClass("cluePhase").html(data);
		if(g_isAlpha) {
			fillLevelsAlpha();
			jQuery("#missionSelect").hide();
			jQuery("#difficultySelect").show();
		} else {
			fillLevels();
		}
		//init here
		jQuery(".missionBox.b1").click(function(){
			jQuery("#missionSelect").hide();
			jQuery("#difficultySelect").show();
		});
		jQuery(".missionBox.d1").click(function(){
			g_selectedDifficulty = jQuery(this).attr("difficulty");
			g_selectedLevel = +jQuery(this).attr("level");
			g_activeGrid = g_LEVEL_GRID[g_selectedDifficulty][g_selectedLevel];
			if(g_leveldata[g_LevelTerrain.toUpperCase()][g_selectedDifficulty][g_selectedLevel].hasExploration) {
				setStateExplore();
			} else {
				setStateClue();
			}
		});
		jQuery(".missionBox.d2").click(function(){
			g_selectedDifficulty = jQuery(this).attr("difficulty");
			g_selectedLevel = +jQuery(this).attr("level");
			g_activeGrid = g_LEVEL_GRID[g_selectedDifficulty][g_selectedLevel];
			if(g_leveldata[g_LevelTerrain.toUpperCase()][g_selectedDifficulty][g_selectedLevel].hasExploration) {
				setStateExplore();
			} else {
				setStateClue();
			}
		});
		jQuery(".missionBox.d3").click(function(){
			g_selectedDifficulty = jQuery(this).attr("difficulty");
			g_selectedLevel = +jQuery(this).attr("level");
			g_activeGrid = g_LEVEL_GRID[g_selectedDifficulty][g_selectedLevel];
			if(g_leveldata[g_LevelTerrain.toUpperCase()][g_selectedDifficulty][g_selectedLevel].hasExploration) {
				setStateExplore();
			} else {
				setStateClue();
			}
		});
		//jQuery("#tutorial1btn").click(function(){setStateExplore();});
		jQuery("#tempNextBox").click(function(){setStateExplore();});
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
			//setStateSearch();
		});
		openClueModal(util.animation.dragDropAnim);
		util.player.setPlayer(1);
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
		var clueurl1 = "<img style='width:100%;height:100%;' src='"+"assets/images/clue/"+clue1.toUpperCase()+clue1post+"'>";
		var clueurl2 = "<img style='width:100%;height:100%;' src='"+"assets/images/clue/"+clue2.toUpperCase()+clue2post+"'>";
		jQuery("#clueDrop1").html(clueurl1);
		jQuery("#clueDrop2").html(clueurl2);
		//show overlay grid (dotted line)
		jQuery(".clueGridOverlay").show();
		//bind overlay grid
		jQuery(".clueOverlayBox").unbind().click(function(){
			if( jQuery(this).hasClass("active") ){
				//OPEN FPS VIEW
				/*g_activeTile = [jQuery(this).attr("coordinant").split("_")[0], jQuery(this).attr("coordinant").split("_")[1]];
				g_heading = "north";
				setStateSearchFirstPerson();*/
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
					//setStateSearchFirstPerson();
				} else {
					util.animation.incorrectAnim();
				}
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