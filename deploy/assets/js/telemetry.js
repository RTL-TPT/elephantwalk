var elephantTelemetry = (function(){
	var empty_tobj = {
		"event_name": "",
		"device_time_stamp": "",
		"time_played": "",
		"game_version": "0.1",
		"session_id": "",
		"device_id": "",
		"task_id": "",
		"attempt_num": "",
		"pass_fail": "",
		"mastery_up": "",
		"as_mastery": "",
		"rl_mastery": "",
		"correct_selection": "",
		"player_selection": ""
	};

	var container = { //this should be generated automatically by the server
		"userId": "",
		"xpId": "", //activity id
		"isSecondPlayer": false, //bool default false
		"otherPlayerId": "",
		"instructorIds": "", //array
		"groupId": "",
		"clientTimestamp": "",
		"serverTimestamp": "",
		"userAgent": "",
		"eventName": "",
		"telemetryData": ""
	};

	//send telemetry event using springroll container
	var sendEvent = function(eventName, eventData){
		if(app === undefined) {
			return;
		}
		if(eventData === undefined){eventData = {};}
		if(eventName === undefined){eventName = "";}

		var eventObj = JSON.parse(JSON.stringify(empty_tobj));
		eventObj.event_name = eventName;

		var eventKeys = Object.keys(eventData);
		for(var i = 0; i < eventKeys.length; i++) {
			eventObj[eventKeys[i]] = eventData[eventKeys[i]];
		}

		app.container.send(eventName, eventObj);
	};
	//create telemetry event object and store locally
	var createEvent = function(eventName, eventData){
		if(eventData === undefined){eventData = {};}
		if(eventName === undefined){eventName = "";}

		var eventObj = JSON.parse(JSON.stringify(empty_tobj));
		eventObj.event_name = eventName;

		var timeobj = new Date();
		var datestr = "" + (timeobj.getMonth() + 1) + "/" + timeobj.getDate() + "/" + timeobj.getFullYear() + "/" + timeobj.getHours() + "/" + timeobj.getMinutes() + "/" + timeobj.getSeconds();

		eventObj.device_time_stamp = datestr;
		eventObj.task_id = "1_T";
		if(eventObj.event_name == "start_game" || eventObj.event_name == "quit_game") {
			eventObj.task_id = "";
		}

		var eventKeys = Object.keys(eventData);
		for(var i = 0; i < eventKeys.length; i++) {
			eventObj[eventKeys[i]] = eventData[eventKeys[i]];
		}

		g_telemetry_cache.push(eventObj);
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