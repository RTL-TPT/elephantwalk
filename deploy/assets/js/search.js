var createSearchMap = function() {
	var htmlout = "";
	//map bg
	htmlout = "<div style='width:100%;height:100%;background:url(assets/images/lvlsets/"+g_currentSet+"/map_"+g_currentSet+".jpg) center center no-repeat;background-size:750px'></div>";
	jQuery("#clueMap").append(htmlout);
	//
	var grid = g_LEVEL_GRID[g_selectedDifficulty][g_selectedLevel];
	//grid for eventual answer selection
	htmlout = "<div id='clueGridOverlay' style='display:none;' class='clueGridOverlay'>";
	for(indy = 0; indy < g_activeGrid.y; indy++) {
		for(indx = 0; indx < g_activeGrid.x; indx++) {
			htmlout += "<div class='clueOverlayBox' coordinant='"+indy+"_"+indx+"' style='display:inline-block;box-sizing:border-box;width:"+(jQuery("#clueMap").width() / grid.x)+"px;height:"+(jQuery("#clueMap").height() / grid.y)+"px;'></div>";
		}
	}
	//dotted lines
	var coordx = g_cluescalex / g_activeGrid.x;
	var coordy = g_cluescaley / g_activeGrid.y;
	for(var i = 1; i < g_activeGrid.x; i++) {
		htmlout += "<div class='mapGridLines' style='position:absolute;top:0px;left:"+(coordx*i-1)+"px;width:2px;height:"+g_cluescaley+"px;background:url(assets/images/linev.png)'></div>";
	}
	for(var i = 1; i < g_activeGrid.y; i++) {
		htmlout += "<div class='mapGridLines' style='position:absolute;top:"+(coordy*i-1)+"px;left:0px;width:"+g_cluescalex+"px;height:2px;background:url(assets/images/lineh.png)'></div>";
	}
	//
	htmlout += "</div>";
	jQuery("#clueMap").append(htmlout);
};

var createSearchGPS = function() {
	var gridPX = getSearchPX(g_activeGrid.x, g_activeGrid.y);
	//map feature layer
	var htmlout = "<div id='gpsmap' class='GPSContainer'>";
	htmlout += "<div style='position:absolute;width:100%;height:100%'><img src='assets/images/lvlsets/"+(g_currentSet)+"/map_"+(g_currentSet)+".jpg'></div>";
	htmlout += "<div id='' class='mapGPS'>";
	htmlout += "</div>";
	//highlight active block
	htmlout += "<div id='' class='mapGPSOverlay'>";
	for(indy = 0; indy < g_activeGrid.y; indy++) {
		for(indx = 0; indx < g_activeGrid.x; indx++) {
			htmlout += "<div class='"+ (indy == g_activeTile[0] && indx == g_activeTile[1] ? "activeTile" : "") 
				+"' style='display:inline-block;width:"+gridPX[0]+"px;height:"+gridPX[1]+"px;'></div>";
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
	jQuery("#exploremap").append(htmlout);
};

var create360Elephant = function() {
	//logic for if you start facing the elephant
	var cElephant = g_LEVEL_ELEPHANT[g_selectedDifficulty][g_selectedLevel];
	if(g_isRandomElephant) {
		//cElephant = cElephant.slice(); //redundant?
		cElephant[2] = g_randomElephantHeading;
	}
	if(cElephant[0] == g_activeTile[0] && cElephant[1] == g_activeTile[1] && cElephant[2] == g_heading) {
		jQuery("#exploremap").html("<img style='display:inline-block' src='"+util.getFacingPathElephant(g_activeTile[1],g_activeTile[0],g_heading)+"'>");
		//set elephant hitbox
		var boxdata = g_mapsetdata[g_currentSet-1].elephant[g_activeTile[0]+"_"+g_activeTile[1]+"_"+g_heading];
		var clickTarget = "";
		if(boxdata === undefined) {
			clickTarget = "#exploremap";
		} else {
			clickTarget = "#elephantBox";
			var ebox = "<div id='elephantBox' style='position:absolute;left:"+boxdata[0]+"px;top:"+boxdata[1]+"px;width:"+boxdata[2]+"px;height:"+boxdata[3]+"px;'></div>";
			jQuery("#exploremap").append(ebox);
		}
		jQuery("#exploremap").unbind();
		jQuery("#elephantBox").unbind();
		jQuery(clickTarget).click(function(){
			if(clickTarget == "#exploremap" && g_LEVEL_ELEPHANT[g_selectedDifficulty][g_selectedLevel][2] != g_heading) {
				return;
			}
			playClickSFX();
			jQuery("#leftArrow").unbind();
			jQuery("#rightArrow").unbind();
			//alert("You found the elephant!");
			var unlocks = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].legendUnlocks;
			jQuery.each(unlocks, function(key, value) {
				util.levelUpTerrain(key,value);
				if(util.allLegendsUnlocked(g_LevelTerrain)) {
					g_savestate.stars[g_LevelTerrain]["legend"] = true;
				}
			});
			//unlock level selects as needed
			if(util.isBlockTutorialClear("LAND")) {
				g_savestate.tutorial_complete["LAND"] = true;
			}
			if(util.isBlockTutorialClear("WATER")) {
				g_savestate.tutorial_complete["WATER"] = true;
			}
			if(util.isBlockTutorialClear("MANMADE")) {
				g_savestate.tutorial_complete["MANMADE"] = true;
			}
			if(util.isBlockTutorialClear("EXPERT")) {
				g_savestate.tutorial_complete["EXPERT"] = true;
			}
			if(util.isBlockClear("LAND")) {
				g_savestate.terrain_unlocked.WATER = true;
			}
			if(util.isBlockClear("WATER")) {
				g_savestate.terrain_unlocked.MANMADE = true;
				//activity complete when manmade unlocks
				app.container.send("activity_complete", {"is_second_player": false});
				//for player two too
				app.container.send("activity_complete", {"is_second_player": true});
			}
			if(util.isBlockClear("MANMADE")) {
				g_savestate.terrain_unlocked.EXPERT = true;
			}
			if(g_selectedDifficulty != "TUTORIAL" && typeof g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel+1] === "undefined") {
				g_savestate["chunkComplete"][util.currentLevelId()[0]] = true;
			}
			//
			g_hasDrag = false;
			foundElephantModal();
		});
		//add gps
		createSearchGPS();
	}else if(g_directionsRemaining === ""){
		//setStateSearchSelect();
	}
};

var createSearchView = function() {
	util.setRandomHeading();
	if(g_isRandomElephant) {
		while(g_heading == g_randomElephantHeading) {
			util.setRandomHeading();
		}
	}
	//cache first person view images then set ui
	var firstpersonimgs = [];
	var cElephant = g_LEVEL_ELEPHANT[g_selectedDifficulty][g_selectedLevel];
	firstpersonimgs.push(util.getFacingPath(g_activeTile[1],g_activeTile[0],"north"));
	firstpersonimgs.push(util.getFacingPath(g_activeTile[1],g_activeTile[0],"west"));
	firstpersonimgs.push(util.getFacingPath(g_activeTile[1],g_activeTile[0],"east"));
	firstpersonimgs.push(util.getFacingPath(g_activeTile[1],g_activeTile[0],"south"));
	firstpersonimgs.push(util.getFacingPathElephant(g_activeTile[1],g_activeTile[0],"north"));
	firstpersonimgs.push(util.getFacingPathElephant(g_activeTile[1],g_activeTile[0],"west"));
	firstpersonimgs.push(util.getFacingPathElephant(g_activeTile[1],g_activeTile[0],"east"));
	firstpersonimgs.push(util.getFacingPathElephant(g_activeTile[1],g_activeTile[0],"south"));

	util.loadImages(firstpersonimgs, function(){
		jQuery("#exploremap").html("<img style='display:inline-block' src='"+util.getFacingPath(g_activeTile[1],g_activeTile[0],g_heading)+"'>");
		createSearchGPS();
		jQuery(".arrow").show();
		jQuery("#rightArrow").unbind().click(function(){playClickSFX();searchRotate("right")});
		jQuery("#leftArrow").unbind().click(function(){playClickSFX();searchRotate("left")});
		create360Elephant();
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
	jQuery("#exploremap").html("<img style='display:inline-block' src='"+util.getFacingPath(g_activeTile[1],g_activeTile[0],g_heading)+"'>");
	createSearchGPS();
	create360Elephant();
};

var foundElephantModal = function() {
	var htmlout = "";

	htmlout += "<center><div class='foundMsg'>You found the elephant!</div></center>";

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
	htmlout += "<center><div class='stars'>";
	for(var i = 0; i < numYellow; i++) {
		htmlout += "<img src='assets/images/star-y.png' style='width:50px;height:50px;'/>";
	}
	for(var i = 0; i < numGray; i++) {
		htmlout += "<img src='assets/images/star-g.png' style='width:50px;height:50px;'/>";
	}
	htmlout += "</div></center>";

	//TERRAIN
	htmlout += "<center><div class='terrainunlock'>";
	if(g_savestate.levelsComplete.indexOf(util.currentLevelId()) == -1) {
		var unlocks = g_leveldata[g_LevelTerrain][g_selectedDifficulty][g_selectedLevel].legendUnlocks;
		htmlout += "<table><tr>"
		jQuery.each(unlocks, function(key, value) {
			htmlout += "<td><center><span>Unlocked</span></center>";
			htmlout += "<center><img src='"+"assets/images/clue/"+key.toUpperCase()+g_clueUrlPost[value]+"'/></center></td>";
		});
		htmlout += "</tr></table>";
	}
	htmlout += "</div></center>";

	util.openModal(htmlout);

	if(g_savestate.levelsComplete.indexOf(util.currentLevelId()) == -1) {
		g_savestate.levelsComplete.push(util.currentLevelId());
	}

	g_savestate.lastLevelPlayed = util.currentLevelId();

	jQuery(".modalContainer .closeBtn._"+g_modalLevel).click(function(){
		//send player back to appropriate state depenending on if they're still in the tutorial or not
		if(g_enableDebugLevelSelect) {
			setStateSubLevelSelect(g_LevelTerrain);
		} else {
			if(g_selectedDifficulty === "TUTORIAL") {
				if(util.currentLevelId() === "1_T3") {
					g_savestate.tutorial_complete["LAND"] = true;
					setStateLevelSelect(tutorial.h1);
				} else {
					gotoNextLevelSequential();
				}
			} else {
				setStateSubLevelSelect(g_LevelTerrain);
			}
		}
	});
};