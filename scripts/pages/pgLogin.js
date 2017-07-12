const extend = require('js-base/core/extend');
const pgLoginDesign = require('ui/ui_pgLogin');
const mcs = require("../lib/mcs");
const KeyboardType = require('sf-core/ui/keyboardtype');
const System = require('sf-core/device/system');
const ActionKeyType = require('sf-core/ui/actionkeytype');
const Application = require("sf-core/application");
const sliderDrawer = require("../lib/sliderDrawer");
const Router = require("sf-core/ui/router");
const rau = require("../lib/rau");

const pgLogin = extend(pgLoginDesign)(
	// Constructor
	function(_super) {
		_super(this);
		// overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow(superOnShow, data) {
	superOnShow();
	var page = this;

	page.aiLogin.visible = false;
	sliderDrawer.enabled = false;
	
	if (data && data.checkUpdate) {
		setTimeout(function() {
			rau.checkUpdate();
		}, 10);
	}
}

// Page.onLoad -> This event is called once when page is created.
function onLoad(superOnLoad) {
	superOnLoad();
	var page = this;

	page.loginButton.onPress = doLogin;

	if (System.OS === "Android")
		page.passwordInput.keyboardType = KeyboardType.android.TEXTNOSUGGESTIONS;

	page.passwordInput.onActionButtonPress = function() {
		doLogin();
	};

	page.userNameInput.onActionButtonPress = function() {
		page.passwordInput.requestFocus();
	};
	page.userNameInput.actionKeyType = ActionKeyType.NEXT;

	page.android.onBackButtonPressed = function() {
		Application.exit();
	};


	function doLogin() {
		page.aiLogin.visible = true;
		page.loginButton.enabled = false;
		mcs.login({
				'username': page.userNameInput.text,
				'password': page.passwordInput.text
			},

			function(err, result) {
				page.aiLogin.visible = false;
				page.loginButton.enabled = true;
				if (err) {
					if (typeof err === "object")
						err = JSON.stringify(err, null, "\t");
					return alert("LOGIN FAILED.  " + err);
				}
				sliderDrawer.enabled = true;
				Router.go("pgCustomers", {
					filter: {
						start: 0,
						length: 20
					}
				});
			});
	}

}

module && (module.exports = pgLogin);
