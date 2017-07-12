/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const pgDashboardDesign = require('ui/ui_pgDashboard');
const sliderDrawer = require("../lib/sliderDrawer");
const Color = require('sf-core/ui/color');

const pgDashboard = extend(pgDashboardDesign)(
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
function onShow(superOnShow) {
	const page = this;
	superOnShow();
	sliderDrawer.setPage(page);
}

// Page.onLoad -> This event is called once when page is created.
function onLoad(superOnLoad) {
	const page = this;
	superOnLoad();
}

module && (module.exports = pgDashboard);
