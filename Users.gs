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


function getUserDetails(currentUserMail){
    
  if (currentUserMail == null) {currentUserMail = 'da.zappala@aci.it'}
 
    var tableUsersData = usersSheet.getDataRange().getValues()
    // converte la tabella utenti in objects array
  
    var userObjArray = ObjApp.rangeToObjectsNoCamel(tableUsersData)
    Logger.log('UserTable')
 
    var currentUserObj = userObjArray.filter(function (el){
      return el.email == currentUserMail
    }) 
    Logger.log(JSON.stringify(currentUserObj))
    
    return currentUserObj[0]
}


function getUserRole(){
  var sheetRoles = ss.getSheetByName('Ruoli')
}