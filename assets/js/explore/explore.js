function createExploreArrow(direction='left', x=0, y=0) {
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
            explorePane = explorationContainer.getChildByName('pane'),
            mapContainer = app.states.level.panel.getChildByName('map'),
            tileContainer = mapContainer.getChildByName(assetName);

        slideIsOver = (this.name === 'left') ? (onSlide === 0)
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
        } 
        else {
            explorePane.removeAllChildren();
            removeFogPiece(assetName, TILE_DIRECTIONS[onSlide]);

            (this.name === 'left') ? this.parent.onSlide = onSlide -= 1
                                    : this.parent.onSlide = onSlide += 1;

            explorePane.addChild(slides[onSlide]);

            tileContainer.removeChild(tileContainer.getChildByName('gps'));
            let gpsCone = createGpsCone(assetName, TILE_DIRECTIONS[onSlide]);
            tileContainer.addChild(gpsCone);
        }
    });

    return arrow;
}

function createExplorePane(x=0, y=0) {
    let explorePane = new Container();
    explorePane.name = 'pane';
    explorePane.x = 205;
    explorePane.y = 50;
    explorePane.scaleX = 0.8;
    return explorePane;
}

function createExplore(assetName) {
    let context = {},
        arrow,
        mapContainer = app.states.level.panel.getChildByName('map'),
        tileContainer = mapContainer.getChildByName(assetName);
        explorePane = createExplorePane(205, 50);
        explorationContainer = new Container();
    
    explorationContainer.name = 'exploration';
    explorationContainer.assetName = assetName;
    explorationContainer.onSlide = 0;
    explorationContainer.slides = [];

    // mapBottomY = CANVAS_HEIGHT - getMapInfo().MAP_HEIGHT * 0.5
    mapContainer.setTransform(0, 0, 0.5, 0.5);

    for (direction of TILE_DIRECTIONS) {
        explorationContainer.slides.push(
            app.getCache(`${assetName}-explore-${direction}`));
    }

    for (let arrowArgs of [ ['left', 150, 200],
                            ['right', 750, 200] ]) {
        arrow = createExploreArrow(...arrowArgs);
        explorationContainer.addChild(arrow);
    }

    explorationContainer.addChild(explorePane);
    explorePane.addChild(explorationContainer.slides[0]);
    
    let gpsCone = createGpsCone(assetName, TILE_DIRECTIONS[0]);
    tileContainer.addChild(gpsCone);

    return explorationContainer;
}
