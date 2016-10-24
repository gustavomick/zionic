describe('weather list', function () {
    var weatherList;
    //browser.pause()

    beforeEach(function () {
        browser.get('./#/app/weather');
        weatherList = element.all(by.css('.list.card')); 
    });


    it('should refresh and clean weather list', function () {
        var cleanButton =  element(by.buttonText('Clean'))
        var refreshButton = element(by.buttonText('Refresh'));
        // browser.pause()

        expect(weatherList.count()).toEqual(0);

        refreshButton.click();        
        browser.sleep(3000); 
        // browser.waitForAngular();
        expect(weatherList.count()).toEqual(1);

        refreshButton.click();        
        browser.sleep(3000); 
        // browser.waitForAngular();
        expect(weatherList.count()).toEqual(2);

        cleanButton.click();        
        // browser.waitForAngular();
        expect(weatherList.count()).toEqual(0);


    });
});