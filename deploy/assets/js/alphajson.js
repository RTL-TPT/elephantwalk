var g_leveldata =
{
    "LAND": {
        "TUTORIAL": [],
        "EASY": [
                {"clues": [
                    "desert",
                    "forest"
                ],
                "symbolStyle": {
                    "forest": "nonAbstract",
                    "mountain": "nonAbstract",
                    "desert": "nonAbstract",
                    "hill": "nonAbstract"
                },
                "clueUnlock": "forest1",
                "gridSize": "2x2",
                "elephantLocation": [
                    0,
                    0,
                    "south"
                ],
                "unlocked": true,
                "hasExploration": true,
                "mapset": 1
            },
            {
                "clues": [
                    "hill",
                    "mountain"
                ],
                "symbolStyle": {
                    "forest": "nonAbstract",
                    "mountain": "nonAbstract",
                    "desert": "nonAbstract",
                    "hill": "nonAbstract"
                },
                "clueUnlock": "mountain1",
                "gridSize": "2x2",
                "elephantLocation": [
                    1,
                    1,
                    "south"
                ],
                "unlocked": true,
                "hasExploration": false,
                "mapset": 1
            },
            {
                "clues": [
                    "desert",
                    "hill"
                ],
                "symbolStyle": {
                    "forest": "partialAbstract",
                    "mountain": "partialAbstract",
                    "desert": "partialAbstract",
                    "hill": "partialAbstract"
                },
                "clueUnlock": "hill1",
                "gridSize": "2x2",
                "elephantLocation": [
                    0,
                    1,
                    "west"
                ],
                "unlocked": true,
                "hasExploration": true,
                "mapset": 3
            },
            {
                "clues": [
                    "mountain",
                    "lake"
                ],
                "symbolStyle": {
                    "stream": "partialAbstract",
                    "forest": "partialAbstract",
                    "waterfall": "partialAbstract",
                    "mountain": "partialAbstract",
                    "lake": "partialAbstract",
                    "ocean": "partialAbstract"
                },
                "clueUnlock": "",
                "gridSize": "3x2",
                "elephantLocation": [
                    1,
                    0,
                    "east"
                ],
                "unlocked": true,
                "hasExploration": true,
                "mapset": 4
            },
            {
                "clues": [
                    "park",
                    "forest"
                ],
                "symbolStyle": {
                    "forest": "partialAbstract",
                    "park": "partialAbstract",
                    "road": "partialAbstract",
                    "bridge": "partialAbstract",
                    "hill": "partialAbstract",
                    "building": "partialAbstract",
                    "desert": "partialAbstract",
                    "mountain": "partialAbstract"
                },
                "clueUnlock": "",
                "gridSize": "3x3",
                "elephantLocation": [
                    0,
                    0,
                    "north"
                ],
                "unlocked": true,
                "hasExploration": true,
                "mapset": 7
            },
            {
                "clues": [
                    "park",
                    "mountain"
                ],
                "symbolStyle": {
                    "road": "partialAbstract",
                    "bridge": "partialAbstract",
                    "desert": "partialAbstract",
                    "forest": "partialAbstract",
                    "mountain": "partialAbstract",
                    "hill": "partialAbstract",
                    "building": "partialAbstract",
                    "park": "partialAbstract"
                },
                "clueUnlock": "",
                "gridSize": "3x3",
                "elephantLocation": [
                    1,
                    2,
                    "west"
                ],
                "unlocked": true,
                "hasExploration": true,
                "mapset": 9
            },
            {
                "clues": [
                    "building",
                    "lake"
                ],
                "symbolStyle": {
                    "desert": "partialAbstract",
                    "hill": "partialAbstract",
                    "forest": "partialAbstract",
                    "road": "partialAbstract",
                    "building": "partialAbstract",
                    "park": "partialAbstract",
                    "lake": "partialAbstract",
                    "mountain": "partialAbstract",
                    "stream": "partialAbstract",
                    "bridge": "partialAbstract",
                    "waterfall": "partialAbstract",
                    "ocean": "partialAbstract"
                },
                "clueUnlock": "",
                "gridSize": "3x3",
                "elephantLocation": [
                    1,
                    1,
                    "north"
                ],
                "unlocked": true,
                "hasExploration": true,
                "mapset": 10
            }
        ],
        "MEDIUM": [],
        "HARD": []
    },
    "WATER": {
        "TUTORIAL": [],
        "EASY": [],
        "MEDIUM": [],
        "HARD": []
    },
    "MANMADE": {
        "TUTORIAL": [],
        "EASY": [],
        "MEDIUM": [],
        "HARD": []
    },
    "MASTER": {
        "TUTORIAL": [],
        "EASY": [],
        "MEDIUM": [],
        "HARD": []
    }
};

var g_mapsetdata = [
    { //mapset 1
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_0_south":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [366,50,226,173,"forest"],
            [291,417,384,149,"mountain"],
            [28,220,373,136,"desert"],
            [576,251,298,92,"hill"]
        ]
    },
    { //mapset 2
        "elephant": { //y_x_direction: [left,top,width,height]
            "1_1_south":[240,235,300,200]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [0,0,0,0,"forest"],
            [0,0,0,0,"mountain"],
            [0,0,0,0,"desert"],
            [0,0,0,0,"hill"]
        ]
    },
    { //mapset 3
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_1_west":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [0,0,0,0,"forest"],
            [0,0,0,0,"mountain"],
            [0,0,0,0,"desert"],
            [0,0,0,0,"hill"]
        ]
    },
    { //mapset 4
        "elephant": { //y_x_direction: [left,top,width,height]
            "1_0_east":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [0,0,0,0,"stream"],
            [0,0,0,0,"forest"],
            [0,0,0,0,"stream"],
            [0,0,0,0,"waterfall"],
            [0,0,0,0,"stream"],
            [0,0,0,0,"mountain"],
            [0,0,0,0,"mountain"],
            [0,0,0,0,"lake"],
            [0,0,0,0,"forest"],
            [0,0,0,0,"ocean"]
        ]
    },
    { //mapset 5
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_1_west":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [0,0,0,0,"forest"],
            [0,0,0,0,"mountain"],
            [0,0,0,0,"desert"],
            [0,0,0,0,"hill"]
        ]
    },
    { //mapset 6
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_1_west":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [0,0,0,0,"forest"],
            [0,0,0,0,"mountain"],
            [0,0,0,0,"desert"],
            [0,0,0,0,"hill"]
        ]
    },
    { //mapset 7
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_0_north":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [0,0,0,0,"forest"],
            [0,0,0,0,"park"],
            [0,0,0,0,"forest"],
            [0,0,0,0,"road"],
            [0,0,0,0,"bridge"],
            [0,0,0,0,"road"],
            [0,0,0,0,"hill"],
            [0,0,0,0,"building"],
            [0,0,0,0,"road"],
            [0,0,0,0,"mountain"],
            [0,0,0,0,"building"],
            [0,0,0,0,"desert"],
            [0,0,0,0,"mountain"]
        ]
    },
    { //mapset 8
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_1_west":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [0,0,0,0,"forest"],
            [0,0,0,0,"mountain"],
            [0,0,0,0,"desert"],
            [0,0,0,0,"hill"]
        ]
    },
    { //mapset 9
        "elephant": { //y_x_direction: [left,top,width,height]
            "1_2_west":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [0,0,0,0,"road"],
            [0,0,0,0,"road"],
            [0,0,0,0,"road"],
            [0,0,0,0,"bridge"],
            [0,0,0,0,"desert"],
            [0,0,0,0,"forest"],
            [0,0,0,0,"mountain"],
            [0,0,0,0,"hill"],
            [0,0,0,0,"building"],
            [0,0,0,0,"building"],
            [0,0,0,0,"desert"],
            [0,0,0,0,"mountain"],
            [0,0,0,0,"park"],
            [0,0,0,0,"hill"]
        ]
    },
    { //mapset 10
        "elephant": { //y_x_direction: [left,top,width,height]
            "1_1_north":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [0,0,0,0,"desert"],
            [0,0,0,0,"hill"],
            [0,0,0,0,"forest"],
            [0,0,0,0,"road"],
            [0,0,0,0,"building"],
            [0,0,0,0,"park"],
            [0,0,0,0,"lake"],
            [0,0,0,0,"mountain"],
            [0,0,0,0,"stream"],
            [0,0,0,0,"bridge"],
            [0,0,0,0,"waterfall"],
            [0,0,0,0,"ocean"]
        ]
    },
    { //mapset 11
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_0_south":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [366,50,226,173,"forest"],
            [291,417,384,149,"mountain"],
            [28,220,373,136,"desert"],
            [576,251,298,92,"hill"]
        ]
    },
    { //mapset 12
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_0_south":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [366,50,226,173,"forest"],
            [291,417,384,149,"mountain"],
            [28,220,373,136,"desert"],
            [576,251,298,92,"hill"]
        ]
    }
];