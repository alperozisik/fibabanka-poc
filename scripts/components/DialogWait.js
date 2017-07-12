/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const DialogWaitDesign = require('library/DialogWait');

const DialogWait = extend(DialogWaitDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || DialogWaitDesign.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = DialogWait);

