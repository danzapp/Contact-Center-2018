function sendMail(user, subject, mode) {
  //Logger.log(JSON.stringify(user))
  //var recipient = user.email
  var recipient = 'da.zappala@aci.it'
  var body = 'prova'
  MailApp.sendEmail(recipient, subject, body)
}

function findUserMail(userSigla){

    var usersData = usersSheet.getDataRange().getValues()
    var usersObject = ObjApp.rangeToObjectsNoCamel(usersData)
    var user = usersObject.filter(function(el){
        return el.Sigla == userSigla;
    })
    Logger.log(user)
    var userMail = user[0]['email']
    Logger.log('userMail ' + userMail)
    sendMail('da.zappala@aci.it', 'prova', 'onEdit')
}
