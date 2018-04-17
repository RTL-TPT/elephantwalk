var tutorial = (function(){
	//use for run once functions
	var drag1 = false;
	var drag2 = false;
	var ran_d6 = false;
	var ran_e6 = false;
	var ran_f3 = false;
	var ran_h1 = false;

	//helpers for tutorial text
	var setAvatarText = function(message, size, avimg) {
		if(jQuery("#clueTutorialTextMap").length == 0) {
			jQuery("#uiLayer").append("<div class='avatar' id='avatar'></div><div class='clueTutorialTextMap' id='clueTutorialTextMap'></div>");
		}
		if(typeof size !== "undefined") {
			jQuery("#clueTutorialTextMap").css("font-size",size+"px");
		} else {
			jQuery("#clueTutorialTextMap").css("font-size","");
		}
		jQuery("#clueTutorialText").remove();
		if(message == "") {
			jQuery("#clueTutorialTextMap").remove();
			jQuery("#avatar").remove();
		} else {
			jQuery("#clueTutorialTextMap").html(message);
		}
	};

	var setLevelSelectText = function(message, size) {
		if(jQuery("#levelSelectTutorialText").length == 0) {
			jQuery("#menuContainer").append("<div class='avatar' id='avatar'></div><div class='levelSelectTutorialText' id='levelSelectTutorialText'></div>");
		}
		if(typeof size !== "undefined") {
			jQuery("#levelSelectTutorialText").css("font-size",size+"px");
		} else {
			jQuery("#levelSelectTutorialText").css("font-size","");
		}
		jQuery("#avatar").css("background-color","coral");
		jQuery("#levelSelectTutorialText").css("background-color","coral");
		jQuery("#levelSelectTutorialText").html(message);
		if(message == "") {
			jQuery("#levelSelectTutorialText").remove();
			jQuery("#avatar").remove();
		} else {
			//
		}
	};

	var setClueText = function(message, size) {
		if(jQuery("#clueTutorialText").length == 0) {
			jQuery("#uiLayer").append("<div class='clueTutorialText' id='clueTutorialText'></div>");
		}
		if(typeof size !== "undefined") {
			jQuery("#clueTutorialText").css("font-size",size+"px");
		} else {
			jQuery("#clueTutorialText").css("font-size","");
		}
		jQuery("#avatar").remove();
		jQuery("#clueTutorialTextMap").remove();
		if(message == "") {
			jQuery("#clueTutorialText").remove();
		} else {
			jQuery("#clueTutorialText").html(message);
		}
	};

	var setExploreText = function(message, size) {
		if(jQuery("#exploreText").length == 0) {
			jQuery("#uiLayer").append("<div class='exploreText' id='exploreText'></div>");
		}
		if(typeof size !== "undefined") {
			jQuery("#exploreText").css("font-size",size+"px");
		} else {
			jQuery("#exploreText").css("font-size","");
		}
		if(message == "") {
			jQuery("#exploreText").remove();
		} else {
			jQuery("#exploreText").html(message);
		}
	};

	var openPlayerModal_ = function(text1, text2, cb) {
		var htmlout = "";
		htmlout += "<div class='playerModalOverlay'></div>";
		htmlout += "<div class='playerModalContainer'>";
		htmlout += "<div class='closeBtn'></div>";
		htmlout += "<div class='playerNextBtn'></div>";

		htmlout += "<div style='position:absolute;top:180px;width:100%;'><span style='font-size:40px;'>"+text1+"</span><br/><span style=''>"+text2+"</span></div>";

		htmlout += "</div>";

		jQuery("#uiLayer").append(htmlout);
		jQuery(".playerModalContainer .closeBtn, .playerModalContainer .playerNextBtn").click(function(){
			playClickSFX();
			jQuery(".playerModalContainer").remove();
			jQuery(".playerModalOverlay").remove();
			if(jQuery(".modalContainer._"+g_modalLevel+" .clueContainer").length > 0) {
				g_sfx[g_currentClue].play(undefined,undefined,g_volumeLevel);
			}
			cb();
			//a2_();
		});
	};

	//eplore p1
	var a1_ = function() {
		openPlayerModal_("Time to","work together.",a2_);
	};
	var a2_ = function() {
		var htmlout = "<div class='playerModalOverlay'></div><div id='exploreBox' class='exploremap' style='z-index:10001'></div>";
		jQuery("#uiLayer").append(htmlout);
		setExploreText("Here is a map of where we are.");
		jQuery("#exploreText, #gpsmap").css("z-index","10001");
		jQuery("#exploreBox").click(function(){
			a3_();
		});
	};
	var a3_ = function() {
		jQuery("#exploreBox").remove();
		jQuery("#gpsmap").css("z-index","");
		jQuery("#leftArrow, #rightArrow").css("z-index","10001");
		setExploreText("Use the arrows to look left or right.");
		jQuery("#leftArrow, #rightArrow").click(function(){
			a4_();
		});
	};
	var a4_ = function(){
		jQuery(".playerModalOverlay").remove();
		jQuery("#exploreText, #leftArrow, #rightArrow").css("z-index","");
		setExploreText("I see a building on our map! Can you look around and find the building?",24);
		jQuery("#rightArrow").unbind().click(function(){playClickSFX();rotateView("right")});
		jQuery("#leftArrow").unbind().click(function(){playClickSFX();rotateView("left")});
	};

	//explore p1 #2
	var b1_ = function() {
		openPlayerModal_("Time to take turns now!","It’s your turn Player 1",b2_);
	};
	var b2_ = function() {
		var htmlout = "<div class='playerModalOverlay'></div><div id='exploreBox' class='exploremap' style='z-index:10001'></div>";
		jQuery("#uiLayer").append(htmlout);
		setExploreText("Here is the map again. Let’s look at the other side now.");
		jQuery("#exploreText, #gpsmap").css("z-index","10001");
		jQuery("#exploreBox").click(function(){
			b3_();
		});
	};
	var b3_ = function() {
		jQuery("#exploreBox").remove();
		jQuery(".playerModalOverlay").remove();
		jQuery("#exploreText, #gpsmap").css("z-index","");
		setExploreText("I see a forest on our map! Can you find the forest Player 1?",28);
	};

	//explore p2
	var c1_ = function() {
		openPlayerModal_("Time to take turns now!","It’s your turn Player 2",c2_);
	};
	var c2_ = function() {
		var htmlout = "<div class='playerModalOverlay'></div><div id='exploreBox' class='exploremap' style='z-index:10001'></div>";
		jQuery("#uiLayer").append(htmlout);
		setExploreText("Remember our map? Let’s look at the right side again.");
		jQuery("#exploreText, #gpsmap").css("z-index","10001");
		jQuery("#exploreBox").click(function(){
			c3_();
		});
	};
	var c3_ = function() {
		jQuery("#exploreBox").remove();
		jQuery(".playerModalOverlay").remove();
		jQuery("#exploreText, #gpsmap").css("z-index","");
		setExploreText("I see a lake on our map! Can you find the lake Player 2?", 30);
	};

	//clue p1
	var d1_ = function() {
		openPlayerModal_("Are you ready for your first clue?","Player 1",d2_);
	};
	var d2_ = function() {
		setClueText("Look and listen to the clue.");
	};
	var d3_ = function() {
		if(!drag1) {
			drag1 = true;
			var htmlout = "<div class='playerModalOverlay'></div></div>";
			jQuery("#uiLayer").append(htmlout);
			setAvatarText("Tap here to see the clue again.");
			jQuery("#clueTutorialTextMap, #avatar, #clueDrop2").css("z-index","10001");
			jQuery("#clueDrop2").click(function(){
				d4_();
			});
		}
	};
	var d4_ = function() {
		jQuery("#clueDrop2").css("z-index","");
		jQuery(".playerModalOverlay").remove();
		jQuery(".clueBar .clueDrop2").unbind().click(function(){
			playClickSFX();
			openClueModal();
			elephantTelemetry.createEvent("clue_repeat",{"correct_selection":g_currentClue});
		});
		setClueText("You can see the clue again if you forget.");
		jQuery(".closeBtn._1").click(function(){
			d5_();
		});
	};
	var d5_ = function() {
		var htmlout = "<div class='playerModalOverlay'></div></div>";
		jQuery("#uiLayer").append(htmlout);
		setAvatarText("Ok, now let’s see if we matched the clue! Tap here to check.");
		jQuery("#clueTutorialTextMap, #avatar, #clueDoneBtn").css("z-index","10001");
		jQuery(".clueBar .clueDoneBtn").click(function(){
			jQuery("#clueTutorialTextMap, #avatar, #clueDoneBtn").css("z-index","");
			jQuery(".playerModalOverlay").remove();
		});
	};
	var d6_ = function(wascorrect) {
		if(!ran_d6) {
			if(wascorrect) {
				setAvatarText("");
				ran_d6 = true;
				jQuery(".clueBar .clueDoneBtn").unbind().click(function(){
					playClickSFX();
					confirmClue();
				});
			} else {
				setAvatarText("Oops! Try again.");
				jQuery("#clueTutorialTextMap, #avatar").css("z-index","");
			}
		}
	}

	//clue p2
	var e1_ = function() {
		openPlayerModal_("Are you ready for your clue now?","Player 2",e2_);
	};
	var e2_ = function() {
		setClueText("Look and listen to the clue.");
	};
	var e3_ = function() {
		if(!drag2) {
			drag2 = true;
			var htmlout = "<div class='playerModalOverlay'></div></div>";
			jQuery("#uiLayer").append(htmlout);
			setAvatarText("Tap here to look at the legend.");
			jQuery("#clueTutorialTextMap, #avatar, #clueLegend").css("z-index","10001");
			jQuery("#clueLegend").click(function(){
				e4_();
			});
		}
	};
	var e4_ = function() {
		jQuery("#clueLegend").css("z-index","");
		jQuery(".playerModalOverlay").remove();
		jQuery("#clueLegend").unbind().click(function(){
			playClickSFX();
			openLegendModal();
		});
		setClueText("You can check the legend if you need help.");
		jQuery(".closeBtn._1").click(function(){
			e5_();
		});
	};
	var e5_ = function() {
		var htmlout = "<div class='playerModalOverlay'></div></div>";
		jQuery("#uiLayer").append(htmlout);
		setAvatarText("Ok, now let’s see if we matched the clue! Tap here to check.");
		jQuery("#clueTutorialTextMap, #avatar, #clueDoneBtn").css("z-index","10001");
		jQuery(".clueBar .clueDoneBtn").click(function(){
			jQuery("#clueTutorialText, #clueDoneBtn").css("z-index","");
			jQuery(".playerModalOverlay").remove();
		});
	};
	var e6_ = function(wascorrect) {
		if(!ran_e6) {
			if(wascorrect) {
				setAvatarText("");
				ran_e6 = true;
				jQuery(".clueBar .clueDoneBtn").unbind().click(function(){
					playClickSFX();
					confirmClue();
				});
			} else {
				setAvatarText("Oops! Try again.");
				jQuery("#clueTutorialTextMap, #avatar").css("z-index","");
			}
		}
	};

	//search map
	var f1_ = function() {
		openPlayerModal_("Time to work together again!","All Players",f2_);
	};
	var f2_ = function() {
		setAvatarText("Do you see which part of the map matches both clues?");
	};
	var f3_ = function() {
		if(!ran_f3) {
			ran_f3 = true;
			setAvatarText("Ok, now let’s see if we matched both clues! Tap here to check.");

			var htmlout = "<div class='playerModalOverlay'></div></div>";
			jQuery("#uiLayer").append(htmlout);
			jQuery("#clueTutorialTextMap, #avatar, #clueDoneBtn").css("z-index","10001");
			//jQuery("#clueDoneBtn").click(function(){
				//f4_();
			//});
		}
	};
	var f4_ = function() {
		jQuery("#clueDoneBtn").css("z-index","");
		jQuery(".playerModalOverlay").remove();
		setAvatarText("Oops! Try again.");
		jQuery("#clueTutorialTextMap, #avatar").css("z-index","");
	};
	var f5_ = function() {
		jQuery("#clueDoneBtn").css("z-index","");
		jQuery(".playerModalOverlay").remove();
		setAvatarText("");
	};

	//search first person
	var g1_ = function() {
		openPlayerModal_("Keep working together!","All Players",g2_);
	};
	var g2_ = function() {
		setClueText("Can you find the elephant?");
	};

	//level select
	var h1_ = function() {
		//if(!ran_h1) {
			ran_h1 = true;
			setLevelSelectText("Nice work team! You know how to play now. Pick a place!");
			jQuery(".missionBox.b1").click(function(){
				setLevelSelectText("Now pick a map and keep searching team!");
			});

			util.animation.bounceIndicator(250,360);
		//}
	};

	return {
		"a1":a1_,
		"b1":b1_,
		"c1":c1_,
		"d1":d1_,
		"d3":d3_,
		"d6":d6_,
		"e1":e1_,
		"e3":e3_,
		"e6":e6_,
		"f1":f1_,
		"f3":f3_,
		"f4":f4_,
		"f5":f5_,
		"g1":g1_,
		"h1":h1_,
		"setLevelSelectText":setLevelSelectText,
		"setClueText":setClueText,
		"setExploreText":setExploreText,
		"setAvatarText":setAvatarText
	};
})();