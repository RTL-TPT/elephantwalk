function createGpsCone(assetName, direction) {
    let tileSlot = getTileSlot(assetName),
        points = getPointsForTileDirections(...tileSlot)[direction]; 
        gpsCone = new Shape();

    gpsCone.name = 'gps';

    gpsCone.graphics.beginFill("rgba(255,228,0,0.25)")
        .moveTo(...points[0])
        .lineTo(...points[1])
        .lineTo(...points[2]);

    return gpsCone;
}

function removeFogPiece(assetName, direction) {
    let mapContainer = app.states.level.panel.getChildByName('map'),
        tileContainer = mapContainer.getChildByName(assetName),
        fogContainer = tileContainer.getChildByName('fog'),
        triangle = fogContainer.getChildByName(direction);

    fogContainer.removeChild(triangle);
}

function createExploreArrow(direction=TILE_DIRECTIONS[0], x=0, y=0) {
    let arrow = app.getCache(`${direction}-arrow`);

    arrow.x = x;
    arrow.y = y;
    arrow.name = direction;

    arrow.on('mousedown', function(ev) {
        let assetName = this.parent.assetName,
            slides = this.parent.slides,
            onSlide = this.parent.onSlide,
            explorationContainer = this.parent,
            slideIsOver = false,
            firstView = TILE_DIRECTIONS[0],
            explorePane = explorationContainer.getChildByName('pane'),
            mapContainer = app.states.level.panel.getChildByName('map'),
            tileContainer = mapContainer.getChildByName(assetName);


        slideIsOver = (this.name === firstView) ? (onSlide === 0)
                                                : (onSlide === slides.length - 1);

        if (slideIsOver) {
            this.removeAllEventListeners();
            explorationContainer.parent.removeChild(explorationContainer); // TODO
            tileContainer.removeChild(tileContainer.getChildByName('fog'));
            tileContainer.removeChild(tileContainer.getChildByName('gps'));
            mapContainer.setTransform(0, 0, 1, 1);

            mapContainer.tilesToUncover -= 1;
            if (mapContainer.tilesToUncover > 0) {
                makeSelection();
            }
            else {
                app.states.level.nextState();
            }
        } 
        else {
            explorePane.removeAllChildren();
            removeFogPiece(assetName, TILE_DIRECTIONS[onSlide]);

            (this.name === firstView) ? this.parent.onSlide = onSlide -= 1
                                      : this.parent.onSlide = onSlide += 1;

            explorePane.addChild(slides[onSlide]);

            tileContainer.removeChild(tileContainer.getChildByName('gps'));
            let gpsCone = createGpsCone(assetName, TILE_DIRECTIONS[onSlide]);
            tileContainer.addChild(gpsCone);
        }
    });

    return arrow;
}

function getPaneScale() {
    return (CANVAS_WIDTH - PANE_PADDING * 2) / PANE_WIDTH;
}

function createExplorePane(x=0, y=0) {
    let explorePane = new Container();
    
    explorePane.name = 'pane';
    explorePane.x = x;
    explorePane.y = y;
    explorePane.scaleX = getPaneScale();

    return explorePane;
}

function createExplore(assetName, x=0, y=0) {
    let context = {},
        arrow,
        leftArrowX = x,
        rightArrowX = PANE_WIDTH * getPaneScale() + PANE_PADDING,
        miniMapScale = 0.20,
        miniMapPadding = 15,
        paneBottomX = x + PANE_PADDING + PANE_HEIGHT + x;
        mapContainer = app.states.level.panel.getChildByName('map'),
        tileContainer = mapContainer.getChildByName(assetName);
        explorePane = createExplorePane(x + PANE_PADDING, y);
        explorationContainer = new Container();
    
    explorationContainer.name = 'exploration';
    explorationContainer.assetName = assetName;
    explorationContainer.onSlide = 0;
    explorationContainer.slides = [];

    mapContainer.setTransform(PANE_PADDING + miniMapPadding,
                              (paneBottomX - getMapInfo().MAP_HEIGHT * miniMapScale) - miniMapPadding,
                              miniMapScale, miniMapScale);

    for (direction of TILE_DIRECTIONS) {
        explorationContainer.slides.push(
            app.getCache(`${assetName}-${direction}`));
    }

    for (let arrowArgs of [ ['left', leftArrowX, PANE_HEIGHT / 2],
                            ['right', rightArrowX, PANE_HEIGHT / 2] ]) {
        arrow = createExploreArrow(...arrowArgs);
        explorationContainer.addChildAt(arrow, 0);
    }

    explorationContainer.addChildAt(explorePane);
    explorePane.addChild(explorationContainer.slides[0]);
    
    let gpsCone = createGpsCone(assetName, TILE_DIRECTIONS[0]);
    tileContainer.addChild(gpsCone);

    return explorationContainer;
}

function makeExplore(assetName, x=0, y=PANE_PADDING) {
    let explorationContainer = createExplore(assetName, x, y);
    app.states.level.panel.addChildAt(explorationContainer, 0);
}
