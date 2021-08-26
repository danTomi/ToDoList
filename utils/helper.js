var listOfTasks = require ('../data/listOfTasks.json');

var Tasks = function() {

this.getTask = async (taskNumber) => {
    return await listOfTasks[taskNumber].trim();
};

this.getDisplayedTask = (taskNumber) => {
    return listOfTasks[taskNumber].replace(/\s{2,}/g,' ').trim(); //Regex to remove all whitescape except one between words
};

};
module.exports = new Tasks();
