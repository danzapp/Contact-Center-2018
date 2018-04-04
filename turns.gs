
function turnType(area, numberOfPersons, sigles, position, color){
    this.area = area;
    this.numberOfPersons = numberOfPersons;
    this.persons = sigles;
    this.position = position;
    this.color = color;
}


/*
function compileTurn(){
    
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName("Impostazioni")
  var namedRanges = sheet.getNamedRanges()
  for (var i=0; i<namedRanges.length; i++){
      var namedRange = namedRanges[i].getName()
      var dataRange = namedRanges[i].getRange().getValues()
      Logger.log(dataRange)
      if (namedRange == "ImpostazioneTurni"){
         var header = dataRange[0]
        //leggere la posizione massima 
                                 
         
         Logger.log(dataRange[0][0].length)
      }
 }
}
*/
  

