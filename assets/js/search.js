function makeSearchSidebar() {
    let stateContainer = app.manager.currentState.panel,
        sidebarWidth = 200,
        sidebarPadding = 25,
        sidebarContainer;

    let guessWidth = 150,
        guessHeight = 175,
        guessContainer;


    sidebarContainer = createSidebar(sidebarWidth);

    guessOneContainer = createGuess(toCenter(sidebarWidth, guessWidth),
                                    sidebarPadding, guessWidth, guessHeight);
    guessOneContainer.name = 'guessOne';

    guessTwoContainer = createGuess(toCenter(sidebarWidth, guessWidth),
                                    sidebarPadding + guessHeight + sidebarPadding,
                                    guessWidth, guessHeight);
    guessTwoContainer.name = 'guessTwo';

    doneButton = createDoneButton(sidebarPadding, CANVAS_HEIGHT - 50 - sidebarPadding,
            ev => {
                let stateContainer = app.states.search.panel,
                    sidebarContainer = stateContainer.getChildByName('sidebar'),
                    mapContainer = stateContainer.getChildByName('map'),
                    selectionContainer = mapContainer.getChildByName('selection');

                if (app.levelInfo.elephantLocation.assetName === selectionContainer.assetName) {
                    stateContainer.removeChild(sidebarContainer); 
                    removeSelections();
                    makeExplore(selectionContainer.assetName);
                    rotatePlayer();
                }
                else {
                    alert('try again');
                }
            });

    sidebarContainer.addChild(guessOneContainer, guessTwoContainer, doneButton);

    stateContainer.addChild(sidebarContainer);
}

function getSearchState() {
    let state = new State(new Container(), {
        previous: 'clues',
        preload: [].append(getPreloadTiles(),
                            getPreloadExplorePanes(),
                            getPreloadSymbols()),
    });

    state.on('loaded', function(ev) {
        let stateContainer = app.states.search.panel,
            sidebarWidth = 200,
            mapPadding = 50,
            availableWidth = CANVAS_WIDTH - sidebarWidth - (mapPadding * 2),
            symbolName,
            assetName;

        makeMap({x: mapPadding, y: mapPadding, width: availableWidth},
            ev => {
                removeSelections();
                makeSelection(ev.currentTarget.slot);
            });
        makeSearchSidebar();

        for (let [onClue, onGuess] of [['clueOne', 'guessOne'], ['clueTwo', 'guessTwo']]) {
            symbolName = app.levelInfo.elephantLocation[onClue];
            assetName = getLevel().symbols[symbolName].assetName;
            populateGuessContainer(app.getCache(`${symbolName}-${assetName}`), symbolName, onGuess);
        }

        rotatePlayer(1);
    });

    return state;
}

