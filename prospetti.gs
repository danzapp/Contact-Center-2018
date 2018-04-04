function resetProspetto(date) {

var sheet = findSheet(date)

  if (sheet == null){
    Browser.msgBox('Prospetto ' + date.yearMonth + ' non trovato.')
    //sheet = ss.getSheetByName('05 (maggio)')
  }


  var sheetFirstDate = sheet.getRange('B3').getValue()
  Logger.log('Primo giorno del prospetto ' + sheetFirstDate)
  
  var sheetLastColumn = sheet.getLastColumn()
  
  var sheetLastDate = sheet.getRange(3,sheetLastColumn).getValue()
  
  var arrayGiorniLavorativi = cercaColonneGiorniLavorativi(sheet)[0]
  
  //var ultimoGiornoLavorativo = arrayGiorniLavorativi[arrayGiorniLavorativi.length-1]
  
  //Logger.log(ultimoGiornoLavorativo)
  
  Logger.log(sheetLastDate)

  var sheetMonth = new Date (sheetFirstDate).getMonth()+1
  Logger.log('mese del prospetto ' + sheetMonth)
  
  var dataCorrente = new Date()
  var meseCorrente = dataCorrente.getMonth()+1
  var giornoCorrente = dataCorrente.getDate()
  var startIndex = arrayGiorniLavorativi.indexOf(giornoCorrente)
    Logger.log('giorno corrente ' + giornoCorrente)
    
    switch (true){
    
    
     case dataCorrente >= sheetLastDate:
       Browser.msgBox('Attenzione tutti i turni sono stati già effettuati ')
       stop
       break;
     case dataCorrente >= sheetFirstDate && dataCorrente <= sheetLastDate:
       Browser.msgBox('Attenzione saranno cancellati i soli turni successivi ad oggi')
       var startIndex = arrayGiorniLavorativi.indexOf(giornoCorrente)
       break;
     case dataCorrente < sheetFirstDate:
       var startIndex = 0
     default:
  }

  Logger.log('startIndex ' + startIndex)
  Logger.log('giorniLavorativi ' + arrayGiorniLavorativi)
  Logger.log('numeroGiorniLavorativi ' + arrayGiorniLavorativi.length)
  for (var c=startIndex; c<arrayGiorniLavorativi.length; c++){
    giorno = (arrayGiorniLavorativi[c])
    var rangeTurnoGiornaliero = leggiRangeTurnoGiornaliero(sheet, giorno)
    pulisciTurnoGiornaliero(rangeTurnoGiornaliero)
    coloraTurnoGiornaliero(rangeTurnoGiornaliero, 'algoritmo')
  }

}

function leggiRangeTurnoGiornaliero(sheet, giorno){
  Logger.log(giorno)
  var tipiTurno = settingsTurniObjArray.length
  var numeroTurniNelGiorno = cercaNumeroTurniNelGiorno()
  var rigaIniziale = settingsTurniObjArray[0]['Riga iniziale']
  var rigaFinale = settingsTurniObjArray[tipiTurno-1]['Riga finale']
  var colonna = giorno+1
  
  var rangeTurnoGiornaliero = sheet.getRange(rigaIniziale, colonna, numeroTurniNelGiorno )
  return rangeTurnoGiornaliero
 
}


function pulisciTurnoGiornaliero(range){

    range.clear({contentsOnly: true})
  
}

function cercaNumeroTurniNelGiorno(){
 numeroTurniNelGiorno = 0
  
  settingsTurniObjArray.forEach(function (el){
      
    numeroTurniNelGiorno  = numeroTurniNelGiorno + el['Numero turni']
    return
  })
  
  Logger.log('Numero turni nel giorno ' + numeroTurniNelGiorno)

return numeroTurniNelGiorno
}

function coloraTurnoGiornaliero(range, mode){
 
  
  arrayColori = []
      for (var t=0; t<settingsTurniObjArray.length; t++){
          for (var nt=0; nt<settingsTurniObjArray[t]['Numero turni']; nt++){
              var coloreTurno = settingsTurniObjArray[t]['Colore '+ mode]
              arrayColori.push([coloreTurno])
          }
      }

 Logger.log(range.getValues().length)
 range.setBackgrounds(arrayColori)         
}

function leggiTurnoGiornaliero(range){

  var turnoGiornaliero = range.getValues()
  return turnoGiornaliero 
  
}

/*
 rangeTurnoGiornaliero.clear()
  
     for (var t=0; t<settingsTurniObjArray.length; t++){
         arrayColori.push(settingsTurniObjArray[t]['Colore algoritmo'])
     }
     
  rangeTurnoGiornaliero.setBackgrounds(arrayColori)

*/
