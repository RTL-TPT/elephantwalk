(function(LevelMap) {
    var Container = require('createjs.Container'),
        Shape = require('createjs.Shape');

    LevelMap.rotatePlayer = function() {
        let player = app.states.level.player =
            (app.states.level.player === undefined) ? 0 : ! app.states.level.player;

        console.log("Player", player + 1, "make your selection.");
    };

    LevelMap.createSelection = function(assetName, columnIndex, rowIndex) {
        let selectionBox = new Shape();

        selectionBox.name = 'selection';
        selectionBox.assetName = assetName;

        selectionBox.graphics.beginFill("rgba(255, 255, 0, 0.2")
            .drawRect(columnIndexToPx(columnIndex),
                    rowIndexToPx(rowIndex),
                    TILE_WIDTH, TILE_HEIGHT);

        selectionBox.on('mousedown', function(ev) {
            let explorationContainer = Explore.createExplore(ev.currentTarget.assetName);
            app.states.level.panel.addChild(explorationContainer);
            ev.currentTarget.parent.removeChild(ev.currentTarget);
        });

        return selectionBox;
    };

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

}(this.LevelMap || {}));
