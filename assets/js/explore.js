function getPreloadExplorePanes() {
    let preload = [],
        levelId = getLevel().id;

    forEachTile((assetName, columnIndex, rowIndex) => {
        for (direction of TILE_DIRECTIONS) {
            preload.append({ 
                id: `${assetName}-${direction}`,
                src: `assets/images/${levelId}/${assetName}/${direction}.jpg`,
                format: "createjs.Bitmap",
            });
        }
    });

    for ([assetName, direction] of getLevel().elephantLocations) {
        preload.append({
            id: `${assetName}-${direction}-elephant`,
            src: `assets/images/${levelId}/${assetName}/${direction}-elephant.jpg`,
            format: "createjs.Bitmap",
        });
    }

    return preload;
}

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
    let mapContainer = app.manager.currentState.panel.getChildByName('map'),
        tileContainer = mapContainer.getChildByName(assetName),
        fogContainer = tileContainer.getChildByName('fog');

    if (fogContainer) {
        triangle = fogContainer.getChildByName(direction);
        fogContainer.removeChild(triangle);
    }
}

function createExploreArrow(direction=TILE_DIRECTIONS[0], x=0, y=0) {
    let arrow = app.getCache(`${direction}-arrow`);

    arrow.x = x;
    arrow.y = y;
    arrow.name = direction;

    arrow.on('mousedown', function(ev) {
        let explorationContainer = this.parent,
            assetName = explorationContainer.assetName,
            slides = explorationContainer.slides,
            onSlide = explorationContainer.onSlide,
            direction,
            slideIsOver = false,
            explorePane = explorationContainer.getChildByName('pane'),
            mapContainer = app.manager.currentState.panel.getChildByName('map'),
            tileContainer = mapContainer.getChildByName(assetName);
            elephantLocation = app.levelInfo.elephantLocation;


        slideIsOver = (this.name === 'left') ? (onSlide === 0)
                                             : (onSlide === slides.length - 1);

        if (slideIsOver) {
            this.removeAllEventListeners();
            explorationContainer.parent.removeChild(explorationContainer);
            tileContainer.removeChild(tileContainer.getChildByName('fog'));
            tileContainer.removeChild(tileContainer.getChildByName('gps'));
            mapContainer.setTransform(0, 0, 1, 1);

            mapContainer.tilesToUncover -= 1;
            if (mapContainer.tilesToUncover > 0) {
                makeSelection(randomFoggedTileSlot());
                rotatePlayer();
            }
            else {
                app.manager.currentState.nextState();
            }
        } 
        else {
            explorePane.removeAllChildren();
            removeFogPiece(assetName, TILE_DIRECTIONS[onSlide]);

            (this.name === 'left') ? this.parent.onSlide = onSlide -= 1
                                   : this.parent.onSlide = onSlide += 1;


            if (elephantLocation && elephantLocation.found) {
                app.states.search.panel.removeAllChildren();  // TODO: Congratulations of some sort, the level is over.
                alert('Level completed');
            }

            direction = TILE_DIRECTIONS[onSlide];
            if (elephantLocation && elephantLocation.assetName === assetName
                    && elephantLocation.direction === direction) {
                explorePane.addChild(app.getCache(`${assetName}-${direction}-elephant`));
                elephantLocation.found = true;
            }
            else {
                explorePane.addChild(slides[onSlide]);
            }

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
        mapContainer = app.manager.currentState.panel.getChildByName('map'),
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
    app.manager.currentState.panel.addChildAt(explorationContainer, 0);
}
