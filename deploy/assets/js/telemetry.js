var elephantTelemetry = (function(){
	var empty_tobj = {
		"p1_id": "",
		"p2_id": "",
		"event_name": "",
		"device_time_stamp": "",
		"time_played": "",
		"game_version": "",
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

	var container = {
		"userid": "",
		"activity_id": "",
		"isSecondPlayer": "",
		"otherPlayerId": "",
		"instructorIds": "",
		"groupId": "",
		"clientTimestamp": "",
		"serverTimestamp": "",
		"userAgent": "",
		"eventName": ""
	};

	var sendEvent = function(eventName, containerData, eventData){
		if(app === undefined) {
			return;
		}
		app.container.send(eventName, eventData);
	};
	var createEvent = function(eventName, containerData, eventData){
		var eventObj = JSON.parse(JSON.stringify(empty_tobj));
		eventObj.event_name = eventName;
		g_telemetry_cache.push(eventObj);
	};
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