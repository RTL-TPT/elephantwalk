var g_leveldata =
{
    "LAND": {
        "TUTORIAL": [
            {"clues": [
                    
                ],
                "symbolStyle": {
                    
                },
                "legendUnlocks": {
                    "building": "nonAbstract"
                },
                "gridSize": "2x1",
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
                    
                ],
                "symbolStyle": {
                    
                },
                "legendUnlocks": {
                    "forest": "nonAbstract",
                    "lake": "nonAbstract"
                },
                "gridSize": "2x1",
                "elephantLocation": [
                    1,
                    1,
                    "south"
                ],
                
                "hasExploration": true,
                "taskid": "1_T2",
                "mapset": 11
            },
            {
                "clues": [
                    "lake",
                    "forest"
                ],
                "symbolStyle": {
                    "lake": "nonAbstract",
                    "forest": "nonAbstract",
                    "building": "nonAbstract"
                },
                "legendUnlocks": {
                    "forest": "nonAbstract",
                    "lake": "nonAbstract"
                },
                "gridSize": "2x1",
                "elephantLocation": [
                    0,
                    1,
                    "south"
                ],
                
                "hasExploration": false,
                "taskid": "1_T3",
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
            
        }, 
        "clues": [ //[left,top,width,height,clue]
            [12,87,183,141,"forest"],
            [385,19,183,141,"forest"],
            [634,22,116,118,"building"],
            [26,263,229,91,"mountain"],
            [687,256,229,91, "mountain"],
            [293,381,116,118,"building"],
            [13,551,282,83,"desert"],
            [643,521,282,83,"desert"]
        ]
    },
    { //mapset 2
        "elephant": { //y_x_direction: [left,top,width,height]
            
        }, 
        "clues": [ //[left,top,width,height,clue]
            [0,0,260,140,"river"],
            [280,18,183,141,"forest"],
            [485,18,168,141,"forest"],
            [674,40,276,109,"lake"],
            [26,263,229,91,"lake"],
            [352,484,229,91, "mountain"],
            [388,358,466,108,"river"],
            [0,476,297,143,"ocean"],
            [652,483,298,135,"ocean"]
        ]
    },
    { //mapset 3
        "elephant": { //y_x_direction: [left,top,width,height]
            
        }, 
        "clues": [ //[left,top,width,height,clue]
            [0,0,269,203,"road"],
            [0,0,317,100,"lake"],
            [801,111,147,97,"building"],
            [268,197,192,91,"park"],
            [526,161,168,141,"forest"],
            [20,330,320,109,"lake"],
            [370,416,210,97,"park"],
            [352,484,686,407, "building"],
            [0,526,950,66,"road"]
        ]
    },
    { //mapset 4
        "elephant": { //y_x_direction: [left,top,width,height]
            
        }, 
        "clues": [ //[left,top,width,height,clue]
            
        ]
    },
    { //mapset 5
        "elephant": { //y_x_direction: [left,top,width,height]
            
        }, 
        "clues": [ //[left,top,width,height,clue]
            
        ]
    },
    { //mapset 6
        "elephant": { //y_x_direction: [left,top,width,height]
            
        }, 
        "clues": [ //[left,top,width,height,clue]
            
        ]
    },
    { //mapset 7
        "elephant": { //y_x_direction: [left,top,width,height]
            
        }, 
        "clues": [ //[left,top,width,height,clue]
            
        ]
    },
    { //mapset 8
        "elephant": { //y_x_direction: [left,top,width,height]
            
        }, 
        "clues": [ //[left,top,width,height,clue]
            
        ]
    },
    { //mapset 9
        "elephant": { //y_x_direction: [left,top,width,height]
            
        }, 
        "clues": [ //[left,top,width,height,clue]
            
        ]
    },
    { //mapset 10
        "elephant": { //y_x_direction: [left,top,width,height]
            
        }, 
        "clues": [ //[left,top,width,height,clue]
            
        ]
    },
    { //mapset 11 (Tutorial 1)
        "elephant": { //y_x_direction: [left,top,width,height]
            
        }, 
        "clues": [ //[left,top,width,height,clue]
            [635,44,192,145,"forest"],
            [136,61,204,136,"building"],
            [304,381,332,123,"lake"]
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