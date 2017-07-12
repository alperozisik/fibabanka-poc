const MCS = require('sf-extension-mcs');
var options = {
	'backendId': 'd7fd89fd-ff72-47c4-9380-a5d3513a53ed', //required
	'baseUrl': 'https://smartface-mobilebel.mobileenv.em2.oraclecloud.com:443', //required
	'androidApplicationKey': 'bff425c8-2e46-4f37-a54a-215861fd764c', //required only for analytics & events
	'iOSApplicationKey': '7b48d80e-bdb1-400f-a4e0-8f7c596d2b17', //required only for analytics & events
	'anonymousKey': 'TU9CSUxFQkVMX1NNQVJURkFDRV9NT0JJTEVfQU5PTllNT1VTX0FQUElEOmZzOXEzakltbm9iX2hw' //required only to perform operations without logging in first
};
var mcs = new MCS(options);
module.exports = exports = mcs;