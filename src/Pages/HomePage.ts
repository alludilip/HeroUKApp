import {Locator, Page} from "@playwright/test"


export class HomePage{

    readonly page:Page;
    readonly basicAuthLink:Locator;
    readonly checkBoxesLink:Locator;

    constructor(page:Page){
        this.page = page;
        this.basicAuthLink = this.page.getByRole('link',{name:'Basic Auth'});
        this.checkBoxesLink = this.page.getByRole('link',{name:'Checkboxes'});
    }

    // Actions in Home Page

    async GoToHomePage(){
        await this.page.goto("https://the-internet.herokuapp.com/");
        await this.page.waitForURL("https://the-internet.herokuapp.com/");
    }

    async GotoBasicAuthPage(){
        await this.basicAuthLink.click();
    }

    async GotoCheckBoxesPage(){
        await this.checkBoxesLink.click();
    }

}
