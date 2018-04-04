function fillCalendarNew() {
  /*
  crea un oggetto turno
  imposta proprietà mese e anno
  imposta proprietà (array) giorno
  imposta proprietà di giorno = holiday o weekHoliday

  
  var person = new Object();
person.firstName = "John";
person.lastName = "Doe";
person.age = 50;
person.eyeColor = "blue";
  */
  
  var turno =  new Object();
    turno.mese = "01";
    turno.anno = "2016";
    turno.days = [1]['capodanno'],[6]['epifania'];
  
   Logger.log(turno.days[0][0])
}
