var HtmlReporter = require('protractor-beautiful-reporter');
var today = new Date(),

addZerroForMinutesSmallerThanTen = function () {
  if (today.getMinutes()>9) {return today.getMinutes()} else {return ('0'+today.getMinutes())};
};

addZerroForHoursSmallerThanTen = function () {
  if (today.getHours()>9) {return today.getHours()} else {return ('0'+today.getHours())};
};

addZerroForDatesSmallerThanTen = function () {
  if (today.getDate()>9) {return today.getDate()} else {return ('0'+today.getDate())};
};

addZerroForMonthsSmallerThanTen = function () {
  if ((today.getMonth() + 1)>9) {return (today.getMonth() + 1)} else {return ('0'+ (today.getMonth() + 1))};
};

timeStamp = addZerroForDatesSmallerThanTen() + '-' + addZerroForMonthsSmallerThanTen() + '-' + today.getFullYear() + '/' + addZerroForHoursSmallerThanTen() + '-' + addZerroForMinutesSmallerThanTen();


exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./tests/*.js'],
  capabilities: {
    browserName: 'chrome'
  },
  jasmineNodeOpts: {defaultTimeoutInterval: 120000},
  onPrepare: () => {
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'reports/'+timeStamp,
      screenshotsSubfolder: 'images',
      jsonsSubfolder: 'jsons',
      excludeSkippedSpecs: true,
      takeScreenShotsOnlyForFailedSpecs: true,
      docTitle: 'Test Report To-Do List -- Test run on: '+timeStamp,
      docName: 'report.html'
    }).getJasmine2Reporter());
  }
}