/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const SliderDrawerDesign = require('library/SliderDrawer');

const SliderDrawer = extend(SliderDrawerDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || SliderDrawerDesign.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = SliderDrawer);

