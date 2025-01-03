import { Given, BeforeAll, Before, BeforeStep, When } from "@cucumber/cucumber";
import Salesforce from "../../support/core/Salesforce";

import { buildSQLQuery } from "../../support/utils/command";

Before ( async (data) => {
    await Salesforce.launchBrowser({ headless: process.env.HEADLESS_MODE === 'true' ? true : false });
    await Salesforce.loginSF();
});

BeforeStep( async () => {
    await Salesforce.wait();
});

Given(
    "logged in as a {string}",
    async (profile: string) => {
        await Salesforce.loggedInAs(profile);
});

Given(
    "I select the {string} application", 
    async (application: string) => {
        await Salesforce.actions.appLauncher(application);
});

Given(
    "I open the {string} object list view and select the {string} view name",
    async (objectName: string, listViewName: string) => {
        await Salesforce.actions.appLauncher(objectName);
        await Salesforce.actions.selectListViewName("Purchase Orders", listViewName);
});


Given(
    "the user open a found {string} Purchase Order from the list and is redirected to the page layout",
    async (recordType:string) => {
        const clauses: [{}] = [{ field: "Recordtype.DeveloperName", value: recordType, operand: 'qto' }];
        const { Id, Name }: any = await Salesforce.getRecords({ objectname: 'Purchase_Order__c', fields: ['id', 'Name'], clauses });
        await Salesforce.actions.searchAndPickRecord('listViewInput.Search', Name, { id:Id });
    }
);

When(
    "the user click on {string} quick action to be able to open the pop-up",
    async (quickActionName:string) => {
        const quickAction = await Salesforce.get('sf', 'quickActionButton', { quickActionName });        
        quickAction?.click();
    }
)