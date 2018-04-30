var getSearchPX = function(gridx,gridy) {
	return [g_mapscalex / gridx, g_mapscaley / gridy];
};

var createExploreMap = function(player) {
	util.setRandomHeading();
	var eTargets = util.getCurrentExploreTargets();
	var target1 = eTargets[0][0];
	var target2 = eTargets[0][1];
	if(typeof player !== "undefined" && player == 2) {
		while(g_heading == eTargets[1][2]) {
			util.setRandomHeading();
		}
		target1 = eTargets[1][0];
		target2 = eTargets[1][1];
		if(util.currentLevelId() === "1_T2") {
			util.player.setPlayerNoModal(2);
			tutorial.c1();
		} else {
			util.player.setPlayer(2);
		}
	} else {
		//p1
		while(g_heading == eTargets[0][2]) {
			util.setRandomHeading();
		}
	}
	g_activeTile = [target1,target2];
	var htmlout = "";
	htmlout += "<div id='firstPerson' class='firstPerson'></div>";
	///// explore view image loading
	var firstpersonimgs = [];
	for(var i = 0; i < g_activeGrid.x; i++) {
		for(var j = 0; j < g_activeGrid.y; j++) {
			firstpersonimgs.push(util.getFacingPath(i,j,"north"));
			firstpersonimgs.push(util.getFacingPath(i,j,"west"));
			firstpersonimgs.push(util.getFacingPath(i,j,"east"));
			firstpersonimgs.push(util.getFacingPath(i,j,"south"));
		}
	}
	util.loadImages(firstpersonimgs, function(){
		jQuery("#exploremap").html(htmlout);
		jumpToExploreFirstPerson();
	});
};

var createExploreGPS = function() {
	var gridPX = getSearchPX(g_activeGrid.x,g_activeGrid.y);
	var htmlout = "";
	htmlout += "<div id='gpsmap' class='GPSContainer'>";
	htmlout += "<div style='position:absolute;width:100%;height:100%'><img src='assets/images/lvlsets/"+(g_currentSet)+"/map_"+(g_currentSet)+".jpg'></div>";
	//map feature layer
	htmlout += "<div id='' class='mapGPS'>";
	for(var indy = 0; indy < g_activeGrid.y; indy++) {
		for(var indx = 0; indx < g_activeGrid.x; indx++) {
			var cTileIsActive = g_activeTile[0] == indy && g_activeTile[1] == indx;
			var cTileIsVisited = g_tilesRemaining[""+indy+","+indx] === undefined;
			htmlout += "<img class='exploreMapImg' style='display:inline-block;width:"+gridPX[0]+"px;height:"+gridPX[1]+"px;opacity:"+(cTileIsActive || cTileIsVisited ? 0 : 1)+";' coordinant='"+indy+"_"+indx+"' src='assets/images/bg_explore.gif'>";
		}
	}
	htmlout += "</div>";
	//highlight active block
	htmlout += "<div id='' class='mapGPSOverlay'>";
	for(indy = 0; indy < g_activeGrid.y; indy++) {
		for(indx = 0; indx < g_activeGrid.x; indx++) {
			var left = "border-left:"+g_mapscalex/g_activeGrid.x/2+"px solid " + (g_directionsRemaining.indexOf("w") != -1 ? "yellow;" : "transparent;");
			var right = "border-right:"+g_mapscalex/g_activeGrid.x/2+"px solid " + (g_directionsRemaining.indexOf("e") != -1 ? "yellow;" : "transparent;");
			var top = "border-top:"+g_mapscaley/g_activeGrid.y/2+"px solid " + (g_directionsRemaining.indexOf("n") != -1 ? "yellow;" : "transparent;");
			var bottom = "border-bottom:"+g_mapscaley/g_activeGrid.y/2+"px solid " + (g_directionsRemaining.indexOf("s") != -1 ? "yellow;" : "transparent;");
			var blockstyle = "width:0px;height:0px;" + left + right + top + bottom;
			if(indy == g_activeTile[0] && indx == g_activeTile[1]) {
			htmlout += "<div class='"+ (indy == g_activeTile[0] && indx == g_activeTile[1] ? "activeTile" : "") 
				+"' style='display:inline-block;"+blockstyle+"'></div>";
			} else {
			htmlout += "<div class='"+ (indy == g_activeTile[0] && indx == g_activeTile[1] ? "activeTile" : "") 
				+"' style='display:inline-block;width:"+gridPX[0]+"px;height:"+gridPX[1]+"px;'></div>";
			}
		}
	}
	htmlout += "</div>";
	//pointer arrow
	htmlout += "<div id='' class='mapGPSOverlay'>";
	for(indy = 0; indy < g_activeGrid.y; indy++) {
		for(indx = 0; indx < g_activeGrid.x; indx++) {
			var cTileIsActive = g_activeTile[0] == indy && g_activeTile[1] == indx;
			htmlout += "<div style='display:inline-block;box-sizing:border-box;width:"+gridPX[0]+"px;height:"+gridPX[1]+"px;' class='"+(cTileIsActive ? "gps-arrow-"+g_heading : "")+"'></div>";
		}
	}
	htmlout += "</div>";
	//dotted-lines
	var coordx = g_mapscalex / g_activeGrid.x;
	var coordy = g_mapscaley / g_activeGrid.y;
	for(var i = 1; i < g_activeGrid.x; i++) {
		htmlout += "<div style='position:absolute;top:0px;left:"+(coordx*i-2)+"px;width:4px;height:"+g_mapscaley+"px;background:url(assets/images/linevl.png)'></div>";
	}
	for(var i = 1; i < g_activeGrid.y; i++) {
		htmlout += "<div style='position:absolute;top:"+(coordy*i-2)+"px;left:0px;width:"+g_mapscalex+"px;height:4px;background:url(assets/images/linehl.png)'></div>";
	}
	//
	htmlout += "</div>";
	jQuery("#firstPerson").append(htmlout);
};

var updateExploreHitbox = function() {
	jQuery("#explHitbox").attr("style",'position:absolute;top:0px;left:0px;width:0px;height:0px');
	jQuery("#explHitbox").unbind().click(function(){foundFeatureModal();});
	var eTargets = util.getCurrentExploreTargets();
	if(util.player.getPlayer() == 2) {
		if(eTargets[1][2] == g_heading) {
			jQuery("#explHitbox").css("width","950px").css("height","620px");
		} else {
			jQuery("#explHitbox").css("width","0px").css("height","0px");
		}
	} else {
		if(eTargets[0][2] == g_heading) {
			jQuery("#explHitbox").css("width","950px").css("height","620px");
		} else {
			jQuery("#explHitbox").css("width","0px").css("height","0px");
		}
	}
};

var jumpToExploreFirstPerson = function() {
	//playClickSFX();
	jQuery.each(jQuery(".exploreMapImg"),function(key,value){
		if( jQuery(value).attr("coordinant") == g_activeTile[0]+"_"+g_activeTile[1] ) {
			jQuery(value).css("opacity",0);
		}
	});
	g_directionsRemaining = "nesw".replace(g_heading[0], "");
	jQuery("#firstPerson").html("<img style='display:inline-block' src='"+util.getFacingPath(g_activeTile[1],g_activeTile[0],g_heading)+"'>");
	updateExploreHitbox();
	createExploreGPS();
	jQuery(".arrow").show();
	jQuery("#rightArrow").unbind().click(function(){playClickSFX();rotateView("right")});
	jQuery("#leftArrow").unbind().click(function(){playClickSFX();rotateView("left")});
	jQuery("#mapGrid").hide();
	jQuery(".mapGridOverlay").hide();
	jQuery(".mapGridLines").hide();
	jQuery("#exMapImg").hide();
	delete g_tilesRemaining[""+g_activeTile[0]+","+g_activeTile[1]];
	var exploreFeature = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].exploreFeature;
	setExploreText("Find the " + exploreFeature[util.player.getPlayer()-1]);
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
	jQuery("#firstPerson").html("<img style='display:inline-block' src='"+util.getFacingPath(g_activeTile[1],g_activeTile[0],g_heading)+"'>");
	updateExploreHitbox();
	createExploreGPS();
	/*if(g_directionsRemaining === "" && jQuery("#returnBtn:visible").length === 0){
		jQuery("#rightArrow").unbind();
		jQuery("#leftArrow").unbind();
		setTimeout(exploreToNextLevel, 1000);
	}*/
};

var foundFeatureModal = function() {
	//do unlocks if finished
	if(typeof util.getCurrentExploreTargets()[1] !== "undefined" && util.player.getPlayer() != 2) {
		//
	} else {
		var isDuplicate = false;
		if(util.allLegendsUnlocked(g_LevelTerrain)) {
			isDuplicate = true;
		}
		var unlocks = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].legendUnlocks;
		jQuery.each(unlocks, function(key, value) {
			util.levelUpTerrain(key,value);
			if(util.allLegendsUnlocked(g_LevelTerrain)) {
				g_savestate.stars[g_LevelTerrain]["legend"] = true;
				if(!isDuplicate) {
					g_savestate.showStars = true;
				}
			}
		});
	}

	//ui

	var exploreFeature = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].exploreFeature;
	var htmlout = "";

	htmlout += "<center><div class='foundMsg'>You found the "+ exploreFeature[util.player.getPlayer()-1] +"!</div></center>";

	//TERRAIN
	htmlout += "<center><div class='terrainunlock'>";
	//show unlocks if finished
	if(typeof util.getCurrentExploreTargets()[1] !== "undefined" && util.player.getPlayer() != 2) {
		//
	} else {
		if(g_savestate.levelsComplete.indexOf(util.currentLevelId()) == -1) {
			var unlocks = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].legendUnlocks;
			htmlout += "<table><tr>"
			jQuery.each(unlocks, function(key, value) {
				htmlout += "<td><center><span>Unlocked</span></center>";
				htmlout += "<center><img src='"+"assets/images/clue/"+key.toUpperCase()+g_clueUrlPost[value]+"'/></center></td>";
			});
			htmlout += "</tr></table>";
		}
	}
	htmlout += "</div></center>";

	util.openModal(htmlout);

	jQuery(".modalContainer .closeBtn._"+g_modalLevel).click(function(){
		if(g_savestate.showStars) {
			g_savestate.showStars = false;
			exploreStarsModal();
		} else {
			//on close go to next exploration or complete level
			exploreToNextLevel();
		}
	});
};

var exploreToNextLevel = function() {
	if(typeof util.getCurrentExploreTargets()[1] !== "undefined" && util.player.getPlayer() != 2) {
		createExploreMap(2);
	} else {
		jQuery("#exploreText").remove();
		var unlocks = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].legendUnlocks;
		jQuery.each(unlocks, function(key, value) {
			util.levelUpTerrain(key,value);
		});
		if(g_savestate.levelsComplete.indexOf(util.currentLevelId()) == -1) {
			g_savestate.levelsComplete.push(util.currentLevelId());
		}
		if(g_enableDebugLevelSelect) {
			setStateSubLevelSelect(g_LevelTerrain);
		} else {
			if(g_selectedDifficulty === "TUTORIAL") {
				gotoNextLevelSequential();
			} else {
				setStateSubLevelSelect(g_LevelTerrain);
			}
		}
	}
};

var exploreToCluePhase = function() {
	setStateClue();
};

var setExploreText = function(message) {
	if(jQuery("#exploreText").length == 0) {
		jQuery("#uiLayer").append("<div class='exploreText' id='exploreText'></div>");
	}
	jQuery("#exploreText").html(message);
	if(message.length == "") {
		jQuery("#exploreText").remove();
	}
};

var exploreStarsModal = function() {
	//do unlocks if finished
	//ui

	var htmlout = "";

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
	if(numGray == 0) {
		htmlout += "<center><div class='foundMsg' style='line-height:500px;'>All Stars Earned!</div></center>";
		htmlout += "<center><div class='foundMsg' style='line-height:610px;'>Next mission unlocked.</div></center>";
	} else {
		htmlout += "<center><div class='foundMsg'>Stars Earned!</div></center>";
	}
	htmlout += "<center><div class='stars'>";
	for(var i = 0; i < numYellow; i++) {
		htmlout += "<img src='assets/images/star-y.png' style='width:50px;height:50px;'/>";
	}
	for(var i = 0; i < numGray; i++) {
		htmlout += "<img src='assets/images/star-g.png' style='width:50px;height:50px;'/>";
	}
	htmlout += "</div></center>";

	util.openModal(htmlout);

	jQuery(".modalContainer .closeBtn._"+g_modalLevel).click(function(){
		//on close go to next exploration or complete level
		exploreToNextLevel();
	});
};