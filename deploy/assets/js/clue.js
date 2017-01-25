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

var createClueMap = function() {
	var htmlout = "";
	//create draggable clue features
	jQuery.each(g_LEVEL_CLUE_LOCATION[g_selectedDifficulty][g_selectedLevel], function(key,value){
		var location = [jQuery("#clueMap").height() / 2 * value[0] - 87.5, jQuery("#clueMap").width() / 2 * value[1] - 75];
		var locStyle = "style='top:"+location[0]+"px;left:"+location[1]+"px;'";
		htmlout = "<div id='clue_"+key+"' class='dragClue' "+locStyle+" >"; // ondrop='drop(event)' ondragover='allowDrop(event)'
		var posturl = g_clueUrlPost[ g_CLUE_ABSTRACTION[g_selectedDifficulty][g_selectedLevel][key] ];
		htmlout += "<img id='img_"+key+"' draggable='true' ondragstart='drag(event)' style='width:100%;height:100%;' src='"+"assets/images/clue/"+key.toUpperCase()+posturl+"'>";
		htmlout += "</div>";
		jQuery("#clueMap").append(htmlout);
	} );
	g_currentClue = g_LEVEL_CLUES[g_selectedDifficulty][g_selectedLevel][0];
};

var openClueModal = function(closeCallback) {
	if(closeCallback === undefined) {closeCallback = function(){};}
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
	//play clue sfx
	g_sfx[g_currentClue].play();

	jQuery(".modalContainer .closeBtn").click(function(){
		g_sfx[g_currentClue].stop();
		closeModal();
		closeCallback();
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
					openClueModal();
					util.player.togglePlayer();
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

var createLegend = function() {
	var htmlout = "<div style='width:100%;height:100%;box-sizing:border-box;border: 2px solid gray;padding:5px;'>";
	jQuery.each(g_LEVEL_CLUE_LOCATION[g_selectedDifficulty][g_selectedLevel],function(key,value){
		var posturl = g_clueUrlPost[ g_CLUE_ABSTRACTION[g_selectedDifficulty][g_selectedLevel][key] ];
		var clueImg = "<img style='width:30px;height:30px;display:inline-block;vertical-align:middle;' src='assets/images/clue/"+key.toUpperCase()+posturl+"'>";
		htmlout += "<div>"+clueImg+key+"</div>";
	});
	htmlout += "</div>";
	jQuery("#clueLegend").html(htmlout);
};