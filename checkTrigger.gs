function checkTriggers(){
  
var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
var status = authInfo.getAuthorizationStatus();
var url = authInfo.getAuthorizationUrl();

Logger.log('Authorization status ' + url)

Logger.log('Trigger source: ' + ScriptApp.TriggerSource)

// Get triggers  
var ss = SpreadsheetApp.getActiveSpreadsheet()
var triggers = ScriptApp.getProjectTriggers()

// Loop through each trigger
triggers.forEach(function(trigger) {

    // Get the id
    var id = trigger.getTriggerSourceId();

    // You can then use that id to get the related form or a sheet. E.g. :
    var ss = SpreadSheetApp.openById(id);

    // You can also work with the trigger (i.e. delete it)
    //ScriptApp.deleteTrigger(trigger);

  });
}