//createSpreadsheetEditTrigger() 


// SPREADSHEETS
var ss = SpreadsheetApp.getActiveSpreadsheet()
Logger.log(ss.getName())
// SHEETS

var logSheet = ss.getSheetByName('Log')
var usersSheet = ss.getSheetByName('Utenti')
var infoSheet = ss.getSheetByName('Info')
var logAuthSheet = ss.getSheetByName('LogAutorizzazioni')
var settingsTurniSheet = ss.getSheetByName('Impostazioni turni')

// SETTINGS

var settingsTurniData = settingsTurniSheet.getDataRange().getValues()
var settingsTurniObjArray = ObjApp.rangeToObjectsNoCamel(settingsTurniData)

// USERS

var currentUserMail =  getCurrentUserEmail() //Session.getActiveUser().getEmail()//
Logger.log('currentUserMail ' + currentUserMail)
var userObj = getUserDetails(currentUserMail)

Logger.log('userObj')
Logger.log(JSON.stringify(userObj))

// TURNI

var totaleTurniGiornalieri = 0
  for ( var i = 0; i<settingsTurniObjArray.length; i++ ) {
    totaleTurniGiornalieri += settingsTurniObjArray[i]['Numero turni']
  }

// INFO

var info = ObjApp.rangeToObjectsNoCamel(infoSheet.getDataRange().getValues())

// USERS
var currentUser = ObjApp.rangeToObjectsNoCamel(infoSheet.getDataRange().getValues())

// the user's email address is not available in any context that allows a script to run without that user's authorization, like a simple onOpen(e) or onEdit(e) trigger, a custom function in Google Sheets, or a web app deployed to "execute as me" (that is, authorized by the developer instead of the user). However, these restrictions generally do not apply if the developer runs the script themselves or belongs to the same G Suite domain as the user.

//var currentUserMail2 = Session.getActiveUser().getEmail()


// COLORS
var lightRed = "#ff7375"
var red = '#ff3336'
var ligthGreen = "#d9ead3"
var green = "#009933"
var white = "#FFFFFF"
var evidenziato = '#ff9900' // giallo paglierino
var cellaVuota = '#fffb8a'

var colorsTurniAlgoritmo = []
var colorsTurniUtente= []
    for (var i=0; i<settingsTurniObjArray.length; i++){
      for (var nt=0; nt<settingsTurniObjArray[i]['Numero turni']; nt++){
        colorsTurniAlgoritmo.push([settingsTurniObjArray[i]['Colore algoritmo']])
        colorsTurniUtente.push([settingsTurniObjArray[i]['Colore utente']])
      }
    }
    Logger.log('Colori turni algoritmo ' + colorsTurniAlgoritmo)      
    Logger.log('Colori turni utente ' + colorsTurniUtente)

  var Month = {1: 'gennaio', 2: 'febbraio', 3: 'marzo', 4: 'aprile', 5: 'maggio', 6: 'giugno', 7: 'luglio', 8: 'agosto', 9: 'settembre', 10: 'ottobre', 11: 'novembre', 12: 'dicembre'} 
    
// calcola la differenza tra due date
var DateDiff = {

    inDays: function(d1, d2) {
        var t2 = new Date(d2).getTime();
        var t1 = new Date(d1).getTime();
        return parseInt((t2-t1)/(24*3600*1000));
    },

    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000*7));
    },

    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },

    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}
