function import_calendar( start_date, end_date, cal_Id, ss, sheet_name) {
//importa il calendario nel foglio passati come paramentri
Logger.log(sheet_name)
  var sheet = ss.getSheetByName(sheet_name);
  var cal = CalendarApp.getCalendarById(cal_Id);
  sheet.clear();
  events = cal.getEvents( start_date, end_date );
  irow = 2;
  for( i in events ) {
    evt = events[i];
    var date = evt.getStartTime();
    var formatted_date = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getYear();
    sheet.getRange("A"+irow).setValue( formatted_date );
    sheet.getRange("B"+irow).setValue( evt.getTitle() );
    irow ++;
  }
}

function import_calendars() {
//specifica un calendario da importare
  var start_date = new Date("Jan 1, 2016");
  var end_date   = new Date("Jan 1, 2017");

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  import_calendar( start_date, end_date, "it.italian#holiday@group.v.calendar.google.com", ss, "festività" );
  
}

function exportToCalendar(mm){

// var mm = 7 
  var mm = Browser.inputBox("Indicare il mese da esportare su calendario")
  Logger.log("exportTocalendar " + mm)
  //seleziona la prima e l'ultima data del mese (fino alle 23:59:59
 

  var ss = SpreadsheetApp.getActive()
  var sheetName = sheetMonthName(mm)

  var sheet = ss.getSheetByName(sheetName)
  
  var calendarId = 'aci.it_0nc2t73iu0s7s2g9aa75iane6k@group.calendar.google.com'
  var cal = CalendarApp.getCalendarById(calendarId)
  
  // CORREZIONE DA EFFETTUARE per estrarre solo i giorni effettivamente presenti nel mese
  var firstDayOfMonth = new Date (year,mm-1,1)
  
  if (mm < 12){
    var nextMonth = parseInt(mm) +1 
    var yearOfNextMonth = year
  }
  else {
    var nextMonth = 1
    var yearOfNextMonth = parseInt(year) +1
  }
  
  var firstDayOfNextMonth =  new Date (yearOfNextMonth,nextMonth-1,1)
   var lastDayOfMonth =  decrementDate(firstDayOfNextMonth,1)
   var daysOfMonth =  DateDiff.inDays (firstDayOfMonth, lastDayOfMonth)+1
   Logger.log(daysOfMonth)

  // calcolare giorniMese (colonne da estrarre)
  var datesRange = sheet.getRange(3, 2, 1,daysOfMonth)
  
  //var datesRange = sheet.getRange('B3:AF3')
  var dates = datesRange.getValues()
  Logger.log(dates)
  var daysInMonth = dates[0].length
  
  Logger.log("giorni del mese " + daysInMonth)

  var date = new Date(dates[0][0])
  var startDate = decrementDate(date,1)
  
  //calcola l'ultima data del mese
  var date = new Date(dates[0][daysInMonth-1])
  Logger.log("date " + date)
  var endDate = decrementDate(date,1)
  endDate.setHours(23,59,59,0)
  

 
  Logger.log("start date " + startDate + " end date " + endDate)

  
  deleteEvents(calendarId, mm,startDate, endDate)
  
  Logger.log("continue after deleteEvents")
  
  //raccogli dati da esportare
  
   for (var c=0; c <daysInMonth; c++) {
   var colorDay = sheet.getRange(6,c+2).getBackground()
   
   var siglesNormativa = sheet.getRange(7,c+2,3,1).getValues().sort()
   var siglesProcedure = sheet.getRange(10,c+2,1,1).getValues().toString()
   var siglesForniture = sheet.getRange(11,c+2,1,1).getValues().toString()
   
   var turnNormativa = new turnType("Normativa", 3, siglesNormativa,7, 5) 
      Logger.log(turnNormativa.persons)
   var turnProcedure = new turnType("Procedure", 1, siglesProcedure, 10, 0) 
    Logger.log(turnProcedure.persons)
   var turnForniture = new turnType("Forniture", 1, siglesForniture, 11, 3) 
      Logger.log(turnForniture.persons)
   var allSigles = siglesNormativa + "," + siglesProcedure + "," + siglesForniture
     
   Logger.log("all " + allSigles + " " + allSigles.length)
   
   // legge i turni solo per i giorni non festivi
     if  ( colorDay == '#ffffff' && allSigles.length >4 ){

       var date = new Date(dates[0][c])

        // il decremento è a 0 perchè le Calendar API al quale il parametro sarà passato attraverso la funzione createEvent non manipolano la data)
      var turnDate = decrementDate(date,0)
      
      
      Logger.log("norm " + siglesNormativa.length)
      var turnNormativa = "1-Normativa [" + siglesNormativa + "]\n"
     
      var turnProcedure = "2-Procedure [" + siglesProcedure + "]\n"
      var turnForniture = "3-Forniture [" + siglesForniture + "]"
      
      // stampa i turni solo se non sono vuoti
      if (siglesNormativa.length >2) {
          siglesToNames(siglesNormativa)
          createEvent(calendarId, turnNormativa, turnDate,5)
      }
      if (siglesProcedure.length >0) {
          createEvent(calendarId, turnProcedure, turnDate,0)
        }
      if (siglesForniture.length >0) {
        createEvent(calendarId, turnForniture, turnDate,3)
        }
    }
  }   

}

function deleteEvents(calendarId, mm,startTime, endTime){
var ss = SpreadsheetApp.getActive()
   var sheetName = sheetMonthName(mm)
   var sheet = ss.getSheetByName(sheetName)
   Logger.log(calendarId)
   var cal = CalendarApp.getCalendarById(calendarId)
   Logger.log(cal)
   Logger.log(cal.getName())
   Logger.log("start " + startTime + " end " + endTime)
   var eventsByDates = cal.getEvents(startTime, endTime)
   Logger.log(eventsByDates.length)
   for (i=0; i<eventsByDates.length; i++){

        eventsByDates[i].deleteEvent();
   }
  
}

