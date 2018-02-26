var g_leveldata =
{
    "LAND": {
        "TUTORIAL": [
            {"clues": [
                    "desert",
                    "forest"
                ],
                "symbolStyle": {
                    "desert": "nonAbstract",
                    "forest": "nonAbstract",
                    "hill": "nonAbstract",
                    "mountain": "nonAbstract"
                },
                "legendUnlocks": {
                    "building": "nonAbstract"
                },
                "clueUnlock": "forest1",
                "gridSize": "2x2",
                "elephantLocation": [
                    0,
                    0,
                    "south"
                ],
                
                "hasExploration": true,
                "taskid": "1_T1",
                "mapset": 11
            },
            {
                "clues": [
                    "hill",
                    "mountain"
                ],
                "symbolStyle": {
                    "desert": "nonAbstract",
                    "forest": "nonAbstract",
                    "hill": "nonAbstract",
                    "mountain": "nonAbstract"
                },
                "legendUnlocks": {
                    "forest": "nonAbstract",
                    "lake": "nonAbstract"
                },
                "clueUnlock": "mountain1",
                "gridSize": "2x2",
                "elephantLocation": [
                    1,
                    1,
                    "south"
                ],
                
                "hasExploration": true,
                "taskid": "1_T2",
                "mapset": 11
            }
        ],
        "EASY": [
            {
                "clues": [
                    "forest",
                    "hill"
                ],
                "symbolStyle": {
                    "desert": "nonAbstract",
                    "forest": "nonAbstract",
                    "hill": "nonAbstract",
                    "mountain": "nonAbstract"
                },
                "legendUnlocks": {
                    "desert": "nonAbstract",
                    "forest": "nonAbstract",
                    "hill": "nonAbstract",
                    "mountain": "nonAbstract"
                },
                "clueUnlock": "mountain1",
                "gridSize": "2x2",
                "elephantLocation": [
                    0,
                    1,
                    "south"
                ],
                
                "hasExploration": false,
                "taskid": "1_1",
                "mapset": 1
            },
            {
                "clues": [
                    "forest",
                    "hill"
                ],
                "symbolStyle": {
                    "desert": "nonAbstract",
                    "forest": "nonAbstract",
                    "hill": "nonAbstract",
                    "mountain": "nonAbstract"
                },
                "legendUnlocks": {
                    "desert": "nonAbstract",
                    "forest": "nonAbstract",
                    "hill": "nonAbstract",
                    "mountain": "nonAbstract"
                },
                "clueUnlock": "mountain1",
                "gridSize": "2x2",
                "elephantLocation": [
                    0,
                    1,
                    "south"
                ],
                
                "hasExploration": false,
                "taskid": "1_1",
                "mapset": 1
            },
            {
                "clues": [
                    "forest",
                    "hill"
                ],
                "symbolStyle": {
                    "desert": "nonAbstract",
                    "forest": "nonAbstract",
                    "hill": "nonAbstract",
                    "mountain": "nonAbstract"
                },
                "legendUnlocks": {
                    "desert": "nonAbstract",
                    "forest": "nonAbstract",
                    "hill": "nonAbstract",
                    "mountain": "nonAbstract"
                },
                "clueUnlock": "mountain1",
                "gridSize": "2x2",
                "elephantLocation": [
                    0,
                    1,
                    "south"
                ],
                
                "hasExploration": false,
                "taskid": "1_1",
                "mapset": 1
            },
            {
                "clues": [
                    "forest",
                    "hill"
                ],
                "symbolStyle": {
                    "desert": "nonAbstract",
                    "forest": "nonAbstract",
                    "hill": "nonAbstract",
                    "mountain": "nonAbstract"
                },
                "legendUnlocks": {
                    "desert": "nonAbstract",
                    "forest": "nonAbstract",
                    "hill": "nonAbstract",
                    "mountain": "nonAbstract"
                },
                "clueUnlock": "mountain1",
                "gridSize": "2x2",
                "elephantLocation": [
                    0,
                    1,
                    "south"
                ],
                
                "hasExploration": false,
                "taskid": "1_1",
                "mapset": 1
            }
        ],
        "MEDIUM": [{},{},{},{}],
        "HARD": [
            {
                "clues": [
                    "desert",
                    "hill"
                ],
                "symbolStyle": {
                    "desert": "partialAbstract",
                    "forest": "partialAbstract",
                    "hill": "partialAbstract",
                    "mountain": "partialAbstract"
                },
                "legendUnlocks": {
                    "desert": "partialAbstract",
                    "forest": "partialAbstract",
                    "hill": "partialAbstract",
                    "mountain": "partialAbstract"
                },
                "clueUnlock": "hill1",
                "gridSize": "2x2",
                "elephantLocation": [
                    0,
                    1,
                    "west"
                ],
                
                "hasExploration": false,
                "taskid": "3_1",
                "mapset": 3
            },
            {
                "clues": [
                    "mountain",
                    "desert"
                ],
                "symbolStyle": {
                    "desert": "partialAbstract",
                    "forest": "partialAbstract",
                    "hill": "partialAbstract",
                    "mountain": "partialAbstract"
                },
                "legendUnlocks": {
                    "desert": "partialAbstract",
                    "forest": "partialAbstract",
                    "hill": "partialAbstract",
                    "mountain": "partialAbstract"
                },
                "clueUnlock": "hill1",
                "gridSize": "2x2",
                "elephantLocation": [
                    0,
                    0,
                    "east"
                ],
                
                "hasExploration": false,
                "taskid": "3_2",
                "mapset": 3
            },{},{}
        ]
    },
    "WATER": {
        "TUTORIAL": [{}],
        "EASY": [{},{},{},{}],
        "MEDIUM": [{},{},{},{}],
        "HARD": [{},{},{},{}]
    },
    "MANMADE": {
        "TUTORIAL": [{}],
        "EASY": [{},{},{},{},{},{}],
        "MEDIUM": [{},{},{},{},{},{}],
        "HARD": [{}, {}, {}, {},{},{}]
    },
    "EXPERT": {
        "TUTORIAL": [{}],
        "EASY": [{},{},{},{},{},{}],
        "MEDIUM": [{},{},{},{},{},{}],
        "HARD": [{},{},{},{},{},{}]
    }
};

var g_mapsetdata = [
    { //mapset 1
        "elephant": { //y_x_direction: [left,top,width,height]
            "0_0_south":[544,278,277,230],
            "1_1_south":[52,212,323,273]
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
            "0_1_west":[612,260,285,224],
            "0_0_east":[612,255,235,239]
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
            "1_0_east":[246,258,216,194]
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
            "0_0_north":[474,278,364,299]
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
            "1_2_west":[338,162,480,408]
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
            "1_1_north":[662,246,258,214]
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
    { //mapset 11 (Tutorial 1)
        "elephant": { //y_x_direction: [left,top,width,height]
            "1_1_north":[662,246,258,214]
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
    }
];

var g_cacheList = [
    "assets/images/debug-sound-off.png",
    "assets/images/debug-sound.png",
    "assets/images/debug-left1.png",
    "assets/images/debug-lock-open.png",
    "assets/images/debug-lock-close.png",
    "assets/images/title.jpg",
    "assets/images/bg_exp_btm.gif",
    "assets/images/bg_exp_top.gif",
    "assets/images/bg_explore.gif",
    "assets/images/btn_360_left_2.png",
    "assets/images/btn_360_right_2.png",
    "assets/images/btn_360_left_2_on.png",
    "assets/images/btn_360_right_2_on.png",
    "assets/images/btn_360_left_2_hover.png",
    "assets/images/btn_360_right_2_hover.png",
    "assets/images/btn_clue.png",
    "assets/images/btn_clue_hover.png",
    "assets/images/btn_clue_on.png",
    "assets/images/btn_done.png",
    "assets/images/btn_done_hover.png",
    "assets/images/btn_done_on.png",
    "assets/images/btn_legend.png",
    "assets/images/btn_legend_hover.png",
    "assets/images/btn_legend_on.png",
    "assets/images/btn_legend1.png",
    "assets/images/btn_next.gif",
    "assets/images/btn_next_hover.png",
    "assets/images/btn_next_on.png",
    "assets/images/check-green-hi.png",
    "assets/images/closeicon-300.png",
    "assets/images/closeicon-300_hover.png",
    "assets/images/closeicon-300_on.png",
    "assets/images/cross-hi.png",
    "assets/images/elephant_bg1.gif",
    "assets/images/elephant_bg1.png",
    "assets/images/gps-pointer.png",
    "assets/images/gps-pointer-large.png",
    "assets/images/gps-pointer-large-left.png",
    "assets/images/gps-pointer-large-right.png",
    "assets/images/gps-pointer-large-up.png",
    "assets/images/ic_hearing_black_24dp_2x.png",
    "assets/images/ic_hearing_black_24dp_2x_hover.png",
    "assets/images/ic_hearing_black_24dp_2x_on.png",
    "assets/images/icon_p1.png",
    "assets/images/icon_p2.png",
    "assets/images/indicator-hand.png",
    "assets/images/lock.png",
    "assets/images/logo.png",
    "assets/images/lineh.png",
    "assets/images/linev.png",
    "assets/images/linehl.png",
    "assets/images/linevl.png",
    "assets/images/dice-300px.png"
];