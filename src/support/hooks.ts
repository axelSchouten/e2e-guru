import { BeforeAll, AfterAll } from "@cucumber/cucumber";
import Salesforce from "./core/Salesforce";

BeforeAll( async () => {
    await Salesforce.launchBrowser({ headless: process.env.HEADLESS_MODE === 'true' ? true : false });
});

AfterAll( async () => {
    await Salesforce.closeBrowser();
});