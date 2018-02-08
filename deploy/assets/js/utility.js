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

	var resetTimer = function() {
		timer_is_stopped = false;
		start_time = new Date();
		setTimeout(function(){
			if(!timer_is_stopped) {
				console.log("one minute"); 
			}
		}, 60000);
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
		"search_track": [[],[],[],[]]
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
		"search_track": [[],[],[],[]]
	};
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

//mastery helper functions
util.getMasteryTargets = function() {
	var levelNum = parseInt(g_leveldata[g_LevelTerrain][g_selectedDifficulty][parseInt(g_selectedLevel)].taskid.split("_")[0]);
	var as = "";
	var rl = "";
	//as
	if(levelNum >= 1 && levelNum <= 3) {
		as = "0";
	} else if(levelNum >= 4 && levelNum <= 6) {
		as = "1";
	} else if(levelNum >= 7 && levelNum <= 9) {
		as = "2";
	} else if(levelNum == 10) {
		as = "2";
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
	var levelNum = parseInt(g_leveldata[g_LevelTerrain][g_selectedDifficulty][parseInt(g_selectedLevel)].taskid.split("_")[0]);

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
	var levelNum = parseInt(g_leveldata[g_LevelTerrain][g_selectedDifficulty][parseInt(g_selectedLevel)].taskid.split("_")[0]);

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