function createGpsCone(assetName, direction) {
    let tileSlot = getTileSlot(assetName),
        points = getPointsForTileDirections(...tileSlot)[direction]; 
        gpsCone = new Shape();

    gpsCone.name = 'gps';

    gpsCone.graphics.beginFill("rgba(255,228,0,0.25)")
        .moveTo(...points[0])
        .lineTo(...points[1])
        .lineTo(...points[2])

    return gpsCone;
}
