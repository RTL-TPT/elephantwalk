var Application = include('springroll.Application'),
    Button = include('springroll.easeljs.Button'),
    EaselJSDisplay = include('springroll.EaselJSDisplay');

var app = new Application({
                resizeElement : "stageContainer",
                canvasId: "stage",
                display: EaselJSDisplay,
                displayOptions: {
                    clearView: true
                },
                preload: [
                    {
                        id:'Button',
                        src:'assets/images/button.png',
                    },
                ]
});

Button = include('springroll.easeljs.Button');

// Create a button that destroys the universe
var unloadButton = new Button(this.getCache('Button'), {
    text: 'Unload',
    font: "16px Arial",
    color: "#ffffff"
});

unloadButton.x = 340;
unloadButton.y = 300;

this.display.stage.addChild(unloadButton);

unloadButton.addEventListener(Button.BUTTON_PRESS, function() {
    // Destroy display objects
    unloadButton.destroy();
    unloadButton = null;

    // Stop the animation

    app.animator.stop(transition);
    transition = null;

    // Remove all display objects
    app.display.stage.removeAllChildren();

    // Unload assets that have been loaded
    app.unload(
        'Background',
        'Button',
        'Flower',
        'Transition'
    );
});
