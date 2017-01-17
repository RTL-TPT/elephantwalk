//////////////// GlOBALS
////////////////

var g_WIDTH = 1024;
var g_HEIGHT = 768;
var g_STATES = ["title","levelselect","explore","clue","search"]; //unusued
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
var g_LEVEL_CLUES = {
	"EASY": [
				["hill","mountain"]
			]
};
var g_LEVEL_ELEPHANT = {
	"EASY": [
				[0,1,"south"] //y,x
			]
};
var g_heading = "north";
var g_activeTile = [0,0];
var g_tilesRemaining = {};
var g_selectedDifficulty = "EASY";
var g_selectedLevel = 0;
var g_activeLevel = g_LEVELS[g_selectedDifficulty][g_selectedLevel];
var g_directionsRemaining = "nesw";
var g_currentClue = "";

//////////////// UTILITY
////////////////

var util = {};
util.player = (function() {
	var currentplayer = 1;

	var setPlayerImg_ = function() {
		jQuery("#playerIcon").html("<img style='width:100%;height:100%' src='assets/images/icon_p"+currentplayer+".png'>");
	};
	var togglePlayer_ = function() {
		currentplayer = currentplayer === 1 ? 2 : 1;
		setPlayerImg_();
		util.animation.playerAnim(function(){});
	};
	var getPlayer_ = function() {
		return currentplayer;
	};
	var setPlayer_ = function(playerNum) {
		currentplayer = playerNum;
		setPlayerImg_();
		util.animation.playerAnim(function(){});
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

util.animation = (function() {
	var correctAnim = function(callback) {
		var combinedCallback = function(){
			jQuery("#answerOverlay").fadeOut(500,function(){jQuery("#answerOverlay").remove();callback();});
		};
		jQuery("#uiLayer").append("<div id='answerOverlay' class='correctOverlay'><div id='correctImg' class='correctImg'></div></div>");
		jQuery("#correctImg").animate({"background-size":"50%"},{"duration":750,"always":combinedCallback});
	};

	var incorrectAnim = function(callback) {
		var combinedCallback = function(){
			jQuery("#answerOverlay").fadeOut(500,function(){jQuery("#answerOverlay").remove();callback();});
		};
		jQuery("#uiLayer").append("<div id='answerOverlay' class='incorrectOverlay'><div id='incorrectImg' class='incorrectImg'></div></div>");
		jQuery("#incorrectImg").animate({"background-size":"50%"},{"duration":750,"always":combinedCallback});
	};

	var playerAnim = function(callback) {
		var combinedCallback = function(){
			jQuery("#playerTextOverlay").fadeOut(500,function(){jQuery("#playerTextOverlay").remove();callback();});
		};
		jQuery("#uiLayer").append("<div id='playerTextOverlay' class='playerTextOverlay'><div id='playerText' class='playerText'>Player "+util.player.getPlayer()+"</div></div>");
		jQuery("#playerText").animate({"font-size":"160px"},{"duration":750,"always":combinedCallback});
	};

	return {
		"correctAnim": correctAnim,
		"incorrectAnim": incorrectAnim,
		"playerAnim": playerAnim
	};
})();

//////////////// MISC
////////////////
var drag = function(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
};
var drop = function(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var target = jQuery(ev.target);
    var children = target.children();
    if(children.length === 0 && target.attr("id") === "clueDrop1") {
    	target.append(document.getElementById(data));
    } else if(target.attr("id") === ("clue_" + data.replace("img_","")) ) {
    	target.append(document.getElementById(data));
    } else {
    	//nope
    }
};
function allowDrop(ev) {
    ev.preventDefault();
}

var createClueMap = function() {
	var htmlout = "";
	//create draggable clue features
	jQuery.each(g_LEVEL_CLUE_LOCATION[g_selectedDifficulty][g_selectedLevel], function(key,value){
		var location = [jQuery("#clueMap").height() / 2 * value[0] - 50, jQuery("#clueMap").width() / 2 * value[1] - 100];
		var locStyle = "style='top:"+location[0]+"px;left:"+location[1]+"px;'";
		htmlout = "<div id='clue_"+key+"' ondrop='drop(event)' ondragover='allowDrop(event)' class='dragClue' "+locStyle+" >";
		htmlout += "<img id='img_"+key+"' draggable='true' ondragstart='drag(event)' style='width:100%;height:100%;' src='"+"assets/images/clue/"+key.toUpperCase()+"_clue.png'>";
		htmlout += "</div>";
		jQuery("#clueMap").append(htmlout);
	} );
	//grid for eventual answer selection
	/*htmlout = "<div id='clueGridOverlay' style='display:none;' class='clueGridOverlay'>";
	for(indy = 0; indy < g_activeLevel.length; indy++) {
		for(indx = 0; indx < g_activeLevel[indy].length; indx++) {
			var borderright = indx < g_activeLevel[indy].length - 1 ? "border-right: 1px dashed black;" : "";
			var borderleft = indx > 0 ? "border-left: 1px dashed black;" : "";
			var borderup = indy > 0 ? "border-top: 1px dashed black;" : "";
			var borderdown = indy < g_activeLevel.length - 1 ? "border-bottom: 1px dashed black;" : "";
			var borderSum = borderright + borderleft + borderup + borderdown;
			htmlout += "<div class='clueOverlayBox' coordinant='"+indy+"_"+indx+"' style='display:inline-block;box-sizing:border-box;"+borderSum+"width:"+(jQuery("#clueMap").width() / 2)+"px;height:"+(jQuery("#clueMap").height() / 2)+"px;'></div>";
		}
	}
	htmlout += "</div>";
	jQuery("#clueMap").append(htmlout);*/
	g_currentClue = g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][0];
};

var createSearchMap = function() {
	var htmlout = "";
	//create draggable clue features
	jQuery.each(g_LEVEL_CLUE_LOCATION[g_selectedDifficulty][g_selectedLevel], function(key,value){
		var location = [jQuery("#clueMap").height() / 2 * value[0] - 50, jQuery("#clueMap").width() / 2 * value[1] - 100];
		var locStyle = "style='top:"+location[0]+"px;left:"+location[1]+"px;'";
		htmlout = "<div id='clue_"+key+"' class='dragClue' "+locStyle+" >";
		htmlout += "<img id='img_"+key+"' style='width:100%;height:100%;' src='"+"assets/images/clue/"+key.toUpperCase()+"_clue.png'>";
		htmlout += "</div>";
		jQuery("#clueMap").append(htmlout);
	} );
	//grid for eventual answer selection
	htmlout = "<div id='clueGridOverlay' style='display:none;' class='clueGridOverlay'>";
	for(indy = 0; indy < g_activeLevel.length; indy++) {
		for(indx = 0; indx < g_activeLevel[indy].length; indx++) {
			var borderright = indx < g_activeLevel[indy].length - 1 ? "border-right: 1px dashed black;" : "";
			var borderleft = indx > 0 ? "border-left: 1px dashed black;" : "";
			var borderup = indy > 0 ? "border-top: 1px dashed black;" : "";
			var borderdown = indy < g_activeLevel.length - 1 ? "border-bottom: 1px dashed black;" : "";
			var borderSum = borderright + borderleft + borderup + borderdown;
			htmlout += "<div class='clueOverlayBox' coordinant='"+indy+"_"+indx+"' style='display:inline-block;box-sizing:border-box;"+borderSum+"width:"+(jQuery("#clueMap").width() / 2)+"px;height:"+(jQuery("#clueMap").height() / 2)+"px;'></div>";
		}
	}
	htmlout += "</div>";
	//g_currentClue = g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][0];
	jQuery("#clueMap").append(htmlout);
};

var createExploreMap = function() {
	//var activeTile = [0,1]; //y,x
	g_activeTile = [util.getRandomInt(0,g_activeLevel.length),util.getRandomInt(0,g_activeLevel.length)];
	var htmlout = "<div id='mapGrid' class='mapGrid'>";
	for(var indy = 0; indy < g_activeLevel.length; indy++) {
		for(var indx = 0; indx < g_activeLevel[indy].length; indx++) {
			htmlout += "<img class='exploreMapImg' style='display:inline-block;opacity:0;' coordinant='"+indy+"_"+indx+"' src='assets/images/level1-easy/"+g_activeLevel[indy][indx]+".gif'>";
			g_tilesRemaining[""+indy+","+indx] = 1;
		}
	}
	htmlout += "</div>";
	htmlout += "<div id='mapGridOverlay' class='mapGridOverlay'>";
	for(indy = 0; indy < g_activeLevel.length; indy++) {
		for(indx = 0; indx < g_activeLevel[indy].length; indx++) {
			htmlout += "<div class='"+ (indy == g_activeTile[0] && indx == g_activeTile[1] ? "activeTile" : "") 
				+"' style='display:inline-block;width:475px;height:310px;"+(indy == g_activeTile[0] && indx == g_activeTile[1] ? "background-color:rgba(0,0,0,0.30)" : "")+"'></div>";
		}
	}
	htmlout += "</div>";
	htmlout += "<div id='firstPerson' class='firstPerson'></div>";
	jQuery("#exploremap").html(htmlout);
	bindActiveTile();
};

var createSearchView = function() {
	jQuery("#exploremap").html("<img style='display:inline-block' src='assets/images/level1-easy/"+g_activeLevel[g_activeTile[0]][g_activeTile[1]]+"/"+g_heading+".jpg'>");
	jQuery(".arrow").show();
	jQuery("#rightArrow").unbind().click(function(){searchRotate("right")});
	jQuery("#leftArrow").unbind().click(function(){searchRotate("left")});
};

var bindActiveTile = function() {
	jQuery(".activeTile").click(function(){
		jQuery.each(jQuery(".exploreMapImg"),function(key,value){
			if( jQuery(value).attr("coordinant") == g_activeTile[0]+"_"+g_activeTile[1] ) {
				jQuery(value).css("opacity",1);
			}
		});
		jQuery(".exploreMapImg");
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

var searchRotate = function(direction) {
	if(direction === undefined) {
		direction = "right";
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
	jQuery("#exploremap").html("<img style='display:inline-block' src='assets/images/level1-easy/"+g_activeLevel[g_activeTile[0]][g_activeTile[1]]+"/"+g_heading+".jpg'>");
	var cElephant = g_LEVEL_ELEPHANT[g_selectedDifficulty][g_selectedLevel];
	if(cElephant[0] == g_activeTile[0] && cElephant[1] == g_activeTile[1] && cElephant[2] == g_heading) {
		jQuery("#exploremap").html("<img style='display:inline-block' src='assets/images/level1-easy/"+g_activeLevel[g_activeTile[0]][g_activeTile[1]]+"/"+g_heading+"-elephant.jpg'>");
		setTimeout(function(){
			alert("You found the elephant!");
			setStateTitle();
		},500);
		jQuery("#leftArrow").unbind();
		jQuery("#rightArrow").unbind();

	}else if(g_directionsRemaining === ""){
		setStateSearchSelect();
	}
};

var rotateView = function(direction) {
	if(direction === undefined) {
		direction = "right";
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
	var	htmlout = "";
	for(var indy = 0; indy < g_activeLevel.length; indy++) {
		for(var indx = 0; indx < g_activeLevel[indy].length; indx++) {
			htmlout += "<div class='"+ (indy == g_activeTile[0] && indx == g_activeTile[1] ? "activeTile" : "") 
				+"' style='display:inline-block;width:475px;height:310px;"+(indy == g_activeTile[0] && indx == g_activeTile[1] ? "background-color:rgba(0,0,0,0.30)" : "")+"'></div>";
		}
	}
	jQuery("#mapGridOverlay").html(htmlout);
	bindActiveTile();
};

var openClueModal = function() {
	var htmlout = "";
	htmlout += "<div class='modalOverlay'></div>";
	htmlout += "<div class='modalContainer'>";
	htmlout += "<div class='closeBtn'></div>";
	htmlout += "<div class='clueContainer'></div>";
	htmlout += "<div class='clueImg'><img style='position:absolute;opacity:0;' src='' class='clueImgSrc' id='clueImgSrc'></div>";
	htmlout += "<div class='clueText'>"+g_currentClue.toUpperCase()+"</div>";
	htmlout += "</div>";
	jQuery("#uiLayer").append(htmlout);
	jQuery("#clueImgSrc").one("load", function(){
		var containerHeight = jQuery(".clueImg").height();
		var clueheight = jQuery("#clueImgSrc").height();
		jQuery("#clueImgSrc").css("top", (containerHeight / 2) - (clueheight / 2) + "px" ).css("opacity",1);
	});
	jQuery("#clueImgSrc").attr("src","assets/images/clue/"+g_currentClue.toUpperCase()+"_clue.png");

	jQuery(".modalContainer .closeBtn").click(function(){
		closeModal();
	});
};

var closeModal = function() {
	jQuery(".modalContainer").remove();
	jQuery(".modalOverlay").remove();
};

var confirmClue = function() {
	var clueChildren = jQuery("#clueDrop1").children();
	if(clueChildren.length > 0) {
		var selectedClue = jQuery(clueChildren[0]).attr("id").replace("img_","");
		if(selectedClue === g_currentClue) {
			var onAnimComplete = function() {
				if(g_currentClue === g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][1]) {
					setStateSearchSelect();
				} else {
					g_currentClue = g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][1];
					openClueModal();
					util.player.togglePlayer();
				}
			};
			util.animation.correctAnim(onAnimComplete);
			jQuery("#clue_"+g_currentClue).append(jQuery(clueChildren[0])); //reset position of dragged element

		} else {
			util.animation.incorrectAnim(function(){});
			jQuery("#clue_"+selectedClue).append(jQuery(clueChildren[0])); //reset position of dragged element
		}
	}
};

//////////////// State Transitions
////////////////

var setStateTitle = function() {
	util.template.getHTML("assets/js/title.html", function(data){
		jQuery("#uiLayer").removeClass("bg1").removeClass("cluePhase").html(data);
		//init here
		jQuery("#playBtn").click(function(){setStateExplore();});
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
	//console.log("cluephase");
	jQuery("#uiLayer").html("");
	util.template.getHTML("assets/js/clue.html", function(data){
		jQuery("#uiLayer").removeClass("bg1").addClass("cluePhase").html(data);
		//init here
		createClueMap();
		jQuery(".clueBar .clueDrop2").unbind().click(function(){
			openClueModal();
		});
		jQuery(".clueBar .clueDoneBtn").unbind().click(function(){
			confirmClue();
			//setStateSearch();
		});
		openClueModal();
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
		var clueurl1 = "<img style='width:100%;height:100%;' src='"+"assets/images/clue/"+clue1.toUpperCase()+"_clue.png'>";
		var clueurl2 = "<img style='width:100%;height:100%;' src='"+"assets/images/clue/"+clue2.toUpperCase()+"_clue.png'>";
		jQuery("#clueDrop1").html(clueurl1);
		jQuery("#clueDrop2").html(clueurl2);
		//show overlay grid (dotted line)
		jQuery(".clueGridOverlay").show();
		//bind overlay grid
		jQuery(".clueOverlayBox").unbind().click(function(){
			if( jQuery(this).hasClass("active") ){
				//OPEN FPS VIEW
				g_activeTile = [jQuery(this).attr("coordinant").split("_")[0], jQuery(this).attr("coordinant").split("_")[1]];
				g_heading = "north";
				setStateSearchFirstPerson();
			} else {
				jQuery(".clueOverlayBox").removeClass("active");
				jQuery(this).addClass("active");
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