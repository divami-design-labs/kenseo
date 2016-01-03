'use strict';

function getTimeFormat() {
				var now = new Date();
				var hh = now.getHours();
				var min = now.getMinutes();

				var ampm = hh >= 12 ? 'PM' : 'AM';
				hh = hh % 12;
				hh = hh ? hh : 12;
				hh = hh < 10 ? '0' + hh : hh;
				min = min < 10 ? '0' + min : min;

				var time = hh + ":" + min + " " + ampm;
				return time;
}
//# sourceMappingURL=utils.js.map
