var phoneHomepage = require ('../pages/phonesHomepage.js');
var selectedPhonePage = require ('../pages/selectedPhonePage.js')

var url = 'http://angular.github.io/angular-phonecat/step-14/app/#!/phones';

describe ('Test Cases Phones - ', () => {
    beforeAll( async () => {
        await phoneHomepage.getUrl(url);
        await phoneHomepage.maximizeWindow();
        expect(phoneHomepage.getCurrentUrl()).toMatch(url,'[beforeAll-1] The loaded URL is wrong!');        
        expect(phoneHomepage.getSearchFieldTitle()).toEqual('Search:','[beforeAll-2] The search field is not available!');
        expect(phoneHomepage.getSortFieldTitle()).toEqual('Sort by:','[beforeAll-3] The search field is not available!');
    });

    beforeEach( async () => {
        phoneHomepage.getCurrentUrl().then(currentUrl => {if (currentUrl!=url) {phoneHomepage.getUrl(url)} 
        else { phoneHomepage.getSearchField().then(text  => {if (text!=""){phoneHomepage.clearSearch()}})}});
    });

    describe ('Test Case 1: ', () => {
        it ('Search for Dell', async () => {
            await phoneHomepage.sortNewest();
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'01 - The list is empty');
            expect(phoneHomepage.isDesiredPhoneDisplayed(19)).toBe(true,'02 - Not all the elements are displayed');
            await phoneHomepage.searchForAPhone('Dell');
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'03 - The list is empty');
            expect(phoneHomepage.getNumberOfDisplayedPhones()).toBe(2,'04 - Not all the elements are displayed');
            await phoneHomepage.clearSearch();
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'05 - The list is empty');
            expect(phoneHomepage.isDesiredPhoneDisplayed(19)).toBe(true,'06 - Not all the elements are displayed');
        });
    });

    describe ('Test Case 2: ', () => {
        it ('Search for " ", then for "MoToRoLa"', async () => {
            await phoneHomepage.sortAlphabetically();
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'01 - The list is empty');
            expect(phoneHomepage.isDesiredPhoneDisplayed(19)).toBe(true,'02 - Not all the elements are displayed');
            await phoneHomepage.searchForAPhone(' ');
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'03 - The list is empty');
            expect(phoneHomepage.isDesiredPhoneDisplayed(19)).toBe(true,'04 - Not all the elements are displayed');
            await phoneHomepage.searchForAPhone('MoToRoLa');
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'05 - The list is empty');
            expect(phoneHomepage.getNumberOfDisplayedPhones()).toBe(8,'06 - Not all the elements are displayed');
        });
    });

    describe ('Test Case 3: ', () => {
        it ('Search for "1"', async () => {
            await phoneHomepage.sortNewest();
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'01 - The list is empty');
            expect(phoneHomepage.isDesiredPhoneDisplayed(19)).toBe(true,'02 - Not all the elements are displayed');
            await phoneHomepage.searchForAPhone('1');
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'03- The list is empty');
            expect(phoneHomepage.getNumberOfDisplayedPhones()).toBe(11,'04 - Not all the elements are displayed');
            await phoneHomepage.sortAlphabetically();
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'05 - The list is empty');
            expect(phoneHomepage.getNumberOfDisplayedPhones()).toBe(11,'06 - Not all the elements are displayed');
        });
    });

    describe ('Test Case 4: ', () => {
        it ('Search for "we"', async () => {
            await phoneHomepage.sortAlphabetically();
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'01 - The list is empty');
            expect(phoneHomepage.isDesiredPhoneDisplayed(19)).toBe(true,'02 - Not all the elements are displayed');
            await phoneHomepage.searchForAPhone('we');
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'03- The list is empty');
            expect(phoneHomepage.getNumberOfDisplayedPhones()).toBe(6,'04 - Not all the elements are displayed');
            await phoneHomepage.searchForAPhone('0');
            expect(phoneHomepage.getNumberOfDisplayedPhones()).toBe(0,'05 - Not all the elements are displayed');
        });
    });

    describe ('Test Case 5: ', () => {
        it ('Search for " exU "', async () => {
            await phoneHomepage.sortNewest();
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'01 - The list is empty');
            expect(phoneHomepage.isDesiredPhoneDisplayed(19)).toBe(true,'02 - Not all the elements are displayed');
            await phoneHomepage.searchForAPhone(' exU ');
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'03- The list is empty');
            expect(phoneHomepage.getNumberOfDisplayedPhones()).toBe(1,'04 - Not all the elements are displayed');
            await phoneHomepage.sortAlphabetically();
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'05 - The list is empty');
            expect(phoneHomepage.getNumberOfDisplayedPhones()).toBe(1,'06 - Not all the elements are displayed');
        });
    });

    describe ('Test Case 6: ', () => {
        it ('Search for "Str"', async () => {
            await phoneHomepage.searchForAPhone('Str');
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'01- The list is empty');
            expect(phoneHomepage.getNumberOfDisplayedPhones()).toBe(2,'02 - Not all the elements are displayed');
            await phoneHomepage.searchForAPhone('p');
            expect(phoneHomepage.getNumberOfDisplayedPhones()).toBe(0,'03 - Not all the elements are displayed');
            await phoneHomepage.oneBackspace();
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'04- The list is empty');
            expect(phoneHomepage.getNumberOfDisplayedPhones()).toBe(2,'05 - Not all the elements are displayed');

        });
    });

    describe ('Test Case 7: ', () => {
        it ('Select each phone with name link', async () => {
            await phoneHomepage.sortNewest();
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'01 - The list is empty');
            expect(phoneHomepage.isDesiredPhoneDisplayed(19)).toBe(true,'02 - Not all the elements are displayed');
            await phoneHomepage.getNumberOfDisplayedPhones().then( (listLength) => {numberOfElements=listLength});
            var i=3;
            for (j=0;j<numberOfElements;j++) {  
            await phoneHomepage.getAllPhones().then( async (listOfAllPhones) => {
                                                            await listOfAllPhones[j].element(by.css('a.ng-binding')).click();});
                                                            expect(selectedPhonePage.phoneNameIsDisplayed()).toBe(true,i+' - The phone title is not displayed!');
                                                            expect(selectedPhonePage.phoneDescriptionIsDisplayed()).toBe(true,i+++' - The phone description is not displayed!');
                                                            expect(selectedPhonePage.phoneDescriptionText()).toBe(true,i+++' - The phone description is missing!');
                                                            expect(selectedPhonePage.getFirstAttribute()).toEqual('Availability and Networks',i+++' - First attribute is missing');
                                                            expect(selectedPhonePage.getSecondAttribute()).toEqual('Battery',i+++' - Second attribute is missing');
                                                            expect(selectedPhonePage.getThirdAttribute()).toEqual('Storage and Memory',i+++' - Third attribute is missing');
                                                            expect(selectedPhonePage.getFourthAttribute()).toEqual('Connectivity',i+++' - Fourth attribute is missing');
                                                            expect(selectedPhonePage.getFifthAttribute()).toEqual('Android',i+++' - Fifth attribute is missing');
                                                            expect(selectedPhonePage.getSixthAttribute()).toEqual('Size and Weight',i+++' - Sixth attribute is missing');
                                                            expect(selectedPhonePage.getSeventhAttribute()).toEqual('Display',i+++' - Seventh attribute is missing');
                                                            expect(selectedPhonePage.getEighthAttribute()).toEqual('Hardware',i+++' - Eighth attribute is missing');
                                                            expect(selectedPhonePage.getNinthAttribute()).toEqual('Camera',i+++' - Ninth attribute is missing');
                                                            expect(selectedPhonePage.getTenthAttribute()).toEqual('Additional Features',i+++' - Tenth attribute is missing');
                                                            await selectedPhonePage.navigateBack();
                                                            };
            await phoneHomepage.sortAlphabetically();
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'264 - The list is empty');
            expect(phoneHomepage.getNumberOfDisplayedPhones()).toBe(20,'265 - Not all the elements are displayed');
        });
    });

    describe ('Test Case 8: ', () => {
        it ('Select each phone with picture link', async () => {
            await phoneHomepage.sortAlphabetically();
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'01 - The list is empty');
            expect(phoneHomepage.isDesiredPhoneDisplayed(19)).toBe(true,'02 - Not all the elements are displayed');
            await phoneHomepage.getNumberOfDisplayedPhones().then( (listLength) => {numberOfElements=listLength});
            var i=3;
            for (j=0;j<numberOfElements;j++) {  
            await phoneHomepage.getAllPhones().then( async (listOfAllPhones) => {
                                                            await listOfAllPhones[j].element(by.css('a.thumb')).click();});
                                                            expect(selectedPhonePage.phoneNameIsDisplayed()).toBe(true,i+' - The phone title is not displayed!');
                                                            expect(selectedPhonePage.phoneDescriptionIsDisplayed()).toBe(true,i+++' - The phone description is not displayed!');
                                                            expect(selectedPhonePage.phoneDescriptionText()).toBe(true,i+++' - The phone description is missing!');
                                                            expect(selectedPhonePage.getFirstAttribute()).toEqual('Availability and Networks',i+++' - First attribute is missing');
                                                            expect(selectedPhonePage.getSecondAttribute()).toEqual('Battery',i+++' - Second attribute is missing');
                                                            expect(selectedPhonePage.getThirdAttribute()).toEqual('Storage and Memory',i+++' - Third attribute is missing');
                                                            expect(selectedPhonePage.getFourthAttribute()).toEqual('Connectivity',i+++' - Fourth attribute is missing');
                                                            expect(selectedPhonePage.getFifthAttribute()).toEqual('Android',i+++' - Fifth attribute is missing');
                                                            expect(selectedPhonePage.getSixthAttribute()).toEqual('Size and Weight',i+++' - Sixth attribute is missing');
                                                            expect(selectedPhonePage.getSeventhAttribute()).toEqual('Display',i+++' - Seventh attribute is missing');
                                                            expect(selectedPhonePage.getEighthAttribute()).toEqual('Hardware',i+++' - Eighth attribute is missing');
                                                            expect(selectedPhonePage.getNinthAttribute()).toEqual('Camera',i+++' - Ninth attribute is missing');
                                                            expect(selectedPhonePage.getTenthAttribute()).toEqual('Additional Features',i+++' - Tenth attribute is missing');
                                                            await selectedPhonePage.navigateBack();
                                                            };
            await phoneHomepage.sortNewest();
            expect(phoneHomepage.isDesiredPhoneDisplayed(0)).toBe(true,'264 - The list is empty');
            expect(phoneHomepage.getNumberOfDisplayedPhones()).toBe(20,'265 - Not all the elements are displayed');
        });
    });
});