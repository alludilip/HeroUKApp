import { test as baseTest } from '@playwright/test';
import { CheckBoxesPage } from '../Pages/CheckBoxesPage';
import { HomePage } from '../Pages/HomePage';

type MyFixtures = {
  homePage: HomePage
  checkBoxesPage: CheckBoxesPage
}

export const test = baseTest.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  checkBoxesPage: async ({ page }, use) => {
    await use(new CheckBoxesPage(page))
  },
})


// Re-export expect
export { expect } from '@playwright/test';

