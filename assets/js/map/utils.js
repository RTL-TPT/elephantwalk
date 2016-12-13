function getMapInfo() {
    let tiles = getLevelTiles(),
        totalTiles = 0,
        knownMaxColumn = 0,
        info = {
            MAP_ROWS: tiles.length,
            MAP_HEIGHT: tiles.length * TILE_HEIGHT,
        };

    forEachTile((_, columnIndex) => {
        totalTiles++;
        if (columnIndex > knownMaxColumn) knownMaxColumn = columnIndex;
    });
    info.MAP_COLUMNS = knownMaxColumn;
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
        level = getLevelTiles();

    level.forEach((row, rowIndex) => {
        row.forEach((assetName, columnIndex) => {
            fn(assetName, columnIndex, rowIndex);
        });
    });
}

function getTileSlot(forAssetName) {
    let slot = [];
    forEachTile((assetName, columnIndex, rowIndex) => {
        if (assetName === forAssetName) {
            slot = [columnIndex, rowIndex];
        }
    });
    return slot
}

function getAssetName(columnIndex, rowIndex) {
    return getLevelTiles()[rowIndex][columnIndex];
}
