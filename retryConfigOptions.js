'use strict';
var retry = require('retry');
var fs = require('fs');
var dirLogs = __dirname + '/';


function addArgs(a, b) {
	return a + b;
}

function getMaxElapsedTime(_retries, testValue, isMinTimeout) {
	var opts = {
		retries : _retries,
		factor : 2,
		minTimeout : 1000,
		maxTimeout : Infinity,
		randomize : false
	};
	if (isMinTimeout) {
		opts.minTimeout = testValue;
	} else {
		opts.factor = (testValue / 10000);
	}
	return retry.timeouts(opts).reduce(addArgs, 0);
}

function TimeStamp() {
	var d = new Date();
	var sy = d.getFullYear().toString();

	var m = d.getMonth() + 1;
	var sm = m.toString();
	if (sm.length < 2) {
		sm = '0' + sm;
	}

	var D = d.getDate();
	var sD = D.toString();
	if (sD.length < 2) {
		sD = '0' + sD;
	}

	var h = d.getHours();
	var sh = h.toString();
	if (sh.length < 2) {
		sh = '0' + sh;
	}

	var n = d.getMinutes();
	var sn = n.toString();
	if (sn.length < 2) {
		sn = '0' + sn;
	}

	var s = d.getSeconds();
	var ss = s.toString();
	if (ss.length < 2) {
		ss = '0' + ss;
	}

	return sy + sm + sD + sh + sn + ss;
}

function getMaxElapsedTimeControllingMinTimeout(retries, MaxElapsedTime) {
	var lo = 1;
	var hi = 600000;
	var showMsg = false;
	var maxTries = 100;
	var tryNum = 0;
	var isMinTimeout = true;
	return getMaxElapsedTimeDetail(retries, lo, hi, MaxElapsedTime, showMsg, maxTries, tryNum, isMinTimeout);
}

function getMaxElapsedTimeControllingFactor(retries, MaxElapsedTime) {
	var lo = 1;
	var hi = 100000;
	var showMsg = false;
	var maxTries = 100;
	var tryNum = 0;
	var isMinTimeout = false;
	return getMaxElapsedTimeDetail(retries, lo, hi, MaxElapsedTime, showMsg, maxTries, tryNum, isMinTimeout) / 10000;
}

function getMaxElapsedTimeDetail(retries, lo, hi, MaxElapsedTime, showMsg, maxTries, tryNum, isMinTimeout) {
	tryNum = tryNum + 1;
	if (tryNum > maxTries) {
		if (showMsg) {
			console.log('tryNum=' + tryNum);
		}
		return -1;
	}
	var mid = hi - ((hi - lo) / 2);
	var v1 = 0;
	var v2 = 0;
	var v3 = 0;
	v1 = getMaxElapsedTime(retries, lo, isMinTimeout);
	v2 = getMaxElapsedTime(retries, mid, isMinTimeout);
	v3 = getMaxElapsedTime(retries, hi, isMinTimeout);
	if ((MaxElapsedTime >= v1) && (MaxElapsedTime <= v2)) {
		if (showMsg)
			console.log('((MaxElapsedTime>=v1)&&(MaxElapsedTime<=v2)) => ((' + MaxElapsedTime + '>=' + v1 + ')&&(' + MaxElapsedTime + '<=' + v2 + ')) => true');
		if (MaxElapsedTime == Math.round(v1)) {
			if (showMsg)
				console.log('(MaxElapsedTime==v1) => ((' + MaxElapsedTime + '==' + Math.round(v1) + ') => true');
			return Math.round(lo);
		}
		if (MaxElapsedTime == Math.round(v2)) {
			if (showMsg)
				console.log('(MaxElapsedTime==v2) => ((' + MaxElapsedTime + '==' + Math.round(v2) + ') => true');
			return Math.round(mid);
		}
		return getMaxElapsedTimeDetail(retries, lo, mid, MaxElapsedTime, showMsg, maxTries, tryNum, isMinTimeout);
	} else {
		if (showMsg)
			console.log('((MaxElapsedTime>=v1)&&(MaxElapsedTime<=v2)) => ((' + MaxElapsedTime + '>=' + v1 + ')&&(' + MaxElapsedTime + '<=' + v2 + ')) => false');
		if (MaxElapsedTime == Math.round(v2)) {
			if (showMsg)
				console.log('(MaxElapsedTime==v2) => ((' + MaxElapsedTime + '==' + Math.round(v2) + ') => true');
			return Math.round(mid);
		}
		if (MaxElapsedTime == Math.round(v3)) {
			if (showMsg)
				console.log('(MaxElapsedTime==v3) => ((' + MaxElapsedTime + '==' + Math.round(v3) + ') => true');
			return Math.round(hi);
		}
		return getMaxElapsedTimeDetail(retries, mid, hi, MaxElapsedTime, showMsg, maxTries, tryNum, isMinTimeout);
	}
}

function millisecondsToString(milliseconds) {
	if (milliseconds < 0)
		throw 'milliseconds is less than zero.';
	var start = false;
	var result = '';
	var seconds = Math.floor(milliseconds / 1000);
	var numyears = Math.floor(seconds / 31536000);
	var numdays = Math.floor((seconds % 31536000) / 86400);
	var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
	var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
	var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
	if (numyears != 0) {
		result = result + numyears + " years ";
		start = true;
	}
	if ((numdays != 0) || (start == true)) {
		result = result + numdays + " days ";
		start = true;
	}
	if ((numhours != 0) || (start == true)) {
		result = result + numhours + " hours ";
		start = true;
	}
	if ((numminutes != 0) || (start == true)) {
		result = result + numminutes + " minutes ";
		start = true;
	}
	result = result + numseconds + " seconds";

	return result;
}

/*
retryConfigOptionsForMaxElapsedTime returns a JSON object with retry configuration options designed to satisfy a specific maximum elapsed time value.
retriesLo is the smallest number of retries desired.
retriesHi is the smallest number of retries desired.
MaxElapsedTime is time from the first attempt to the last retry in milliseconds.  As an example if we want the last retry performed 7 hours after the first attempt MaxElapsedTime would be 25200617.
 */
function retryConfigOptionsForMaxElapsedTime(retriesLo, retriesHi, MaxElapsedTime) {
	if (retriesLo < 1)
		retriesLo = 1;
	if (retriesHi < retriesLo)
		retriesHi = retriesLo;
	if (MaxElapsedTime < 1000)
		MaxElapsedTime = 1000; //1 second
	if (MaxElapsedTime > 172800000)
		MaxElapsedTime = 172800000; //48 hours
	var showMsg = false;
	var lo = 1;
	var hi = 60000;
	var maxTries = 100;
	var tryNum = 0;
	var r = new Object();
	r.maxElapsedTime = millisecondsToString(MaxElapsedTime);
	r.maxElapsedTimeMS = MaxElapsedTime;
	r.instructions = 
	  'To achieve a maximum elapsed retry time of ' + r.maxElapsedTime + ' use one of the objects in options.  '+
	  'Please note, the options array first lists the configuration objects where minTimeout is adjusted to '+
	  'achieve the desired maximum elapsed retry time.  For this group of configuration objects factor is set '+
	  'to 2 which is the default.  '+
	  'The 2nd half of the options array lists the configuration objects where factor is adjusted to achieve '+
	  'the desired maximum elapsed retry time. '+
	  'For this group of configuration objects minTimeout is set to 1000 which is the default.  '+
	  'The options array is generated based on values of retries in the range of 3 to 40.  '+
	  'If a retries value does not hit the desired maximum elapsed retry time exactly it is eliminated from the options array.'
	r.options = new Array();
	var retVal = 0;
	for (var i = retriesLo; i < (retriesHi + 1); i++) {
		retVal = getMaxElapsedTimeDetail(i, lo, hi, MaxElapsedTime, showMsg, maxTries, tryNum, true);
		if (retVal != -1) {
			r.options.push({
				retries : i,
				factor : 2,
				minTimeout : retVal,
				maxTimeout : Infinity,
				randomize : false
			});
		}
		if (retVal != -1)
			hi = retVal;
	}
	lo = 1;
	hi = 100000;
	for (var i = retriesLo; i < (retriesHi + 1); i++) {
		retVal = getMaxElapsedTimeDetail(i, lo, hi, MaxElapsedTime, showMsg, maxTries, tryNum, false);
		if (retVal != -1) {
			r.options.push({
				retries : i,
				factor : retVal / 10000,
				minTimeout : 1000,
				maxTimeout : Infinity,
				randomize : false
			});
		}
		if (retVal != -1)
			hi = retVal;
	}
	var report = JSON.stringify(r);
	report = formatReport(report);
	return report;
}

function retryAllConfigOptions(MaxElapsedTime) {
	var retriesLo = 3;
	var retriesHi = 40;
	return retryConfigOptionsForMaxElapsedTime(retriesLo, retriesHi, MaxElapsedTime);
}

function retryAllConfigOptionsForMaxElapsedTime(hours, minutes, seconds) {
	var MaxElapsedTime = getMilliseconds(hours, minutes, seconds);
	return retryAllConfigOptions(MaxElapsedTime);
}

function formatReport(report) {
	report = report.replace(/[\n\r]/g, '');
	report = report.replace(/[\t]/g, ' ');
	report = report.replace(/{"maxElapsedTime":/g, '{\n"maxElapsedTime":');
	report = report.replace(/,"maxElapsedTimeMS":/g, ',\n"maxElapsedTimeMS":');
	report = report.replace(/,"instructions":/g, ',\n"instructions":');
	report = report.replace(/,"options":/g, ',\n"options":');
	report = report.replace(/[\[]+/g, '\n\[');
	report = report.replace(/{"/g, '\n{"');
	report = report.replace(/[\]]+/g, '\n\]\n');
	report = report.replace(/{"retries":/g, '  {\n    "retries":');
	report = report.replace(/,"factor":/g, ',\n    "factor":');
	report = report.replace(/,"minTimeout":/g, ',\n    "minTimeout":');
	report = report.replace(/,"maxTimeout":/g, ',\n    "maxTimeout":');
	report = report.replace(/,"randomize":false}/g, ',\n    "randomize":false\n  }');
	report = report.replace(/"maxTimeout":null/g, '"maxTimeout":Infinity');
	return report;
}

function getMilliseconds(hours, minutes, seconds) {
	var s = seconds * 1000;
	var m = minutes * 60000;
	var h = hours * 3600000;
	return h + m + s;
}

function saveToFileMS(MaxElapsedTime) {
	var report = retryAllConfigOptions(MaxElapsedTime);
	var ts = TimeStamp();
	fs.writeFileSync(dirLogs + 'retryConfigOptions' + ts + '.rtf', report);
}

function saveToFile(hours, minutes, seconds) {
	var report = retryAllConfigOptionsForMaxElapsedTime(hours, minutes, seconds);
	var ts = TimeStamp();
	fs.writeFileSync(dirLogs + 'retryConfigOptions' + ts + '.rtf', report);
}

function sendReportToConsole(report) {
	var a = report.split('\n');
	for (var i = 0; i < a.length; i++) {
		console.log(a[i]);
	}
}

module.exports.dirLogs=dirLogs;
module.exports.saveToFile = saveToFile;
