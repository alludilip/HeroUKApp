import { expect } from "@playwright/test";
import {test} from '../../src/Fixtures/GlobalFixtures'
import {CheckBoxesPage} from '../../src/Pages/CheckBoxesPage'
import {HomePage} from '../../src/Pages/HomePage'


test('Checkboxes', async ({ page }) => {

    // To check if checkboxes selections are working fine.
    const homepage = new HomePage(page);
    const checkBoxPage = new CheckBoxesPage(page);

    await homepage.GoToHomePage();
    await homepage.GotoCheckBoxesPage();
    await checkBoxPage.ClickCheckBox1();
    await checkBoxPage.UncheckCheckBox2();

});
