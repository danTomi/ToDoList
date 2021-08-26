var SelectedPhonePage = function() {
    var specs = element.all(by.css('.specs>li'));
    var pics = element.all(by.repeater('img in $ctrl.phone.images'));
    var phoneName = element(by.css('.ng-isolate-scope>h1'));
    var phoneDescription = element(by.css('.ng-isolate-scope>p'));

    this.phoneNameIsDisplayed = () =>{
        return phoneName.isDisplayed();
    };

    this.phoneDescriptionIsDisplayed = () =>{
        return phoneDescription.isDisplayed();    
    };

    this.phoneDescriptionText = async () =>{
        return await phoneDescription.getText().then( (text) => {if (text.length>10) {return true} else {return false}});
    };

    this.navigateBack = async () => {
        await browser.navigate().back();
    };

    this.getFirstAttribute = async () => {
        return await specs.then( (list) => {return (list[0].element(by.css('span'))).getText();});
    };

    this.getSecondAttribute = async () => {
        return await specs.then( (list) => {return (list[1].element(by.css('span'))).getText();});
    };

    this.getThirdAttribute = async () => {
        return await specs.then( (list) => {return (list[2].element(by.css('span'))).getText();});
    };

    this.getFourthAttribute = async () => {
        return await specs.then( (list) => {return (list[3].element(by.css('span'))).getText();});
    };

    this.getFifthAttribute = async () => {
        return await specs.then( (list) => {return (list[4].element(by.css('span'))).getText();});
    };

    this.getSixthAttribute = async () => {
        return await specs.then( (list) => {return (list[5].element(by.css('span'))).getText();});
    };

    this.getSeventhAttribute = async () => {
        return await specs.then( (list) => {return (list[6].element(by.css('span'))).getText();});
    };

    this.getEighthAttribute = async () => {
        return await specs.then( (list) => {return (list[7].element(by.css('span'))).getText();});
    };

    this.getNinthAttribute = async () => {
        return await specs.then( (list) => {return (list[8].element(by.css('span'))).getText();});
    };

    this.getTenthAttribute = async () => {
        return await specs.then( (list) => {return (list[9].element(by.css('span'))).getText();});
    };
};

module.exports = new SelectedPhonePage();