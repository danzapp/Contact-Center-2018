/**
 * Restituisce la lista dei prospetti contact center
 *
 * @return array.
 * @customfunction
 */
 
function LISTSHEETS(){
  var sheets = ss.getSheets()
  var listSheets = []
  for (numSheet in sheets){
    sheet = sheets[numSheet]
    sheetName = sheet.getName()
    
    if(isNaN(parseInt(sheetName.substring(0,2),10))){
      listSheets.push(sheetName)

    }

  }
return listSheets
}

/**
 * Verifica se il lo script è bloccato.
 *
 * @return string.
 * @customfunction
 */
function CHECKLOCK() {
  return 'OK'
  var scriptLock = LockService.getScriptLock()
  if (scriptLock.hasLock()){
    return 'Sheet is locked from other user'
  }
  else
  {
    return 'Sheet is locked by you'
  }

}



function TURNIMESE(){

 
}

/**
 * Restituisce i giorni lavorativi nel mese
 *
 * @return number.
 * @customfunction
 */
 
function GIORNILAVORATIVI(){
  //var giorni = cercaColonneGiorniLavorativi(ss.getActiveSheet())
  return 10
}
