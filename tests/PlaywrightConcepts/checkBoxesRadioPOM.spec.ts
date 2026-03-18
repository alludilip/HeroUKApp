import { expect, test } from "@playwright/test";
import {CheckBoxesPage} from '../../src/Pages/CheckBoxesPage'
import {HomePage} from '../../src/Pages/HomePage'


test('Checkboxes', async ({ page }) => {

    const homepage = new HomePage(page);
    const checkBoxPage = new CheckBoxesPage(page);

    await homepage.GoToHomePage();
    await homepage.PrintPageTitle();
    await homepage.GotoCheckBoxesPage();
    await checkBoxPage.ClickCheckBox1();
    await checkBoxPage.UncheckCheckBox2();

});
