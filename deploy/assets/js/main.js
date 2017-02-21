(function(){

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

	// Handle when app is ready to use
	app.on('init', function()
	{
		// Start application
		this.game = game = new Game(
			1024,
			768,
			Phaser.CANVAS,
			"content",
			{
				preload: preload,
				create: create
			},
			true
		);
	});

	// Preload assets for Phaser
	function preload()
	{
		//game.load.image('logo', 'assets/images/logo.png');
		game.load.audio('bridge', 'assets/sound/bridge.mp3');
		game.load.audio('building', 'assets/sound/building.mp3');
		game.load.audio('desert', 'assets/sound/desert.mp3');
		game.load.audio('forest', 'assets/sound/forest.mp3');
		game.load.audio('hill', 'assets/sound/hill.mp3');
		game.load.audio('lake', 'assets/sound/lake.mp3');
		game.load.audio('mountain', 'assets/sound/mountain.mp3');
		game.load.audio('ocean', 'assets/sound/ocean.mp3');
		game.load.audio('park', 'assets/sound/park.mp3');
		game.load.audio('road', 'assets/sound/road.mp3');
		game.load.audio('stream', 'assets/sound/stream.mp3');
		game.load.audio('waterfall', 'assets/sound/waterfall.mp3');
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
		sfx.bridge = game.add.audio('bridge');
		sfx.building = game.add.audio('building');
		sfx.desert = game.add.audio('desert');
		sfx.forest = game.add.audio('forest');
		sfx.hill = game.add.audio('hill');
		sfx.lake = game.add.audio('lake');
		sfx.mountain = game.add.audio('mountain');
		sfx.ocean = game.add.audio('ocean');
		sfx.park = game.add.audio('park');
		sfx.road = game.add.audio('road');
		sfx.stream = game.add.audio('stream');
		sfx.waterfall = game.add.audio('waterfall');
		//sfx.allowMultiple = true;
		window.g_sfx = sfx;

		var uiHTML = "<div id='uiLayer'></div>";
		if(jQuery("#uiLayer").length === 0) {
			jQuery("#content").prepend(uiHTML);
			jQuery("#uiLayer").addClass("uiLayer");
		}
		jQuery("#frame canvas").addClass("gameCanvas");
		jQuery("#content").addClass("pContent");
		setStateTitle(); //set state to title screen
	}

	function update() {
		//
	}

	// Assign to the window for easy access
	window.app = app;
	window.g_scale = 1;
	window.g_scaleGameToWindow = true; //scale game to fit window or not

	var fitCanvasToWindow = function() {
		var canvasOffset = 20;
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
		percent = cw/1024;
		jQuery("#uiLayer").css("transform","scale("+percent+")");
		//canvas resize
		app.game.scale.setGameSize(cw,ch);
		jQuery(".gameCanvas").css("top",($(window).height()/2 - ch/2)+"px").css("left",($(window).width()/2 - cw/2)+"px");
		//app.game.width = cw;
		//app.game.height = ch;
		g_scale = percent;
	};

	window.addEventListener("resize", function(){
		if(g_scaleGameToWindow) {
			fitCanvasToWindow();
		}
	});
	
}());