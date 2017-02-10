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
                    "stream": "nonAbstract",
                    "forest": "partialAbstract",
                    "waterfall": "nonAbstract",
                    "mountain": "partialAbstract",
                    "lake": "nonAbstract",
                    "ocean": "nonAbstract"
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
                    "park": "nonAbstract",
                    "road": "nonAbstract",
                    "bridge": "nonAbstract",
                    "hill": "partialAbstract",
                    "building": "nonAbstract",
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
                    "road": "fullAbstract",
                    "bridge": "partialAbstract",
                    "desert": "fullAbstract",
                    "forest": "fullAbstract",
                    "mountain": "fullAbstract",
                    "hill": "fullAbstract",
                    "building": "fullAbstract",
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
                    "desert": "fullAbstract",
                    "hill": "fullAbstract",
                    "forest": "fullAbstract",
                    "road": "fullAbstract",
                    "building": "partialAbstract",
                    "park": "partialAbstract",
                    "lake": "fullAbstract",
                    "mountain": "fullAbstract",
                    "stream": "fullAbstract",
                    "bridge": "partialAbstract",
                    "waterfall": "fullAbstract",
                    "ocean": "fullAbstract"
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
            [108,226,202,155,"forest"],
            [391,95,189,155,"mountain"],
            [315,420,370,154,"desert"],
            [617,257,294,103,"hill"]
        ]
    },
    { //mapset 3
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_1_west":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [348,427,252,143,"forest"],
            [149,239,189,159,"mountain"],
            [343,102,274,168,"desert"],
            [628,265,258,111,"hill"]
        ]
    },
    { //mapset 4
        "elephant": { //y_x_direction: [left,top,width,height]
            "1_0_east":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [7,9,316,169,"stream"],
            [62,196,183,114,"forest"],
            [340,25,315,167,"stream"],
            [537,54,193,137,"waterfall"],
            [654,29,147,155,"stream"],
            [750,54,214,177,"mountain"],
            [39,450,218,178,"mountain"],
            [206,342,282,178,"lake"],
            [664,346,187,109,"forest"],
            [457,464,493,157,"ocean"]
        ]
    },
    { //mapset 5
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_1_west":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [0,131,279,188,"ocean"],
            [287,485,577,91,"stream"],
            [455,95,225,73,"hill"],
            [359,392,231,74,"hill"],
            [398,200,223,107,"lake"],
            [686,342,242,51,"lake"],
            [746,414,124,75,"waterfall"],
            [0,0,292,103,"desert"],
            [702,0,247,133,"desert"]
        ]
    },
    { //mapset 6
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_1_west":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [23,529,232,71,"hill"],
            [515,234,220,76,"hill"],
            [356,204,137,107,"forest"],
            [564,322,137,107,"forest"],
            [36,249,254,114,"lake"],
            [129,0,124,120,"mountain"],
            [722,497,198,111,"mountain"],
            [769,129,99,340,"stream"],
            [404,446,253,175,"stream"],
            [671,429,178,49,"stream"],
            [253,0,115,126,"waterfall"],
            [373,0,577,116,"ocean"]
        ]
    },
    { //mapset 7
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_0_north":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [11,25,181,142,"forest"],
            [202,30,245,136,"park"],
            [783,29,176,112,"forest"],
            [8,234,224,133,"road"],
            [232,232,191,140,"bridge"],
            [418,242,224,138,"road"],
            [362,148,259,113,"hill"],
            [709,154,202,134,"building"],
            [643,224,212,201,"road"],
            [28,361,200,136,"mountain"],
            [230,476,182,156,"building"],
            [493,458,262,144,"desert"],
            [686,444,269,190,"mountain"]
        ]
    },
    { //mapset 8
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_1_west":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [18,17,153,95,"forest"],
            [0,211,268,65,"road"],
            [195,0,73,276,"road"],
            [195,270,222,73,"hill"],
            [79,356,126,92,"park"],
            [0,448,180,76,"stream"],
            [50,524,170,81,"bridge"],
            [255,418,125,99,"building"],
            [385,161,149,101,"forest"],
            [431,533,216,86,"hill"],
            [596,26,182,122,"mountain"],
            [688,152,245,113,"lake"],
            [727,303,125,104,"building"],
            [563,413,257,112,"desert"],
            [763,502,172,113,"mountain"]
        ]
    },
    { //mapset 9
        "elephant": { //y_x_direction: [left,top,width,height]
            "1_2_west":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [39,0,81,362,"road"],
            [3,363,165,100,"bridge"],
            [38,463,83,157,"road"],
            [117,8,287,126,"desert"],
            [176,296,190,97,"forest"],
            [153,461,227,153,"mountain"],
            [368,166,221,90,"hill"],
            [404,420,124,90,"building"],
            [604,64,124,90,"building"],
            [699,144,210,132,"mountain"],
            [725,305,138,97,"park"],
            [685,451,219,70,"hill"],
            [501,516,235,96,"desert"]
        ]
    },
    { //mapset 10
        "elephant": { //y_x_direction: [left,top,width,height]
            "1_1_north":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [0,0,311,116,"desert"],
            [53,116,219,74,"hill"],
            [60,239,194,95,"forest"],
            [0,502,167,119,"road"],
            [198,418,241,115,"lake"],
            [419,18,132,91,"building"],
            [397,147,173,119,"park"],
            [682,24,214,136,"mountain"],
            [736,252,214,71,"stream"],
            [723,323,169,83,"bridge"],
            [764,424,126,129,"waterfall"],
            [338,533,612,86,"ocean"],
            [885,498,65,121,"ocean"]
        ]
    },
    { //mapset 11
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_0_south":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [662,550,288,71,"desert"],
            [211,540,181,72,"hill"],
            [468,477,104,143,"road"],
            [571,477,164,59,"road"],
            [871,477,84,55,"road"],
            [148,340,154,60,"lake"],
            [693,310,213,80, "lake"],
            [417,384,112,78,"building"],
            [89,426,142,90,"park"],
            [682,24,214,136,"mountain"],
            [486,82,207,112,"stream"],
            [748,467,108,65,"bridge"],
            [790,55,112,114,"waterfall"],
            [29,23,380,262,"ocean"]
        ]
    },
    { //mapset 12
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_0_south":[228,235,321,281]
        }, 
        "clues": [ //[left,top,width,height,clue]
            [0,242,208,379,"ocean"],
            [736,497,185,110,"mountain"],
            [434,492,286,128,"desert"],
            [266,234,137,99,"park"],
            [824,419,102,69,"building"],
            [687,256,226,142, "lake"],
            [576,251,298,92,"hill"]
            [0,370,329,124,"road"],
            [0,477,850,69,"road"],
            [711,73,125,57,"bridge"],
            [183,94,80,95,"waterfall"],
            [54,35,200,52,"hill"],
            [0,131,168,70,"stream"],
            [273,131,541,70,"stream"]
        ]
    }
];