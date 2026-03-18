import {expect, Locator, Page} from "@playwright/test"


export class CheckBoxesPage{

    readonly page:Page;
    readonly checkbox1:Locator;
    readonly checkbox2:Locator;

    constructor(page:Page){
        this.page = page;
        this.checkbox1 = this.page.getByRole('checkbox').nth(0);
        this.checkbox2 = this.page.getByRole('checkbox').nth(1);

    }

    // Actions in Home Page

    // Check checkbox 1
    async ClickCheckBox1(){
       await this.checkbox1.check();
        await expect(this.checkbox1).toBeChecked();
    }

    // Uncheck checkbox 1
   async UnCheckCheckBox1(){
       await this.checkbox1.uncheck();
        await expect(this.checkbox1).not.toBeChecked();
    }

    // Check checkbox 2
    async CheckCheckBox2(){
        await this.checkbox2.check();
        await expect(this.checkbox2).toBeChecked();
    }

    // UnCheck checkbox 2
    async UncheckCheckBox2(){
       await this.checkbox2.uncheck();
        await expect(this.checkbox2).not.toBeChecked();
    }



    



}
