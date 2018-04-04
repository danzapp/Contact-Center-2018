function createEvent(calendarId, turno, startDate,color) {
Logger.log(calendarId)

  // var calendarId = 'aci.it_0nc2t73iu0s7s2g9aa75iane6k@group.calendar.google.com'; // imposta il calendario "Prova Contact Center"
  var start = getAbsoluteDate(startDate,1);
  var end = getAbsoluteDate(startDate,1);
  Logger.log("API start " + start)
  var event = {
    summary: turno,
    location: '',
    description: '',
    start: {
      date: start
    },
    end: {
      date: start
    },
    attendees: [
      {email: 'da.zappala@aci.it'},
    ],
    // Red background. Use Calendar.Colors.get() for the full list.
    colorId: color
  };
  var eventInserted = Calendar.Events.insert(event, calendarId);
  Logger.log('Event ID: ' + eventInserted.getId());
}

/**
 * Helper function to get a new Date object relative to the current date.
 * @param {number} daysOffset The number of days in the future for the new date.
 * @param {number} hour The hour of the day for the new date, in the time zone
 *     of the script.
 * @return {Date} The new date.
 */
      
function getAbsoluteDate(date, hour) {
  var date = new Date(date);
  date.setDate(date.getDate());
  date.setHours(hour);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  
   date = Utilities.formatDate(new Date(date), "GMT"-0500, "yyyy-MM-dd")
      
  return date.toString();
}
      
function getRelativeDate(daysOffset, hour) {
  var date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hour);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}
