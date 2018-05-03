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
				"exploreFeature": ["building"],
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
				"exploreFeature": ["forest","lake"],
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
				"exploreFeature": ["mountain","desert"],
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
				"exploreFeature": ["stream","ocean"],
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
				"exploreFeature": ["road","park"],
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
					1,
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
					"lake",
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
		"EASY": [
			{
				"clues": [
					"lake",
					"mountain"
				],
				"symbolStyle": {
					"forest": "fullAbstract",
					"mountain": "fullAbstract",
					"road": "fullAbstract",
					"desert": "fullAbstract",
					"lake": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					0,
					2,
					"south"
				],
				"hasExploration": false,
				"taskid": "7_1",
				"clueMod": ["none","near"],
				"mapset": 7
			},
			{
				"clues": [
					"mountain",
					"desert"
				],
				"symbolStyle": {
					"forest": "fullAbstract",
					"mountain": "fullAbstract",
					"road": "fullAbstract",
					"desert": "fullAbstract",
					"lake": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					0,
					1,
					"south"
				],
				"hasExploration": false,
				"taskid": "7_2",
				"clueMod": ["none","far"],
				"mapset": 7
			},
			{
				"clues": [
					"forest",
					"road"
				],
				"symbolStyle": {
					"forest": "fullAbstract",
					"mountain": "fullAbstract",
					"road": "fullAbstract",
					"desert": "fullAbstract",
					"lake": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					0,
					0,
					"south"
				],
				"hasExploration": false,
				"taskid": "7_3",
				"clueMod": ["none","near"],
				"mapset": 7
			},
			{
				"clues": [
					"lake",
					"mountain"
				],
				"symbolStyle": {
					"forest": "fullAbstract",
					"mountain": "fullAbstract",
					"road": "fullAbstract",
					"desert": "fullAbstract",
					"lake": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					1,
					2,
					"south"
				],
				"hasExploration": false,
				"taskid": "7_4",
				"clueMod": ["none","far"],
				"mapset": 7
			},
			{
				"clues": [
					"forest",
					"road"
				],
				"symbolStyle": {
					"forest": "fullAbstract",
					"mountain": "fullAbstract",
					"road": "fullAbstract",
					"desert": "fullAbstract",
					"lake": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					2,
					2,
					"south"
				],
				"hasExploration": false,
				"taskid": "7_5",
				"clueMod": ["none","far"],
				"mapset": 7
			},
			{
				"clues": [
					"desert",
					"forest"
				],
				"symbolStyle": {
					"forest": "fullAbstract",
					"mountain": "fullAbstract",
					"road": "fullAbstract",
					"desert": "fullAbstract",
					"lake": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					2,
					1,
					"south"
				],
				"hasExploration": false,
				"taskid": "7_6",
				"clueMod": ["none","near"],
				"mapset": 7
			}
		],
		"MEDIUM": [
			{
				"clues": [
					"building",
					"lake"
				],
				"symbolStyle": {
					"ocean": "fullAbstract",
					"building": "fullAbstract",
					"lake": "fullAbstract",
					"stream": "fullAbstract",
					"forest": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					1,
					0,
					"south"
				],
				"hasExploration": false,
				"taskid": "8_1",
				"clueMod": ["none","near"],
				"mapset": 8
			},
			{
				"clues": [
					"lake",
					"stream"
				],
				"symbolStyle": {
					"ocean": "fullAbstract",
					"building": "fullAbstract",
					"lake": "fullAbstract",
					"stream": "fullAbstract",
					"forest": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					2,
					0,
					"south"
				],
				"hasExploration": false,
				"taskid": "8_2",
				"clueMod": ["none","far"],
				"mapset": 8
			},
			{
				"clues": [
					"forest",
					"ocean"
				],
				"symbolStyle": {
					"ocean": "fullAbstract",
					"building": "fullAbstract",
					"lake": "fullAbstract",
					"stream": "fullAbstract",
					"forest": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					2,
					2,
					"south"
				],
				"hasExploration": false,
				"taskid": "8_3",
				"clueMod": ["none","far"],
				"mapset": 8
			},
			{
				"clues": [
					"building",
					"lake"
				],
				"symbolStyle": {
					"ocean": "fullAbstract",
					"building": "fullAbstract",
					"lake": "fullAbstract",
					"stream": "fullAbstract",
					"forest": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					1,
					2,
					"south"
				],
				"hasExploration": false,
				"taskid": "8_4",
				"clueMod": ["none","far"],
				"mapset": 8
			},
			{
				"clues": [
					"ocean",
					"forest"
				],
				"symbolStyle": {
					"ocean": "fullAbstract",
					"building": "fullAbstract",
					"lake": "fullAbstract",
					"stream": "fullAbstract",
					"forest": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					0,
					1,
					"south"
				],
				"hasExploration": false,
				"taskid": "8_5",
				"clueMod": ["none","near"],
				"mapset": 8
			},
			{
				"clues": [
					"forest",
					"ocean"
				],
				"symbolStyle": {
					"ocean": "fullAbstract",
					"building": "fullAbstract",
					"lake": "fullAbstract",
					"stream": "fullAbstract",
					"forest": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					0,
					2,
					"south"
				],
				"hasExploration": false,
				"taskid": "8_6",
				"clueMod": ["none","near"],
				"mapset": 8
			}
		],
		"HARD": [
			{
				"clues": [
					"park",
					"road"
				],
				"symbolStyle": {
					"stream": "fullAbstract",
					"park": "fullAbstract",
					"lake": "fullAbstract",
					"forest": "fullAbstract",
					"road": "fullAbstract",
					"building": "fullAbstract",
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					0,
					2,
					"south"
				],
				"hasExploration": false,
				"taskid": "9_1",
				"clueMod": ["none","near"],
				"mapset": 9
			},
			{
				"clues": [
					"forest",
					"building"
				],
				"symbolStyle": {
					"stream": "fullAbstract",
					"park": "fullAbstract",
					"lake": "fullAbstract",
					"forest": "fullAbstract",
					"road": "fullAbstract",
					"building": "fullAbstract",
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					2,
					1,
					"south"
				],
				"hasExploration": false,
				"taskid": "9_2",
				"clueMod": ["none","far"],
				"mapset": 9
			},
			{
				"clues": [
					"stream",
					"park"
				],
				"symbolStyle": {
					"stream": "fullAbstract",
					"park": "fullAbstract",
					"lake": "fullAbstract",
					"forest": "fullAbstract",
					"road": "fullAbstract",
					"building": "fullAbstract",
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					1,
					0,
					"south"
				],
				"hasExploration": false,
				"taskid": "9_3",
				"clueMod": ["none","near"],
				"mapset": 9
			},
			{
				"clues": [
					"forest",
					"lake"
				],
				"symbolStyle": {
					"stream": "fullAbstract",
					"park": "fullAbstract",
					"lake": "fullAbstract",
					"forest": "fullAbstract",
					"road": "fullAbstract",
					"building": "fullAbstract",
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					0,
					1,
					"south"
				],
				"hasExploration": false,
				"taskid": "9_4",
				"clueMod": ["none","far"],
				"mapset": 9
			},
			{
				"clues": [
					"stream",
					"park"
				],
				"symbolStyle": {
					"stream": "fullAbstract",
					"park": "fullAbstract",
					"lake": "fullAbstract",
					"forest": "fullAbstract",
					"road": "fullAbstract",
					"building": "fullAbstract",
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					0,
					0,
					"south"
				],
				"hasExploration": false,
				"taskid": "9_5",
				"clueMod": ["none","far"],
				"mapset": 9
			},
			{
				"clues": [
					"road",
					"building"
				],
				"symbolStyle": {
					"stream": "fullAbstract",
					"park": "fullAbstract",
					"lake": "fullAbstract",
					"forest": "fullAbstract",
					"road": "fullAbstract",
					"building": "fullAbstract",
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "3x3",
				"elephantLocation": [
					1,
					2,
					"south"
				],
				"hasExploration": false,
				"taskid": "9_6",
				"clueMod": ["none","near"],
				"mapset": 9
			}
		]
	},
	"EXPERT": {
		"TUTORIAL": [],
		"MEDIUM": [
			{
				"clues": [
					"lake",
					"forest"
				],
				"symbolStyle": {
					"building": "fullAbstract",
					"park": "fullAbstract",
					"lake": "fullAbstract",
					"road": "fullAbstract",
					"forest": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "4x3",
				"elephantLocation": [
					2,
					2,
					"south"
				],
				"hasExploration": false,
				"taskid": "10_1",
				"clueMod": ["big","big"],
				"mapset": 10
			},
			{
				"clues": [
					"building",
					"lake"
				],
				"symbolStyle": {
					"building": "fullAbstract",
					"park": "fullAbstract",
					"lake": "fullAbstract",
					"road": "fullAbstract",
					"forest": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "4x3",
				"elephantLocation": [
					1,
					3,
					"south"
				],
				"hasExploration": false,
				"taskid": "10_2",
				"clueMod": ["small","far"],
				"mapset": 10
			},
			{
				"clues": [
					"lake",
					"park"
				],
				"symbolStyle": {
					"building": "fullAbstract",
					"park": "fullAbstract",
					"lake": "fullAbstract",
					"road": "fullAbstract",
					"forest": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "4x3",
				"elephantLocation": [
					1,
					0,
					"south"
				],
				"hasExploration": false,
				"taskid": "10_3",
				"clueMod": ["small","near"],
				"mapset": 10
			},
			{
				"clues": [
					"park",
					"building"
				],
				"symbolStyle": {
					"building": "fullAbstract",
					"park": "fullAbstract",
					"lake": "fullAbstract",
					"road": "fullAbstract",
					"forest": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "4x3",
				"elephantLocation": [
					0,
					1,
					"south"
				],
				"hasExploration": false,
				"taskid": "10_4",
				"clueMod": ["small","small"],
				"mapset": 10
			},
			{
				"clues": [
					"building",
					"forest"
				],
				"symbolStyle": {
					"building": "fullAbstract",
					"park": "fullAbstract",
					"lake": "fullAbstract",
					"road": "fullAbstract",
					"forest": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "4x3",
				"elephantLocation": [
					0,
					3,
					"south"
				],
				"hasExploration": false,
				"taskid": "10_5",
				"clueMod": ["big","small"],
				"mapset": 10
			},
			{
				"clues": [
					"forest",
					"lake"
				],
				"symbolStyle": {
					"building": "fullAbstract",
					"park": "fullAbstract",
					"lake": "fullAbstract",
					"road": "fullAbstract",
					"forest": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "4x3",
				"elephantLocation": [
					2,
					0,
					"south"
				],
				"hasExploration": false,
				"taskid": "10_6",
				"clueMod": ["small","near"],
				"mapset": 10
			},
			{
				"clues": [
					"lake",
					"park"
				],
				"symbolStyle": {
					"building": "fullAbstract",
					"park": "fullAbstract",
					"lake": "fullAbstract",
					"road": "fullAbstract",
					"forest": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "4x3",
				"elephantLocation": [
					2,
					3,
					"south"
				],
				"hasExploration": false,
				"taskid": "10_7",
				"clueMod": ["small","far"],
				"mapset": 10
			},
			{
				"clues": [
					"building",
					"lake"
				],
				"symbolStyle": {
					"building": "fullAbstract",
					"park": "fullAbstract",
					"lake": "fullAbstract",
					"road": "fullAbstract",
					"forest": "fullAbstract"
				},
				"legendUnlocks": {
					//
				},
				"gridSize": "4x3",
				"elephantLocation": [
					2,
					1,
					"south"
				],
				"hasExploration": false,
				"taskid": "10_8",
				"clueMod": ["small","big"],
				"mapset": 10
			}
		],
		"EASY": [],
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
			[0,0,200,150,"road"],
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
			[568,303,126,105,"building"],
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
			"0_1_south":[0,0,950,620],
			"0_1_north":[0,0,950,620],
			"0_1_east":[0,0,950,620],
			"0_1_west":[0,0,950,620],
			"0_0_south":[0,0,950,620],
			"0_0_north":[0,0,950,620],
			"0_0_east":[0,0,950,620],
			"0_0_west":[0,0,950,620],
			"0_2_south":[0,0,950,620],
			"0_2_north":[0,0,950,620],
			"0_2_east":[0,0,950,620],
			"0_2_west":[0,0,950,620],
			"1_2_south":[0,0,950,620],
			"1_2_north":[0,0,950,620],
			"1_2_east":[0,0,950,620],
			"1_2_west":[0,0,950,620],
			"2_2_south":[0,0,950,620],
			"2_2_north":[0,0,950,620],
			"2_2_east":[0,0,950,620],
			"2_2_west":[0,0,950,620],
			"2_1_south":[0,0,950,620],
			"2_1_north":[0,0,950,620],
			"2_1_east":[0,0,950,620],
			"2_1_west":[0,0,950,620]
		}, 
		"clues": [ //[left,top,width,height,clue]
			[18,93,149,109,"forest"],
			[72,311,154,102,"mountain"],
			[8,484,457,142,"desert"],
			[636,512,171,104,"forest"],
			[785,316,151,85,"lake"],
			[468,13,151,100,"mountain"],
			[649,14,165,84,"lake"],
			[0,209,950,63,"road"]
		]
	},
	{ //mapset 8
		"elephant": { //y_x_direction: [left,top,width,height]
			"0_1_south":[0,0,950,620],
			"0_1_north":[0,0,950,620],
			"0_1_east":[0,0,950,620],
			"0_1_west":[0,0,950,620],
			"1_0_south":[0,0,950,620],
			"1_0_north":[0,0,950,620],
			"1_0_east":[0,0,950,620],
			"1_0_west":[0,0,950,620],
			"0_2_south":[0,0,950,620],
			"0_2_north":[0,0,950,620],
			"0_2_east":[0,0,950,620],
			"0_2_west":[0,0,950,620],
			"1_2_south":[0,0,950,620],
			"1_2_north":[0,0,950,620],
			"1_2_east":[0,0,950,620],
			"1_2_west":[0,0,950,620],
			"2_2_south":[0,0,950,620],
			"2_2_north":[0,0,950,620],
			"2_2_east":[0,0,950,620],
			"2_2_west":[0,0,950,620],
			"2_0_south":[0,0,950,620],
			"2_0_north":[0,0,950,620],
			"2_0_east":[0,0,950,620],
			"2_0_west":[0,0,950,620]
		}, 
		"clues": [ //[left,top,width,height,clue]
			[0,0,57,328,"ocean"],
			[0,0,418,131,"ocean"],
			[0,0,616,41,"ocean"],
			[77,111,188,75,"ocean"],
			[0,0,78,280,"ocean"],
			[84,311,97,77,"building"],
			[23,429,149,85,"lake"],
			[373,517,149,85,"lake"],
			[783,514,149,90,"forest"],
			[844,219,93,68,"building"],
			[652,98,153,96,"forest"],
			[460,430,269,87,"stream"],
			[700,322,89,101,"stream"],
			[790,302,163,40,"stream"]
		]
	},
	{ //mapset 9
		"elephant": { //y_x_direction: [left,top,width,height]
			"1_0_south":[0,0,950,620],
			"1_0_north":[0,0,950,620],
			"1_0_east":[0,0,950,620],
			"1_0_west":[0,0,950,620],
			"0_0_south":[0,0,950,620],
			"0_0_north":[0,0,950,620],
			"0_0_east":[0,0,950,620],
			"0_0_west":[0,0,950,620],
			"0_2_south":[0,0,950,620],
			"0_2_north":[0,0,950,620],
			"0_2_east":[0,0,950,620],
			"0_2_west":[0,0,950,620],
			"1_2_south":[0,0,950,620],
			"1_2_north":[0,0,950,620],
			"1_2_east":[0,0,950,620],
			"1_2_west":[0,0,950,620],
			"0_1_south":[0,0,950,620],
			"0_1_north":[0,0,950,620],
			"0_1_east":[0,0,950,620],
			"0_1_west":[0,0,950,620],
			"2_1_south":[0,0,950,620],
			"2_1_north":[0,0,950,620],
			"2_1_east":[0,0,950,620],
			"2_1_west":[0,0,950,620]
		}, 
		"clues": [ //[left,top,width,height,clue]
			[47,439,67,62,"park"],
			[5,4,289,386,"stream"],
			[329,532,158,92,"forest"],
			[478,422,145,93,"lake"],
			[518,224,92,68,"building"],
			[474,90,156,91,"forest"],
			[672,119,70,69,"park"],
			[772,219,180,404,"road"]
		]
	},
	{ //mapset 10
		"elephant": { //y_x_direction: [left,top,width,height]
			"2_2_south":[0,0,950,620],
			"2_2_north":[0,0,950,620],
			"2_2_east":[0,0,950,620],
			"2_2_west":[0,0,950,620],
			"1_3_south":[0,0,950,620],
			"1_3_north":[0,0,950,620],
			"1_3_east":[0,0,950,620],
			"1_3_west":[0,0,950,620],
			"1_0_south":[0,0,950,620],
			"1_0_north":[0,0,950,620],
			"1_0_east":[0,0,950,620],
			"1_0_west":[0,0,950,620],
			"0_1_south":[0,0,950,620],
			"0_1_north":[0,0,950,620],
			"0_1_east":[0,0,950,620],
			"0_1_west":[0,0,950,620],
			"0_3_south":[0,0,950,620],
			"0_3_north":[0,0,950,620],
			"0_3_east":[0,0,950,620],
			"0_3_west":[0,0,950,620],
			"2_0_south":[0,0,950,620],
			"2_0_north":[0,0,950,620],
			"2_0_east":[0,0,950,620],
			"2_0_west":[0,0,950,620],
			"2_3_south":[0,0,950,620],
			"2_3_north":[0,0,950,620],
			"2_3_east":[0,0,950,620],
			"2_3_west":[0,0,950,620],
			"2_1_south":[0,0,950,620],
			"2_1_north":[0,0,950,620],
			"2_1_east":[0,0,950,620],
			"2_1_west":[0,0,950,620]
		}, 
		"clues": [ //[left,top,width,height,clue]
			[405,3,46,345,"road"],
			[4,345,949,46,"road"],
			[78,424,161,91,"forest"],
			[83,550,87,59,"building"],
			[198,548,92,70,"building"],
			[333,474,234,139,"lake"],
			[578,466,231,158,"forest"],
			[814,534,127,90,"lake"],
			[102,219,135,85,"lake"],
			[187,130,101,68,"park"],
			[305,133,87,64,"building"],
			[16,12,147,102,"building"],
			[513,155,173,107,"park"],
			[845,218,98,67,"building"],
			[640,6,144,110,"building"],
			[803,11,141,99,"forest"]
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
	"1_T1":[40,"Look left or right until you find the landmark!"],
	"1_T2":[40,"Look left or right until you find the landmark!"],
	"1_T3":[40,"Which part of the map matches both clues?"],
	"1_E":[40,"Look left or right until you find the landmark!"],
	"1_1":[120,"Which part of the map matches both clues?"],
	"1_2":[120,"Which part of the map matches both clues?"],
	"1_3":[120,"Which part of the map matches both clues?"],
	"2_E":[40,"Look left or right until you find the landmark!"],
	"2_1":[120,"Which part of the map matches both clues?"],
	"2_2":[120,"Which part of the map matches both clues?"],
	"2_3":[120,"Which part of the map matches both clues?"],
	"3_E":[40,"Look left or right until you find the landmark!"],
	"3_1":[120,"Which part of the map matches both clues?"],
	"3_2":[120,"Which part of the map matches both clues?"],
	"3_3":[120,"Which part of the map matches both clues?"],
	"4_1":[1000,"Not Currently Tested"],
	"4_2":[1000,"Not Currently Tested"],
	"4_3":[1000,"Not Currently Tested"],
	"4_4":[1000,"Not Currently Tested"],
	"5_1":[1000,"Not Currently Tested"],
	"5_2":[1000,"Not Currently Tested"],
	"5_3":[1000,"Not Currently Tested"],
	"5_4":[1000,"Not Currently Tested"],
	"6_1":[1000,"Not Currently Tested"],
	"6_2":[1000,"Not Currently Tested"],
	"6_3":[1000,"Not Currently Tested"],
	"6_4":[1000,"Not Currently Tested"],
	"7_1":[1000,"Not Currently Tested"],
	"7_2":[1000,"Not Currently Tested"],
	"7_3":[1000,"Not Currently Tested"],
	"7_4":[1000,"Not Currently Tested"],
	"7_5":[1000,"Not Currently Tested"],
	"7_6":[1000,"Not Currently Tested"],
	"8_1":[1000,"Not Currently Tested"],
	"8_2":[1000,"Not Currently Tested"],
	"8_3":[1000,"Not Currently Tested"],
	"8_4":[1000,"Not Currently Tested"],
	"8_5":[1000,"Not Currently Tested"],
	"8_6":[1000,"Not Currently Tested"],
	"9_1":[1000,"Not Currently Tested"],
	"9_2":[1000,"Not Currently Tested"],
	"9_3":[1000,"Not Currently Tested"],
	"9_4":[1000,"Not Currently Tested"],
	"9_5":[1000,"Not Currently Tested"],
	"9_6":[1000,"Not Currently Tested"],
	"10_1":[1000,"Not Currently Tested"],
	"10_2":[1000,"Not Currently Tested"],
	"10_3":[1000,"Not Currently Tested"],
	"10_4":[1000,"Not Currently Tested"],
	"10_5":[1000,"Not Currently Tested"],
	"10_6":[1000,"Not Currently Tested"],
	"10_7":[1000,"Not Currently Tested"],
	"10_8":[1000,"Not Currently Tested"]
};

var g_searchText = {
	"1_1":"I see a forest and a building.",
	"1_2":"I see a mountain and a forest.",
	"1_3":"I see a building and a desert.",
	"2_1":"I see a lake and a forest.",
	"2_2":"I see a ocean and a lake.",
	"2_3":"I see a forest and a river.",
	"3_1":"I see a building and a lake.",
	"3_2":"I see a park and a building.",
	"3_3":"I see a lake and a road.",
	"4_1":"I see a big forest and a lake.",
	"4_2":"I see a building and a small mountain.",
	"4_3":"I see a small forest and a desert.",
	"4_4":"I see a lake and a big mountain.",
	"5_1":"I see a big river and a building.",
	"5_2":"I see a road and a small lake.",
	"5_3":"I see a small river and an ocean.",
	"5_4":"I see a building and a big lake.",
	"6_1":"I see a big building and a forest.",
	"6_2":"I see a lake and a small road.",
	"6_3":"I see a small building and a park.",
	"6_4":"I see a park and a big road.",
	"7_1":"I see a lake that is near a mountain.",
	"7_2":"I see a mountain that is far away from a desert.",
	"7_3":"I see a forest that is near a road.",
	"7_4":"I see a lake that is far away from a mountain.",
	"7_5":"I see a forest that is far away from a road.",
	"7_6":"I see a desert that is near a forest.",
	"8_1":"I see a building that is near a lake.",
	"8_2":"I see a lake that is far away from a river.",
	"8_3":"I see a forest that is far away from an ocean.",
	"8_4":"I see a building that is far away from a lake.",
	"8_5":"I see an ocean that is near a forest.",
	"8_6":"I see a forest that is near an ocean.",
	"9_1":"I see a park that is near a road.",
	"9_2":"I see a forest that is far away from a building.",
	"9_3":"I see a river that is near a park.",
	"9_4":"I see a forest that is far away from a lake.",
	"9_5":"I see a river that is far away from a park.",
	"9_6":"I see a road that is near a building.",
	"10_1":"I see a big lake and a big forest.",
	"10_2":"I see a small building that is far away from a lake.",
	"10_3":"I see a small lake that is near a park.",
	"10_4":"I see a small park and a small building.",
	"10_5":"I see a big building and a small forest.",
	"10_6":"I see a small forest that is near a lake.",
	"10_7":"I see a small lake that is far away from a park.",
	"10_8":"I see a small building and a big lake."
};

var g_voicelocations = {
	"1_1":"assets/sound/level_speech/1_1.mp3",
	"1_2":"assets/sound/level_speech/1_2.mp3",
	"1_3":"assets/sound/level_speech/1_3.mp3",
	"2_1":"assets/sound/level_speech/2_1.mp3",
	"2_2":"assets/sound/level_speech/2_2.mp3",
	"2_3":"assets/sound/level_speech/2_3.mp3",
	"3_1":"assets/sound/level_speech/3_1.mp3",
	"3_2":"assets/sound/level_speech/3_2.mp3",
	"3_3":"assets/sound/level_speech/3_3.mp3",
	"4_1":"assets/sound/level_speech/4_1.mp3",
	"4_2":"assets/sound/level_speech/4_2.mp3",
	"4_3":"assets/sound/level_speech/4_3.mp3",
	"4_4":"assets/sound/level_speech/4_4.mp3",
	"5_1":"assets/sound/level_speech/5_1.mp3",
	"5_2":"assets/sound/level_speech/5_2.mp3",
	"5_3":"assets/sound/level_speech/5_3.mp3",
	"5_4":"assets/sound/level_speech/5_4.mp3",
	"6_1":"assets/sound/level_speech/6_1.mp3",
	"6_2":"assets/sound/level_speech/6_2.mp3",
	"6_3":"assets/sound/level_speech/6_3.mp3",
	"6_4":"assets/sound/level_speech/6_4.mp3",
	"7_1":"assets/sound/level_speech/7_1.mp3",
	"7_2":"assets/sound/level_speech/7_2.mp3",
	"7_3":"assets/sound/level_speech/7_3.mp3",
	"7_4":"assets/sound/level_speech/7_4.mp3",
	"7_5":"assets/sound/level_speech/7_5.mp3",
	"7_6":"assets/sound/level_speech/7_6.mp3",
	"8_1":"assets/sound/level_speech/8_1.mp3",
	"8_2":"assets/sound/level_speech/8_2.mp3",
	"8_3":"assets/sound/level_speech/8_3.mp3",
	"8_4":"assets/sound/level_speech/8_4.mp3",
	"8_5":"assets/sound/level_speech/8_5.mp3",
	"8_6":"assets/sound/level_speech/8_6.mp3",
	"9_1":"assets/sound/level_speech/9_1.mp3",
	"9_2":"assets/sound/level_speech/9_2.mp3",
	"9_3":"assets/sound/level_speech/9_3.mp3",
	"9_4":"assets/sound/level_speech/9_4.mp3",
	"9_5":"assets/sound/level_speech/9_5.mp3",
	"9_6":"assets/sound/level_speech/9_6.mp3",
	"10_1":"assets/sound/level_speech/10_1.mp3",
	"10_2":"assets/sound/level_speech/10_2.mp3",
	"10_3":"assets/sound/level_speech/10_3.mp3",
	"10_4":"assets/sound/level_speech/10_4.mp3",
	"10_5":"assets/sound/level_speech/10_5.mp3",
	"10_6":"assets/sound/level_speech/10_6.mp3",
	"10_7":"assets/sound/level_speech/10_7.mp3",
	"10_8":"assets/sound/level_speech/10_8.mp3"
};
var g_cluevoicelocations = {
	"building":"assets/sound/clue_voice/building.mp3",
	"desert":"assets/sound/clue_voice/desert.mp3",
	"forest":"assets/sound/clue_voice/forest.mp3",
	"lake":"assets/sound/clue_voice/mountain.mp3",
	"ocean":"assets/sound/clue_voice/ocean.mp3",
	"park":"assets/sound/clue_voice/park.mp3",
	"road":"assets/sound/clue_voice/road.mp3",
	"stream":"assets/sound/clue_voice/stream.mp3",
	"mountain":"assets/sound/clue_voice/mountain.mp3"
};
var g_tvoicelocations = {
	"tcluep1":"assets/sound/t_voice/t.mp3",
	"tcluep2":"assets/sound/t_voice/t.mp3",
	"ta1":"assets/sound/t_voice/t.mp3",
	"ta2":"assets/sound/t_voice/t.mp3",
	"ta3":"assets/sound/t_voice/t.mp3",
	"ta4":"assets/sound/t_voice/t.mp3",
	"ta5":"assets/sound/t_voice/t.mp3",
	"ta6":"assets/sound/t_voice/t.mp3",
	"ta7":"assets/sound/t_voice/t.mp3",
	"ta8":"assets/sound/t_voice/t.mp3",
	"ta9":"assets/sound/t_voice/t.mp3",
	"ta10":"assets/sound/t_voice/t.mp3",
	"ta11":"assets/sound/t_voice/t.mp3",
	"tls1":"assets/sound/t_voice/t.mp3",
	"tls2":"assets/sound/t_voice/t.mp3",
	"tc1":"assets/sound/t_voice/t.mp3",
	"tc2":"assets/sound/t_voice/t.mp3",
	"tc3":"assets/sound/t_voice/t.mp3",
	"tc4":"assets/sound/t_voice/t.mp3",
	"tc5":"assets/sound/t_voice/t.mp3",
	"te1":"assets/sound/t_voice/t.mp3",
	"te2":"assets/sound/t_voice/t.mp3",
	"te3":"assets/sound/t_voice/t.mp3",
	"te4":"assets/sound/t_voice/t.mp3",
	"te5":"assets/sound/t_voice/t.mp3",
	"te6":"assets/sound/t_voice/t.mp3",
	"te7":"assets/sound/t_voice/t.mp3"
};

var g_cacheList = [
	"assets/images/debug-sound-off.png",
	"assets/images/debug-sound.png",
	"assets/images/debug-left1.png",
	"assets/images/debug-lock-open.png",
	"assets/images/debug-lock-close.png",
	"assets/images/debug-select.png",
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
	"assets/images/close_game_hover.png",
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
	"assets/images/dice-300px.png",
	"assets/images/star-g.png",
	"assets/images/star-y.png"
];