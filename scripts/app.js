/* globals lang */
require("i18n/i18n.js"); // Generates global lang object

const Application = require("sf-core/application");

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function(e) {
    alert({
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    });
};
const System = require('sf-core/device/system');
global.require = require;
require("./lib/mcs");
require("timers-smf");
require("sf-extension-alert");
const Router = require("sf-core/ui/router");
const stylerBuilder = require("library/styler-builder");
const settings = require("./settings.json");
stylerBuilder.registerThemes(settings.config.theme.themes || "Defaults");
stylerBuilder.setActiveTheme(settings.config.theme.currentTheme);


if (System.OS === "iOS") {
    Router.sliderDrawer = require("./lib/sliderDrawer");
}

// Define routes and go to initial page of application
// Router.add("page1", require("./pages/page1"));
// Router.add("page2", require("./pages/page2"));
Router.add("pgLogin", require("./pages/pgLogin"));
Router.add("pgDashboard", require("./pages/pgDashboard"));
Router.add("pgCustomers", require("./pages/pgCustomers"));
Router.add("pgNotes", require("./pages/pgNotes"));
Router.add("pgCustomerDetails", require("./pages/pgCustomerDetails"));
Router.add("pgChart", require("./pages/pgChart"))


Router.go("pgLogin", {
    checkUpdate: true
});


if (System.OS === "Android") {
    Router.sliderDrawer = require("./lib/sliderDrawer");
}