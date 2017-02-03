var drag = function(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    g_hasDrag = true;
};
var drop = function(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var target = jQuery(ev.target);
    var children = target.children();
    if(children.length === 0 && target.attr("id") === "clueDrop1") {
    	//add attribute stripped clone of clue to drop box
    	jQuery(document.getElementById(data)).clone().attr("cname",data).removeAttr("id draggable ondragstart").css("pointer-events","none").appendTo(target);
    	//target.append(document.getElementById(data));
    } else if(children.length !== 0 && target.attr("id") === "clueDrop1") {
    	//clear previous drop and add new attribute stripped clone of clue to drop box
    	jQuery(target).html("");
    	jQuery(document.getElementById(data)).clone().attr("cname",data).removeAttr("id draggable ondragstart").css("pointer-events","none").appendTo(target);
    } else if(target.attr("id") === ("clue_" + data.replace("img_","")) ) {
    	//target.append(document.getElementById(data));
    } else {
    	//nope
    }
};
function allowDrop(ev) {
    ev.preventDefault();
};

var getCluePX = function(gridx,gridy) {
	return [725 / gridx, 575 / gridx];
};

var createClueMap = function() {
	var htmlout = "";
	//create draggable clue features
	jQuery.each(g_LEVEL_CLUE_LOCATION[g_selectedDifficulty][g_selectedLevel], function(key,value){
		var location = [jQuery("#clueMap").height() / g_activeGrid.x * value[0] - 87.5, jQuery("#clueMap").width() / g_activeGrid.x * value[1] - 75];
		var locStyle = "style='top:"+location[0]+"px;left:"+location[1]+"px;'";
		htmlout = "<div id='clue_"+value[2]+"' class='dragClue' "+locStyle+" >"; // ondrop='drop(event)' ondragover='allowDrop(event)'
		var posturl = util.getCluePath(value[2]);
		htmlout += "<img id='img_"+value[2]+"' draggable='true' ondragstart='drag(event)' style='width:100%;height:100%;' src='"+"assets/images/clue/"+value[2].toUpperCase()+posturl+"'>";
		htmlout += "</div>";
		jQuery("#clueMap").append(htmlout);
	} );
	g_currentClue = g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][0];
};

var openClueModal = function(closeCallback) {
	if(closeCallback === undefined) {closeCallback = function(){};}
	var htmlout = "";
	/*htmlout += "<div class='modalOverlay'></div>";
	htmlout += "<div class='modalContainer'>";
	htmlout += "<div class='closeBtn'></div>";*/
	htmlout += "<div class='sfxBtn'></div>";
	htmlout += "<div class='clueContainer'></div>";
	htmlout += "<div class='clueImg'><img style='position:absolute;opacity:0;' src='' class='clueImgSrc' id='clueImgSrc'></div>";
	htmlout += "<div class='clueText'>"+g_currentClue.toUpperCase()+"</div>";
	htmlout += "</div>";
	
	//jQuery("#uiLayer").append(htmlout);
	util.openModal(closeCallback,htmlout);

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
		//jQuery(".modalContainer").remove();
		//jQuery(".modalOverlay").remove();
		//closeCallback();
	});
};

var closeModal = function() {
	jQuery(".modalContainer").remove();
	jQuery(".modalOverlay").remove();
};

var confirmClue = function() {
	var clueChildren = jQuery("#clueDrop1").children();
	if(clueChildren.length > 0) {
		var selectedClue = jQuery(clueChildren[0]).attr("cname").replace("img_","");
		if(selectedClue === g_currentClue) {
			var onAnimComplete = function() {
				if(g_currentClue === g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][1]) {
					setStateSearchSelect();
				} else {
					g_currentClue = g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][1];
					util.player.togglePlayer();
					openClueModal();
				}
			};
			util.animation.correctAnim(onAnimComplete);
			//jQuery("#clue_"+g_currentClue).append(jQuery(clueChildren[0])); //reset position of dragged element
			jQuery("#clueDrop1").html("");

		} else {
			util.animation.incorrectAnim(function(){});
			//jQuery("#clue_"+selectedClue).append(jQuery(clueChildren[0])); //reset position of dragged element
			jQuery("#clueDrop1").html("");
		}
	}
};

var openLegendModal = function(closeCallback) {
	if(closeCallback === undefined) {closeCallback = function(){};}
	var htmlout = "";
	/*htmlout += "<div class='modalOverlay'></div>";
	htmlout += "<div class='modalContainer'>";
	htmlout += "<div class='closeBtn'></div>";*/

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
			htmlout += "<div style='display:inline-block;width:75px;height:87.5px;background:url(../assets/images/lock.png) center center no-repeat;'></div>";
		}
		if(abstraction == "partialAbstract" || abstraction == "fullAbstract") {
			var absImg = "<img style='' class='legendImgSize' src='assets/images/clue/"+key.toUpperCase()+"_partial-abstract-symbol.jpg"+"'>";
			htmlout += "<div style='display:inline-block'>"+absImg+"</div>";
		} else {
			var absImg = "<img style='' class='legendImgSize' src='assets/images/"+"legend-unknown.gif"+"'>";
			//htmlout += "<div style='display:inline-block'>"+absImg+"</div>";
			htmlout += "<div style='display:inline-block;width:75px;height:87.5px;background:url(../assets/images/lock.png) center center no-repeat;'></div>";
		}
		if(abstraction == "fullAbstract") {
			var absImg = "<img style='' class='legendImgSize' src='assets/images/clue/"+key.toUpperCase()+"_abstract-symbol.jpg"+"'>";
			htmlout += "<div style='display:inline-block'width:75px;height:87.5px;>"+absImg+"</div>";
		} else {
			var absImg = "<img style='' class='legendImgSize' src='assets/images/"+"legend-unknown.gif"+"'>";
			//htmlout += "<div style='display:inline-block'>"+absImg+"</div>";
			htmlout += "<div style='display:inline-block;width:75px;height:87.5px;background:url(../assets/images/lock.png) center center no-repeat;'></div>";
		}
		htmlout += "</div>";
	});
	htmlout += "</div></center>";

	/*htmlout += "</div>";*/
	util.openModal(closeCallback,htmlout);

	/*jQuery("#uiLayer").append(htmlout);
	jQuery(".modalContainer .closeBtn").click(function(){
		closeModal();
		closeCallback();
	});*/
};

var createLegend = function() {
	var htmlout = "<div style='width:100%;height:100%;box-sizing:border-box;border: 2px solid gray;padding:5px;'>";
	jQuery.each(g_LEVEL_CLUE_LOCATION[g_selectedDifficulty][g_selectedLevel],function(key,value){
		var posturl = util.getCluePath(value[2]);
		var clueImg = "<img style='width:30px;height:30px;display:inline-block;vertical-align:middle;' src='assets/images/clue/"+value[2].toUpperCase()+posturl+"'>";
		htmlout += "<div>"+clueImg+value[2]+"</div>";
	});
	htmlout += "</div>";
	jQuery("#clueLegend").html(htmlout);
};