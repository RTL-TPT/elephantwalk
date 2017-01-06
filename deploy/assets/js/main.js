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
		game.load.image('logo', 'assets/images/logo.png');
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