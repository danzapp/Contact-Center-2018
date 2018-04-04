function AggiornaColoreTurniDuplicati(sheet, colonnaTurno, mode, editRange) {
 Logger.log('cerca ripetizioni in ' + sheet.getSheetName())
 Logger.log(colonnaTurno)

   if (sheet == null){
      Browser.msgBox('Foglio non trovato')
      //sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('prova')
   }
   
  switch (mode){
    
    case 'algoritmo':
   
      var arrayGiorniLavorativi = cercaColonneGiorniLavorativi(sheet)
      var numeroGiorniLavorativi = arrayGiorniLavorativi.length
      var arrayGiorni = arrayGiorniLavorativi[0]
      Logger.log('arrayGiorni da procedura: \n' + arrayGiorni)
      break;
    
    case 'onEdit':
      arrayGiorni = [colonnaTurno-1]
       Logger.log('arrayGiorni da manuale: \n' + arrayGiorni)
       
      break;
    
    default:
   
   }
  Logger.log('mode ' + mode + ' arrayGiorni ' + arrayGiorni + ' typeof ' +  typeof(arrayGiorni))
  
    var TurniSuProspetto = contaTurni(sheet, [arrayGiorni])
    //Logger.log(TurniSuProspetto)
   
    var Turni = TurniSuProspetto.Totali
    
   
    giorniConOccorrenzeAddetti = []
   
    for (var c=0; c<arrayGiorni.length; c++){    
        
        colonnaTurno = arrayGiorni[c]+1
        
        Logger.log('colonna turno ' + mode + ': ' + colonnaTurno)

        addettiTurniGiornalieri = []
        
        // filtra i turni per giorno (al momento devono essere 5 (3+1+1))
        
        var TurniPerGiorno = Turni.filter(function (el){      
          return el.colonnaGiorno == arrayGiorni[c]
        })      
        Logger.log(TurniPerGiorno)
        // costruisce un array dei turni del giorno con il nome dell'addetto
        
        for (var t=0; t<TurniPerGiorno.length; t++){
          
            addetto = TurniPerGiorno[t]['addetto']      
            
            addettiTurniGiornalieri.push(addetto)
        }  
          Logger.log('addettiTurniGiornalieri '  + addettiTurniGiornalieri)
          // verifica se nell'array dei turni del giorno ci siano duplicati
         
         var turniConOccorrenzeAddetti = countElements(addettiTurniGiornalieri)
         //var duplicati = addettiTurniGiornalieri.prototype.getDuplicates()
         Logger.log('turniConOccorrenzeAddetti') 
         Logger.log(turniConOccorrenzeAddetti)
        

         // evidenzia le celle duplicate o toglie l'evidenziazione
            arrayColoriTurni = []
            for (var key in turniConOccorrenzeAddetti){
                Logger.log('key ' + key)
               
                var numOccorrenze = turniConOccorrenzeAddetti[key].length
                for (var q=0; q<numOccorrenze; q++){
                
                    indexArray = parseInt(turniConOccorrenzeAddetti[key][q])
                      Logger.log('indice array ' + indexArray)
                    rigaTurno = indexArray + 7
                      Logger.log('rigaTurno ' + rigaTurno)
                      Logger.log('numero occorrenze ' + numOccorrenze)
                   
                    if (numOccorrenze>1 && key!= 'null' )
                    {
                      Logger.log('duplicato ' + key + ' occorrenza ' + (q+1 ) + ' posizione ' + turniConOccorrenzeAddetti[key][q])
                      coloreTurno = evidenziato
                    }
                    else
                    {  
                              if(key == 'null') {
                                coloreTurno = cellaVuota
                              }
                              else
                              {
                                coloreTurnoProspetto = TurniPerGiorno[indexArray]['coloreTurno']
                                fonteTurno = TurniPerGiorno[indexArray]['fonteTurno']
                                
                                Logger.log('Fonte turno: ' + fonteTurno)
                                Logger.log('colore turno prospetto ' + coloreTurnoProspetto)
                                Logger.log('colore turno utente ' + colorsTurniUtente[indexArray])
                             
                                    if (TurniPerGiorno[indexArray]['coloreTurno']!='' && coloreTurnoProspetto == colorsTurniUtente[indexArray]){
                                                                    
                                               coloreTurno = colorsTurniUtente[indexArray]
            
                                          }
                                          
                                     else
                                     {
                                         coloreTurno = colorsTurniAlgoritmo[indexArray]
                                     }
                                }
                    }
                    Logger.log('coloreTurno ' + coloreTurno)
                      arrayColoriTurni[turniConOccorrenzeAddetti[key][q]] = coloreTurno
                   } 
 
                 }
       
                    Logger.log('lunghezza arrayColoriTurni ' + arrayColoriTurni.length)
                    Logger.log('colori giorno ' + arrayGiorni[c] + ' '  + arrayColoriTurni)

                    Logger.log('colonna ' + colonnaTurno)

                    for (var colorIndex = 0; colorIndex<arrayColoriTurni.length; colorIndex++){
                        Logger.log('colore in posizione ' + colorIndex + ' ' + arrayColoriTurni[colorIndex])
                        sheet.getRange(7+colorIndex,colonnaTurno).setBackground(arrayColoriTurni[colorIndex])                    
                    }

          giorniConOccorrenzeAddetti.push(arrayGiorni[c])
        }
   

    Logger.log('Giorni con occorrenze Addetti: ')
    Logger.log(giorniConOccorrenzeAddetti)
       
  }
  

