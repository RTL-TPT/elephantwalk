function getMapInfo() {
    let tiles = getLevel().tiles,
        totalTiles = 0,
        knownMaxColumn = 0,
        columnNumber,
        info = {
            NUM_ROWS: tiles.length,
            MAP_HEIGHT: tiles.length * TILE_HEIGHT,
        };

    forEachTile((_, columnIndex) => {
        columnNumber = columnIndex + 1;
        totalTiles++;
        if (columnNumber > knownMaxColumn) knownMaxColumn = columnNumber;
    });
    info.NUM_COLUMNS = knownMaxColumn;
    info.MAP_WIDTH = knownMaxColumn * TILE_WIDTH;
    info.NUM_TILES = totalTiles;

    return info;
}

function columnIndexToPx(columnIndex) {
    return columnIndex * TILE_WIDTH + 10;
}

function rowIndexToPx(rowIndex) {
    return rowIndex * TILE_HEIGHT + 10;
}

function forEachTile(fn) {
    let row, column,
        level = getLevel().tiles;

    level.forEach((row, rowIndex) => {
        row.forEach((assetName, columnIndex) => {
            fn(assetName, columnIndex, rowIndex);
        });
    });
}

function createTile(id, columnIndex, rowIndex) {
    let bitmapContainer = new Container(),
        bitmap = app.getCache(id);

    bitmapContainer.name = id;

    bitmap.x = columnIndexToPx(columnIndex);
    bitmap.y = rowIndexToPx(rowIndex);
    bitmap.name = 'tile';

    bitmapContainer.addChild(bitmap);

    return bitmapContainer;
}

function getTileSlot(forAssetName) {
    let slot = [];
    forEachTile((assetName, columnIndex, rowIndex) => {
        if (assetName === forAssetName) {
            slot = [columnIndex, rowIndex];
        }
    });
    return slot;
}

function getAssetName(columnIndex, rowIndex) {
    return getLevel().tiles[rowIndex][columnIndex];
}

function getPointsForTileDirections(columnIndex, rowIndex) {
    let sizeX = TILE_WIDTH,
        sizeY = TILE_HEIGHT,
        x = columnIndexToPx(columnIndex),
        y = rowIndexToPx(rowIndex),
        centerX = x + (sizeX / 2),
        centerY = y + (sizeY / 2),
        maxX = x + sizeX,
        maxY = y + sizeY,
        directionPoints = {};

    directionPoints[TILE_DIRECTIONS[0]] = [ [x, y], [centerX, centerY], [x, maxY] ];
    directionPoints[TILE_DIRECTIONS[1]] = [ [x, y], [centerX, centerY], [maxX, y] ];
    directionPoints[TILE_DIRECTIONS[2]] = [ [maxX, y], [centerX, centerY], [maxX, maxY] ];
    directionPoints[TILE_DIRECTIONS[3]] = [ [x, maxY], [centerX, centerY], [maxX, maxY] ];

    return directionPoints;
}

function createFog(assetName, columnIndex, rowIndex) {
    let directionPoints = getPointsForTileDirections(columnIndex, rowIndex),
        fogContainer = new Container();

    fogContainer.name = 'fog';
    fogContainer.assetName = assetName;
    fogContainer.columnIndex = columnIndex;
    fogContainer.rowIndex = rowIndex;

    for (let [name, points] of Object.entries(directionPoints)) {
        let triangle = new Shape();
        triangle.name = name;

        triangle.graphics.beginFill("rgba(0,0,0,0.8)")
            .moveTo(...points[0])
            .lineTo(...points[1])
            .lineTo(...points[2]);

        fogContainer.addChild(triangle);
    }

    return fogContainer;
}

function makeFog() {
    let mapContainer = app.states.level.panel.getChildByName('map'),
        tileContainer;

    forEachTile((assetName, columnIndex, rowIndex) => {
        tileContainer = mapContainer.getChildByName(assetName);
        tileContainer.addChild(createFog(assetName, columnIndex, rowIndex));
    });
}

function createSelection(assetName, columnIndex, rowIndex) {
    let selectionBox = new Shape();

    selectionBox.name = 'selection';
    selectionBox.assetName = assetName;

    selectionBox.graphics.beginFill("rgba(255, 255, 0, 0.2")
        .drawRect(columnIndexToPx(columnIndex),
                rowIndexToPx(rowIndex),
                TILE_WIDTH, TILE_HEIGHT);

    selectionBox.on('mousedown', function(ev) {
        makeExplore(ev.currentTarget.assetName);
        ev.currentTarget.parent.removeChild(ev.currentTarget);
    });

    return selectionBox;
}

function randomFoggedTileSlot() {
    let mapContainer = app.states.level.panel.getChildByName('map'),
        foggedTileExists = mapContainer.children.some(
                tileContainer => tileContainer.getChildByName('fog')),
        randomTileIndex = 0,
        randomTile;

    if (! foggedTileExists) {
        throw "The map has no fogged tiles to choose.";
    }

    do {
        randomTileIndex = Math.floor(Math.random() * mapContainer.children.length);
        randomTile = mapContainer.children[randomTileIndex];
    } while (! randomTile.getChildByName('fog'));

    return getTileSlot(randomTile.name);
}

function makeSelection() {
    let selectedSlot = randomFoggedTileSlot(),
        mapContainer = app.states.level.panel.getChildByName('map'),
        tileSelection = createSelection(getAssetName(...selectedSlot),
                                            ...selectedSlot);

    mapContainer.addChild(tileSelection);

    rotatePlayer();
}

function rotatePlayer() {
    let player = app.states.level.player =
        (app.states.level.player === undefined) ? 0 : ! app.states.level.player;

    console.log("Player", player + 1, "make your selection.");
}

function createMap(levelNumber) {
    let mapContainer = new Container(),
        tileContainer;

    mapContainer.name = 'map';

    forEachTile((assetName, columnIndex, rowIndex) => {
        tileContainer = createTile(assetName, columnIndex, rowIndex);
        mapContainer.addChild(tileContainer);
    });

    return mapContainer;
}

function makeMap() {
    let mapContainer = createMap(),
        whiteSpace = (CANVAS_WIDTH - getMapInfo().MAP_WIDTH) - (CANVAS_PADDING * 2),
        equalSpaceOnEachSide = Math.floor(whiteSpace / 2);

    mapContainer.x = equalSpaceOnEachSide;
    mapContainer.y = 0;

    app.states.level.panel.addChild(mapContainer);

    if (getLevel().tutorial) {
        mapContainer.tilesToUncover = getMapInfo().NUM_TILES;
        makeFog();
        makeSelection();
    }
}

function getPreloadConf(levelNumber) {
    let preload = [],
        level = getLevel().tiles;

    forEachTile((assetName, columnIndex, rowIndex) => {
        // Tile asset
        preload.append({ 
            id: assetName,
            src: `assets/images/level${levelNumber}-easy/${assetName}.gif`,
            format: "createjs.Bitmap",
        });

        // Tile exploration assets
        for (direction of TILE_DIRECTIONS) {
            preload.append({ 
                id: `${assetName}-${direction}`,
                src: `assets/images/level${levelNumber}-easy/${assetName}/${direction}.jpg`,
                format: "createjs.Bitmap",
            });
        }
    });

    return preload;
}

function getLevelState(levelNumber) {
    let preloadConfig = getPreloadConf(levelNumber);
    let state = new State(new Container(), {
        preload: preloadConfig,
    });

    state.on('loaded', function(event) {
        makeMap();
    });
    state.on('exit', function(event) {
        //this.panel.removeAllChildren();
    });

    return state;
}
