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
		setStateTitle(); //set state to title screen
	}

	function update() {
		//
	}

	// Assign to the window for easy access
	window.app = app;
	
}());