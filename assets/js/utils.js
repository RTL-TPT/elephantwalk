(function() {
    var promote = include('createjs.promote'),
        extend = include('createjs.extend'),
        Container = include('createjs.Container');

    function UiContainer({x: x=0, y: y=0, width: width=100, height: height=100,
                        borderColor: borderColor, borderWidth: borderWidth=1,
                        backgroundColor: backgroundColor}) {
        this.Container_constructor();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        if (borderColor && borderColor !== 'transparent') {
            borderRect = new Shape();
            borderRect.name = 'border';
            borderRect.graphics.beginStroke(borderColor)
                .setStrokeStyle(borderWidth)
                .drawRect(0, 0, width, height);
            this.addChild(borderRect);
        }

        if (backgroundColor) {
            backgroundRect = new Shape();
            backgroundRect.name = 'background';
            backgroundRect.graphics.beginFill(backgroundColor)
                .drawRect(0, 0,  width, height);
            this.addChild(backgroundRect);
        }
    }

    extend(UiContainer, Container);
    promote(UiContainer, "Container");

    window.UiContainer = UiContainer;
}());

(function() {
    var promote = include('createjs.promote'),
        extend = include('createjs.extend'),
        Bitmap = include('createjs.Bitmap');

    function ScaledBitmap(imageOrUri, {maxWidth: maxWidth,
                          maxHeight: maxHeight,
                          width: width,
                          height: height}) {
        this.Bitmap_constructor(imageOrUri);

        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.width = width;
        this.height = height;

        scaleTo(this, {
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            width: width,
            height: height,
        });
    }

    extend(ScaledBitmap, Bitmap);
    promote(ScaledBitmap, "Bitmap");

    window.ScaledBitmap = ScaledBitmap;
}());

function ucFirst(value) {
    return value.slice(0,1).toUpperCase() + value.slice(1);
}

function scaleTo(object, { maxWidth: maxWidth,
                           maxHeight: maxHeight,
                           width: width,
                           height: height }) {
    let bounds = object.getBounds();

    if (width || bounds.width > maxWidth) {
        object.scaleX = (width || maxWidth) / bounds.width;
    }
    if (height || bounds.height > maxHeight) {
        object.scaleY = (height || maxHeight) / bounds.height;
    }
}

function toCenter(available, size) {
    if (available > size) {
        return (available - size) / 2;
    }
    else {
        return 0;
    }
}

function toCenterX(object, availableWidth=0) {
    let objectWidth = object.getBounds().width;

    if (object.scaleX) {
        objectWidth *= object.scaleX;
    }

    return toCenter(availableWidth, objectWidth);
}

function toCenterY(object, availableHeight=0) {
    let objectHeight = object.getBounds().height;

    if (object.scaleY) {
        objectHeight *= object.scaleY;
    }

    return toCenter(availableHeight, objectHeight);
}

function createPlayer(x=0, y=0) {
    let playerContainer = new Container(),
        playerIcon;

    playerContainer.name = 'player';
    
    playerContainer.x = x;
    playerContainer.y = y;

    playerIcon = app.getCache('player-icon');
    playerIcon.name = 'icon';
    playerIcon.x = 0;
    playerIcon.y = 0;

    playerText = new Text("Player #", "40px Arial");
    playerText.name = 'text';
    playerText.x = 100;
    playerText.y = 20;

    playerContainer.addChild(playerIcon, playerText);

    return playerContainer;
}

function rotatePlayer(startPlayer=1) {
    let state = app.manager.currentState,
        stateContainer = state.panel,
        playerContainer = stateContainer.getChildByName('player'),
        player = state.player =
            (! state.player || state.player !== 1) ? startPlayer : 2;

    if ( ! playerContainer) {
        playerContainer = createPlayer(50, CANVAS_HEIGHT - 100);
        stateContainer.addChild(playerContainer);
    }

    playerContainer.getChildByName('text').text = `Player ${player}`;
}

