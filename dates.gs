function inspectionMonth(mm){
// ritorna un oggetto con nome del mese, primo giorno, ultimo giorno, numero di giorni, festività
}

function incrementDate(date, d){

//var parseDate = date.split ("/")
//var dd = parseDate[0]
//var MM = parseDate[1]
//var yyyy = parseDate[2]

//var date = new Date (yyyy,MM-1 ,dd)
var incDate=  new Date(date.setDate(date.getDate()+d))

return incDate;
}

function decrementDate(date, d) {
  
//var parseDate = date.split ("/")
//var dd = parseDate[0]
//var MM = parseDate[1]
//var yyyy = parseDate[2]

//var date = new Date (yyyy,MM-1 ,dd)

var decDate=  new Date(date.setDate(date.getDate()- d))

return decDate;
}


function testDate(){
 var date = "01/07/2016"
 d = 1
 Logger.log(isDate(date))
 Logger.log (decrementDate(date,d))
 
}

function isDate(date){
if (date instanceof Date) {
        var d = date; 
        var m = d.getMonth() + 1; //months starts at 0
        var y = d.getFullYear();
        var day = d.getDate();
        var newDate = day + "/" + m + "/" +y;
}
  Logger.log("is Date; " + newDate)
}

function stringToDate(stringDate){
    Logger.log("stringToDate")
    var splitted = stringDate.split("-")
    Logger.log (splitted)
    return splitted
 }   
 
