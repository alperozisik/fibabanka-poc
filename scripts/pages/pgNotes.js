const extend = require('js-base/core/extend');
const pgNotesDesign = require('ui/ui_pgNotes');
const SpeechRecognizer = require("sf-core/speechrecognizer");
const Application = require("sf-core/application");
const System = require("sf-core/device/system");
const backAction = require("../lib/backAction");
const Router = require("sf-core/ui/router");

const pgNotes = extend(pgNotesDesign)(
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
	backAction(page, goBack, "LIGHT");
}

// Page.onLoad -> This event is called once when page is created.
function onLoad(superOnLoad) {
	const page = this;
	superOnLoad();
	const btnSpeech = page.btnSpeech;
	const taNotes = page.taNotes;
	btnSpeech.onPress = function() {
		if (!SpeechRecognizer.isRunning()) {
			btnSpeech.text = "Stop Recording";
			if (System.OS === "iOS") {
				startSpeechRecognizer();
			}
			else if (System.OS === "Android") {
				const RECORD_AUDIO_CODE = 1002;
				Application.android.requestPermissions(RECORD_AUDIO_CODE, Application.android.Permissions.RECORD_AUDIO);
				Application.android.onRequestPermissionsResult = function(e) {
					if (e.requestCode === RECORD_AUDIO_CODE && e.result) {
						startSpeechRecognizer();
					}
				};
			}
		}
		else {
			btnSpeech.text = "Start Recording";
			SpeechRecognizer.stop();
		}
	};

	function startSpeechRecognizer() {
		SpeechRecognizer.start({
			onResult: function(result) {
				taNotes.text = result;
			},
			onFinish: function(result) {
				btnSpeech.text = "Start Recording";
				taNotes.text = result;
			},
			onError: function(error) {
				btnSpeech.text = "Start Recording";
				alert("Error : " + error);
			}
		});
	}


}

function goBack() {
	Router.goBack();
}

module && (module.exports = pgNotes);
