var PhonesHomepage = function() {
    var searchField = element(by.model('$ctrl.query'));
    var searchFieldTittle = element(by.css('.col-md-2>p:first-child'));
    var sortDropDown = element(by.model('$ctrl.orderProp'));
    var sortByNewest = element(by.css('[ng-model="$ctrl.orderProp"] [value="age"]'));
    var sortByAlphabetical = element(by.css('[ng-model="$ctrl.orderProp"] [value="name"]'));
    var sortDropDownTitle = element(by.css('.col-md-2>p:last-child:not(.ng-pristine)'));
    var allPhones = element.all(by.repeater('phone in $ctrl.phones'));

    this.getUrl = async (url) => {
        await browser.get(url);
    };

    this.maximizeWindow = async () => {
        await browser.manage().window().maximize();
    };

        this.getCurrentUrl = async () => {
        return await browser.getCurrentUrl();
    };

    this.getSearchFieldTitle = () => {
        return searchFieldTittle.getText();
    };

    this.getSearchField = () => {
        return searchField.getAttribute('value');
    };

    this.getSortFieldTitle = () => {
        return sortDropDownTitle.getText().then((text) => {return text.slice(0,8)});
    };

    this.sortNewest = async () => {
       await sortDropDown.getText().then(text => {if (text!='Newest') {sortDropDown.click(); sortByNewest.click()}});
    };

    this.sortAlphabetically = async () => {
        await sortDropDown.getText().then(text => {if (text!='Alphabetical') {sortDropDown.click(); sortByAlphabetical.click()}});
    };

    this.searchForAPhone = async (searchedPhone) => {
        await searchField.sendKeys(searchedPhone);
    };

    this.oneBackspace = async () => {
        await searchField.sendKeys(protractor.Key.BACK_SPACE);
    };

    this.clearSearch = async () => {
        await searchField.clear();
    };

    this.isDesiredPhoneDisplayed = async (indexInPhonesList) => {
        return await allPhones.then(list => list[indexInPhonesList].isDisplayed());
    };
    
    this.getNumberOfDisplayedPhones = async () => {
        return await allPhones.count();
    };

    this.getAllPhones = async () => {
        return await allPhones;
    }
};
module.exports = new PhonesHomepage();