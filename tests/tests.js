var toDoListHomepage = require ('../pages/toDoListHomepage.js');
var tasksList = require ('../utils/helper.js');
var checkedTask = 'ng-scope completed';
var notCheckedTask = 'ng-scope';
var extraText = ', this text is added extra!';
var toDoListHomepageName = 'todos';
var empty = 0;
var displayed = true;
var notDisplayed = false;

var url = 'https://todomvc.com/examples/angularjs/#/';
var urlActive = 'https://todomvc.com/examples/angularjs/#/active';
var urlCompleted = 'https://todomvc.com/examples/angularjs/#/completed';

this.checkDisplayStatusOfAll = (selectDeselectAll,itemsLeft,allViewButton,activeViewButton,completedViewButton,clearCompletedButton) => {
    expect(toDoListHomepage.isTheToDoListEmty()).toBe(selectDeselectAll,'[001] Display status for "Select/Deselect all" button is wrong!');
    expect(toDoListHomepage.checkItemsLeftDisplayStatus()).toBe(itemsLeft,'[002] Display status for "items left" is wrong!');
    expect(toDoListHomepage.checkAllViewDisplayStatus()).toBe(allViewButton,'[003] Display status for "All" button is wrong!');
    expect(toDoListHomepage.checkActiveViewDisplayStatus()).toBe(activeViewButton,'[004] Display status for "Active" button is wrong!');
    expect(toDoListHomepage.checkCompletedViewDisplayStatus()).toBe(completedViewButton,'[005] Display status for "Completed" button is wrong!');
    expect(toDoListHomepage.checkClearCompletedDisplayStatus()).toBe(clearCompletedButton,'[006] Display status for "Clear completed" button is wrong!');        
};

describe ('Test Cases: ', () => {
    beforeAll( async () => {
        await toDoListHomepage.getUrl(url);
        await browser.manage().window().maximize();
        expect(toDoListHomepage.getCurrentUrl()).toMatch(url,'[001] The loaded URL is wrong!');        
        expect(toDoListHomepage.getTodosPageName()).toEqual(toDoListHomepageName,'[002] The loaded page is wrong!');
    });
    beforeEach( async () => {
        await toDoListHomepage.isTheToDoListEmty().then( async (emptyList) => {
            if (emptyList==true) {
                await toDoListHomepage.addNewTask(tasksList.getTask(0));
                expect(toDoListHomepage.getLastEnteredTaskText()).toEqual(tasksList.getDisplayedTask(0),'[003] The displayed task is wrong!');
        
                await toDoListHomepage.clickAllView();
                expect(toDoListHomepage.getCurrentUrl()).toMatch(url,'[004] The loaded URL is wrong!');
        
                await toDoListHomepage.selectDeselectAll();
                expect(toDoListHomepage.getLastEnteredTaskStatus()).toEqual(checkedTask,'[005] The task is not checked!');
        
                await toDoListHomepage.clickClearCompleted();
                expect(toDoListHomepage.getNumberOfTasks()).toBe(empty,'[006] The to-do list is not empty!');
            };
        });        
    });

    it ('Test Case 01 -> Create a to-do list with 4 tasks', async () => {

        await toDoListHomepage.addNewTask(tasksList.getTask(1));
        expect(toDoListHomepage.getLastEnteredTaskText()).toEqual(tasksList.getDisplayedTask(1),'[01] The displayed task is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        await toDoListHomepage.addNewTask(tasksList.getTask(2));
        toDoListHomepage.getNumberOfTasks().then ( (numberOfTasks) => {
        expect(toDoListHomepage.getDesiredTaskText(numberOfTasks-1)).toEqual(tasksList.getDisplayedTask(2),'[02] The displayed task is wrong!');
        });
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(2));
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(2))).toEqual(checkedTask,'[03] The task is not checked!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.clickActiveView();
        expect(toDoListHomepage.getCurrentUrl()).toMatch(urlActive,'[04] The loaded URL is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(1,'[05] The number of tasks is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(1),'[06] The displayed task is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.clickCompletedView();
        expect(toDoListHomepage.getCurrentUrl()).toMatch(urlCompleted,'[07] The loaded URL is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(1,'[08] The number of tasks is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(2),'[09] The displayed task is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.clickAllView();
        expect(toDoListHomepage.getCurrentUrl()).toMatch(url,'[10] The loaded URL is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(2,'[11] The number of tasks is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(1),'[12] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(1)).toEqual(tasksList.getDisplayedTask(2),'[13] The displayed task is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.modifyExistingDesiredTask(tasksList.getDisplayedTask(1),extraText);
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(1)+extraText)).toEqual(notCheckedTask,'[14] The task is checked!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.modifyExistingDesiredTask(tasksList.getDisplayedTask(2),extraText);
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(2)+extraText)).toEqual(checkedTask,'[15] The task is not checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(1)+extraText)).toEqual(notCheckedTask,'[16] The task is checked!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.addNewTask(tasksList.getTask(3));
        expect(toDoListHomepage.getLastEnteredTaskText()).toEqual(tasksList.getDisplayedTask(3),'[17] The displayed task is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.addNewTask(tasksList.getTask(4));
        expect(toDoListHomepage.getLastEnteredTaskText()).toEqual(tasksList.getDisplayedTask(4),'[18] The displayed task is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(4));
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(4))).toEqual(checkedTask,'[19] The task is not checked!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.clickClearCompleted();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(2,'[20] The number of tasks is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(1)+extraText,'[21] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(1)).toEqual(tasksList.getDisplayedTask(3),'[22] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(1)+extraText)).toEqual(notCheckedTask,'[23] The task is checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(3))).toEqual(notCheckedTask,'[24] The task is checked!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        await toDoListHomepage.clickActiveView();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(2,'[25] The number of tasks is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(1)+extraText,'[26] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(1)).toEqual(tasksList.getDisplayedTask(3),'[27] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(1)+extraText)).toEqual(notCheckedTask,'[28] The task is checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(3))).toEqual(notCheckedTask,'[29] The task is checked!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        await toDoListHomepage.clickCompletedView();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(empty,'[30] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        await toDoListHomepage.clickAllView();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(2,'[31] The number of tasks is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(1)+extraText,'[32] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(1)).toEqual(tasksList.getDisplayedTask(3),'[33] The displayed task is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        await toDoListHomepage.deletedesiredTask(tasksList.getDisplayedTask(1)+extraText);
        await toDoListHomepage.deletedesiredTask(tasksList.getDisplayedTask(3));
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(empty,'[34] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(notDisplayed,notDisplayed,notDisplayed,notDisplayed,notDisplayed,notDisplayed);
    });

describe ('Test Case 02 -> ', () => {
    
    it ('Verify that all the characters can be entered as a task', async () => {

        for (i=5;i<11;i++){
            await toDoListHomepage.addNewTask(tasksList.getTask(i));
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(6,'[01] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);
        for (i=0,j=5;j<11;i++,j++){
            expect(toDoListHomepage.getDesiredTaskText(i)).toEqual(tasksList.getTask(j),'[0'+(i+2)+'] The displayed task is wrong!')
        };
    });
});

describe ('Test Case 03 -> ', () => {

    it ('Verify different kinds of combinations, regarding length and characters, entered as tasks', async () => {

        for (i=11;i<24;i++){
            await toDoListHomepage.addNewTask(tasksList.getTask(i));
        };        
        for (i=0,j=11;j<24;i++,j++){
            expect(toDoListHomepage.getDesiredTaskText(i)).toEqual(tasksList.getDisplayedTask(j),'['+(i+1)+'] The displayed task is wrong!');
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(13,'[14] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);
    });
});

describe ('Test Case 04 -> ', () => {

    it ('Verify that the space character is ignored at the beginning and at the end of a task', async () => {
        await toDoListHomepage.addNewTask(tasksList.getTask(24));
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getTask(24),'[01] The displayed task is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(1,'[02] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        await toDoListHomepage.addNewTask(tasksList.getTask(25));
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getTask(24),'[03] The displayed task is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(1,'[04] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        await toDoListHomepage.addNewTask(tasksList.getTask(26));
        expect(toDoListHomepage.getDesiredTaskText(1)).not.toEqual(tasksList.getTask(26),'[05] The displayed task is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(2,'[06] The number of tasks is wrong!');
        expect(toDoListHomepage.getDesiredEditableTaskText(1)).toEqual(tasksList.getTask(26),'[07] The displayed task is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        await toDoListHomepage.addNewTask(tasksList.getTask(27));
        expect(toDoListHomepage.getDesiredTaskText(2)).not.toEqual(tasksList.getTask(27),'[08] The displayed task is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(3,'[09] The number of tasks is wrong!');
        expect(toDoListHomepage.getDesiredEditableTaskText(2)).toEqual(tasksList.getTask(27),'[10] The displayed task is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        await toDoListHomepage.addNewTask(tasksList.getTask(28));
        expect(toDoListHomepage.getDesiredTaskText(3)).not.toEqual(tasksList.getTask(28),'[11] The displayed task is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(4,'[12] The number of tasks is wrong!');
        expect(toDoListHomepage.getDesiredEditableTaskText(3)).toEqual(tasksList.getTask(28),'[13] The displayed task is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);
    });
});

describe ('Test Case 05 -> ', () => {

    it ('Verify that the views are updated correctly', async () => {
        for (i=29;i<35;i++){
            await toDoListHomepage.addNewTask(tasksList.getTask(i));
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(6,'[01] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('6 items left','[02] The number of "items left" is wrong!');

        await toDoListHomepage.clickActiveView();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(6,'[03] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('6 items left','[04] The number of "items left" is wrong!');

        await toDoListHomepage.clickCompletedView();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(0,'[05] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('6 items left','[06] The number of "items left" is wrong!');

        await toDoListHomepage.clickAllView();
        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(31));
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(31))).toEqual(checkedTask,'[07] The task is not checked!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(6,'[08] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('5 items left','[09] The number of "items left" is wrong!');

        await toDoListHomepage.clickActiveView();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(5,'[10] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('5 items left','[11] The number of "items left" is wrong!');

        await toDoListHomepage.clickCompletedView();
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(31),'[12] The displayed task is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(1,'[13] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('5 items left','[14] The number of "items left" is wrong!');

        await toDoListHomepage.clickClearCompleted();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(empty,'[15] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('5 items left','[16] The number of "items left" is wrong!');

        await toDoListHomepage.clickAllView();
        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(30));
        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(34));
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(30))).toEqual(checkedTask,'[17] The task is not checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(34))).toEqual(checkedTask,'[18] The task is not checked!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(5,'[19] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('3 items left','[20] The number of "items left" is wrong!');

        await toDoListHomepage.clickActiveView();
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(29),'[21] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(1)).toEqual(tasksList.getDisplayedTask(32),'[22] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(2)).toEqual(tasksList.getDisplayedTask(33),'[23] The displayed task is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(3,'[24] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('3 items left','[25] The number of "items left" is wrong!');

        await toDoListHomepage.clickCompletedView();
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(30),'[26] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(1)).toEqual(tasksList.getDisplayedTask(34),'[27] The displayed task is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(2,'[238] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('3 items left','[28] The number of "items left" is wrong!');

        await toDoListHomepage.clickAllView();
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(30))).toEqual(checkedTask,'[29] The task is not checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(34))).toEqual(checkedTask,'[30] The task is not checked!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(5,'[31] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('3 items left','[32] The number of "items left" is wrong!');

        await toDoListHomepage.clickClearCompleted();
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(29),'[33] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(1)).toEqual(tasksList.getDisplayedTask(32),'[34] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(2)).toEqual(tasksList.getDisplayedTask(33),'[35] The displayed task is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(3,'[36] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('3 items left','[37] The number of "items left" is wrong!');

        await toDoListHomepage.clickActiveView();
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(29),'[38] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(1)).toEqual(tasksList.getDisplayedTask(32),'[39] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(2)).toEqual(tasksList.getDisplayedTask(33),'[40] The displayed task is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(3,'[41] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('3 items left','[42] The number of "items left" is wrong!');

        await toDoListHomepage.clickCompletedView();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(empty,'[43] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('3 items left','[44] The number of "items left" is wrong!');

        await toDoListHomepage.clickActiveView();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(3,'[45] The number of tasks is wrong!');
        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(29));
        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(32));
        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(33));
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(empty,'[46] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('0 items left','[47] The number of "items left" is wrong!');

        await toDoListHomepage.clickCompletedView();
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(29),'[48] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(1)).toEqual(tasksList.getDisplayedTask(32),'[49] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(2)).toEqual(tasksList.getDisplayedTask(33),'[50] The displayed task is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(3,'[51] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('0 items left','[52] The number of "items left" is wrong!');

        await toDoListHomepage.addNewTask(tasksList.getTask(35));
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(29),'[53] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(1)).toEqual(tasksList.getDisplayedTask(32),'[54] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(2)).toEqual(tasksList.getDisplayedTask(33),'[55] The displayed task is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(3,'[56] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('1 item left','[57] The number of "items left" is wrong!');

        await toDoListHomepage.clickActiveView();
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(35),'[58] The displayed task is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(1,'[59] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('1 item left','[60] The number of "items left" is wrong!');

        await toDoListHomepage.clickAllView();
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(29),'[61] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(1)).toEqual(tasksList.getDisplayedTask(32),'[62] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(2)).toEqual(tasksList.getDisplayedTask(33),'[63] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(3)).toEqual(tasksList.getDisplayedTask(35),'[64] The displayed task is wrong!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(4,'[65] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('1 item left','[66] The number of "items left" is wrong!');

        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(35));
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(4,'[67] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('0 items left','[68] The number of "items left" is wrong!');

        await toDoListHomepage.clickClearCompleted();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(empty,'[69] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(notDisplayed,notDisplayed,notDisplayed,notDisplayed,notDisplayed,notDisplayed);
    });
});

describe ('Test Case 06 -> ', () => {

    it ('Check the select/deselect all functionality', async () => {
        for (i=36;i<46;i++){
            await toDoListHomepage.addNewTask(tasksList.getTask(i));
        };        
        for (i=0,j=36;j<46;i++,j++){
            expect(toDoListHomepage.getDesiredTaskText(i)).toEqual(tasksList.getDisplayedTask(j),'['+(i+1)+'] The displayed task is wrong!');
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(10,'[11] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('10 items left','[12] The number of "items left" is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        await toDoListHomepage.selectDeselectAll();
        for (i=36,j=0;i<46;i++,j++){
            expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(i))).toEqual(checkedTask,'['+(j+13)+'] The task is not checked!');
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(10,'[24] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('0 items left','[25] The number of "items left" is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.selectDeselectAll();
        for (i=36,j=0;i<46;i++,j++){
            expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(i))).toEqual(notCheckedTask,'['+(j+26)+'] The task is checked!');
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(10,'[37] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('10 items left','[38] The number of "items left" is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(36));
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(36))).toEqual(checkedTask,'[39] The task is not checked!');
        for (i=37,j=0;i<46;i++,j++){
            expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(i))).toEqual(notCheckedTask,'['+(j+40)+'] The task is checked!');
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(10,'[50] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('9 items left','[51] The number of "items left" is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.selectDeselectAll();
        for (i=36,j=0;i<46;i++,j++){
            expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(i))).toEqual(checkedTask,'['+(j+52)+'] The task is not checked!');
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(10,'[63] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('0 items left','[64] The number of "items left" is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.selectDeselectAll();
        for (i=36,j=0;i<46;i++,j++){
            expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(i))).toEqual(notCheckedTask,'['+(j+65)+'] The task is checked!');
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(10,'[76] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('10 items left','[77] The number of "items left" is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(37));
        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(39));
        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(42));
        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(43));
        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(44));
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(36))).toEqual(notCheckedTask,'[78] The task is checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(37))).toEqual(checkedTask,'[79] The task is not checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(38))).toEqual(notCheckedTask,'[80] The task is checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(39))).toEqual(checkedTask,'[81] The task is not checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(40))).toEqual(notCheckedTask,'[82] The task is checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(41))).toEqual(notCheckedTask,'[83] The task is checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(42))).toEqual(checkedTask,'[84] The task is not checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(43))).toEqual(checkedTask,'[85] The task is not checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(44))).toEqual(checkedTask,'[86] The task is not checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(45))).toEqual(notCheckedTask,'[87] The task is checked!');
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(10,'[88] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('5 items left','[89] The number of "items left" is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.selectDeselectAll();
        for (i=36,j=0;i<46;i++,j++){
            expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(i))).toEqual(checkedTask,'['+(j+90)+'] The task is not checked!');
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(10,'[101] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('0 items left','[102] The number of "items left" is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.selectDeselectAll();
        for (i=36,j=0;i<46;i++,j++){
            expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(i))).toEqual(notCheckedTask,'['+(j+103)+'] The task is checked!');
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(10,'[114] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('10 items left','[115] The number of "items left" is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        for (i=37;i<46;i++){
            await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(i));
        };
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(36))).toEqual(notCheckedTask,'[116] The task is checked!');
        for (i=37,j=0;i<46;i++,j++){
            expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(i))).toEqual(checkedTask,'['+(j+117)+'] The task is not checked!');
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(10,'[127] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('1 item left','[128] The number of "items left" is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.selectDeselectAll();
        for (i=36,j=0;i<46;i++,j++){
            expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(i))).toEqual(checkedTask,'['+(j+129)+'] The task is not checked!');
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(10,'[140] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('0 items left','[141] The number of "items left" is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.selectDeselectAll();
        for (i=36,j=0;i<46;i++,j++){
            expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(i))).toEqual(notCheckedTask,'['+(j+142)+'] The task is checked!');
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(10,'[153] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('10 items left','[154] The number of "items left" is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,notDisplayed);

        await toDoListHomepage.selectDeselectAll();
        for (i=36,j=0;i<46;i++,j++){
            expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(i))).toEqual(checkedTask,'['+(j+155)+'] The task is not checked!');
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(10,'[166] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('0 items left','[167] The number of "items left" is wrong!');
        this.checkDisplayStatusOfAll(displayed,displayed,displayed,displayed,displayed,displayed);

        await toDoListHomepage.clickClearCompleted();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(empty,'[168] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(notDisplayed,notDisplayed,notDisplayed,notDisplayed,notDisplayed,notDisplayed);   
    });
});

describe ('Test Case 07 -> ', () => {

    it ('Create a to-do list with 300 entries and verify its behavior', async () => {
        for (i=46;i<346;i++){
            await toDoListHomepage.addNewTask(tasksList.getTask(i));
        };
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(300,'[01] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('300 items left','[02] The number of "items left" is wrong!');
        for (i=0,j=46;j<346;i++,j++){
            expect(toDoListHomepage.getDesiredTaskText(i)).toEqual(tasksList.getDisplayedTask(j),'['+(i+3)+'] The displayed task is wrong!');
        }; 

        await toDoListHomepage.clickCompletedView();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(empty,'[01] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('300 items left','[02] The number of "items left" is wrong!');

        await toDoListHomepage.selectDeselectAll();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(300,'[03] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('0 items left','[04] The number of "items left" is wrong!');

        await toDoListHomepage.clickActiveView();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(0,'[05] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('0 items left','[06] The number of "items left" is wrong!');

        await toDoListHomepage.selectDeselectAll();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(300,'[07] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('300 items left','[08] The number of "items left" is wrong!');

        await toDoListHomepage.selectDeselectAll();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(0,'[09] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('0 items left','[10] The number of "items left" is wrong!');

        await toDoListHomepage.clickAllView();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(300,'[11] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('0 items left','[12] The number of "items left" is wrong!');

        await toDoListHomepage.clickClearCompleted();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(empty,'[13] The number of tasks is wrong!');
        this.checkDisplayStatusOfAll(notDisplayed,notDisplayed,notDisplayed,notDisplayed,notDisplayed,notDisplayed); 

    });
});

describe ('Test Case 08 -> ', () => {

    it ('Verify that the to-do list is saved', async () => {
        for (i=0;i<5;i++){
            await toDoListHomepage.addNewTask(tasksList.getTask(i));
        };
        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(1));
        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(3));
        await toDoListHomepage.clickDesiredTask(tasksList.getDisplayedTask(4));
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(5,'[01] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('2 items left','[02] The number of "items left" is wrong!');
        for (i=0,j=0;j<5;i++,j++){
            expect(toDoListHomepage.getDesiredTaskText(i)).toEqual(tasksList.getDisplayedTask(j),'['+(i+3)+'] The displayed task is wrong!');
        };
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(0))).toEqual(notCheckedTask,'[9] The task is checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(1))).toEqual(checkedTask,'[10] The task is not checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(2))).toEqual(notCheckedTask,'[11] The task is checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(3))).toEqual(checkedTask,'[12] The task is not checked!');
        expect(toDoListHomepage.getDesiredTaskStatus(tasksList.getDisplayedTask(4))).toEqual(checkedTask,'[13] The task is not checked!');


        await browser.refresh();
        for (i=0,j=0;j<5;i++,j++){
            expect(toDoListHomepage.getDesiredTaskText(i)).toEqual(tasksList.getDisplayedTask(j),'['+(i+14)+'] The displayed task is wrong!');
        };
        await toDoListHomepage.clickActiveView();
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(2,'[20] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('2 items left','[21] The number of "items left" is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(0),'[22] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(1)).toEqual(tasksList.getDisplayedTask(2),'[23] The displayed task is wrong!');
        

        await toDoListHomepage.openNewTab();
        await toDoListHomepage.getUrl(urlCompleted);
        expect(toDoListHomepage.getNumberOfTasks()).toEqual(3,'[24] The number of tasks is wrong!');
        expect(toDoListHomepage.getNumberOfItemsLeft()).toEqual('2 items left','[25] The number of "items left" is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(0)).toEqual(tasksList.getDisplayedTask(1),'[26] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(1)).toEqual(tasksList.getDisplayedTask(3),'[27] The displayed task is wrong!');
        expect(toDoListHomepage.getDesiredTaskText(2)).toEqual(tasksList.getDisplayedTask(4),'[28] The displayed task is wrong!');
    });
});

});
