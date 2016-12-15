function createDoneButton(x=0, y=0, text="Done") {
    let doneButton = app.getCache('done-button');

    doneButton.name = 'done';
    doneButton.x = x;
    doneButton.y = y;

    doneButton.on('mousedown', ev => {
        let sidebarContainer = app.states.clues.panel.getChildByName('sidebar'),
            guessOne = '',
            guessTwo = '',
            {clueOne: clueOne,
                clueTwo: clueTwo} = app.levelInfo.elephantLocation;

        guessOne = sidebarContainer.getChildByName('guessOne').getChildByName('guess').symbolName;
        guessTwo = sidebarContainer.getChildByName('guessTwo').getChildByName('guess').symbolName;

        if (clueOne === guessOne && clueTwo === guessTwo) {
            alert('Well done');
            //app.states.clues.previousState();  // TODO: Next state
        }
        else {
            alert('Try again');
        }
    });

    return doneButton;
}

function getPreloadSymbols() {
    let preload = [],
        symbols = getLevel().symbols,
        levelId = getLevel().id;

    for (let symbol of symbols) {
        for (let [symbolType, ext] of [ ['detail', 'jpg'], ['non-abstract', 'png']]) { // TODO: Other abstractions
            preload.append({
                id: `${symbol}-${symbolType}`,
                src: `assets/images/${levelId}/symbols/${symbol}/${symbolType}.${ext}`,
            });
        }
    }

    return preload;
}

function makeSidebar() {
    let stateContainer = app.states.clues.panel,
        sidebarWidth = 200,
        sidebarPadding = 25,
        guessWidth = 150,
        guessHeight = 175,
        guessOneContainer,
        guessTwoContainer;

    sidebarContainer = new UiContainer({
                width: sidebarWidth,
                height: CANVAS_HEIGHT,
                x: CANVAS_WIDTH - sidebarWidth,
                y: 0,
                borderColor: 'black',
            });
    sidebarContainer.name = 'sidebar';

    guessOneContainer = new UiContainer({
                x: toCenter(sidebarWidth, guessWidth),
                y: sidebarPadding,
                width: guessWidth,
                height: guessHeight,
                borderColor: 'black',
            });
    guessOneContainer.name = 'guessOne';
    sidebarContainer.addChild(guessOneContainer);

    guessTwoContainer = new UiContainer({
                x: toCenter(sidebarWidth, guessWidth),
                y: guessHeight + 50,
                width: guessWidth,
                height: guessHeight,
                borderColor: 'black',
            });
    guessTwoContainer.name = 'guessTwo';
    sidebarContainer.addChild(guessTwoContainer);

    doneButton = createDoneButton(sidebarPadding,
                                    CANVAS_HEIGHT - 50 - sidebarPadding);
    sidebarContainer.addChild(doneButton);

    stateContainer.addChild(sidebarContainer);
}

function makeMapSymbols() {
    let stateContainer = app.states.clues.panel,
        mapContainer = stateContainer.getChildByName('map'),
        assetName = '',
        symbolName = '',
        symbol = {};

    for (symbolName of getLevel().symbols) {
        assetName = `${symbolName}-non-abstract`;

        symbol = new Bitmap(app.getCache(assetName)); // TODO: Other abstractions

        symbolContainer = new UiContainer({
                    x: getLevel().symbol[symbolName].x, 
                    y: getLevel().symbol[symbolName].y, 
                    width: symbol.getBounds().width,
                    height: symbol.getBounds().height,
                    borderColor: 'black',
                    borderWidth: 4
                });
        symbolContainer.name = symbolName;

        symbol.name = 'symbol';
        symbolContainer.addChild(symbol);

        symbolContainer.on('mousedown', ev => {
            let symbolName = ev.currentTarget.name,
                player = app.states.clues.player,
                onClue = (player === 1) ? 'clueOne' : 'clueTwo',
                onGuess = (onClue === 'clueOne') ? 'guessOne' : 'guessTwo',
                clueName = app.levelInfo.elephantLocation[onClue],
                asset = app.getCache(`${ev.currentTarget.name}-non-abstract`),
                guessWidth = 150,
                guessHeight = 175,
                guessContainer = app.states.clues.panel
                    .getChildByName('sidebar').getChildByName(onGuess),
                guessBitmap;
                
            guessBitmap = new ScaledBitmap(asset, {
                    width: guessWidth - 10,
                    height: guessHeight - 80,
                });
            guessBitmap.name = 'guess';
            guessBitmap.symbolName = symbolName;

            if (guessContainer.getChildAt(0).name === 'guess') {
                guessContainer.removeChildAt(0);
            }
            guessContainer.addChildAt(guessBitmap);

            rotatePlayer();
        });
        mapContainer.addChild(symbolContainer);
    }
}

function createUnlocks(symbol, x=0, y=0, width=150, height=300) {
    let unlocksContainer = new UiContainer({
            x: x, y: y,
            width: width, height: height,
            borderColor: '#CCC',
        }),
        assetName,
        unlockIcon,
        unlockY = -80;

    unlocksContainer.name = 'unlocks';

    for (let abstraction of SYMBOL_DIFFICULTIES) {
        assetName = `${symbol}-${abstraction}-abstract`;
        if (assetName in app.assetManager.cache._cache) {
            unlockIcon = new ScaledBitmap(app.getCache(assetName), {
                                                maxWidth: width,
                                                maxHeight: height,
                                                width: 100,
                                                height: 50,
                                            });
        }
        else {
            unlockIcon = new Bitmap(app.getCache('not-unlocked'));
            unlockIcon.scaleX = 1.3;
            unlockIcon.scaleY = 1.3;
        }
        unlockIcon.name = symbol;
        unlockIcon.x = toCenterX(unlockIcon, width);
        unlockIcon.y = unlockY += 100;
        unlocksContainer.addChild(unlockIcon);
    }

    return unlocksContainer;
}

function makeClueDetail(onClue='clueOne') {
    let symbolName = app.levelInfo.elephantLocation[onClue],
        unlocksContainer,
        unlockWidth = 100,
        unlockHeight = 300,
        clueDetailContainer,
        detailWidth = 800,
        detailHeight = 600,
        detailPadding = 50,
        symbolBitmap,
        symbolText;

    clueDetailContainer = new UiContainer({
                x: 100, y: 50, width: detailWidth, height: 600,
                borderColor: "#000000", borderWidth: 8,
                backgroundColor: "rgba(255, 255, 255, 1"
            });
    clueDetailContainer.name = 'clue';

    unlocksContainer = createUnlocks(symbolName, clueDetailContainer.width - unlockWidth,
            toCenter(detailHeight, unlockHeight), unlockWidth, unlockHeight);
    clueDetailContainer.addChild(unlocksContainer);

    symbolBitmap = new ScaledBitmap(app.getCache(`${symbolName}-detail`), {
                maxWidth: (detailWidth - detailPadding * 2) - unlockWidth,
                maxHeight: detailHeight - detailPadding * 2,
            }),
    symbolBitmap.x = detailPadding;
    symbolBitmap.y = detailPadding;
    clueDetailContainer.addChild(symbolBitmap);

    symbolText = new Text(ucFirst(symbolName), "35px Arial");
    symbolText.x = toCenterX(symbolText, detailWidth);
    symbolText.y = 500;
    clueDetailContainer.addChild(symbolText);

    clueDetailContainer.on('mousedown', ev => {
        ev.currentTarget.removeAllEventListeners();
        ev.currentTarget.parent.removeChild(ev.currentTarget);

        rotatePlayer();

        if (onClue === 'clueOne') {
            makeClueDetail('clueTwo');
        }
    });

    app.states.clues.panel.addChild(clueDetailContainer);
}

function setLevelElephantLocation() {
    let tileName,
        randomLocationIndex,
        elephantLocation,
        ref = app.levelInfo.elephantLocation = {};

    randomLocationIndex = Math.floor(Math.random()
            * getLevel().elephantLocations.length);
    elephantLocation =
        getLevel().elephantLocations[randomLocationIndex];

    [tileName, ref.direction] = elephantLocation;
    [ref.clueOne, ref.clueTwo] = tileName.split('-');
}

function getClueState() {
    let state = new State(new Container(), {
        previous: 'level',
        preload: [
            {
                id: 'done-button',
                src: 'assets/images/done-button.png',
                format: 'createjs.Bitmap',
            },
            {
                id: 'not-unlocked',
                src: 'assets/images/not-unlocked.png',
            },
        ].append(getPreloadSymbols(), getPreloadTiles()),
    });

    state.on('loaded', function(event) {
        let stateContainer = app.states.clues.panel,
            sidebarWidth = 200,
            doneButton;

        setLevelElephantLocation();

        makeMap(false, 50, 50, 0.75); // TODO: Compute width (scaleTo)
        makeMapSymbols(); 
        makeSidebar();

        rotatePlayer(1);
        makeClueDetail();
    });

    state.on('exit', function(event) {
    });

    return state;
}
