//////////////// Utility functions module
////////////////

var util = {};

//functions for switching between active players
util.player = (function() {
	var currentplayer = 1;

	var openPlayerModal_ = function(closeCallback) {
		if(closeCallback === undefined) {closeCallback = function(){};}
		var htmlout = "";
		htmlout += "<div class='playerModalOverlay'></div>";
		htmlout += "<div class='playerModalContainer'>";
		htmlout += "<div class='closeBtn'></div>";
		htmlout += "<div class='playerNextBtn'></div>";

		if(currentplayer === 0) {
			htmlout += "<div style='position:absolute;top:180px;width:100%;'><span style='font-size:40px;'>It's your turn</span><br/><span style='font-size:100px;'>all players</span></div>";
		} else {
			htmlout += "<div style='position:absolute;top:180px;width:100%;'><span style='font-size:40px;'>It's your turn</span><br/><span style='font-size:100px;'>Player number</span></div>".replace("number",util.player.getPlayer());
		}

		htmlout += "</div>";

		jQuery("#uiLayer").append(htmlout);
		jQuery(".playerModalContainer .closeBtn, .playerModalContainer .playerNextBtn").click(function(){
			playClickSFX();
			jQuery(".playerModalContainer").remove();
			jQuery(".playerModalOverlay").remove();
			if(jQuery(".modalContainer._"+g_modalLevel+" .clueContainer").length > 0) {
				g_sfx[g_currentClue].play(undefined,undefined,g_volumeLevel);
			}
			closeCallback();
		});
	};

	var setPlayerImg_ = function() {
		if(currentplayer === 0) {
			jQuery("#playerIcon").html("");
		} else {
			jQuery("#playerIcon").html("<img style='width:100%;height:100%' src='assets/images/icon_p"+currentplayer+".png'>");
		}
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

//simple random function
util.getRandomInt = function(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

//module for loading in chunks of html from template files
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

//Timer to keep track of how long a player has been attempting a task
util.timer = (function() {
	var start_time = new Date();
	var timer_is_stopped = true;
	var lasttimeout = 0;

	var resetTimer = function(timeinms) {
		var levelHint = g_helpLookup[util.currentLevelId()];
		if(typeof timeinms === "undefined") {
			timeinms = levelHint[0]*1000;
		}
		timer_is_stopped = false;
		start_time = new Date();
		if(lasttimeout != 0) {
			clearTimeout(lasttimeout);
		}
		lasttimeout = setTimeout(function(){
			if(!timer_is_stopped) {
				var hintstring = "<div style='position:absolute;top:180px;width:100%;text-align:center;'><span style='font-size:40px;'>"+levelHint[1]+"</span></div>";
				util.openModal(hintstring);
				console.log("timed hint"); 
			}
		}, timeinms);
	};

	var getTime = function() {
		return parseInt( ((new Date).getTime() - start_time) / 1000 );
	};

	var stopTimer = function() {
		timer_is_stopped = true;
	};

	return {
		"getTime": getTime,
		"resetTimer": resetTimer,
		"stopTimer": stopTimer
	};
})();

//image path helpers
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
//css helpers
util.getScaleString = function(scale) {
	return "transform:scale("+scale+");"+"-webkit-transform:scale("+scale+");";
};
util.getTranslateYString = function(ty) {
	return "transform:translateY("+ty+");"+"-webkit-transform:translateY("+ty+");";
};

//simple modal creation
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
		playClickSFX();
		jQuery(".modalContainer._"+g_modalLevel).remove();
		jQuery(".modalOverlay._"+g_modalLevel).remove();
		g_modalLevel--;
	});
};

util.clearSave = function() {
	g_savestate = {
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
		"chunkComplete": {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},
		"randomOrderLevelsComplete": []
	};
	saveState();
};

util.unlockAll = function() {
	g_savestate = {
		"tutorial_complete": {"LAND":true,"WATER":true,"MANMADE":true,"EXPERT":true},
		"terrain_unlocked": {"LAND":true,"WATER":true,"MANMADE":true,"EXPERT":true},
		"game_state": {"landType": "LAND", "diff": "TUTORIAL", "level": 0, "phase": "levelselect"},
		"telemetry": {"session_id":0},
		"clue_mastery_p1": "2",
		"clue_mastery_p2": "2",
		"search_mastery": "3",
		"clue_track_p1": [[],[],[],[]],
		"clue_track_p2": [[],[],[],[]],
		"search_track": [[],[],[],[]],
		"legendLocks": {
			//"bridge": "fullAbstract",
			"building": "fullAbstract",
			"desert": "fullAbstract",
			"forest": "fullAbstract",
			//"hill": "fullAbstract",
			"lake": "fullAbstract",
			"mountain": "fullAbstract",
			"ocean": "fullAbstract",
			"park": "fullAbstract",
			"road": "fullAbstract",
			"stream": "fullAbstract"
			//"waterfall": "fullAbstract"
		},
		"levelsComplete": [],
		"chunkComplete": {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true},
		"randomOrderLevelsComplete": []
	};
	util.setAllBlockClear();
	saveState();
};

//module for game css animations
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

//simple image preloader
util.loadImages = function(imageArray, callback) {
	var checkinterval = 250; //ms
	var timeloading = 0;
	jQuery("#imgloadarea").html("");
	//add images to dom
	var imghtml = "";
	for(var i = 0; i < imageArray.length; i++) {
		imghtml += "<img src='"+imageArray[i]+"'> ";
	}
	jQuery("#imgloadarea").html(imghtml);
	var loaderoverlay = "<div id='loaderDiv' style='z-index:20000;position:absolute;top:0px;left:0px;width:100%;height:100%;background-color:rgba(255,255,255,0.75)'><div style='width:100%;height:100%;background:url(assets/images/spin.gif) center center no-repeat;'></div></div>";
	jQuery("#uiLayer").append(loaderoverlay);
	//set progress checker
	var loadcheck = setInterval(function(){
		timeloading += checkinterval;
		var children = jQuery("#imgloadarea").children();
		var allLoaded = true;
		for(var i = 0; i < children.length; i++) {
			if (!jQuery(children[i]).prop("complete")) {
				allLoaded = false;
			}
		}
		if(timeloading > (checkinterval*4*45)) {  //force progress if it's been more than 45 seconds
			allLoaded = true;
		}
		if(allLoaded) {
			//console.log("all images loaded");
			clearInterval(loadcheck);
			jQuery("#imgloadarea").html("");
			jQuery("#loaderDiv").remove();
			callback();
		}
	}, checkinterval);
};

//
util.currentLevelId = function() {
	return g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].taskid;
};

//mastery helper functions
util.getMasteryTargets = function() {
	var levelNum = parseInt(util.currentLevelId().split("_")[0]);
	var as = "";
	var rl = "";
	//as
	if(levelNum >= 1 && levelNum <= 3) {
		as = "1";
	} else if(levelNum >= 4 && levelNum <= 6) {
		as = "2";
	} else if(levelNum >= 7 && levelNum <= 9) {
		as = "3";
	} else if(levelNum == 10) {
		as = "3";
	}
	//rl
	if(levelNum >= 1 && levelNum <= 3) {
		rl = "1";
	} else if(levelNum >= 4 && levelNum <= 6) {
		rl = "2a";
	} else if(levelNum >= 7 && levelNum <= 9) {
		rl = "2b";
	} else if(levelNum == 10) {
		rl = "3";
	}
	return [as,rl];
};

util.getMasteryIndex = function() {
	var levelNum = parseInt(util.currentLevelId().split("_")[0]);

	if(levelNum >= 1 && levelNum <= 3) {
		return 0;
	} else if(levelNum >= 4 && levelNum <= 6) {
		return 1;
	} else if(levelNum >= 7 && levelNum <= 9) {
		return 2;
	} else if(levelNum == 10) {
		return 3;
	}
	return 0;
};

util.getMasteryIndexAS = function() {
	var levelNum = parseInt(util.currentLevelId().split("_")[0]);

	if(levelNum >= 1 && levelNum <= 3) {
		return 0;
	} else if(levelNum >= 4 && levelNum <= 6) {
		return 1;
	} else if(levelNum >= 7 && levelNum <= 9) {
		return 2;
	} else if(levelNum == 10) {
		return 3;
	}
	return 0;
};

util.getHigherMasteryAS = function(m1,m2) {
	if(parseInt(m1) > parseInt(m2)) {
		return m1;
	} else{
		return m2;
	}
};
util.getHigherMasteryRL = function(m1,m2) {
	var sorted = [m1,m2].sort();
	return sorted[1];
};

util.getLowerMastery = function(m1,m2) {
	var sorted = [m1,m2].sort();
	return sorted[0];
};

//telemetry helper
util.strCoordToInt = function(inputArray) {
	return [parseInt(inputArray[0]),parseInt(inputArray[1])];
};

util.levelUpTerrain = function(terrainName, unlockLevel) {
	if(typeof unlockLevel === "undefined") {
		var clevel = g_savestate.legendLocks[terrainName];
		if(clevel == "fullAbstract") {
			unlockLevel = "fullAbstract";
		} else if(clevel == "partialAbstract") {
			unlockLevel = "fullAbstract";
		} else if(clevel == "nonAbstract") {
			unlockLevel = "partialAbstract";
		} else {
			unlockLevel = "nonAbstract";
		}
	}
	g_savestate.legendLocks[terrainName] = unlockLevel;
};

util.getCurrentExploreTargets = function() {
	return g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].exploreTargets;
};

util.setRandomHeading = function() {
	switch(util.getRandomInt(1,4)) {
		case 1:
			g_heading = "north";
			break;
		case 2:
			g_heading = "east";
			break;
		case 3:
			g_heading = "south";
			break;
		case 4:
			g_heading = "west";
			break;
	}
};

util.goToNextLevel = function() {
	var unlocks = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].legendUnlocks;
	jQuery.each(unlocks, function(key, value) {
		util.levelUpTerrain(key,value);
	});
	if(g_savestate.levelsComplete.indexOf(util.currentLevelId()) == -1) {
		g_savestate.levelsComplete.push(util.currentLevelId());
	}
	setStateSubLevelSelect(g_LevelTerrain);
};

//check if a specific level is clear or not
util.isLevelComplete = function(levelKey) {
	return g_savestate.levelsComplete.indexOf(levelKey) !== -1;
};

//check if a block of tutorial levels is cleared or not
util.isBlockTutorialClear = function(blockId) {
	var tutorial = g_leveldata[blockId]["TUTORIAL"];
	for(var i = 0; i < tutorial.length; i++) {
		if(!util.isLevelComplete(tutorial[i].taskid)) {
			return false;
		}
	}
	return true;
};

//check if all legend values for a difficulty block have been unlocked
util.allLegendsUnlocked = function(chunkName) {
	var legendsUnlocked = true;
	if(chunkName == "LAND") {
		jQuery.each(g_savestate.legendLocks, function(key, value) {
			if(value == "partialAbstract" || value == "fullAbstract"){
				//good
			} else {
				legendsUnlocked = false;
			}
		});
	} else if(chunkName == "WATER") {
		jQuery.each(g_savestate.legendLocks, function(key, value) {
			if(value != "fullAbstract"){
				legendsUnlocked = false;
			}
		});
	} else{
		jQuery.each(g_savestate.legendLocks, function(key, value) {
			if(value != "fullAbstract"){
				legendsUnlocked = false;
			}
		});
	}
	return legendsUnlocked;
};
//check if a block of levels is cleared or not
util.isBlockClear = function(blockId) {
	if(blockId == "LAND" &&
		g_savestate.clue_mastery_p2 + "" >= "1" &&
		g_savestate.clue_mastery_p1 + "" >= "1" &&
		g_savestate.search_mastery + "" >= "1" &&
		util.allLegendsUnlocked("LAND")) {
		return true;
	}
	if(blockId == "WATER" &&
		g_savestate.clue_mastery_p2 + "" >= "2" &&
		g_savestate.clue_mastery_p1 + "" >= "2" &&
		g_savestate.search_mastery + "" >= "2a"&&
		util.allLegendsUnlocked("WATER")) {
		return true;
	}
	if(blockId == "MANMADE" &&
		g_savestate.clue_mastery_p2 + "" >= "3" &&
		g_savestate.clue_mastery_p1 + "" >= "3" &&
		g_savestate.search_mastery + "" >= "2b") {
		return true;
	}
	return false;
	/*var easy = g_leveldata[blockId]["EASY"];
	for(var i = 0; i < easy.length; i++) {
		if(!util.isLevelComplete(easy[i].taskid)) {
			return false;
		}
	}
	var medium = g_leveldata[blockId]["MEDIUM"];
	for(var i = 0; i < medium.length; i++) {
		if(!util.isLevelComplete(medium[i].taskid)) {
			return false;
		}
	}
	var hard = g_leveldata[blockId]["HARD"];
	for(var i = 0; i < hard.length; i++) {
		if(!util.isLevelComplete(hard[i].taskid)) {
			return false;
		}
	}
	return true;*/
};

//set all levels to complete - super hacky
util.setAllBlockClear = function() {
	var tutorial = g_leveldata["LAND"]["TUTORIAL"];
	for(var i = 0; i < tutorial.length; i++) {
		g_savestate.levelsComplete.push(tutorial[i].taskid);
	}
	var easy = g_leveldata["LAND"]["EASY"];
	for(var i = 0; i < easy.length; i++) {
		g_savestate.levelsComplete.push(easy[i].taskid);
	}
	var medium = g_leveldata["LAND"]["MEDIUM"];
	for(var i = 0; i < medium.length; i++) {
		g_savestate.levelsComplete.push(medium[i].taskid);
	}
	var hard = g_leveldata["LAND"]["HARD"];
	for(var i = 0; i < hard.length; i++) {
		g_savestate.levelsComplete.push(hard[i].taskid);
	}

	var tutorial = g_leveldata["WATER"]["TUTORIAL"];
	for(var i = 0; i < tutorial.length; i++) {
		g_savestate.levelsComplete.push(tutorial[i].taskid);
	}
	var easy = g_leveldata["WATER"]["EASY"];
	for(var i = 0; i < easy.length; i++) {
		g_savestate.levelsComplete.push(easy[i].taskid);
	}
	var medium = g_leveldata["WATER"]["MEDIUM"];
	for(var i = 0; i < medium.length; i++) {
		g_savestate.levelsComplete.push(medium[i].taskid);
	}
	var hard = g_leveldata["WATER"]["HARD"];
	for(var i = 0; i < hard.length; i++) {
		g_savestate.levelsComplete.push(hard[i].taskid);
	}

	var tutorial = g_leveldata["MANMADE"]["TUTORIAL"];
	for(var i = 0; i < tutorial.length; i++) {
		g_savestate.levelsComplete.push(tutorial[i].taskid);
	}
	var easy = g_leveldata["MANMADE"]["EASY"];
	for(var i = 0; i < easy.length; i++) {
		g_savestate.levelsComplete.push(easy[i].taskid);
	}
	var medium = g_leveldata["MANMADE"]["MEDIUM"];
	for(var i = 0; i < medium.length; i++) {
		g_savestate.levelsComplete.push(medium[i].taskid);
	}
	var hard = g_leveldata["MANMADE"]["HARD"];
	for(var i = 0; i < hard.length; i++) {
		g_savestate.levelsComplete.push(hard[i].taskid);
	}

	var tutorial = g_leveldata["EXPERT"]["TUTORIAL"];
	for(var i = 0; i < tutorial.length; i++) {
		g_savestate.levelsComplete.push(tutorial[i].taskid);
	}
	var easy = g_leveldata["EXPERT"]["EASY"];
	for(var i = 0; i < easy.length; i++) {
		g_savestate.levelsComplete.push(easy[i].taskid);
	}
	var medium = g_leveldata["EXPERT"]["MEDIUM"];
	for(var i = 0; i < medium.length; i++) {
		g_savestate.levelsComplete.push(medium[i].taskid);
	}
	var hard = g_leveldata["EXPERT"]["HARD"];
	for(var i = 0; i < hard.length; i++) {
		g_savestate.levelsComplete.push(hard[i].taskid);
	}

	//clear undefined items from savestate array
	for(var i = 0; i < g_savestate.levelsComplete.length; i++) {
		if(typeof g_savestate.levelsComplete[i] === "undefined") {
			g_savestate.levelsComplete.splice(i,1);
			i--;
		}
	}
};