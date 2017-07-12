const SliderDrawer = require('sf-core/ui/sliderdrawer');
const FlexLayout = require('sf-core/ui/flexlayout');
const Router = require("sf-core/ui/router");
const Button = require('sf-core/ui/button');
const Image = require('sf-core/ui/image');
const sliderDrawerHeaderBarIcon = Image.createFromFile("images://sliderdrawer.png");
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const Color = require('sf-core/ui/color');
const System = require('sf-core/device/system');
var backgroundColorGradientParameters = {
    direction: Color.GradientDirection.HORIZONTAL,
    startColor: Color.create("#005d9f"),
    endColor: Color.create("#0598ff")
};
const mcs = require("./mcs");

//if (System.OS === "Android") {
//    Object.assign(backgroundColorGradientParameters, {
//        startColor: backgroundColorGradientParameters.endColor,
//        endColor: backgroundColorGradientParameters.startColor
//    });
//}

const backgroundColor = Color.createGradient(backgroundColorGradientParameters);

var sliderDrawer = new SliderDrawer({
    width: 200,
    enabled: false
});
module.exports = exports = sliderDrawer;

sliderDrawer.layout.backgroundColor = backgroundColor;

var btnLogOut = new Button({
    height: 40,
    width: 100,
    left: 40,
    bottom: 35,
    text: "Log out",
    positionType: FlexLayout.PositionType.ABSOLUTE,
    backgroundColor: Color.TRANSPARENT,
    textColor: Color.WHITE,
    onPress: function() {
        mcs.logout();
        sliderDrawer.hide();
        Router.goBack("pgLogin");
    }
});
sliderDrawer.drawerPosition = SliderDrawer.Position.LEFT;
sliderDrawer.layout.addChild(btnLogOut);

function toggleSliderDrawer() {
    if (sliderDrawer.state === SliderDrawer.State.CLOSED)
        sliderDrawer.show();
    else if (sliderDrawer.state === SliderDrawer.State.OPEN)
        sliderDrawer.hide();
}


sliderDrawer.setPage = function setPage(page) {
    var sliderDrawerItem = new HeaderBarItem({
        image: sliderDrawerHeaderBarIcon,
        onPress: function() {
            toggleSliderDrawer();
        }
    });
    page.headerBar.setLeftItem(sliderDrawerItem);
    page.headerBar.leftItemEnabled = true;
    page.headerBar.itemColor = Color.WHITE;
    
    page.android.onBackButtonPressed = toggleSliderDrawer;
};
