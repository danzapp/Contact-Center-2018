function findValueInObject(value){
 for (var i in objCodici){
   if (objCodici[i].Codice===value && objCodici[i]["Tipologia Assenza"] !=''){
     return objCodici[i]["Tipologia Assenza"] 
     break
   } 
 }
}

function listBy(arr, fn) {
Logger.log(arr)
  var listBy = [];
  arr.forEach(function (x) {
    var key = fn(x);
    Logger.log('List by')
    Logger.log(key)
    if (key!='') {  // non include le stringhe nulle
      listBy.push(key);
      //unique[key] = true;
    }
  });
  Logger.log('ListBy ')
  Logger.log(listBy);
  return listBy;
}



// somma tutti i valori di una o più proprietà dell'oggetto

function sum(obj, props) {
  
  var sum = 0;
  
   switch (true){
   
     case props == 'All':
             for( var el in obj ) {
              if( obj.hasOwnProperty( el ) && el!='Addetto' ) {
                Logger.log('prop ' + el + ' ' + obj[el])
                sum += parseFloat( obj[el] );
              }
            }
            break;
            
        default:
            for ( var x=0; x<props.length; x++) {
                prop = props[x]
                for( var el in obj ) {                
                if( obj.hasOwnProperty( el ) && el == prop && el!='Addetto') {
                  Logger.log('prop ' + prop + ' ' + obj[el])
                  sum += parseFloat( obj[prop] );
                }
              }
          }
     }
     
return sum;
}

function counter( obj, props ) {
  
  var count = 0;
  var sintesi = []
  
   switch (true){
   
        case props == 'All':
            for( var el in obj ) {
              if( obj.hasOwnProperty( el ) && el!='Addetto') {
                Logger.log('prop ' + el + ' ' + obj[el])
                count += parseFloat( obj[el] );
              }
            }
            sintesi.push([el,count])
            break;
              
        default:
            for ( var x=0; x<props.length; x++) {
                prop = props[x]
                for( var el in obj ) {
                  
                  if( obj.hasOwnProperty( el ) && el == prop && el!= 'Addetto') {
                    Logger.log('prop ' + prop + ' ' + obj[el])
                    count += parseFloat( obj[el]) ;
                  }
                }
                sintesi.push([el,count])
            }
            
     }   
     
  var riepilogo = {
     count: count,
     sintesi: sintesi
  }
  
  return riepilogo;
}


Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


function objToArray2D(obj){
  var array = []
  for (var i in obj){
     var subArray = []
     subArray.push(obj[i]['cognome'])
     for (var key in obj[i]['Tipologia']){
         subArray.push(obj[i]['Tipologia'][key])
       }
     for (var key in obj[i]['straordinario']){
         subArray.push(obj[i]['straordinario'][key])
       }
     array.push(subArray)
  }
return array
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function getNum(val) {
   if (isNaN(val)) {
     return 0;
   }
   return val;
}

function convertHHMMSSToSeconds(hms){
   // per il test
   //hms = new Date('Sat Dec 30 1899 13:24:00 GMT+0100 (CET)')
   if (typeof(hms) == 'number' || hms == ''){
     //Logger.log('NUMBER')
     //Logger.log('hms is NUMBER= ' + hms)
        var hours = 99
        var minutes = 59
        var seconds = 59
   }

   // verifica che hms sia DATE
   if (typeof(hms) == 'object'){
        //Logger.log('DATE')
        var hours = hms.getHours()
        var minutes = hms.getMinutes()
        var seconds = hms.getSeconds()
   }
  
  //verifica se hms è STRING
  if (typeof(hms) == 'string'){
  
  //Logger.log('STRING')
     var a = hms.split(':'); // split it at the colons
     // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var hours = a[0]
        var minutes = a[1]
        var seconds = a[2]
   }
  var time = (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds);     
  /*
  Logger.log('convertHHMMSSToSeconds(' + hms +')') 
  Logger.log('hms ' + hms)
  Logger.log('type ' + typeof(hms))   
  Logger.log('hours ' + hours)
  Logger.log('minutes ' + minutes)
  Logger.log ('seconds ' + seconds)
  Logger.log('time ' + time)
  */
  return time
}

function convertSecondsToHHMM(seconds){
var minutes = (seconds/3600) - (seconds % 3600)
     if (minutes == 0 || typeof(minutes) != 'number'){
       return '00:00'
     }
     var hours = parseInt( seconds / 3600 );
     var minutes = parseInt( (seconds - (hours * 3600)) / 60 );
     var seconds = Math.floor((seconds - ((hours * 3600) + (minutes * 60))));
     var hhmm = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
 return(hhmm);

}

function lookup(obj,propA,valueA,propB){

  for (var x=0; x<obj.length; x++){
      if (obj[x][propA] == valueA){
          return obj[x][propB]
      }
  }    
  return null

}

function sortObj(objArray,prop) {

  var n = objArray.length,swap;
  for (var c = 0 ; c < ( n - 1 ); c++)
  {
    for (d = 0 ; d < n - c - 1; d++)
    {
      if (objArray[d][prop] > objArray[d+1][prop]) 
      {
        //Logger.log(objArray[d][prop] + ' > ' + objArray[d+1][prop])
        swap       = objArray[d];
        objArray[d]   = objArray[d+1];
        objArray[d+1] = swap;
        //Logger.log(objArray[d][prop] + ' < ' + objArray[d+1][prop])
      }
    }
  }
  return objArray
}

function clone(obj) {
    var copy;
 
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;
 
    // Clone a Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
 
    // Clone an Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
 
    // Handle Object
    if (obj instanceof Object) {
        copy = Object.create( Object.getPrototypeOf( obj ) ) ;
    		var descriptor , keys = Object.getOwnPropertyNames( obj ) ;
 
      for ( var i = 0 ; i < keys.length ; i ++ ){
        // Save the source's descriptor
        descriptor = Object.getOwnPropertyDescriptor( obj , keys[ i ] ) ;
 
        if ( descriptor.value && typeof descriptor.value === 'object' ){
            descriptor.value = clone( descriptor.value ) ;
        }
 
        Object.defineProperty(copy, keys[ i ], descriptor) ;
    	}
      
      return copy ;
    }
 
    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function transpose(a) {
    return Object.keys(a[0]).map(function (c) {
        return a.map(function (r) {
            return r[c];
        });
    });
}


// input  [RBN, RBN, RD, TS, RDB]
// output {RDB=[4.0], RD=[2.0], RBN=[0.0, 1.0], TS=[3.0]}

function countElements(arr) {
  
  //Logger.log(arr)
  
  var map = {};

  for (var i = 0; i < arr.length; i++) {
    var element = arr[i];  // arr[i] is the element in the array at position i
    
       //Logger.log('map element ' + element)
       //Logger.log( 'map content ' + i)
   
    // if we haven't seen the element yet, 
    // we have to create a new entry in the map
    if (!map[element]) {
        // se l'elemento non è null
        //if (element != null){
          map[element] = [i];
        //}
    }
    else {
       // otherwise append to the existing array
       
        map[element].push(i);
       }
    }
    // the whole if - else statement can be shortend to
    // (map[element] || (map[element] = [])).push(i)
  return map;
  }
  
  
  
