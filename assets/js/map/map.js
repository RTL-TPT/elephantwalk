(function(LevelMap) {
    var Container = require('createjs.Container'),

    LevelMap.createTile = function(id, columnIndex, rowIndex) {
        let bitmapContainer = new Container(),
            bitmap = app.getCache(id);

        bitmapContainer.name = id;

        bitmap.x = LevelMap.columnIndexToPx(columnIndex);
        bitmap.y = LevelMap.rowIndexToPx(rowIndex);
        bitmap.name = 'tile';

        bitmapContainer.addChild(bitmap);

        return bitmapContainer;
    };

    LevelMap.createMap = function(levelNumber) {
        let mapContainer = new Container(),
            tileContainer;

        mapContainer.name = 'map';

        LevelMap.forEachTile((assetName, columnIndex, rowIndex) => {
            tileContainer = LevelMap.createTile(assetName, columnIndex, rowIndex);
            mapContainer.addChild(tileContainer);
        });

        return mapContainer;
    };

}(this.LevelMap || {}));
