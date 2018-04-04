// onEdit function that opens sidebar if a particular cell is edited.

function onOpen(e) {

/*
      var ui = SpreadsheetApp.getUi();
      ui.createMenu('Autorizzazioni')
      .addItem('Autorizza Contact Center', 'authorize')
      .addSeparator()
      .addToUi();
*/

Logger.log('onOpen')

Logger.log(currentUserMail)
if (e == undefined){
  userMail='da.zappala@aci.it'
}
else
{
userMail = e.user
}
var userObj = getUserDetails(userMail);

var ui = SpreadsheetApp.getUi();
var userRole = userObj.Ruolo    
Logger.log(userRole)
  switch (userRole) { 
    case 'admin':
      ui.createMenu('Contact Center')
      .addItem('Autorizza Contact Center', 'authorize')
      .addSeparator()
      .addItem('Compila prospetto random', 'showSidebarCompila')
      .addSeparator()
      .addItem('Svuota prospetto', 'showSidebarSvuota')
      .addSeparator()
      .addItem('Crea prospetto', 'showSidebarCrea')
      .addSeparator()
      .addItem('Nascondi i fogli di impostazione', 'hideSheets')
      .addSeparator()
      .addToUi();
      break;
   
    case 'superuser':
       ui.createMenu('Contact Center')
      .addItem('Autorizza Contact Center', 'authorize')
      .addSeparator()
      .addItem('Compila prospetto random', 'turniRandom')
      .addSeparator()
      .addItem('Crea il prospetto turni per un mese', 'showSidebar')
      .addSeparator()
      .addToUi();
      break;
   case 'disabled':
      Browser.msgBox('L\'utenza ' + userObj.Cognome + ' è stata disabilitata')
      stop
      break;
    default:
    /*
       ui.createMenu('Contact Center')
      .addItem('Autorizza Contact Center', 'authorize')
      .addSeparator()
      .addToUi();
    */
    
    /*
       ui.createMenu('Contact Center')
      .addItem('Crea il prospetto turni per un mese', 'showSidebar')
      .addSeparator()
      .addItem('Crea i prospetto turni per mesi specifici', 'createOneMonth')
      .addSeparator()
      //.addSubMenu(ui.createMenu('Sub-menu')
      .addItem("Crea tutti i prospetti turni per l'intero anno ", 'createAllMonths')
      .addSeparator()
      //.addSubMenu(ui.createMenu('Sub-menu')
      .addItem('Cancella i prospetti di tutti i mesi presenti ', 'deleteAllMonths')
      .addSeparator()
      //.addSubMenu(ui.createMenu('Sub-menu')
      .addItem('Esporta i turni sul calendario ', 'exportToCalendar')
      .addSeparator()
      //.addSubMenu(ui.createMenu('Sub-menu')
      .addItem('Importa le festività ', 'importHolidays')
      .addSeparator()
      //.addSubMenu(ui.createMenu('Sub-menu')
      .addItem('Imposta anno in corso ', 'setYear')
      .addToUi();
    */
  }
     
}


function onEdit(e) {

var currentUserMail = getCurrentUserEmail()
Logger.log(currentUserMail)

var user = getUserDetails(currentUserMail)
var userSigla = user.Sigla

var mode = 'onEdit'

//var ss = SpreadsheetApp.getActiveSpreadsheet()
  
var sheet = ss.getActiveSheet()
var triggeredRange = {columnStart: 2, rowStart:7, columnEnd:sheet.getLastColumn(), rowEnd:11}

 Logger.log(JSON.stringify(e)) 
 
  var editRange = e.range
    if (e.oldValue == undefined)
    {
      var oldValue = ''
    }
    else
    {
      var oldValue = e.oldValue
    }

    if(typeof(e.value) == 'object')
    {
      var currentValue = ''
    }
    else
    {
      var currentValue = e.value
    }
    
    Logger.log('currentValue ' + currentValue)
    Logger.log('oldValue ' + oldValue)

 Logger.log(JSON.stringify(editRange))
 
 var sheetName = sheet.getName()
 var cell = sheet.getRange(e.range.rowStart, e.range.columnStart)
 Logger.log('active cell = ' + cell.getA1Notation())

  //var coloreTurnoUtente = settingPerRigaturno[0]['Colore utente']
  //var coloreTurnoAlgoritmo = settingPerRigaturno[0]['Colore algoritmo']
  //var tipoTurno = settingPerRigaturno[0]['Tipo turno']
  
     
   if (sheetName == "Festività"){
        var range = sheet.getRange(2,1).setValue("Modificato in data ")
        var range = sheet.getRange(2,2).setBackground(new Date())
        stop
   }
   
   // gestisce le modifiche alle celle dei soli fogli relativi ai turni mensili
          Logger.log(JSON.stringify(e.range))
          Logger.log('foglio mese ? ' + parseInt(sheetName.substring(0,2),10))

        if(!isNaN(parseInt(sheetName.substring(0,2),10))) {
          //Logger.log('foglio mese ? ' + parseInt(sheetName.substring(0,2),10))
          
          //Browser.msgBox(sheetName)
          
          //aggiorna il log
          //inserisce una nuova riga sotto le intestazioni

        //if (user.Ruolo != 'admin' && user.Ruolo != 'superuser'){
        if (user.Ruolo == 'disabled'){
          Browser.msgBox('Non puoi intervenire sul prospetto turni in quanto la tua utenza è stata disabilitata')
          stop
        }
         var Messaggio = 'Cella modificata'
       
       if (user.Ruolo == 'user'){
        
          //Browser.msgBox(user.Nome + ' ' + user.Cognome + ' ' + user.Ruolo)
           
          // verifica che la cella modificata non rientri nell'intervallo protetto
          
          Logger.log(JSON.stringify(editRange))
          if (editRange.columnStart < triggeredRange.columnStart || editRange.rowStart < triggeredRange.rowStart || editRange.columnEnd > triggeredRange.columnEnd || editRange.rowEnd > triggeredRange.rowEnd)   
          {
              Logger.log('Nega modifica, ripristina oldValue e aggiorna log')
              Browser.msgBox('Verrà ripristinato il valore originario di questa cella in quanto non soggetta a modifiche')
              
              Logger.log('editRange:')
              Logger.log(JSON.stringify(editRange))

              var sheetCell = ss.getActiveRange().getCell(1, 1)
              sheetCell.setValue(oldValue || '')
              
              var logLastRow = logSheet.getLastRow()
              var logLastCol = logSheet.getLastColumn() 
              
              //logSheet
              Logger.log(ss.getSheetByName('Log').getRange(logLastRow, logLastCol).getA1Notation())
              ss.getSheetByName('Log').getRange(logLastRow, logLastCol-3).setValue('Negata modifica')
              ss.getSheetByName('Log').getRange(logLastRow, logLastCol-2).setValue(oldValue)
              ss.getSheetByName('Log').getRange(logLastRow, logLastCol-1).setValue(currentValue)
              sheetCell.activate()
              stop
          }
        
            
          // gestisce le modifiche dei giorni festivi
          if (cell.getBackground() == '#ff3336' || cell.getBackground() == "#ff7375") {
          
          var ui = SpreadsheetApp.getUi();
          var response = ui.alert('Stai inserendo un turno in un giorno festivo. Vuoi confermare ?', ui.ButtonSet.YES_NO);
               // Process the user's response.
               if (response == ui.Button.NO) {
                  cell.setValue('') 
                  stop
               } 
               Messaggio = 'Inserito turno su giorno festivo'
          }
          
          else
          
          {
      
          var oldBackgroundCell = cell.getBackground()
          Logger.log('old bg color ' + oldBackgroundCell)
          
          var colonnaTurno = editRange.columnStart
          
          switch (true) {
            
            case currentValue == '': 
            //inibisce lo svuotamento di un turno
           
                Browser.msgBox('Non è possibile lasciare un turno scoperto, chiedi una sostituzione ad un collega.')
                cell.setValue(oldValue)
                Messaggio = 'Negata modifica per tentativo di cancellare turno'
                break;
                
            // inibisce la sostituzione se la sigla inserita è diversa da quella dell'utente
                case currentValue != user.Sigla: 
                 Browser.msgBox('Puoi inserire nel prospetto solo i tuoi turni')
                 cell.setValue(oldValue)
                 Messaggio = 'Negata modifica per tentativo di inserire sigla diversa dalla propria utenza'; 
                 break;
              default:
           } // fine switch
          } 
        } // chiusura controllo utente 
        
      // Aggiorna log
          logSheet.insertRows(3,1) 
          var newRowRange = logSheet.getRange(3,1,1,7)
          newRowRange.setValues([[new Date(), currentUserMail, sheetName, JSON.stringify(editRange), Messaggio, JSON.stringify(oldValue), JSON.stringify(currentValue)]])
          Logger.log('Aggiornato il Log') 
     
                Logger.log('riga ' + editRange.rowStart-7)
                Logger.log('colonna ' + editRange.columnStart)
                
                
                 
                    Logger.log('modifica il colore del turno in coloreturnoutente ' + colorsTurniUtente[editRange.rowStart-7])
                    cell.setBackground(colorsTurniUtente[editRange.rowStart-7])   
    
                    Logger.log('colonna per cui aggiornare colore ' + editRange.columnStart)
                    AggiornaColoreTurniDuplicati(sheet,editRange.columnStart, mode, editRange)
                    var arrayGiorniLavorativi = cercaColonneGiorniLavorativi(sheet)
                    contaTurni(sheet, arrayGiorniLavorativi)
                    
                    Logger.log('Fine AggiornaColoreTurniDuplicati')
                    Logger.log('sigla oldValue ' + oldValue)
                    findUserMail(oldValue)
            
              
  } // chiusura controllo fogli mese
 
    

          // Aggiorna le note
          /*
          var comments = cell.getComment();
          var newComment = Utilities.formatDate(new Date(), "CET", "dd/MM/yyyy hh:mm") + "\nModificato in \'" + e.value + "\' da " + getCurrentUserEmail(); 
          comments = newComment + comments ;
          cell.setComment(comments);
          */
          
          // aggiorna il logSheet 

}