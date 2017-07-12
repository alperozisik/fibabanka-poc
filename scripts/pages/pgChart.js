/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const pgChartDesign = require('ui/ui_pgChart');
const backAction = require("../lib/backAction");
const Router = require("sf-core/ui/router");
const url = "https://preview.c9users.io/alperozisik/fusioncharts/alper.1.html";
const System = require('sf-core/device/system');

const js3 = `window.eventData && window.eventData.getData()`;

const pgChart = extend(pgChartDesign)(
	// Constructor
	function(_super) {
		// Initalizes super class for this page scope
		_super(this);
		// overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow(superOnShow, data) {
	const page = this;
	superOnShow();
	const wvContent = page.wvContent;
	backAction(page, goBack, "LIGHT");
	if (data && data.data) {
		wvContent.data = data.data;
		wvContent.loadURL(url);
	}
}

// Page.onLoad -> This event is called once when page is created.
function onLoad(superOnLoad) {
	const page = this;
	superOnLoad();
	var timerId = null;
	const wvContent = page.wvContent;
	const aiChart = page.aiChart;

	wvContent.onShow = function(e) {
		if (e.url !== url) {
			return;
		}
	};


	wvContent.onLoad = function(e) {
		if (e.url !== url) {
			if (timerId) {
				clearInterval(timerId);
				timerId = null;
			}
			return;
		}

		timerId = setInterval(function() {
			wvContent.evaluateJS(js3, function(value) {
				if (!value)
					return;
				try {
					value = JSON.parse(value);
					if (System.OS === "Android") {
						value = JSON.parse(value);
					}
				}
				catch (ex) {
					return;
				}
				if (!value)
					return;
				if (typeof value === "object" && value instanceof Array && value.length > 0) {
					alert(JSON.stringify(value, null, "\t"), "Event");
				}
			});
		}, 50);
	};
	wvContent.onShow = function(e) {
		if (e.url !== url)
			return;
		aiChart.visible = false;
		if (wvContent.data) {
			wvContent.evaluateJS('window.showChart && window.showChart(`' + JSON.stringify(wvContent.data) + '`)');
		}

	};
	
	wvContent.bounceEnabled = false;
	wvContent.scrollBarEnabled = false;
}

function goBack() {
	Router.goBack();
}


module && (module.exports = pgChart);
