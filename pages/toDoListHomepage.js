var ToDoListHomepage = function() {
    var addFieldForToDos = element(by.model('newTodo'));
    var selectDeselectAllButton = element(by.css('.main label[for] '));
    var numberOfItemsLeft = element(by.className('todo-count'));
    var allViewButton = element(by.css('.filters a[href="#/"'));
    var activeViewButton = element(by.css('.filters a[href="#/active"'));
    var completedViewButton = element(by.css('.filters a[href="#/completed"'));
    var clearCompletedButton = element(by.className('clear-completed'));
    var todosPageName = element(by.css('.header>h1'));
    var toDoList = element.all(by.repeater('todo in todos'));
    var taskCheckedStatusAttribute = 'class';
    var taskSelectDeselectButton = 'todo.completed';
    var taskDoubleClickText = 'ng-binding';
    var webElementForDoubleClickedTask = 'todo.title';
    var deleteButton = 'destroy';
    var valueAttribute = 'value';

    this.getUrl = async (url) => {
        await browser.get(url);
    };

    this.getCurrentUrl = async () => {
        return await browser.getCurrentUrl();
    };

    this.getTodosPageName = async () => {
       return await todosPageName.getText();
    };

    this.addNewTask = async (task) => {
        await addFieldForToDos.sendKeys(task);
        await addFieldForToDos.sendKeys(protractor.Key.ENTER);
    };

    this.selectDeselectAll = async () => {
        await selectDeselectAllButton.click();
    };

    this.clickAllView = async () => {
        await allViewButton.click();
    };

    this.clickActiveView = async () => {
        await activeViewButton.click();
    };

    this.clickCompletedView = async () => {
        await completedViewButton.click();
    };

    this.clickClearCompleted = async () => {
        await clearCompletedButton.click();
    };

    this.getNumberOfItemsLeft = async () => {
        return await numberOfItemsLeft.getText();
    };

    this.getLastEnteredTaskText = async () => {
        return await toDoList.last().getText();
    };

    this.getDesiredTaskText = async (taskIndexInTheDisplayedToDoList) => {
        return await toDoList.get(taskIndexInTheDisplayedToDoList).getText();
    };

    this.getDesiredEditableTaskText = async (taskIndexInTheDisplayedToDoList) => {
        return await toDoList.get(taskIndexInTheDisplayedToDoList).element(by.model(webElementForDoubleClickedTask)).getAttribute(valueAttribute);
    };

    this.getLastEnteredTaskStatus = async () => {
        return await toDoList.last().getAttribute(taskCheckedStatusAttribute);
    };

    this.getDesiredTaskStatus = async (taskText) => {
        return await toDoList.filter( element => {
            return element.getText().then( text => {
                return text === taskText
            });
        }).then( desiredTaskStatus => {
            return desiredTaskStatus[0].getAttribute(taskCheckedStatusAttribute);
            });
    };

    this.getNumberOfTasks = async () => {
        return await toDoList.count();
    };

    this.clickDesiredTask = async (taskText) => {
         await toDoList.filter( element => {
            return element.getText().then( text => {
                return text === taskText
            });
        }).then( taskSelectDeselect => {
            taskSelectDeselect[0].element(by.model(taskSelectDeselectButton)).click();
        });
    };

    this.modifyExistingDesiredTask = async (taskText,addingTextToExistingTask) => {
        await toDoList.filter( element => {
           return element.getText().then( text => {
               return text === taskText
           });
       }).then( taskDoubleClick => {
            browser.actions().mouseMove(taskDoubleClick[0].element(by.className(taskDoubleClickText))).doubleClick().perform();
            taskDoubleClick[0].element(by.model(webElementForDoubleClickedTask)).sendKeys(addingTextToExistingTask);
            taskDoubleClick[0].element(by.model(webElementForDoubleClickedTask)).sendKeys(protractor.Key.ENTER);
       });
    };

    this.checkClearCompletedDisplayStatus = async () => {
        return await clearCompletedButton.isDisplayed();
    };

    this.checkItemsLeftDisplayStatus = async () => {
        return await numberOfItemsLeft.isDisplayed();
    };

    this.checkAllViewDisplayStatus = async () => {
       return await allViewButton.isDisplayed();
    };

    this.checkActiveViewDisplayStatus = async () => {
        return await activeViewButton.isDisplayed();
    };

    this.checkCompletedViewDisplayStatus = async () => {
        return await completedViewButton.isDisplayed();
    };

    this.deletedesiredTask = async (taskText) => {
        await toDoList.filter( element => {
            return element.getText().then( text => {
                return text === taskText
            });
        }).then( taskDelete => {
            browser.actions().mouseMove(taskDelete[0].element(by.className(taskDoubleClickText))).perform();
            taskDelete[0].element(by.className(deleteButton)).click();
        });
    };

    this.isTheToDoListEmty = async () => {
        return await selectDeselectAllButton.isDisplayed();
    };

    this.openNewTab = async () => {
        await browser.getWindowHandle().then( (parentGUID) => {
            browser.executeScript('window.open()');
            browser.getAllWindowHandles().then( (allGUID) => {
                for(let guid of allGUID){
					if(guid !=parentGUID){
						browser.switchTo().window(guid);
						break;
					};
				};
            });
        });
    };
};
module.exports = new ToDoListHomepage();