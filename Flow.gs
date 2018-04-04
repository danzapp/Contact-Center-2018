// crea mesi specifici
function createMonthFromHtml(form){
Logger.log("creatMonthFromHtml")
// splitta la data acquisita dal datapicker  
   var startDay = stringToDate(form.monthYear)
   var endDay = stringToDate(form.monthYear)
   
   // estrae giorno,mese,anno  
   var month = startDay[1]
   var mm = parseInt(month,10) //converte month in un intero nel sistema decimale '10'
   var year = startDay[0]
   Logger.log('year ' + year)
   var dd = startDay[2]
   
   // recupera nome del mese
   var created = cloneTemplate(sheetMonthName(mm),mm,year)
   if (created){
       fillCalendar(sheetMonthName(mm),mm, year)
      
          highlightWeekHolidays(sheetMonthName(mm))
          
          var holidaysInMonth = checkHolidays(sheetMonthName(mm), mm, year)
          if (holidaysInMonth.length > 0) {  
           Logger.log("vacanze nel mese " + holidaysInMonth)
           highlightHolidays(holidaysInMonth, sheetMonthName(mm)) 
          }
      sortSheets()
      hideSheets()
      var currentSheet = sheetMonthName(mm)
      Logger.log(currentSheet)
      ss.getSheetByName(currentSheet).activate()
      var html = '<p>Operazione completata</p>'
  }
  else {
    var html = "<p>Operazione Annullata</p>"
  }
  return html
} 
   


function createOneMonth(){
 
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var wishMonths = Browser.inputBox
  ("Inserire i mesi desiderati separati da una virgola es: 3,4,7 per indicare marzo, aprile e luglio")
   
   var monthsToCreate = wishMonths.split(",") 
   for (var i = 0; i < monthsToCreate.length; i++){
      var mmmm = Month[monthsToCreate[i]]
      var mm = monthsToCreate[i]
      cloneTemplate(sheetMonthName(mm), mm, year)
      fillCalendar(sheetMonthName(mm),mm, year)
      highlightWeekHolidays(sheetMonthName(mm))
      var holidaysInMonth = checkHolidays(sheetMonthName(mm), mm)
      
      if (holidaysInMonth.length > 0) {  
       Logger.log("vacanze nel mese " + holidaysInMonth)
       highlightHolidays(holidaysInMonth, sheetMonthName(mm)) 
      }
      
   } 
  sortSheets()
  hideSheets()
  var currentSheet = sheetMonthName(mm)
  ss.getSheetByName(currentSheet).activate()
}


// crea mesi per tutto l'anno
function createAllMonths(){

var ss = SpreadsheetApp.getActiveSpreadsheet()

  for (var mm = 1; mm <= 12; mm++){
    if (ss.getSheetByName(sheetMonthName(mm))){
      Browser.msgBox("sono presenti già alcuni fogli")
    }
    var mmmm = Month[mm]
    cloneTemplate(sheetMonthName(mm), mm,year)
    fillCalendar(sheetMonthName(mm),mm, year)
    var holidaysInMonth = checkHolidays(sheetMonthName(mm), mm, year)
    highlightHolidays(holidaysInMonth, sheetMonthName(mm)) 
    highlightWeekHolidays(sheetMonthName(mm))
  }
  sortSheets()
  hideSheets()
}

function cloneTemplate(sheetName, mm,year){
Logger.log("cloneTemplate new per " + sheetName)
var ui = SpreadsheetApp.getUi()
    if (ss.getSheetByName(sheetName)){
         // dovrebbe tornare il controllo al form html
         var answer = ui.alert('Prospetto già esistente. Vuoi sovrascriverlo ?', Browser.Buttons.YES_NO)
         if (answer == ui.Button.NO){
            ui.alert("La creazione del prospetto sarà annullata")
            return false
         }
         Logger.log("Sovrascrivi il prospetto "+ sheetName)
         var old = ss.getSheetByName(sheetName);
         ss.deleteSheet(old); // or old.setName(new Name); 
         SpreadsheetApp.flush(); // Utilities.sleep(2000);
    } 
   var sheet = ss.getSheetByName('Template').copyTo(ss)
   sheet.setName(sheetName).activate();
   /* Make the new sheet active */
   Logger.log("Prospetto creato")
   return true
}


// riempi il calendario per il mese

function fillCalendar(sheetMonthName, mm,year){
  Logger.log("fillCalendar")
//per testare la funzione
//var mm = 1
//var year = 2018

  //trova la prima e l'ultima data del mese
  
  // il parametro mese in new Date(year, mm, dd) inizia dall'indice 0=gennaio
  var firstDayOfMonth = new Date (year,mm-1,0) // ---- Attenzione giorno è stato impostato a 0 perchè altrimenti inizia dal giorno 2
  
    
  if (mm < 12){
    var nextMonth = parseInt(mm) +1 
    var yearOfNextMonth = year
  }
  else {
    var nextMonth = 1
    var yearOfNextMonth = parseInt(year) +1
  }
  
   // il parametro mese in new Date(year, mm, dd) inizia dall'indice 0=gennaio 
   var firstDayOfNextMonth =  new Date (yearOfNextMonth,nextMonth-1,1)
   var lastDayOfMonth =  decrementDate(firstDayOfNextMonth,1)
   var daysOfMonth =  DateDiff.inDays (firstDayOfMonth, lastDayOfMonth)
   var currentDate = new Date (firstDayOfMonth)

// inserisci il nome del calendario su A2
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  ss.getRange('A2').setValue(Month[mm] +' ' + year)
  Logger.log(daysOfMonth)
//compila il calendario del mese
  for (var i = 0; i<= daysOfMonth; i++){
         currentDate = incrementDate(currentDate, 1)
    var dayOfTheWeek = currentDate.getDay()

    var ss = SpreadsheetApp.getActiveSpreadsheet()
    

    if (dayOfTheWeek >=0 && dayOfTheWeek <=7) {
    
    modifySheetDays(currentDate, i+1)

    }

  }

    
  var sheet = ss.getSheetByName(sheetMonthName).activate()
      //cancellare eventuali colonne in eccesso es. settembre 30 giorni
    var numRows = sheet.getLastRow()
    var numCols = sheet.getLastColumn()
  sheet.deleteColumns(daysOfMonth+2, numCols-daysOfMonth-1)
 }

// richiamata da fillCalendar, inserisce le date nel foglio del mese
function modifySheetDays(date, day){
  Logger.log("modifySheetDays di " + (day+1))
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet()
  var range = sheet.getRange(3,day + 1 ).setValue(new Date(date))
}

// cancella tutti i mesi
function deleteAllMonths(){
  sortSheets()
  hideSheets()
  confirmDelete = Browser.msgBox("Confermi la cancellazione di tutti i fogli dei turni presenti ? ", Browser.Buttons.YES_NO_CANCEL)
  if (confirmDelete != "yes") {
    return
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets()
    for (var i=0; i<sheets.length; i++){
      var sheet = sheets[i]
      if (sheet.getName() != "Template"){
        ss.setActiveSheet(sheet)
      }
      for (var month in Month){
      var currentSheetName = ss.getActiveSheet().getName()
        if ( currentSheetName == sheetMonthName(month)){
            //Logger.log(ss.setActiveSheet(ss.getSheetByName(currentSheetName)).getName())    
            ss.deleteActiveSheet()
          }   
        }
      }
}


function exportToCalendarMenu (){
    var wishMonths = Browser.inputBox
  ("Inserire il numero del mese che si vuole esportare (es. 7 per Luglio)")
  exportToCalendar(mm)
}  
