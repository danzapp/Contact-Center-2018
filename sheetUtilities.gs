function findSheet(date){

  var monthNumber = date.monthYear.slice(-2)
  var sheets = ss.getSheets()
  
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i]
    sheetName = sheet.getName()
    Logger.log(sheetName.slice(0,2))
    if (parseInt(sheetName.substring(0,2),10) == monthNumber){
    Logger.log(sheet.getName())
    return sheet
     }
  }
  return sheet
}

function getDataFromNamedRange(sheetName, rangeName) {
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
    var namedRanges = sheet.getNamedRanges();
    
    if (namedRanges.length > 1) {
     
      for (namedRange in namedRanges){
         if (rangeName == namedRanges[namedRange].getName()){
          var tableRange = namedRanges[namedRange].getRange().getValues()
          var tableRangeA1 = tableRange.getA1Notation()
          Logger.log(tableRange.getA1Notation())
          var tableData = sheet.getRange(tableRangeA1).getValues()
        }  
      }
    }
  return tableData
}

function sortSheets () {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetNameArray = [];
  var sheets = ss.getSheets();
 
  for (var i = 0; i < sheets.length; i++) {
    sheetNameArray.push(sheets[i].getName());
  }
 
  sheetNameArray.sort();
 
  for( var j = 0; j < sheets.length - 3; j++ ) {
    ss.setActiveSheet(ss.getSheetByName(sheetNameArray[j]));
    ss.moveActiveSheet(j + 1);
  }
}

function hideSheets(){
  var sheets = ss.getSheets()
  for (numSheet in sheets){
    sheet = sheets[numSheet]
    sheetName = sheet.getName()
    
    if(isNaN(parseInt(sheetName.substring(0,2),10))){
      Logger.log(sheetName)
      sheet.hideSheet()
    }
    if (!isNaN(parseInt(sheetName.substring(0,2),10))){
      sheetFirstDate = sheet.getRange('B3').getValue()  
      sheetMonth = sheetFirstDate.getMonth()+1
      thisMonth = new Date().getMonth()+1
      if (sheetMonth < thisMonth - 1) {
        if (!sheet.isSheetHidden){
              sheet.hideSheet()
           }
    }
    }
  }
}
