var g_leveldata =
{
	"LAND": {
		"TUTORIAL": [
			{"clues": [
					//
				],
				"symbolStyle": {
					//
				},
				"legendUnlocks": {
					"building": "nonAbstract"
				},
				"gridSize": "2x1",
				"elephantLocation": [],
				"hasExploration": true,
				"exploreTargets": [ //y,x,facing,hitbox
					[0,0,"north"]
				],
				"taskid": "1_T1",
				"mapset": 11
			},
			{
				"clues": [
					//
				],
				"symbolStyle": {
					//
				},
				"legendUnlocks": {
					"forest": "nonAbstract",
					"lake": "nonAbstract"
				},
				"gridSize": "2x1",
				"elephantLocation": [],
				"hasExploration": true,
				"exploreTargets": [ //y,x,facing,hitbox
					[0,1,"north"],
					[0,1,"west"]
				],
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
					//"forest": "nonAbstract",
					//"lake": "nonAbstract"
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
					//
				],
				"symbolStyle": {
					//
				},
				"legendUnlocks": {
					"mountain": "nonAbstract",
					"desert": "nonAbstract"
				},
				"gridSize": "2x2",
				"elephantLocation": [],
				"hasExploration": true,
				"exploreTargets": [ //y,x,facing,hitbox
					[1,1,"north"],
					[1,1,"south"]
				],
				"taskid": "1_E",
				"mapset": 1
			},
			{
				"clues": [
					"forest",
					"building"
				],
				"symbolStyle": {
					"desert": "nonAbstract",
					"forest": "nonAbstract",
					"building": "nonAbstract",
					"mountain": "nonAbstract"
				},
				"legendUnlocks": {
					"forest": "partialAbstract"
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
					"mountain",
					"forest"
				],
				"symbolStyle": {
					"desert": "nonAbstract",
					"forest": "nonAbstract",
					"building": "nonAbstract",
					"mountain": "nonAbstract"
				},
				"legendUnlocks": {
					"mountain": "partialAbstract"
				},
				"gridSize": "2x2",
				"elephantLocation": [
					0,
					0,
					"south"
				],
				"hasExploration": false,
				"taskid": "1_2",
				"mapset": 1
			},
			{
				"clues": [
					"building",
					"desert"
				],
				"symbolStyle": {
					"desert": "nonAbstract",
					"forest": "nonAbstract",
					"building": "nonAbstract",
					"mountain": "nonAbstract"
				},
				"legendUnlocks": {
					"desert": "partialAbstract"
				},
				"gridSize": "2x2",
				"elephantLocation": [
					1,
					0,
					"south"
				],
				"hasExploration": false,
				"taskid": "1_3",
				"mapset": 1
			}
		],
		"MEDIUM": [
			{
				"clues": [
					//
				],
				"symbolStyle": {
					//
				},
				"legendUnlocks": {
					"stream": "nonAbstract",
					"ocean": "nonAbstract"
				},
				"gridSize": "2x2",
				"elephantLocation": [],
				"hasExploration": true,
				"exploreTargets": [ //y,x,facing,hitbox
					[1,1,"north"],
					[1,1,"south"]
				],
				"taskid": "2_E",
				"mapset": 2
			},
			{
				"clues": [
					"lake",
					"forest"
				],
				"symbolStyle": {
					"stream": "nonAbstract",
					"forest": "nonAbstract",
					"lake": "nonAbstract",
					"ocean": "nonAbstract",
					"mountain": "nonAbstract"
				},
				"legendUnlocks": {
					"lake": "partialAbstract"
				},
				"gridSize": "2x2",
				"elephantLocation": [
					0,
					1,
					"north"
				],
				"hasExploration": false,
				"taskid": "2_1",
				"mapset": 2
			},
			{
				"clues": [
					"ocean",
					"lake"
				],
				"symbolStyle": {
					"stream": "nonAbstract",
					"forest": "nonAbstract",
					"lake": "nonAbstract",
					"ocean": "nonAbstract",
					"mountain": "nonAbstract"
				},
				"legendUnlocks": {
					"ocean": "partialAbstract"
				},
				"gridSize": "2x2",
				"elephantLocation": [
					1,
					0,
					"south"
				],
				"hasExploration": false,
				"taskid": "2_2",
				"mapset": 2
			},
			{
				"clues": [
					"forest",
					"stream"
				],
				"symbolStyle": {
					"stream": "nonAbstract",
					"forest": "nonAbstract",
					"lake": "nonAbstract",
					"ocean": "nonAbstract",
					"mountain": "nonAbstract"
				},
				"legendUnlocks": {
					"stream": "partialAbstract"
				},
				"gridSize": "2x2",
				"elephantLocation": [
					0,
					0,
					"north"
				],
				"hasExploration": false,
				"taskid": "2_3",
				"mapset": 2
			}
		],
		"HARD": [
			{
				"clues": [
					//
				],
				"symbolStyle": {
					//
				},
				"legendUnlocks": {
					"road": "nonAbstract",
					"park": "nonAbstract"
				},
				"gridSize": "2x2",
				"elephantLocation": [],
				"hasExploration": true,
				"exploreTargets": [ //y,x,facing,hitbox
					[0,0,"north"],
					[0,0,"south"]
				],
				"taskid": "3_E",
				"mapset": 3
			},
			{
				"clues": [
					"building",
					"lake"
				],
				"symbolStyle": {
					"road": "nonAbstract",
					"park": "nonAbstract",
					"lake": "nonAbstract",
					"forest": "nonAbstract",
					"building": "nonAbstract"
				},
				"legendUnlocks": {
					"building": "partialAbstract"
				},
				"gridSize": "2x2",
				"elephantLocation": [
					0,
					1,
					"north"
				],
				"hasExploration": false,
				"taskid": "3_1",
				"mapset": 3
			},
			{
				"clues": [
					"park",
					"building"
				],
				"symbolStyle": {
					"road": "nonAbstract",
					"park": "nonAbstract",
					"lake": "nonAbstract",
					"forest": "nonAbstract",
					"building": "nonAbstract"
				},
				"legendUnlocks": {
					"park": "partialAbstract"
				},
				"gridSize": "2x2",
				"elephantLocation": [
					1,
					1,
					"east"
				],
				"hasExploration": false,
				"taskid": "3_2",
				"mapset": 3
			},
			{
				"clues": [
					"lake",
					"road"
				],
				"symbolStyle": {
					"road": "nonAbstract",
					"park": "nonAbstract",
					"lake": "nonAbstract",
					"forest": "nonAbstract",
					"building": "nonAbstract"
				},
				"legendUnlocks": {
					"road": "partialAbstract"
				},
				"gridSize": "2x2",
				"elephantLocation": [
					1,
					0,
					"south"
				],
				"hasExploration": false,
				"taskid": "3_3",
				"mapset": 3
			}
		]
	},
	"WATER": {
		"TUTORIAL": [],
		"EASY": [
			{
				"clues": [
					"forest",
					"lake"
				],
				"symbolStyle": {
					"desert": "partialAbstract",
					"forest": "partialAbstract",
					"building": "partialAbstract",
					"mountain": "partialAbstract",
					"lake": "partialAbstract"
				},
				"legendUnlocks": {
					"forest": "fullAbstract"
				},
				"gridSize": "3x2",
				"elephantLocation": [
					0,
					1,
					"south"
				],
				"hasExploration": false,
				"taskid": "4_1",
				"clueMod": ["big","none"],
				"mapset": 4
			},
			{
				"clues": [
					"building",
					"mountain"
				],
				"symbolStyle": {
					"desert": "partialAbstract",
					"forest": "partialAbstract",
					"building": "partialAbstract",
					"mountain": "partialAbstract",
					"lake": "partialAbstract"
				},
				"legendUnlocks": {
					"mountain": "fullAbstract"
				},
				"gridSize": "3x2",
				"elephantLocation": [
					1,
					1,
					"south"
				],
				"hasExploration": false,
				"taskid": "4_2",
				"clueMod": ["none","small"],
				"mapset": 4
			},
			{
				"clues": [
					"forest",
					"desert"
				],
				"symbolStyle": {
					"desert": "partialAbstract",
					"forest": "partialAbstract",
					"building": "partialAbstract",
					"mountain": "partialAbstract",
					"lake": "partialAbstract"
				},
				"legendUnlocks": {
					"desert": "fullAbstract"
				},
				"gridSize": "3x2",
				"elephantLocation": [
					1,
					0,
					"south"
				],
				"hasExploration": false,
				"taskid": "4_3",
				"clueMod": ["small","none"],
				"mapset": 4
			},
			{
				"clues": [
					"lake",
					"mountain"
				],
				"symbolStyle": {
					"desert": "partialAbstract",
					"forest": "partialAbstract",
					"building": "partialAbstract",
					"mountain": "partialAbstract",
					"lake": "partialAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x2",
				"elephantLocation": [
					0,
					2,
					"south"
				],
				"hasExploration": false,
				"taskid": "4_4",
				"clueMod": ["none","big"],
				"mapset": 4
			}
		],
		"MEDIUM": [
			{
				"clues": [
					"stream",
					"building"
				],
				"symbolStyle": {
					"lake": "partialAbstract",
					"stream": "partialAbstract",
					"building": "partialAbstract",
					"road": "partialAbstract",
					"ocean": "partialAbstract"
				},
				"legendUnlocks": {
					"stream": "fullAbstract"
				},
				"gridSize": "3x2",
				"elephantLocation": [
					0,
					1,
					"south"
				],
				"hasExploration": false,
				"taskid": "5_1",
				"clueMod": ["big","none"],
				"mapset": 5
			},
			{
				"clues": [
					"road",
					"lake"
				],
				"symbolStyle": {
					"lake": "partialAbstract",
					"stream": "partialAbstract",
					"building": "partialAbstract",
					"road": "partialAbstract",
					"ocean": "partialAbstract"
				},
				"legendUnlocks": {
					"lake": "fullAbstract"
				},
				"gridSize": "3x2",
				"elephantLocation": [
					0,
					2,
					"south"
				],
				"hasExploration": false,
				"taskid": "5_2",
				"clueMod": ["none","small"],
				"mapset": 5
			},
			{
				"clues": [
					"stream",
					"ocean"
				],
				"symbolStyle": {
					"lake": "partialAbstract",
					"stream": "partialAbstract",
					"building": "partialAbstract",
					"road": "partialAbstract",
					"ocean": "partialAbstract"
				},
				"legendUnlocks": {
					"ocean": "fullAbstract"
				},
				"gridSize": "3x2",
				"elephantLocation": [
					1,
					2,
					"south"
				],
				"hasExploration": false,
				"taskid": "5_3",
				"clueMod": ["small","none"],
				"mapset": 5
			},
			{
				"clues": [
					"building",
					"lake"
				],
				"symbolStyle": {
					"lake": "partialAbstract",
					"stream": "partialAbstract",
					"building": "partialAbstract",
					"road": "partialAbstract",
					"ocean": "partialAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x2",
				"elephantLocation": [
					0,
					0,
					"south"
				],
				"hasExploration": false,
				"taskid": "5_4",
				"clueMod": ["none","big"],
				"mapset": 5
			}
		],
		"HARD": [
			{
				"clues": [
					"building",
					"forest"
				],
				"symbolStyle": {
					"building": "partialAbstract",
					"park": "partialAbstract",
					"road": "partialAbstract",
					"forest": "partialAbstract",
					"lake": "partialAbstract"
				},
				"legendUnlocks": {
					"building": "fullAbstract"
				},
				"gridSize": "3x2",
				"elephantLocation": [
					1,
					0,
					"south"
				],
				"hasExploration": false,
				"taskid": "6_1",
				"clueMod": ["big","none"],
				"mapset": 6
			},
			{
				"clues": [
					"forest",
					"road"
				],
				"symbolStyle": {
					"building": "partialAbstract",
					"park": "partialAbstract",
					"road": "partialAbstract",
					"forest": "partialAbstract",
					"lake": "partialAbstract"
				},
				"legendUnlocks": {
					"road": "fullAbstract"
				},
				"gridSize": "3x2",
				"elephantLocation": [
					1,
					1,
					"south"
				],
				"hasExploration": false,
				"taskid": "6_2",
				"clueMod": ["none","small"],
				"mapset": 6
			},
			{
				"clues": [
					"building",
					"park"
				],
				"symbolStyle": {
					"building": "partialAbstract",
					"park": "partialAbstract",
					"road": "partialAbstract",
					"forest": "partialAbstract",
					"lake": "partialAbstract"
				},
				"legendUnlocks": {
					"park": "fullAbstract"
				},
				"gridSize": "3x2",
				"elephantLocation": [
					0,
					1,
					"south"
				],
				"hasExploration": false,
				"clueMod": ["small","none"],
				"taskid": "6_3",
				"mapset": 6
			},
			{
				"clues": [
					"park",
					"road"
				],
				"symbolStyle": {
					"building": "partialAbstract",
					"park": "partialAbstract",
					"road": "partialAbstract",
					"forest": "partialAbstract",
					"lake": "partialAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x2",
				"elephantLocation": [
					1,
					2,
					"south"
				],
				"hasExploration": false,
				"clueMod": ["none","big"],
				"taskid": "6_4",
				"mapset": 6
			}
		]
	},
	"MANMADE": {
		"TUTORIAL": [],
		"EASY": [{},{},{},{}],
		"MEDIUM": [{},{},{},{}],
		"HARD": [{},{},{},{}]
	},
	"EXPERT": {
		"TUTORIAL": [],
		"EASY": [{},{},{},{},{},{},{},{}],
		"MEDIUM": [],
		"HARD": []
	}
};

var g_mapsetdata = [
	{ //mapset 1
		"elephant": { //y_x_direction: [left,top,width,height]
			"0_1_south":[0,0,950,620],
			"0_1_north":[0,0,950,620],
			"0_1_east":[0,0,950,620],
			"0_1_west":[0,0,950,620],
			"1_0_south":[0,0,950,620],
			"1_0_north":[0,0,950,620],
			"1_0_east":[0,0,950,620],
			"1_0_west":[0,0,950,620],
			"0_0_south":[0,0,950,620],
			"0_0_north":[0,0,950,620],
			"0_0_east":[0,0,950,620],
			"0_0_west":[0,0,950,620]
		}, 
		"clues": [ //[left,top,width,height,clue]
			[12,87,183,141,"forest"],
			[385,19,183,141,"forest"],
			[634,22,155,118,"building"],
			[26,263,229,91,"mountain"],
			[488,321,282,106, "mountain"],
			[293,381,155,118,"building"],
			[15,507,299,96,"desert"],
			[643,521,282,83,"desert"]
		]
	},
	{ //mapset 2
		"elephant": { //y_x_direction: [left,top,width,height]
			"0_1_south":[0,0,950,620],
			"0_1_north":[0,0,950,620],
			"0_1_east":[0,0,950,620],
			"0_1_west":[0,0,950,620],
			"1_0_south":[0,0,950,620],
			"1_0_north":[0,0,950,620],
			"1_0_east":[0,0,950,620],
			"1_0_west":[0,0,950,620],
			"0_0_south":[0,0,950,620],
			"0_0_north":[0,0,950,620],
			"0_0_east":[0,0,950,620],
			"0_0_west":[0,0,950,620]
		}, 
		"clues": [ //[left,top,width,height,clue]
			[0,0,260,140,"stream"],
			[280,18,183,141,"forest"],
			[485,18,168,141,"forest"],
			[674,40,276,109,"lake"],
			[48,328,321,111,"lake"],
			[352,484,229,91, "mountain"],
			[388,358,466,108,"stream"],
			[0,476,297,143,"ocean"],
			[652,483,298,135,"ocean"]
		]
	},
	{ //mapset 3
		"elephant": { //y_x_direction: [left,top,width,height]
			"0_1_south":[0,0,950,620],
			"0_1_north":[0,0,950,620],
			"0_1_east":[0,0,950,620],
			"0_1_west":[0,0,950,620],
			"1_0_south":[0,0,950,620],
			"1_0_north":[0,0,950,620],
			"1_0_east":[0,0,950,620],
			"1_0_west":[0,0,950,620],
			"1_1_south":[0,0,950,620],
			"1_1_north":[0,0,950,620],
			"1_1_east":[0,0,950,620],
			"1_1_west":[0,0,950,620]
		}, 
		"clues": [ //[left,top,width,height,clue]
			[0,0,269,203,"road"],
			[483,14,319,104,"lake"],
			[801,111,147,97,"building"],
			[268,197,192,91,"park"],
			[526,161,168,141,"forest"],
			[20,330,320,109,"lake"],
			[370,416,210,97,"park"],
			[685,395,169,130, "building"],
			[0,526,950,66,"road"]
		]
	},
	{ //mapset 4
		"elephant": { //y_x_direction: [left,top,width,height]
			"0_1_south":[0,0,950,620],
			"0_1_north":[0,0,950,620],
			"0_1_east":[0,0,950,620],
			"0_1_west":[0,0,950,620],
			"1_0_south":[0,0,950,620],
			"1_0_north":[0,0,950,620],
			"1_0_east":[0,0,950,620],
			"1_0_west":[0,0,950,620],
			"1_1_south":[0,0,950,620],
			"1_1_north":[0,0,950,620],
			"1_1_east":[0,0,950,620],
			"1_1_west":[0,0,950,620],
			"0_2_south":[0,0,950,620],
			"0_2_north":[0,0,950,620],
			"0_2_east":[0,0,950,620],
			"0_2_west":[0,0,950,620]
		}, 
		"clues": [ //[left,top,width,height,clue]
			[27,255,252,112,"desert"],
			[21,474,154,111,"forest"],
			[243,503,234,103,"lake"],
			[578,463,112,93,"building"],
			[714,513,108,94,"building"],
			[383,245,176,106,"mountain"],
			[670,204,249,182,"mountain"],
			[187,18,245,159,"forest"],
			[523,26,227,100,"lake"]
		]
	},
	{ //mapset 5
		"elephant": { //y_x_direction: [left,top,width,height]
			"0_1_south":[0,0,950,620],
			"0_1_north":[0,0,950,620],
			"0_1_east":[0,0,950,620],
			"0_1_west":[0,0,950,620],
			"1_2_south":[0,0,950,620],
			"1_2_north":[0,0,950,620],
			"1_2_east":[0,0,950,620],
			"1_2_west":[0,0,950,620],
			"0_0_south":[0,0,950,620],
			"0_0_north":[0,0,950,620],
			"0_0_east":[0,0,950,620],
			"0_0_west":[0,0,950,620],
			"0_2_south":[0,0,950,620],
			"0_2_north":[0,0,950,620],
			"0_2_east":[0,0,950,620],
			"0_2_west":[0,0,950,620]
		}, 
		"clues": [ //[left,top,width,height,clue]
			[92,210,114,108,"building"],
			[6,459,946,162,"ocean"],
			[40,6,442,169,"lake"],
			[570,98,117,84,"building"],
			[516,1,436,91,"road"],
			[721,205,228,92,"lake"],
			[302,179,242,277,"stream"],
			[755,296,150,158,"stream"]
		]
	},
	{ //mapset 6
		"elephant": { //y_x_direction: [left,top,width,height]
			"0_1_south":[0,0,950,620],
			"0_1_north":[0,0,950,620],
			"0_1_east":[0,0,950,620],
			"0_1_west":[0,0,950,620],
			"1_0_south":[0,0,950,620],
			"1_0_north":[0,0,950,620],
			"1_0_east":[0,0,950,620],
			"1_0_west":[0,0,950,620],
			"1_1_south":[0,0,950,620],
			"1_1_north":[0,0,950,620],
			"1_1_east":[0,0,950,620],
			"1_1_west":[0,0,950,620],
			"1_2_south":[0,0,950,620],
			"1_2_north":[0,0,950,620],
			"1_2_east":[0,0,950,620],
			"1_2_west":[0,0,950,620]
		}, 
		"clues": [ //[left,top,width,height,clue]
			[251,80,136,104,"park"],
			[52,211,185,150,"building"],
			[2,368,400,74,"road"],
			[220,496,157,99,"forest"],
			[396,360,60,261,"road"],
			[527,491,230,112,"lake"],
			[570,334,128,81,"park"],
			[556,192,152,99,"forest"],
			[573,17,114,90,"building"],
			[850,11,108,619,"road"]
		]
	},
	{ //mapset 7
		"elephant": { //y_x_direction: [left,top,width,height]
			//
		}, 
		"clues": [ //[left,top,width,height,clue]
			//
		]
	},
	{ //mapset 8
		"elephant": { //y_x_direction: [left,top,width,height]
			//
		}, 
		"clues": [ //[left,top,width,height,clue]
			//
		]
	},
	{ //mapset 9
		"elephant": { //y_x_direction: [left,top,width,height]
			//
		}, 
		"clues": [ //[left,top,width,height,clue]
			//
		]
	},
	{ //mapset 10
		"elephant": { //y_x_direction: [left,top,width,height]
			//
		}, 
		"clues": [ //[left,top,width,height,clue]
			//
		]
	},
	{ //mapset 11 (Tutorial 1)
		"elephant": { //y_x_direction: [left,top,width,height]
			"0_1_south":[0,0,950,620],
			"0_1_north":[0,0,950,620],
			"0_1_east":[0,0,950,620],
			"0_1_west":[0,0,950,620]
		}, 
		"clues": [ //[left,top,width,height,clue]
			[635,44,192,145,"forest"],
			[136,61,204,136,"building"],
			[304,381,332,123,"lake"]
		]
	}
];

var g_helpLookup = {
	"1_T1": [90, "Tutorial - Land (hint)"],
	"1_T2": [90, "Tutorial - Land (hint)"],
	"1_T3": [90, "Tutorial - Land (hint)"],
	"1_E": [90, "Exploration - Land (hint)"],
	"1_1": [90, "Land (hint) 1"],
	"1_2": [90, "Land (hint) 2"],
	"1_3": [90, "Land (hint) 3"],
	"2_E": [90, "Exploration - Water (hint)"],
	"2_1": [90, "Water (hint) 1"],
	"2_2": [90, "Water (hint) 2"],
	"2_3": [90, "Water (hint) 3"],
	"3_E": [90, "Exploration - Human-made (hint)"],
	"3_1": [90, "Human-made (hint) 1"],
	"3_2": [90, "Human-made (hint) 2"],
	"3_3": [90, "Human-made (hint) 3"],
	"4_1": [90, "Land (hint) 1"],
	"4_2": [90, "Land (hint) 2"],
	"4_3": [90, "Land (hint) 3"],
	"4_4": [90, "Land (hint) 4"],
	"5_1": [90, "Water (hint) 1"],
	"5_2": [90, "Water (hint) 2"],
	"5_3": [90, "Water (hint) 3"],
	"5_4": [90, "Water (hint) 4"],
	"6_1": [90, "Human-made (hint) 1"],
	"6_2": [90, "Human-made (hint) 2"],
	"6_3": [90, "Human-made (hint) 3"],
	"6_4": [90, "Human-made (hint) 4"],
	"7_1": [90, "Land (hint) 1"],
	"7_2": [90, "Land (hint) 2"],
	"7_3": [90, "Land (hint) 3"],
	"7_4": [90, "Land (hint) 4"],
	"7_5": [90, "Land (hint) 5"],
	"7_6": [90, "Land (hint) 6"],
	"8_1": [90, "Water (hint) 1"],
	"8_2": [90, "Water (hint) 2"],
	"8_3": [90, "Water (hint) 3"],
	"8_4": [90, "Water (hint) 4"],
	"8_5": [90, "Water (hint) 5"],
	"8_6": [90, "Water (hint) 6"],
	"9_1": [90, "Human-made (hint) 1"],
	"9_2": [90, "Human-made (hint) 2"],
	"9_3": [90, "Human-made (hint) 3"],
	"9_4": [90, "Human-made (hint) 4"],
	"9_5": [90, "Human-made (hint) 5"],
	"9_6": [90, "Human-made (hint) 6"],
	"10_1": [90, "Secret Level 1"],
	"10_2": [90, "Secret Level 2"],
	"10_3": [90, "Secret Level 3"],
	"10_4": [90, "Secret Level 4"],
	"10_5": [90, "Secret Level 5"],
	"10_6": [90, "Secret Level 6"],
	"10_7": [90, "Secret Level 7"],
	"10_8": [90, "Secret Level 8"]
};

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