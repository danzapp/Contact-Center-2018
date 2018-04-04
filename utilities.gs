function zeroPadMonth(number, width) {
var string = String(number);
while (string.length < width)
string = "0" + string;
return string;
}



function sheetMonthName(mm){
    var sheetMonthName = zeroPadMonth(mm,2)+ " (" + Month[mm] +")"
return sheetMonthName
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function get_used_rows(sheet, column){

      var range = sheet.getRange(1,column,sheet.getLastRow())
     
      for (var r = sheet.getLastRow(); r--; r > 0) {
        if (range.getCell(r, 1).getValue() != ""){
        Logger.log(r)
         return r;
          break;
        }
      }
    }


function convertHEXtoRGB(h){

  R = hexToR(h)
  G = hexToR(h)
  B = hexToR(h)
  
  return [R,G,B]
}

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}


function getCurrentUserEmail() {

    var userEmail = Session.getActiveUser().getEmail();
    if (userEmail === '' || !userEmail || userEmail === undefined) {
        userEmail = PropertiesService.getUserProperties().getProperty('userEmail');
        if (!userEmail) {
            var protection = SpreadsheetApp.getActive().getRange('A1').protect();
            protection.removeEditors(protection.getEditors());
            var editors = protection.getEditors();
            if (editors.length === 2) {
                var owner = SpreadsheetApp.getActive().getOwner();
                editors.splice(editors.indexOf(owner), 1);
            }
            userEmail = editors[0];
            protection.remove();
            PropertiesService.getUserProperties().setProperty('userEmail', userEmail);
        }
    }
    return userEmail;
}