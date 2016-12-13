(function(LevelMap) {
    var Container = require('createjs.Container'),
        Shape = require('createjs.Shape');

    LevelMap.getPointsForTileDirections = function(columnIndex, rowIndex) {
        let sizeX = TILE_WIDTH,
            sizeY = TILE_HEIGHT,
            x = LevelMap.columnIndexToPx(columnIndex),
            y = LevelMap.rowIndexToPx(rowIndex),
            centerX = x + (sizeX / 2),
            centerY = y + (sizeY / 2),
            maxX = x + sizeX,
            maxY = y + sizeY;

        let directionPoints = {
            left: [ [x, y], [centerX, centerY], [x, maxY] ],
            top: [ [x, y], [centerX, centerY], [maxX, y] ],
            right: [ [maxX, y], [centerX, centerY], [maxX, maxY] ],
            bottom: [ [x, maxY], [centerX, centerY], [maxX, maxY] ],
        };

        return directionPoints;
    };

    LevelMap.createFog = function(assetName, columnIndex, rowIndex) {
        let directionPoints = LevelMap.getPointsForTileDirections(columnIndex, rowIndex),
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
                .lineTo(...points[2])

            fogContainer.addChild(triangle);
        }

        return fogContainer;
    };

    LevelMap.removeFogPiece = function(assetName, direction) {
        let mapContainer = app.states.level.panel.getChildByName('map'),
            tileContainer = mapContainer.getChildByName(assetName),
            fogContainer = tileContainer.getChildByName('fog'),
            triangle = fogContainer.getChildByName(direction);

        fogContainer.removeChild(triangle);
    };

    LevelMap.makeFog = function() {
        let mapContainer = app.states.level.panel.getChildByName('map'),
            tileContainer;

        LevelMap.forEachTile((assetName, columnIndex, rowIndex) => {
            tileContainer = mapContainer.getChildByName(assetName);
            tileContainer.addChild(LevelMap.createFog(assetName, columnIndex, rowIndex));
        });
    };

}(this.LevelMap || {}));
