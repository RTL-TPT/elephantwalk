var createSearchMap = function() {
	var htmlout = "";
	//map bg
	htmlout = "<div style='width:100%;height:100%;background:url(assets/images/lvlsets/"+g_currentSet+"/map_"+g_currentSet+".jpg) center center no-repeat;background-size:725px'></div>";
	jQuery("#clueMap").append(htmlout);
	//
	var grid = g_LEVEL_GRID[g_selectedDifficulty][g_selectedLevel];
	//grid for eventual answer selection
	htmlout = "<div id='clueGridOverlay' style='display:none;' class='clueGridOverlay'>";
	for(indy = 0; indy < g_activeGrid.y; indy++) {
		for(indx = 0; indx < g_activeGrid.x; indx++) {
			var borderright = indx < g_activeGrid.x - 1 ? "border-right: 1px dashed black;" : "";
			var borderleft = indx > 0 ? "border-left: 1px dashed black;" : "";
			var borderup = indy > 0 ? "border-top: 1px dashed black;" : "";
			var borderdown = indy < g_activeGrid.y - 1 ? "border-bottom: 1px dashed black;" : "";
			var borderSum = borderright + borderleft + borderup + borderdown;
			htmlout += "<div class='clueOverlayBox' coordinant='"+indy+"_"+indx+"' style='display:inline-block;box-sizing:border-box;"+borderSum+"width:"+(jQuery("#clueMap").width() / grid.x)+"px;height:"+(jQuery("#clueMap").height() / grid.y)+"px;'></div>";
		}
	}
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
			var left = "border-left:"+950/g_activeGrid.x/2+"px solid " + (g_directionsRemaining.indexOf("w") != -1 ? "yellow;" : "transparent;");
			var right = "border-right:"+950/g_activeGrid.x/2+"px solid " + (g_directionsRemaining.indexOf("e") != -1 ? "yellow;" : "transparent;");
			var top = "border-top:"+620/g_activeGrid.y/2+"px solid " + (g_directionsRemaining.indexOf("n") != -1 ? "yellow;" : "transparent;");
			var bottom = "border-bottom:"+620/g_activeGrid.y/2+"px solid " + (g_directionsRemaining.indexOf("s") != -1 ? "yellow;" : "transparent;");
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
	//map grid layer (dotted-lines) + pointer arrow
	htmlout += "<div id='' class='mapGPSOverlay'>";
	for(indy = 0; indy < g_activeGrid.y; indy++) {
		for(indx = 0; indx < g_activeGrid.x; indx++) {
			var borderright = indx < g_activeGrid.x - 1 ? "border-right: 2px dashed black;" : "";
			var borderleft = indx > 0 ? "border-left: 2px dashed black;" : "";
			var borderup = indy > 0 ? "border-top: 2px dashed black;" : "";
			var borderdown = indy < g_activeGrid.y - 1 ? "border-bottom: 2px dashed black;" : "";
			var borderSum = borderright + borderleft + borderup + borderdown;
			var cTileIsActive = g_activeTile[0] == indy && g_activeTile[1] == indx;
			htmlout += "<div style='display:inline-block;box-sizing:border-box;width:"+gridPX[0]+"px;height:"+gridPX[1]+"px;"+borderSum+"' class='"+(cTileIsActive ? "gps-arrow-"+g_heading : "")+"'></div>";
		}
	}
	htmlout += "</div></div>";
	jQuery("#exploremap").append(htmlout);
};

var createSearchView = function() {
	jQuery("#exploremap").html("<img style='display:inline-block' src='"+util.getFacingPath(g_activeTile[1],g_activeTile[0],g_heading)+"'>");
	createSearchGPS();
	jQuery(".arrow").show();
	jQuery("#rightArrow").unbind().click(function(){searchRotate("right")});
	jQuery("#leftArrow").unbind().click(function(){searchRotate("left")});
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
	var cElephant = g_LEVEL_ELEPHANT[g_selectedDifficulty][g_selectedLevel];
	if(cElephant[0] == g_activeTile[0] && cElephant[1] == g_activeTile[1] && cElephant[2] == g_heading) {
		jQuery("#exploremap").html("<img style='display:inline-block' src='"+util.getFacingPathElephant(g_activeTile[1],g_activeTile[0],g_heading)+"'>");
		//set elephant hitbox
		var boxdata = g_mapsetdata[g_currentSet-1].elephant[g_activeTile[1]+"_"+g_activeTile[0]+"_"+g_heading];
		var ebox = "<div id='elephantBox' style='position:absolute;left:"+boxdata[0]+"px;top:"+boxdata[1]+"px;width:"+boxdata[2]+"px;height:"+boxdata[3]+"px;'></div>";
		jQuery("#exploremap").append(ebox);
		jQuery("#elephantBox").unbind().click(function(){
			jQuery("#leftArrow").unbind();
			jQuery("#rightArrow").unbind();
			alert("You found the elephant!");
			g_hasDrag = false;
			setStateLevelSelect();
		});
		//add gps
		createSearchGPS();
	}else if(g_directionsRemaining === ""){
		//setStateSearchSelect();
	}
};