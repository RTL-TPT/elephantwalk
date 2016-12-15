function getPreloadSymbols() {
    let preload = [],
        levelId = getLevel().id;

    for (let symbolName of Object.keys(getLevel().symbols)) {
        preload.append({
            id: `${symbolName}-detail`,
            src: `assets/images/${levelId}/symbols/${symbolName}/detail.jpg`,
        });
    }

    for (let [symbolName, symbolMeta] of Object.entries(getLevel().symbols)) {
        for (let abstraction of symbolMeta.unlocked || []) {
            preload.append({
                id: `${symbolName}-${abstraction}`,
                src: `assets/images/${levelId}/symbols/${symbolName}/${abstraction}.png`,
            });
        }

        // All map symbols are placed on the map, but not all have clue unlocks available
        if (! symbolMeta.unlocked || symbolMeta.unlocked.indexOf(symbolMeta.assetName) === -1) {
            preload.append({
                id: `${symbolName}-${symbolMeta.assetName}`,
                src: `assets/images/${levelId}/symbols/${symbolName}/${symbolMeta.assetName}.png`,
            });
        }
    }

    return preload;
}

function createDoneButton(x=0, y=0, text="Done") {
    let doneButton;

    doneBitmap = app.getCache('done-button');
    doneBitmap.name = 'done';
    doneBitmap.x = x;
    doneBitmap.y = y;

    doneBitmap.on('mousedown', ev => {
        let sidebarContainer = app.states.clues.panel.getChildByName('sidebar'),
            guess = sidebarContainer.getChildByName('guess').getChildByName('symbol').symbolName;
            onClue = (app.states.clues.player === 1) ? 'clueOne' : 'clueTwo';

        removeGuess();

        if (guess === app.levelInfo.elephantLocation[onClue]) {
            rotatePlayer();

            if (onClue === 'clueOne') {
                makeClueDetail('clueTwo');
            }
            else {
                alert('Well done');
                app.states.clues.panel.removeAllChildren();
                //app.states.clues.previousState();  // TODO: Next state
            }
        }
        else {
            alert('Try again');
        }
    });

    return doneBitmap;
}

function createSidebar(width=200) {
    let sidebarContainer;

    sidebarContainer = new UiContainer({
                width: width,
                height: CANVAS_HEIGHT,
                x: CANVAS_WIDTH - width,
                y: 0,
                borderColor: 'black',
            });
    sidebarContainer.name = 'sidebar';

    return sidebarContainer;
}

function createGuess(x=0, y=0, width=150, height=175) {
    let guessContainer;

    guessContainer = new UiContainer({
                x: x, y: y,
                width: width,
                height: height,
                borderColor: 'black',
            });
    guessContainer.name = 'guess';

    return guessContainer;
}

function createOpenClue(x=0, y=0, width=100, height=100) {
    let openClueButton;

    openClueButton = new UiContainer({
                x: x, y: y,
                width: width,
                height: height,
                borderColor: 'black',
                backgroundColor: 'white',
            });
    openClueButton.on('mousedown', ev => {
        let onClue = (app.states.clues.player === 1) ? 'clueOne' : 'clueTwo';
        makeClueDetail(onClue); // TODO: Ensure not already open
    });

    return openClueButton;
}

function makeSidebar() {
    let stateContainer = app.states.clues.panel,
        sidebarWidth = 200,
        sidebarPadding = 25,
        sidebarContainer;

    let clueButtonWidth = 100,
        clueButtonHeight = 100,
        openClueButton;

    let guessWidth = 150,
        guessHeight = 175,
        guessContainer;


    sidebarContainer = createSidebar(sidebarWidth);

    guessContainer = createGuess(toCenter(sidebarWidth, guessWidth),
                                    sidebarPadding, guessWidth, guessHeight);
    openClueButton = createOpenClue(toCenter(sidebarWidth, clueButtonWidth),
                                    sidebarPadding + guessHeight + 50,
                                    guessWidth, guessHeight);
    doneButton = createDoneButton(sidebarPadding,
                                    CANVAS_HEIGHT - 50 - sidebarPadding);

    sidebarContainer.addChild(guessContainer, openClueButton, doneButton);

    stateContainer.addChild(sidebarContainer);
}

function populateGuessContainer(imageOrUri, symbolName, containerName='guess') {
    let sidebarContainer = app.manager.currentState.panel.getChildByName('sidebar'),
        guessContainer = sidebarContainer.getChildByName(containerName),
        guessWidth = 150,
        guessHeight = 175,
        guessBitmap,
        assetWidth = guessWidth * 0.75,
        assetHeight = guessHeight * 0.50;

    guessBitmap = new ScaledBitmap(imageOrUri, {
        width: assetWidth,
        height: assetHeight,
    });
    guessBitmap.name = 'symbol';
    guessBitmap.x = toCenter(guessWidth, assetWidth);
    guessBitmap.y = toCenter(guessHeight, assetHeight);
    guessBitmap.symbolName = symbolName;

    removeGuess(containerName);
    guessContainer.addChildAt(guessBitmap, 0);
}

function removeGuess(containerName='guess') {
    let sidebarContainer = app.manager.currentState.panel.getChildByName('sidebar'),
        guessContainer = sidebarContainer.getChildByName(containerName);

    if (guessContainer.getChildAt(0).name === 'symbol') {
        guessContainer.removeChildAt(0);
    }
}

function makeMapSymbols() {
    let stateContainer = app.states.clues.panel,
        mapContainer = stateContainer.getChildByName('map'),
        assetName = '',
        symbolName = '',
        symbol = {};

    for ([symbolName, symbolMeta] of Object.entries(getLevel().symbols)) {
        symbol = new Bitmap(
            app.getCache(`${symbolName}-${symbolMeta.assetName}`));

        symbolContainer = new UiContainer({
                    x: symbolMeta.x, 
                    y: symbolMeta.y, 
                    width: symbol.getBounds().width,
                    height: symbol.getBounds().height,
                    borderColor: 'black',
                    borderWidth: 4
                });
        symbolContainer.name = symbolName;
        symbolContainer.assetName = symbolMeta.assetName;

        symbol.name = 'symbol';
        symbolContainer.addChild(symbol);

        symbolContainer.on('mousedown', ev => {
            let asset;
            
            asset = app.getCache(`${ev.currentTarget.name}-${ev.currentTarget.assetName}`);
            populateGuessContainer(asset, ev.currentTarget.name);
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

    for (let abstraction of SYMBOL_ABSTRACTIONS) {
        assetName = `${symbol}-${abstraction}`;
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
    symbolText.y = detailHeight - 100;
    clueDetailContainer.addChild(symbolText);

    clueDetailContainer.on('mousedown', ev => {
        ev.currentTarget.removeAllEventListeners();
        ev.currentTarget.parent.removeChild(ev.currentTarget);
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
                id: 'not-unlocked',
                src: 'assets/images/not-unlocked.png',
            },
        ].append(getPreloadSymbols(), getPreloadTiles()),
    });

    state.on('loaded', function(event) {
        let stateContainer = app.states.clues.panel,
            sidebarWidth = 200,
            mapPadding = 50,
            availableWidth = CANVAS_WIDTH - sidebarWidth - (mapPadding * 2),
            doneButton;

        setLevelElephantLocation();

        makeMap({doDefog: false, x: mapPadding, y: mapPadding,
                width: availableWidth});
        makeMapSymbols(); 
        makeSidebar();

        rotatePlayer(1);
        makeClueDetail();
    });

    state.on('exit', function(event) {
    });

    return state;
}
