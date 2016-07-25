/*
 * All time related methods
 */
_.extend(sb, {
    //to get time and date
    getDate: function getDate(time) {
        // Refer: http://stackoverflow.com/a/10589791/1577396
        // Refer: http://stackoverflow.com/a/1353711/1577396
        if(time){
            var dateTime = new Date(time);

            // The time comes from the server
            // So, add the clients timezone offset to the fetched time
            dateTime = sb.addTimeZoneToDate(dateTime);
        }
        else{
            var dateTime = new Date();
        }
        // var dateTime = new Date(time || null);
        // Valid date
        if(Object.prototype.toString.call(dateTime) === "[object Date]" && !isNaN(dateTime.getTime())){
            return dateTime;
        }
        // Invalid date
        else{
            // Refer: http://stackoverflow.com/a/3075893/1577396
            var t = time.split(/[- :]/);
            return new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
        }
    },
    addTimeZoneToDate: function(date){
        // return date;
        var d = new Date();
        var minutes = d.getTimezoneOffset();  // in minutes

        var newDateTime = date.getTime() - (minutes * 60 * 1000);
        // console.log("new date time: ", newDateTime, date.getTime());
        return new Date(newDateTime);
    },
    getTimeFormat: function getTimeFormat() {
        var now = new Date();
        var hh = now.getHours();
        var min = now.getMinutes();

        var ampm = (hh>=12)?'PM':'AM';
        hh = hh%12;
        hh = hh?hh:12;
        hh = hh<10?'0'+hh:hh;
        min = min<10?'0'+min:min;

        var time = hh+":"+min+" "+ampm;
        return time;
    },
    timeFormat: function timeFormat(time, OnlyTime, OnlyDays, withYear) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var theDate = sb.getDate(time);
        var currentDate = sb.getDate();

        var year = theDate.getFullYear();
        var month = theDate.getMonth();
        var day = theDate.getDate();

        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth();
        var currentDay = currentDate.getDate();
        var resultDateFormat = '';
        var text = '';
        if (currentYear !== year) {
            text = OnlyTime ? '' : 'On ';
            resultDateFormat = text + day + ' ' + months[month] + ' ' + year;
        } else if (month === currentMonth && day === currentDay) {
            text = OnlyTime ? '' : '@ ';
            if (OnlyDays) {
                resultDateFormat = text + day + ' ' + months[month];
            } else {
                resultDateFormat = text + sb.getTime(time);
            }
            if(withYear){
                resultDateFormat += ' ' + year;
            }
        } else {
            text = OnlyTime ? '' : 'On ';
            resultDateFormat = text + day + ' ' + months[month];

            if(withYear){
                resultDateFormat += ' ' + year;
            }
        }
        return resultDateFormat;
    },
    getHours: function(time){
        var hh = ("0" + sb.getTime(time).replace(": ", ":")).slice(-8);
        var hhValue = hh.slice(0, -3);
        var value = +hhValue.split(":")[0];
        if(/pm/i.test(hh)){
            value = value + 11;
        }
        else{
            value = value - 1;
        }
        return hhValue.replace(/^\d\d/, ("0" + value).slice(-2));
    },
    getTime: function getTime(time) {
        var fullDate = sb.getDate(time);
        var hours = fullDate.getHours();
        var minutes = ('0' + fullDate.getMinutes()).slice(-2);
        if (hours > 11) {
            hours = ('0' + (hours - 12)).slice(-2);
            return hours + ': ' + minutes + ' PM';
        } else {
            return hours + ': ' + minutes + ' AM';
        }
    },
    getTimeZone: function getTimeZone() {
        var offset = sb.getDate().getTimezoneOffset();
        var operation = offset < 0 ? 'floor' : 'ceil';
        var sign = offset < 0 ? '+' : '-';
        return sign + ('00' + Math[operation](Math.abs(offset / 60))).slice(-2) + ':' + ('00' + Math.abs(offset % 60)).slice(-2);
    },
    getDayTime: function getDayTime(time) {},
    getDayWiseData: function getDayWiseData(data) {
        if (data.length) {
            var newData = {};
            data.forEach(function(d){
                var time = sb.timeFormat(d.time, true, true);
                if (!newData[time]) {
                    newData[time] = [];
                    newData[time].push(d);
                } else {
                    newData[time].push(d);
                }
            });
            return newData;
        } else {
            return false;
        }
    }
});
