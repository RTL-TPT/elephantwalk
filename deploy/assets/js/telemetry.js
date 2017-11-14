var elephantTelemetry = (function(){
	var empty_tobj = {
		"p1_id": "",
		"p2_id": "",
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

	var sendEvent = function(){
		//
	};
	var createEvent = function(){
		var eventObj = JSON.parse(JSON.stringify(empty_tobj));
	};
	var createLocalReport = function() {
		let f = new Blob(["File content goes here"], { type: "text/html;charset=utf-8" });
		saveAs(f, "elephantTelemetry.txt");
	};

	return {
		"sendEvent":sendEvent,
		"createEvent":createEvent,
		"createLocalReport":createLocalReport
	};
})();