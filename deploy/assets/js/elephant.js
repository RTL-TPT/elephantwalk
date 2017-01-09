//////////////// GlOBALS
////////////////

var g_WIDTH = 1024;
var g_HEIGHT = 768;

var util = {};
var g_STATES = ["title","levelselect","explore","clue","search"];
var g_LEVELS = {
	"EASY": [
				[["forest-mountain", "hill-mountain"], ["desert-forest", "desert-hill"]]
			]
};
var g_LEVEL_CLUE_LOCATION = { //y,x
	"EASY": [
				{"forest":[1,0.5],"mountain":[0.5,1],"desert":[1.5,1],"hill":[1,1.5]}
			]
};
var g_heading = "north";
var g_activeTile = [0,1];
var g_tilesRemaining = {};
var g_activeLevel = g_LEVELS["EASY"][0];
var g_directionsRemaining = "nesw";

//////////////// UTILITY
////////////////

util.player = (function() {
	var currentplayer = 1;

	var setPlayerImg_ = function() {
		jQuery("#playerIcon").html("<img style='width:100%;height:100%' src='assets/images/icon_p"+currentplayer+".png'>");
	};
	var togglePlayer_ = function() {
		currentplayer = currentplayer === 1 ? 2 : 1;
		setPlayerImg_();
	};
	var getPlayer_ = function() {
		return currentplayer;
	};
	var setPlayer_ = function(playerNum) {
		currentplayer = playerNum;
		setPlayerImg_();
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

util.triangle = function() {
	//
};

//////////////// MISC
////////////////

var createClueMap = function(difficulty,level) {
	if(difficulty === undefined){difficulty="EASY"}
	if(level===undefined){level=0}
};

var createExploreMap = function(difficulty,level) {
	if(difficulty === undefined){difficulty="EASY"}
	if(level===undefined){level=0}

	//var activeTile = [0,1]; //y,x
	var cLevel = g_LEVELS[difficulty][0]; //set current level data
	g_activeLevel = cLevel;
	g_activeTile = [util.getRandomInt(0,g_activeLevel.length),util.getRandomInt(0,g_activeLevel.length)];
	var htmlout = "<div id='mapGrid' class='mapGrid'>";
	for(var indy = 0; indy < cLevel.length; indy++) {
		for(var indx = 0; indx < cLevel[indy].length; indx++) {
			htmlout += "<img style='display:inline-block' src='assets/images/level1-easy/"+cLevel[indy][indx]+".gif'>";
			g_tilesRemaining[""+indy+","+indx] = 1;
		}
	}
	htmlout += "</div>";
	htmlout += "<div id='mapGridOverlay' class='mapGridOverlay'>";
	for(indy = 0; indy < cLevel.length; indy++) {
		for(indx = 0; indx < cLevel[indy].length; indx++) {
			htmlout += "<div class='"+ (indy == g_activeTile[0] && indx == g_activeTile[1] ? "activeTile" : "") 
				+"' style='display:inline-block;width:475px;height:310px;"+(indy == g_activeTile[0] && indx == g_activeTile[1] ? "background-color:rgba(0,0,0,0.30)" : "")+"'></div>";
		}
	}
	htmlout += "</div>";
	htmlout += "<div id='firstPerson' class='firstPerson'></div>";
	jQuery("#exploremap").html(htmlout);
	bindActiveTile();
};

var bindActiveTile = function() {
	jQuery(".activeTile").click(function(){
		g_directionsRemaining = "nesw".replace(g_heading[0], "");
		jQuery("#firstPerson").html("<img style='display:inline-block' src='assets/images/level1-easy/"+g_activeLevel[g_activeTile[0]][g_activeTile[1]]+"/"+g_heading+".jpg'>");
		jQuery(".arrow").show();
		jQuery("#rightArrow").unbind().click(function(){rotateView("right")});
		jQuery("#leftArrow").unbind().click(function(){rotateView("left")});
		jQuery("#mapGrid").hide();
		jQuery("#mapGridOverlay").hide();
		delete g_tilesRemaining[""+g_activeTile[0]+","+g_activeTile[1]];
	});
};

var rotateView = function(direction) {
	if(direction === undefined) {
		direction = "right"
	}
	switch(g_heading) {
		case "north":
			g_heading = direction === "right" ? "east" : "west";
			break;
		case "east":
			g_heading = direction === "right" ? "south" : "north";
			break;
		case "south":
			g_heading = direction === "right" ? "west" : "east";
			break;
		case "west":
			g_heading = direction === "right" ? "north" : "south";
			break;
	}
	g_directionsRemaining = g_directionsRemaining.replace(g_heading[0], "");
	jQuery("#firstPerson").html("<img style='display:inline-block' src='assets/images/level1-easy/"+g_activeLevel[g_activeTile[0]][g_activeTile[1]]+"/"+g_heading+".jpg'>");
	if(g_directionsRemaining === "" && jQuery("#returnBtn:visible").length === 0){
		jQuery("#returnBtn").unbind().show().click(function(){
			firstPersonToMap();
		});
	}
};

var firstPersonToMap = function() {
	jQuery("#returnBtn").hide();
	jQuery("#mapGrid").show();
	jQuery("#mapGridOverlay").show();
	jQuery("#firstPerson").html("");
	jQuery("#rightArrow").hide();
	jQuery("#leftArrow").hide();
	setNewExploreSpace();
};

var setNewExploreSpace = function() {
	var remainingCoords = Object.keys(g_tilesRemaining);
	if(remainingCoords.length === 0) {
		setStateClue();
		return;
	}
	var coordStr = remainingCoords[util.getRandomInt(0,remainingCoords.length)];
	var newCoord = [coordStr.split(",")[0],coordStr.split(",")[1]];
	g_activeTile = newCoord;
	util.player.togglePlayer();
	var	htmlout = "<div id='mapGridOverlay' class='mapGridOverlay'>";
	for(var indy = 0; indy < g_activeLevel.length; indy++) {
		for(var indx = 0; indx < g_activeLevel[indy].length; indx++) {
			htmlout += "<div class='"+ (indy == g_activeTile[0] && indx == g_activeTile[1] ? "activeTile" : "") 
				+"' style='display:inline-block;width:475px;height:310px;"+(indy == g_activeTile[0] && indx == g_activeTile[1] ? "background-color:rgba(0,0,0,0.30)" : "")+"'></div>";
		}
	}
	htmlout += "</div>";
	jQuery("#mapGridOverlay").html(htmlout);
	bindActiveTile();
};

//////////////// State Transitions
////////////////

var setStateTitle = function() {
	util.template.getHTML("assets/js/title.html", function(data){
		jQuery("#uiLayer").html(data);
		//init here
		jQuery("#titletext").click(function(){setStateExplore();});
	});
};
var setStateLevelSelect = function() {
	//
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
	console.log("cluephase");
	jQuery("#uiLayer").html("");
	util.template.getHTML("assets/js/clue.html", function(data){
		jQuery("#uiLayer").removeClass("bg1").addClass("cluePhase").html(data);
		//init here
		util.player.setPlayer(1);
		createClueMap();
	});
};
var setStateSearch = function() {
	//
};