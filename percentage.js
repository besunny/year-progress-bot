const PersianDate = require("persian-date");

var days = [ 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29 ]

exports.calculate = function () {
	var month = new PersianDate().month();
	var day = new PersianDate().date();
	var n;
	var sum = 0; 
	for (n = 0; n < month-1; n++) {
		sum+=days[n];
	}
	var percentage = ((sum+day)/365)*100;
	return percentage;
}
