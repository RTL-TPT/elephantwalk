var getCluePX = function(gridx,gridy) {
	return [g_cluescalex / gridx, g_cluescaley / gridx];
};

var createClueMap = function() {
	var htmlout = "";
	//map bg
	htmlout = "<div style='width:100%;height:100%;background:url(assets/images/lvlsets/"+g_currentSet+"/map_"+g_currentSet+".jpg) center center no-repeat;background-size:750px'></div>";
	jQuery("#clueMap").append(htmlout);
	//CACHE IMAGES
	var cacheAr = [];
	jQuery.each(g_CLUE_ABSTRACTION[g_selectedDifficulty][g_selectedLevel],function(key,value){
		cacheAr.push("assets/images/clue/"+key+".jpg");
		cacheAr.push("assets/images/clue/"+key.toUpperCase()+"_abstract-symbol.jpg");
		cacheAr.push("assets/images/clue/"+key.toUpperCase()+"_clue.jpg");
		cacheAr.push("assets/images/clue/"+key.toUpperCase()+"_non-abstract-symbol.jpg");
		cacheAr.push("assets/images/clue/"+key.toUpperCase()+"_partial-abstract-symbol.jpg");
	});
	jQuery.each(g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel],function(key,value){
		cacheAr.push("assets/images/clue/"+value.toUpperCase()+"_clue_l.jpg");
	});
	util.loadImages(cacheAr,function(){});
	//CREATE DRAGABLE CLUES
	for(var i = 0; i < g_mapsetdata[g_currentSet-1].clues.length; i++) {
		var cClue = g_mapsetdata[g_currentSet-1].clues[i];
		var cx = g_cluescalex/g_mapscalex * cClue[0];
		var cy = g_cluescalex/g_mapscalex * cClue[1] /*+ ((575-473.16)/2)*/;
		var cwidth = g_cluescalex/g_mapscalex * cClue[2];
		var cheight = g_cluescalex/g_mapscalex * cClue[3];
		var cstyle = "style='left:"+cx+"px;top:"+cy+"px;width:"+cwidth+"px;height:"+cheight+"px;'";
		htmlout = "<div id='clue_"+cClue[4]+"' class='dragClue' "+cstyle+" ></div>";
		jQuery("#clueMap").append(htmlout);
	}
	//SET UP DRAG AND DROP EVENTS
	var getXY = function(event) {
		var px, py;
		if(event.originalEvent.touches === undefined) {
			px = event.pageX;
			py = event.pageY;
		} else {
			if(event.originalEvent.touches[0] !== undefined) {
				px = event.originalEvent.touches[0].pageX;
				py = event.originalEvent.touches[0].pageY;
			} else {
				return [0,0];
			}
		}
		return [px,py];
	};
	jQuery("#content").unbind().on("mousemove touchmove",function(event){
		if(g_modalLevel != 0) {
			return;
		}
		event.preventDefault();
		var coord = getXY(event);
		var mousefollower = jQuery(".mousefollower");
		if(mousefollower.length > 0) {
			jQuery(".mousefollower").css("left",(coord[0]-75)+"px").css("top",(coord[1]-(175/2))+"px");
		}
	});
	jQuery("#content").on("mouseup touchend touchcancel",function(event){
		if(g_modalLevel != 0) {
			return;
		}
		var coord = getXY(event);
		var dropWidth = 150 * g_scale;
		var dropHeight = 175 * g_scale;
		var mousefollower = jQuery(".mousefollower");
		if(mousefollower.length > 0) {
			event.preventDefault();
			if(coord[0] == 0 && coord[1] == 0) {
				coord[0] = jQuery(".mousefollower").position().left+(75*g_scale);
				coord[1] = jQuery(".mousefollower").position().top+(175/2*g_scale);
			}
			var droplocation = jQuery("#clueDrop1").offset();
			var lDiff = coord[0] - droplocation.left;
			var tDiff = coord[1] - droplocation.top;
			var lFit = (lDiff >= 0 && lDiff <= dropWidth) ? true : false;
			var tFit = (tDiff >= 0 && tDiff <= dropHeight) ? true : false;
			if(lFit && tFit) {
				jQuery("#clueDoneBtn").show();
				jQuery("#clueDrop1").html("<img cname='img_"+g_currentDrag+"' style='width:100%;height:100%;' src='"+"assets/images/clue/"+g_currentDrag.toUpperCase()+util.getCluePath(g_currentDrag)+"'>");
				elephantTelemetry.createEvent("clue_select",{"player_selection":g_currentDrag,"correct_selection":g_currentClue});
			}
			jQuery(".mousefollower").remove();
		}
	});
	jQuery(".dragClue").unbind().on("mousedown touchstart",function(event){
		//event.preventDefault();
		var coord = getXY(event);
		g_currentDrag = event.currentTarget.id.split("_")[1];
		var mousefollower = "<div class='mousefollower' style='position:fixed;"+util.getScaleString(g_scale)+"width:150px;height:175px;left:"+(coord[0]-75)+"px;top:"+(coord[1]-(175/2))+"px;background:url("+"assets/images/clue/"+(event.currentTarget.id.split("_")[1]).toUpperCase()+util.getCluePath(g_currentDrag)+")'></div>";
		jQuery("#content").append(mousefollower);
		g_hasDrag = true;
	});
	g_currentClue = g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][0];
};

var openClueModal = function(callback) {
	g_music["music_game"].volume = g_volumeLevel / 4;
	var htmlout = "";
	htmlout += "<div class='sfxBtn'></div>";
	htmlout += "<div class='clueContainer'></div>";
	htmlout += "<div class='clueImg' style='background:url(assets/images/clue/"+g_currentClue.toUpperCase()+"_clue_l.jpg) center center no-repeat;background-size:100%;'></div>";
	//htmlout += "<div class='clueImg'><img style='position:absolute;opacity:0;' src='' class='clueImgSrc' id='clueImgSrc'></div>";
	htmlout += "<div class='clueText'>"+g_currentClue.toUpperCase()+"</div>";
	htmlout += "</div>";
	
	//jQuery("#uiLayer").append(htmlout);
	util.openModal(htmlout);

	/*jQuery("#clueImgSrc").one("load", function(){
		var containerHeight = jQuery(".clueImg").height();
		var clueheight = jQuery("#clueImgSrc").height();
		jQuery("#clueImgSrc").css("top", (containerHeight / 2) - (clueheight / 2) + "px" ).css("opacity",1);
	});
	jQuery("#clueImgSrc").attr("src","assets/images/clue/"+g_currentClue.toUpperCase()+"_clue.png");*/
	//play clue sfx
	if(jQuery(".playerModalContainer").length > 0) {
		//
	} else {
		g_sfx[g_currentClue].play(undefined,undefined,g_volumeLevel);
	}

	jQuery(".modalContainer .sfxBtn").click(function(){
		playClickSFX();
		g_sfx[g_currentClue].stop();
		g_sfx[g_currentClue].play(undefined,undefined,g_volumeLevel);
	});

	jQuery(".modalContainer .closeBtn._"+g_modalLevel).click(function(){
		g_sfx[g_currentClue].stop();
		g_music["music_game"].volume = g_volumeLevel;
		if(callback !== undefined){callback();}
	});
};

var confirmClue = function() {
	var clueChildren = jQuery("#clueDrop1").children();
	var isCorrect = false; // for telemetry
	if(clueChildren.length > 0) {
		var selectedClue = jQuery(clueChildren[0]).attr("cname").replace("img_","");
		if(selectedClue === g_currentClue) {
			var onAnimComplete = function() {
				if(g_currentClue === g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][1]) {
					jQuery("#uiLayer").unbind();
					jQuery("#clueDrop1").unbind();
					setStateSearchSelect();
				} else {
					g_currentClue = g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][1];
					util.player.togglePlayer();
					g_savestate.game_state.phase = "clue2";
					saveState();
					openClueModal();
				}
			};
			jQuery("#clueDoneBtn").hide();
			util.animation.correctAnim(onAnimComplete);
			jQuery("#clueDrop1").html("");
			isCorrect = true;
		} else {
			jQuery("#clueDoneBtn").hide();
			util.animation.incorrectAnim(function(){});
			jQuery("#clueDrop1").html("");
		}
		g_clueAttempts.push(isCorrect);
		//start attempt tracking section
		var masteryUp = false;
		var isDuplicate = false;
		if(util.player.getPlayer() == 2) {
			//player 2
			g_savestate.clue_track_p2[util.getMasteryIndexAS()].push(isCorrect);
			var correctCount = 0;
			for(var i = 0; i < g_savestate.clue_track_p2[util.getMasteryIndexAS()].length; i++) {
				if(g_savestate.clue_track_p2[util.getMasteryIndexAS()][i]) {
					correctCount++;
				}
			}
			if(g_savestate.clue_track_p2[util.getMasteryIndexAS()].length >= 5 || correctCount >= 3) {
				if(correctCount >= 3) {
					//do correct
					masteryUp = true;
				} else {
					//do failure
					masteryUp = false;
				}
				if( (util.getLowerMastery(g_savestate.clue_mastery_p2,util.getMasteryTargets()[0]) == g_savestate.clue_mastery_p2) && (g_savestate.clue_mastery_p2 != util.getMasteryTargets()[0])) {
					//check to see if target mastery level has already been obtained
					isDuplicate = false;
				} else {
					isDuplicate = true;
				}
				if(!isDuplicate) {
					app.container.send("objective_complete", {
						"op_label": "as_mastery_" + util.getMasteryTargets()[0],
						"success": masteryUp,
						"is_second_player": true
					});
				}
				if(masteryUp) {
					g_savestate.clue_mastery_p2 = util.getHigherMasteryAS(util.getMasteryTargets()[0], g_savestate.clue_mastery_p2);
					//saveState();
				}
				console.log("clue mastery p2:" + masteryUp);
				//reset p2 tracking
				g_savestate.clue_track_p2[util.getMasteryIndexAS()] = [];
			}
		} else {
			//player 1
			g_savestate.clue_track_p1[util.getMasteryIndexAS()].push(isCorrect);
			var correctCount = 0;
			for(var i = 0; i < g_savestate.clue_track_p1[util.getMasteryIndexAS()].length; i++) {
				if(g_savestate.clue_track_p1[util.getMasteryIndexAS()][i]) {
					correctCount++;
				}
			}
			if(g_savestate.clue_track_p1[util.getMasteryIndexAS()].length >= 5 || correctCount >= 3) {
				if(correctCount >= 3) {
					//do correct
					masteryUp = true;
				} else {
					//do failure
					masteryUp = false;
				}
				if( (util.getLowerMastery(g_savestate.clue_mastery_p1,util.getMasteryTargets()[0]) == g_savestate.clue_mastery_p1) && (g_savestate.clue_mastery_p1 != util.getMasteryTargets()[0])) {
					//check to see if target mastery level has already been obtained
					isDuplicate = false;
				} else {
					isDuplicate = true;
				}
				if(!isDuplicate) {
					app.container.send("objective_complete", {
						"op_label": "as_mastery_" + util.getMasteryTargets()[0],
						"success": masteryUp,
						"is_second_player": false
					});
				}
				if(masteryUp) {
					g_savestate.clue_mastery_p1 = util.getHigherMasteryAS(util.getMasteryTargets()[0], g_savestate.clue_mastery_p1);
					//saveState();
				}
				console.log("clue mastery p1:" + masteryUp);
				//reset p1 tracking
				g_savestate.clue_track_p1[util.getMasteryIndexAS()] = [];
			}
		}
		saveState();
		//end attempt tracking section
		if(isDuplicate){
			masteryUp = false;
		}
		elephantTelemetry.createEvent("clue_done", {"pass_fail":isCorrect,"player_selection":selectedClue,"correct_selection":g_currentClue,"attempt_num":g_clueAttempts.length,"mastery_up":masteryUp});
		if(isCorrect){
			g_clueAttempts = []; //reset attempts for next clue
		}
	} else {
		//Case for when confirm button is clicked but no clue has been selected
	}
};

var openLegendModal = function() {
	var htmlout = "";

	htmlout += "<center><div style='width:100%;margin-top:50px;font-size:50px;'>LEGEND</div><div style='width:100%;height:496px;box-sizing:border-box;padding:5px;margin-top:30px;overflow-y:auto;'>";
	jQuery.each(g_CLUE_ABSTRACTION[g_selectedDifficulty][g_selectedLevel],function(key,value){
		var abstraction = g_LEGEND_ABSTRACTION[g_selectedDifficulty][g_selectedLevel][key];
		var posturl = util.getCluePath(key);
		var clueImg = "<img style='display:inline-block;height:87.5px;' class='' src='assets/images/clue/"+key+".jpg'>";
		htmlout += "<div style='width:100%;height:87.5px;margin-bottom:25px;'> <div style='display:inline-block'>"+clueImg+"</div><div class='cap1' style='display:inline-block;width:100px;height:87.5px;"+util.getTranslateYString("-50%")+"'>"+key+"</div>";
		
		var lockImg = "<div style='display:inline-block;width:75px;height:87.5px;background:url(assets/images/lock.png) center center no-repeat;'></div>";
		var overlay = "<div style='display:inline-block;width:75px;height:87.5px;background-color:rgba(0,0,0,0.5);'>"+lockImg+"</div>";

		if(abstraction == "nonAbstract" || abstraction == "partialAbstract" || abstraction == "fullAbstract") {
			var absImg = "<img style='' class='legendImgSize' src='assets/images/clue/"+key.toUpperCase()+"_non-abstract-symbol.jpg"+"'>";
			htmlout += "<div style='display:inline-block'>"+absImg+"</div>";
		} else {
			var clueImg = "assets/images/clue/"+key.toUpperCase()+"_non-abstract-symbol.jpg";
			htmlout += "<div style='display:inline-block;margin-right:18px;width:75px;height:87.5px;background:url("+clueImg+") center center no-repeat;background-size:75px 87.5px;'>"+overlay+"</div>";
		}
		if(abstraction == "partialAbstract" || abstraction == "fullAbstract") {
			var absImg = "<img style='' class='legendImgSize' src='assets/images/clue/"+key.toUpperCase()+"_partial-abstract-symbol.jpg"+"'>";
			htmlout += "<div style='display:inline-block'>"+absImg+"</div>";
		} else {
			var clueImg = "assets/images/clue/"+key.toUpperCase()+"_partial-abstract-symbol.jpg";
			htmlout += "<div style='display:inline-block;margin-right:18px;width:75px;height:87.5px;background:url("+clueImg+") center center no-repeat;background-size:75px 87.5px;'>"+overlay+"</div>";
		}
		if(abstraction == "fullAbstract") {
			var absImg = "<img style='' class='legendImgSize' src='assets/images/clue/"+key.toUpperCase()+"_abstract-symbol.jpg"+"'>";
			htmlout += "<div style='display:inline-block'width:75px;height:87.5px;>"+absImg+"</div>";
		} else {
			var clueImg = "assets/images/clue/"+key.toUpperCase()+"_abstract-symbol.jpg";
			htmlout += "<div style='display:inline-block;margin-right:18px;width:75px;height:87.5px;background:url("+clueImg+") center center no-repeat;background-size:75px 87.5px;'>"+overlay+"</div>";
		}
		htmlout += "</div>";
	});
	htmlout += "</div></center>";

	util.openModal(htmlout);

	elephantTelemetry.createEvent("clue_legend",{"correct_selection":g_currentClue});
};