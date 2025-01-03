import { Given, Before, BeforeStep, Then } from "@cucumber/cucumber";
import Salesforce from "../../support/core/Salesforce";

Before ( async (data) => {
    console.log(data);
    await Salesforce.loginSF();
});

BeforeStep( async () => {
    await Salesforce.wait(4000);
});

Given(
    "logged in as a {string}",
    async (profile: string) => {
        await Salesforce.actions.closeAllTabs();
        await Salesforce.loggedInAs(profile);
});

Given(
    "I select the {string} application", 
    async (application: string) => {
        await Salesforce.actions.appLauncher(application);
        await Salesforce.wait();
        await Salesforce.actions.closeAllTabs();
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
        await Salesforce.actions.selectRecordFromListViewResult('listViewInput.Search', 'Purchase_Order__c' , Name, { id:Id });
    }
);

Then(
    "the user click on {string} quick action to be able to open the pop-up",
    async (quickActionName:string) => {
        console.log('WHEN');
        const quickAction = await Salesforce.get('sf', 'quickActionButton', { quickActionName });        
        quickAction?.click();
        await Salesforce.wait(4000);
    }
)