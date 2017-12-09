var elephantTelemetry = (function(){
	var empty_tobj = {
		"event_name": "",
		"device_time_stamp": "",
		"time_played": "",
		"game_version": "0.1",
		"session_id": "",
		//"device_id": "",
		"task_id": "",
		"attempt_num": "",
		"pass_fail": "",
		"mastery_up": "",
		"as_mastery": "",
		"rl_mastery": "",
		"correct_selection": "",
		"player_selection": ""
	};

	var container = { //these should be generated automatically by the server
		//"userId": "",
		//"xpId": "", //activity id
		"isSecondPlayer": false, //bool default false
		//"otherPlayerId": "",
		//"instructorIds": "", //array
		//"groupId": "",
		//"clientTimestamp": "",
		//"serverTimestamp": "",
		//"userAgent": "",
		"event_name": ""
		//"telemetryData": ""
	};

	//send telemetry event using springroll container
	var sendEvent = function(eventName, eventData){
		if(app === undefined) {
			return;
		}
		if(eventData === undefined){eventData = {};}
		if(eventName === undefined){eventName = "";}

		var eventObj = jQuery.extend({},container);

		eventObj.event_name = eventData.event_name;
		eventObj.event_data = JSON.stringify(eventData);

		//player
		eventObj.isSecondPlayer = (util.player.getPlayer() == 2);

		app.container.send(eventName, eventObj);
	};
	//create telemetry event object and store locally
	var createEvent = function(eventName, eventData){
		if(eventData === undefined){eventData = {};}
		if(eventName === undefined){eventName = "";}

		//fill passed event name
		var eventObj = JSON.parse(JSON.stringify(empty_tobj));
		eventObj.event_name = eventName;

		//fill time
		var timeobj = new Date();
		var datestr = "" + (timeobj.getMonth() + 1) + "/" + timeobj.getDate() + "/" + timeobj.getFullYear() + "/" + timeobj.getHours() + "/" + timeobj.getMinutes() + "/" + timeobj.getSeconds();
		eventObj.device_time_stamp = datestr;
		//fill task id
		eventObj.task_id = "";
		if(eventObj.event_name == "start_game" || eventObj.event_name == "quit_game") {
			//eventObj.task_id = "";
		} else {
			eventObj.task_id = g_leveldata[g_LevelTerrain][g_selectedDifficulty][parseInt(g_selectedLevel)].taskid;
		}
		//fill time played. currently in ms
		var timeplayedms = (new Date).getTime() - g_startTime;
		var seconds = parseInt(timeplayedms / 1000) % 60 ;
		var minutes = parseInt(timeplayedms / (1000*60)) % 60;
		var hours   = parseInt(timeplayedms / (1000*60*60)) % 24;
		eventObj.time_played = "" + hours + "/" + minutes + "/" + seconds;
		//session id
		eventObj.session_id = g_savestate.telemetry.session_id;

		//fill in passed event data
		var eventKeys = Object.keys(eventData);
		for(var i = 0; i < eventKeys.length; i++) {
			eventObj[eventKeys[i]] = eventData[eventKeys[i]];
		}

		g_telemetry_cache.push(eventObj); //store event info locally
		sendEvent("telemetry_save", eventObj); //send event to container
	};
	//create csv report of local telemetry event cache
	var createLocalReport = function() {
		var reportKeys = Object.keys(empty_tobj);
		var blobout = "";

		//create csv headers
		for(var i = 0; i < reportKeys.length - 1; i++) {
			blobout += '"'+reportKeys[i]+'",';
		}
		blobout += '"'+reportKeys[reportKeys.length - 1]+'"\n';

		//create csv content
		for(var i = 0; i < g_telemetry_cache.length; i++) {
			for(var j = 0; j < reportKeys.length - 1; j++) {
				blobout += '"'+g_telemetry_cache[i][reportKeys[j]]+'",';
			}
			blobout += '"'+g_telemetry_cache[i][reportKeys[reportKeys.length - 1]]+'"\n';
		}

		//file out
		let f = new Blob([blobout], {type: "text/plain;charset=utf-8"});
		saveAs(f, "elephantTelemetry.csv");
	};

	return {
		"sendEvent":sendEvent,
		"createEvent":createEvent,
		"createLocalReport":createLocalReport
	};
})();