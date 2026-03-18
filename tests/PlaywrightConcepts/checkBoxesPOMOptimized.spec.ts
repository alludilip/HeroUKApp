import {expect, test} from '../../src/Fixtures/GlobalFixtures_Pages'

test('Checkboxes', async ({ homePage,checkBoxesPage }) => {

    // To check if checkboxes selections are working fine.
    await homePage.GoToHomePage();
    await homePage.GotoCheckBoxesPage();
    await checkBoxesPage.ClickCheckBox1();
    await checkBoxesPage.UncheckCheckBox2();

});
