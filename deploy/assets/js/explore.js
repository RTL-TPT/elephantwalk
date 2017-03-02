var getSearchPX = function(gridx,gridy) {
	return [950 / gridx, 620 / gridy];
};

var createExploreMap = function() {
	var gridPX = getSearchPX(g_activeGrid.x, g_activeGrid.y);
	g_activeTile = [util.getRandomInt(0,g_activeGrid.y),util.getRandomInt(0,g_activeGrid.x)];
	//map feature layer
	var htmlout = "";
	//
	htmlout += "<div id='exMapImg' style='position:absolute;width:100%;height:100%'><img src='assets/images/lvlsets/"+(g_currentSet)+"/map_"+(g_currentSet)+".jpg'></div>";
	//
	htmlout += "<div id='mapGrid' class='mapGrid'>";
	//
	for(var indy = 0; indy < g_activeGrid.y; indy++) {
		for(var indx = 0; indx < g_activeGrid.x; indx++) {
			htmlout += "<img class='exploreMapImg' style='display:inline-block;width:"+gridPX[0]+"px;height:"+gridPX[1]+"px;opacity:1;' coordinant='"+indy+"_"+indx+"' src='assets/images/bg_explore.gif'>";
			g_tilesRemaining[""+indy+","+indx] = 1;
		}
	}
	htmlout += "</div>";
	//highlight active block
	htmlout += "<div id='mapGridOverlay' class='mapGridOverlay'>";
	for(indy = 0; indy < g_activeGrid.y; indy++) {
		for(indx = 0; indx < g_activeGrid.x; indx++) {
			htmlout += "<div class='"+ (indy == g_activeTile[0] && indx == g_activeTile[1] ? "activeTile" : "") 
				+"' style='display:inline-block;width:"+gridPX[0]+"px;height:"+gridPX[1]+"px;"+(indy == g_activeTile[0] && indx == g_activeTile[1] ? "background-color:rgba(0,0,0,0.30)" : "")+"'></div>";
		}
	}
	htmlout += "</div>";
	//map grid layer (dotted-lines)
	var coordx = 950 / g_activeGrid.x;
	var coordy = 620 / g_activeGrid.y;
	for(var i = 1; i < g_activeGrid.x; i++) {
		htmlout += "<div class='mapGridLines' style='position:absolute;top:0px;left:"+(coordx*i-1)+"px;width:2px;height:620px;background:url(assets/images/linev.png)'></div>";
	}
	for(var i = 1; i < g_activeGrid.y; i++) {
		htmlout += "<div class='mapGridLines' style='position:absolute;top:"+(coordy*i-1)+"px;left:0px;width:950px;height:2px;background:url(assets/images/lineh.png)'></div>";
	}
	htmlout += "<div id='firstPerson' class='firstPerson'></div>";
	///// explore view image loading
	var firstpersonimgs = [];
	for(var i = 0; i < g_activeGrid.x; i++) {
		for(var j = 0; j < g_activeGrid.y; j++) {
			firstpersonimgs.push(util.getFacingPath(j,i,"north"));
			firstpersonimgs.push(util.getFacingPath(j,i,"west"));
			firstpersonimgs.push(util.getFacingPath(j,i,"east"));
			firstpersonimgs.push(util.getFacingPath(j,i,"south"));
		}
	}
	util.loadImages(firstpersonimgs, function(){
		jQuery("#exploremap").html(htmlout);
		bindActiveTile();
	});
	/////
};

var createExploreGPS = function() {
	var gridPX = getSearchPX(g_activeGrid.x,g_activeGrid.y);
	var htmlout = "";
	//
	htmlout += "<div id='gpsmap' class='GPSContainer'>";
	//
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
	var coordx = 950 / g_activeGrid.x;
	var coordy = 620 / g_activeGrid.y;
	for(var i = 1; i < g_activeGrid.x; i++) {
		htmlout += "<div style='position:absolute;top:0px;left:"+(coordx*i-1)+"px;width:2px;height:620px;background:url(assets/images/linev.png)'></div>";
	}
	for(var i = 1; i < g_activeGrid.y; i++) {
		htmlout += "<div style='position:absolute;top:"+(coordy*i-1)+"px;left:0px;width:950px;height:2px;background:url(assets/images/lineh.png)'></div>";
	}
	//
	htmlout += "</div>";
	jQuery("#firstPerson").append(htmlout);
};

var bindActiveTile = function() {
	jQuery(".activeTile").click(function(){
		jQuery.each(jQuery(".exploreMapImg"),function(key,value){
			if( jQuery(value).attr("coordinant") == g_activeTile[0]+"_"+g_activeTile[1] ) {
				jQuery(value).css("opacity",0);
			}
		});
		jQuery(".exploreMapImg");
		g_directionsRemaining = "nesw".replace(g_heading[0], "");
		jQuery("#firstPerson").html("<img style='display:inline-block' src='"+util.getFacingPath(g_activeTile[1],g_activeTile[0],g_heading)+"'>");
		createExploreGPS();
		jQuery(".arrow").show();
		jQuery("#rightArrow").unbind().click(function(){rotateView("right")});
		jQuery("#leftArrow").unbind().click(function(){rotateView("left")});
		jQuery("#mapGrid").hide();
		jQuery(".mapGridOverlay").hide();
		jQuery(".mapGridLines").hide();
		jQuery("#exMapImg").hide();
		delete g_tilesRemaining[""+g_activeTile[0]+","+g_activeTile[1]];
	});
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
	createExploreGPS();
	if(g_directionsRemaining === "" && jQuery("#returnBtn:visible").length === 0){
		/*jQuery("#returnBtn").unbind().show().click(function(){
			firstPersonToMap();
		});*/
		jQuery("#rightArrow").unbind();
		jQuery("#leftArrow").unbind();
		setTimeout(firstPersonToMap, 1000);
	}
};

var firstPersonToMap = function() {
	jQuery("#returnBtn").hide();
	jQuery("#mapGrid").show();
	jQuery(".mapGridOverlay").show();
	jQuery(".mapGridLines").show();
	jQuery("#exMapImg").show();
	jQuery("#firstPerson").html("");
	jQuery("#rightArrow").hide();
	jQuery("#leftArrow").hide();
	setNewExploreSpace();
};

var setNewExploreSpace = function() {
	var gridPX = getSearchPX(g_activeGrid.x, g_activeGrid.y);
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
	for(var indy = 0; indy < g_activeGrid.y; indy++) {
		for(var indx = 0; indx < g_activeGrid.x; indx++) {
			htmlout += "<div class='"+ (indy == g_activeTile[0] && indx == g_activeTile[1] ? "activeTile" : "") 
				+"' style='display:inline-block;width:"+gridPX[0]+"px;height:"+gridPX[1]+"px;"+(indy == g_activeTile[0] && indx == g_activeTile[1] ? "background-color:rgba(0,0,0,0.30)" : "")+"'></div>";
		}
	}
	jQuery("#mapGridOverlay").html(htmlout);
	bindActiveTile();
};