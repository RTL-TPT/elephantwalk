var Application = include('springroll.Application'),
    Bitmap = include('createjs.Bitmap'),
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
                        id: 'Background',
                        src: 'assets/images/background2.jpg',
                        format: 'createjs.Bitmap' // returns a Bitmap instead of image
                    },
                ]
});

// Background image
var background = this.getCache('Background');

this.display.stage.addChild(background);
