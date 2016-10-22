describe('todo list', function () {
    var weatherList;
browser.debugger()

    beforeEach(function () {
        browser.get('http://localhost:8100/#/app/weather');

        weatherList = element.all(by.repeater('todo in todoList.todos'));
        weatherList = element[0].querySelectorAll('.list.card');
    });


    it('should refresh and clean weather list', function () {
        var cleanButton = element(by.css('[value="Clean"]')); // element(by.buttonText('Button 1'))
        var refreshButton = element(by.css('[value="Refresh"]'));

        expect(weatherList.count()).toEqual(0);
        refreshButton.click();
        expect(weatherList.count()).toEqual(1);
        refreshButton.click();
        expect(weatherList.count()).toEqual(2);
        cleanButton.click();
        expect(weatherList.count()).toEqual(0);

    });
});