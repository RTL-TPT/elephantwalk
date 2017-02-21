var g_currentDrag = "";

var getCluePX = function(gridx,gridy) {
	return [725 / gridx, 575 / gridx];
};

var createClueMap = function() {
	var htmlout = "";
	//map bg
	htmlout = "<div style='width:100%;height:100%;background:url(assets/images/lvlsets/"+g_currentSet+"/map_"+g_currentSet+".jpg) center center no-repeat;background-size:725px'></div>";
	jQuery("#clueMap").append(htmlout);
	//CREATE DRAGABLE CLUES
	for(var i = 0; i < g_mapsetdata[g_currentSet-1].clues.length; i++) {
		var cClue = g_mapsetdata[g_currentSet-1].clues[i];
		var cx = 725/950 * cClue[0];
		var cy = 725/950 * cClue[1] + ((575-473.16)/2);
		var cwidth = 725/950 * cClue[2];
		var cheight = 725/950 * cClue[3];
		var cstyle = "style='left:"+cx+"px;top:"+cy+"px;width:"+cwidth+"px;height:"+cheight+"px;'";
		htmlout = "<div id='clue_"+cClue[4]+"' class='dragClue' "+cstyle+" ></div>";
		jQuery("#clueMap").append(htmlout);
	}
	//SET UP DRAG AND DROP EVENTS
	jQuery("#content").unbind().mousemove(function(event){
		var mousefollower = jQuery(".mousefollower");
		if(mousefollower.length > 0) {
			jQuery(".mousefollower").css("left",(event.pageX-75)+"px").css("top",(event.pageY-(175/2))+"px");
		}
	});
	jQuery("#content").mouseup(function(event){
		var mousefollower = jQuery(".mousefollower");
		if(mousefollower.length > 0) {
			var droplocation = jQuery("#clueDrop1").offset();
			var lDiff = event.pageX - droplocation.left;
			var tDiff = event.pageY - droplocation.top;
			var lFit = (lDiff >= 0 && lDiff <= 150) ? true : false;
			var tFit = (tDiff >= 0 && tDiff <= 175) ? true : false;
			if(lFit && tFit) {
				jQuery("#clueDoneBtn").show();
				jQuery("#clueDrop1").html("<img cname='img_"+g_currentDrag+"' style='width:100%;height:100%;' src='"+"assets/images/clue/"+g_currentDrag.toUpperCase()+util.getCluePath(g_currentDrag)+"'>");
			}
			jQuery(".mousefollower").remove();
		}
	});
	jQuery(".dragClue").unbind().mousedown(function(event){
		g_currentDrag = event.currentTarget.id.split("_")[1];
		var mousefollower = "<div class='mousefollower' style='position:fixed;transform:scale("+g_scale+");width:150px;height:175px;left:"+(event.pageX-75)+"px;top:"+(event.pageY-(175/2))+"px;background:url("+"assets/images/clue/"+(event.currentTarget.id.split("_")[1]).toUpperCase()+util.getCluePath(g_currentDrag)+")'></div>";
		jQuery("#content").append(mousefollower);
		g_hasDrag = true;
	});
	g_currentClue = g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][0];
};

var openClueModal = function() {
	var htmlout = "";
	htmlout += "<div class='sfxBtn'></div>";
	htmlout += "<div class='clueContainer'></div>";
	htmlout += "<div class='clueImg'><img style='position:absolute;opacity:0;' src='' class='clueImgSrc' id='clueImgSrc'></div>";
	htmlout += "<div class='clueText'>"+g_currentClue.toUpperCase()+"</div>";
	htmlout += "</div>";
	
	//jQuery("#uiLayer").append(htmlout);
	util.openModal(htmlout);

	jQuery("#clueImgSrc").one("load", function(){
		var containerHeight = jQuery(".clueImg").height();
		var clueheight = jQuery("#clueImgSrc").height();
		jQuery("#clueImgSrc").css("top", (containerHeight / 2) - (clueheight / 2) + "px" ).css("opacity",1);
	});
	jQuery("#clueImgSrc").attr("src","assets/images/clue/"+g_currentClue.toUpperCase()+"_clue.png");
	//play clue sfx
	if(jQuery(".playerModalContainer").length > 0) {
		//
	} else {
		g_sfx[g_currentClue].play();
	}

	jQuery(".modalContainer .sfxBtn").click(function(){
		g_sfx[g_currentClue].stop();
		g_sfx[g_currentClue].play();
	});

	jQuery(".modalContainer .closeBtn._"+g_modalLevel).click(function(){
		g_sfx[g_currentClue].stop();
	});
};

var confirmClue = function() {
	var clueChildren = jQuery("#clueDrop1").children();
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
					openClueModal();
				}
			};
			jQuery("#clueDoneBtn").hide();
			util.animation.correctAnim(onAnimComplete);
			jQuery("#clueDrop1").html("");

		} else {
			jQuery("#clueDoneBtn").hide();
			util.animation.incorrectAnim(function(){});
			jQuery("#clueDrop1").html("");
		}
	} else {
		/*var htmlout = "";
		htmlout += "<center><div class='foundMsg'>Drag the right clue to the box!<div></center>";
		util.openModal(htmlout);*/
	}
};

var openLegendModal = function() {
	var htmlout = "";

	htmlout += "<center><div style='width:100%;margin-top:20px;font-size:50px;'>LEGEND</div><div style='width:100%;height:526px;box-sizing:border-box;padding:5px;margin-top:30px;overflow-y:auto;'>";
	jQuery.each(g_CLUE_ABSTRACTION[g_selectedDifficulty][g_selectedLevel],function(key,value){
		var abstraction = g_CLUE_ABSTRACTION[g_selectedDifficulty][g_selectedLevel][key];
		var posturl = util.getCluePath(key);
		var clueImg = "<img style='display:inline-block;height:87.5px;' class='' src='assets/images/clue/"+key+".jpg'>";
		htmlout += "<div style='width:100%;height:87.5px;margin-bottom:4px;'> <div style='display:inline-block'>"+clueImg+"</div><div style='display:inline-block;width:100px;height:87.5px;transform: translateY(-50%)'>"+key+"</div>";
		if(abstraction == "nonAbstract" || abstraction == "partialAbstract" || abstraction == "fullAbstract") {
			var absImg = "<img style='' class='legendImgSize' src='assets/images/clue/"+key.toUpperCase()+"_non-abstract-symbol.jpg"+"'>";
			htmlout += "<div style='display:inline-block'>"+absImg+"</div>";
		} else {
			var absImg = "<img style='' class='legendImgSize' src='assets/images/"+"legend-unknown.gif"+"'>";
			//htmlout += "<div style='display:inline-block'>"+absImg+"</div>";
			htmlout += "<div style='display:inline-block;width:75px;height:87.5px;background:url(assets/images/lock.png) center center no-repeat;'></div>";
		}
		if(abstraction == "partialAbstract" || abstraction == "fullAbstract") {
			var absImg = "<img style='' class='legendImgSize' src='assets/images/clue/"+key.toUpperCase()+"_partial-abstract-symbol.jpg"+"'>";
			htmlout += "<div style='display:inline-block'>"+absImg+"</div>";
		} else {
			var absImg = "<img style='' class='legendImgSize' src='assets/images/"+"legend-unknown.gif"+"'>";
			//htmlout += "<div style='display:inline-block'>"+absImg+"</div>";
			htmlout += "<div style='display:inline-block;width:75px;height:87.5px;background:url(assets/images/lock.png) center center no-repeat;'></div>";
		}
		if(abstraction == "fullAbstract") {
			var absImg = "<img style='' class='legendImgSize' src='assets/images/clue/"+key.toUpperCase()+"_abstract-symbol.jpg"+"'>";
			htmlout += "<div style='display:inline-block'width:75px;height:87.5px;>"+absImg+"</div>";
		} else {
			var absImg = "<img style='' class='legendImgSize' src='assets/images/"+"legend-unknown.gif"+"'>";
			//htmlout += "<div style='display:inline-block'>"+absImg+"</div>";
			htmlout += "<div style='display:inline-block;width:75px;height:87.5px;background:url(assets/images/lock.png) center center no-repeat;'></div>";
		}
		htmlout += "</div>";
	});
	htmlout += "</div></center>";

	util.openModal(htmlout);
};