(function(){

	window.g_gameWidth = 1024;
	window.g_gameHeight = 768;

	// Library depencencies
	var Application = include('springroll.Application'),
		Game = include('Phaser.Game'),
		Phaser = include('Phaser');

	// Create a new application
	var app = new Application({
		name: "phaserelephant",
		configPath: "assets/config/config.json"
	});

	// The Phaser game
	var game;
	//sfx player
	var sfx = {};
	var music = {};

	// Handle when app is ready to use
	app.on('init', function()
	{
		// Start application
		this.game = game = new Game(
			g_gameWidth,
			g_gameHeight,
			Phaser.CANVAS,
			"content",
			{
				preload: preload,
				create: create
			},
			true
		);

		app.container.on("user_data", function(data){
			//console.log("got user data from back end");
			window.g_BEuserdata = data;
		});
	});

	// Preload assets for Phaser
	function preload()
	{
		var uiHTML = "<div id='uiLayer'></div>";
		if(jQuery("#uiLayer").length === 0) {
			jQuery("#content").prepend("<div id='imgloadarea' style='display:none;'><img src='assets/images/spin.gif'></div>");
			jQuery("#content").prepend(uiHTML);
			jQuery("#uiLayer").addClass("uiLayer");
		}
		jQuery("#frame canvas").addClass("gameCanvas");
		jQuery("#content").addClass("pContent");
		if(g_scaleGameToWindow) {
			fitCanvasToWindow();
		}
		var loaderoverlay = "<div id='loaderDiv' style='z-index:20000;position:absolute;top:0px;left:0px;width:100%;height:100%;background-color:rgba(255,255,255,0.75)'><div style='width:100%;height:100%;background:url(assets/images/spin.gif) center center no-repeat;'></div></div>";
		jQuery("#uiLayer").append(loaderoverlay);
		//game.load.image('logo', 'assets/images/logo.png');
		//game.load.audio('bridge', 'assets/sound/bridge.mp3');
		game.load.audio('building', 'assets/sound/building.mp3');
		game.load.audio('desert', 'assets/sound/desert.mp3');
		game.load.audio('forest', 'assets/sound/forest.mp3');
		//game.load.audio('hill', 'assets/sound/hill.mp3');
		game.load.audio('lake', 'assets/sound/lake.mp3');
		game.load.audio('mountain', 'assets/sound/mountain.mp3');
		game.load.audio('ocean', 'assets/sound/ocean.mp3');
		game.load.audio('park', 'assets/sound/park.mp3');
		game.load.audio('road', 'assets/sound/road.mp3');
		game.load.audio('stream', 'assets/sound/stream.mp3');
		//game.load.audio('waterfall', 'assets/sound/waterfall.mp3');
		game.load.audio('music_menu', 'assets/sound/music_menu.mp3');
		game.load.audio('music_game', 'assets/sound/music_game.mp3');
		game.load.audio('clicksfx', 'assets/sound/click-basic.wav');
		//voice overs
		jQuery.each(g_voicelocations,function(key,value){
			game.load.audio(key, value);
		});
		jQuery.each(g_cluevoicelocations,function(key,value){
			game.load.audio(key+"_voice", value);
		});
		jQuery.each(g_tvoicelocations,function(key,value){
			game.load.audio(key, value);
		});
	}

	// When the Phaser game has been created
	function create()
	{
		//game.stage.backgroundColor = "rgb(255,255,255)";
		/*var logo = game.add.sprite(
			game.world.centerX, 
			game.world.centerY, 
			'logo'
		);
		logo.anchor.setTo(0.5, 0.5);*/

		//setup audio
		//sfx.bridge = game.add.audio('bridge');
		//sfx.bridge.loop = true;
		sfx.building = game.add.audio('building');
		sfx.building.loop = true;
		sfx.desert = game.add.audio('desert');
		sfx.desert.loop = true;
		sfx.forest = game.add.audio('forest');
		sfx.forest.loop = true;
		//sfx.hill = game.add.audio('hill');
		//sfx.hill.loop = true;
		sfx.lake = game.add.audio('lake');
		sfx.lake.loop = true;
		sfx.mountain = game.add.audio('mountain');
		sfx.mountain.loop = true;
		sfx.ocean = game.add.audio('ocean');
		sfx.ocean.loop = true;
		sfx.park = game.add.audio('park');
		sfx.park.loop = true;
		sfx.road = game.add.audio('road');
		sfx.road.loop = true;
		sfx.stream = game.add.audio('stream');
		sfx.stream.loop = true;
		//sfx.waterfall = game.add.audio('waterfall');
		//sfx.waterfall.loop = true;
		sfx.clicksfx = game.add.audio('clicksfx');
		//voice overs
		jQuery.each(g_voicelocations,function(key,value){
			sfx[key] = game.add.audio(key);
		});
		jQuery.each(g_cluevoicelocations,function(key,value){
			sfx[key+"_voice"] = game.add.audio(key+"_voice");
		});
		jQuery.each(g_tvoicelocations,function(key,value){
			sfx[key] = game.add.audio(key);
		});
		//sfx.allowMultiple = true;
		window.g_sfx = sfx;
		music.music_menu = game.add.audio('music_menu');
		music.music_game = game.add.audio('music_game');
		music.music_menu.loop = true;
		music.music_game.loop = true;
		window.g_music = music;

		util.loadImages(g_cacheList,setStateTitle);
	}

	function update() {
		//
	}

	// Assign to the window for easy access
	window.app = app;
	window.g_scale = 1;
	window.g_scaleGameToWindow = true; //scale game to fit window or not

	var fitCanvasToWindow = function() {
		var canvasOffset = 0;
		var cw = 0;
		var ch = 0;
		var percent = 0;
		if(window.innerHeight * (4/3) > window.innerWidth) {
			cw = window.innerWidth - canvasOffset;
			ch = Math.floor((window.innerWidth - canvasOffset) * (3/4));
		} else {
			ch = window.innerHeight - canvasOffset;
			cw = Math.floor((window.innerHeight - canvasOffset) * (4/3));
		}
		percent = cw/g_gameWidth;
		jQuery("#uiLayer").css("transform","scale("+percent+")").css("-webkit-transform","scale("+percent+")");
		//canvas resize
		app.game.scale.setGameSize(cw,ch);
		jQuery(".gameCanvas").css("top",($(window).height()/2 - ch/2)+"px").css("left",($(window).width()/2 - cw/2)+"px");
		g_scale = percent;
	};

	window.addEventListener("resize", function(){
		if(g_scaleGameToWindow) {
			fitCanvasToWindow();
		}
	});

	jQuery("#closeGame").click(function(){
		console.log("quit");
		if(jQuery("#loaderDiv").length > 0) {
			return;
		}
		var loaderoverlay = "<div id='loaderDiv' style='z-index:20000;position:absolute;top:0px;left:0px;width:100%;height:100%;background-color:rgba(255,255,255,0.75)'><div style='width:100%;height:100%;background:url(assets/images/spin.gif) center center no-repeat;'></div></div>";
		jQuery("#uiLayer").append(loaderoverlay);
		app.container.send("endGame");
		playClickSFX();
	});
	
}());