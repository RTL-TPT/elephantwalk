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

function createDoneButton(x=0, y=0, callback=undefined, text="Done") {
    let doneButton;

    doneBitmap = new Bitmap(app.getCache('done-button'));
    doneBitmap.name = 'done';
    doneBitmap.x = x;
    doneBitmap.y = y;

    if (callback) {
        doneBitmap.on('mousedown', callback);
    }

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
                                    clueButtonWidth, clueButtonHeight);
    doneButton = createDoneButton(
        sidebarPadding, CANVAS_HEIGHT - 50 - sidebarPadding,
        ev => {
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
                        app.states.clues.nextState();
                    }
                }
                else {
                    alert('Try again');
                }
        });

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
        //unlocksContainer,
        //unlockWidth = 100,
        //unlockHeight = 300,
        clueDetailContainer,
        clueNameContainer,
        detailWidth = 800,
        detailHeight = 660,
        detailPadding = 50,
        symbolBitmap,
        symbolText;

    //Modal grayout
    modalSuperContainer= new UiContainer({
                x: 0, y: 0, width: CANVAS_WIDTH, height: CANVAS_HEIGHT,
                borderColor: "#000000", borderWidth: 0,
                backgroundColor: "rgba(0, 0, 0, 0.75)"
            });
    //modalSuperContainer.name = 'modalSuperContainer';

    //Clue UI container
    clueDetailContainer = new UiContainer({
                x: 100, y: 50, width: detailWidth, height: detailHeight,
                borderColor: "#000000", borderWidth: 6,
                backgroundColor: "rgba(200, 200, 200, 1)"
            });
    //clueDetailContainer.name = 'clue';

    //Spyglass kid with sign bg
    bgBitmap = new ScaledBitmap(app.getCache("clue-background"), {
            maxWidth: (detailWidth - detailPadding * 2),
            maxHeight: (detailWidth - detailPadding * 2) * 904 / 1188,
        });
    bgBitmap.x = detailPadding;
    bgBitmap.y = detailPadding;
    clueDetailContainer.addChild(bgBitmap);

    //Area clue for sign
    symbolBitmap = new ScaledBitmap(app.getCache(`clue-${symbolName}`), {
            maxWidth: 450,
            maxHeight: 450 * 904 / 1188,
        });
    symbolBitmap.x = 290;//detailPadding;
    symbolBitmap.y = toCenterY(symbolBitmap, detailHeight) - 20;//detailPadding;
    clueDetailContainer.addChild(symbolBitmap);

    //Clue text
    clueNameContainer = new UiContainer({
            x: (detailWidth / 2) - 100, y: 585, width: 200, height: 60,
            borderColor: "#000000", borderWidth: 4,
            backgroundColor: "rgba(255, 255, 255, 1)"
        });
    //clueNameContainer.name = 'cluetext';
    clueDetailContainer.addChild(clueNameContainer);
    symbolText = new Text(ucFirst(symbolName), "35px Arial");
    symbolText.x = toCenterX(symbolText, 200);
    symbolText.y = toCenterY(symbolText, 60);
    clueNameContainer.addChild(symbolText);

    //Modal close icon
    closeIcon = new ScaledBitmap(app.getCache("close-button"), {
            maxWidth: 50,
            maxHeight: 50,
        });
    closeIcon.x = detailWidth - 50;
    closeIcon.y = 0;
    clueDetailContainer.addChild(closeIcon);

    modalSuperContainer.addChild(clueDetailContainer);

    //Events
    clueDetailContainer.on('mousedown', ev => {
        ev.currentTarget.removeAllEventListeners();
        ev.currentTarget.parent.parent.removeChild(ev.currentTarget.parent);
    });

    app.states.clues.panel.addChild(modalSuperContainer);
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

    [ref.assetName, ref.direction] = elephantLocation;
    [ref.clueOne, ref.clueTwo] = ref.assetName.split('-');
}

function getClueState() {
    let state = new State(new Container(), {
        previous: 'level',
        next: 'search',
        preload: [
            {
                id: 'not-unlocked',
                src: 'assets/images/not-unlocked.png',
            },
            {
                id: 'clue-bridge',
                src: 'assets/images/clue/BRIDGE_clue.png',
            },
            {
                id: 'clue-desert',
                src: 'assets/images/clue/DESERT_clue.png',
            },
            {
                id: 'clue-forest',
                src: 'assets/images/clue/FOREST_clue.png',
            },
            {
                id: 'clue-hill',
                src: 'assets/images/clue/HILLS_clue.png',
            },
            {
                id: 'clue-lake',
                src: 'assets/images/clue/LAKE_clue.png',
            },
            {
                id: 'clue-mountain',
                src: 'assets/images/clue/MOUNTAIN_clue.png',
            },
            {
                id: 'clue-ocean',
                src: 'assets/images/clue/OCEAN_clue.png',
            },
            {
                id: 'clue-park',
                src: 'assets/images/clue/PARK_clue.png',
            },
            {
                id: 'clue-road',
                src: 'assets/images/clue/ROAD_clue.png',
            },
            {
                id: 'clue-stream',
                src: 'assets/images/clue/STREAM_clue.png',
            },
            {
                id: 'clue-tree',
                src: 'assets/images/clue/TREE_clue.png',
            },
            {
                id: 'clue-waterfall',
                src: 'assets/images/clue/WATERFALL_clue.png',
            },
            {
                id: 'clue-background',
                src: 'assets/images/clue/clue_bg.png',
            }
        ].append(getPreloadSymbols(), getPreloadTiles()),
    });

    state.on('loaded', function(event) {
        let stateContainer = app.states.clues.panel,
            sidebarWidth = 200,
            mapPadding = 50,
            availableWidth = CANVAS_WIDTH - sidebarWidth - (mapPadding * 2);

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
