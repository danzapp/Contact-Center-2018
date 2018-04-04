function showSidebarCrea() {
  Logger.log('showSidebarCrea')
 
  var html = HtmlService.createHtmlOutputFromFile('indexCrea')
          .setTitle('Crea prospetto turni')
          .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html)
}

function showSidebarCompila() {
  Logger.log('showSidebarCompila')
 
  var html = HtmlService.createHtmlOutputFromFile('indexCompila')
          .setTitle('Compila prospetto turni')
          .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html)
}

function showSidebarSvuota() {
  Logger.log('showSidebarSvuota')
 
  var html = HtmlService.createHtmlOutputFromFile('indexSvuota')
          .setTitle('Svuota prospetto turni')
          .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html)
}