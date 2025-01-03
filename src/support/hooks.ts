import { BeforeAll, AfterAll } from "@cucumber/cucumber";
import Salesforce from "./core/Salesforce";

BeforeAll( async () => {
    console.log('Before All');
    await Salesforce.launchBrowser({ headless: process.env.HEADLESS_MODE === 'true' ? true : false });
});

AfterAll( async () => {
    console.log('After All');
    await Salesforce.closeBrowser();
});