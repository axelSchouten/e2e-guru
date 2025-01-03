import { Browser, BrowserContext, chromium, Page } from "playwright";
import { IBrowserManager } from "../utils/interfaces";
import { config } from "dotenv";

config({ path: '../../.env' });

class BrowserManager implements IBrowserManager {

    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    public page: Page | null = null;

    public selectors: any = null;

    constructor ({sf , installer}:any) {
        this.selectors = { sf, installer };
    }

    public async launchBrowser (options:any) {
        this.browser = await chromium.launch(options);
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    };

    public async visit (url: string) {
        if (this.page) await this.page?.goto(url);
    }

    public async closeBrowser () {
        if (this.browser) await this.browser.close();
    };

    public getPage ():Page {
        if (!this.page) {
            throw new Error(`Le navigateurt n'est pas lancé`);
        }
        return this.page;
    };

    public async get (
        appName: string,
        selector: string, 
        options: any = null
    ) {
        const page = this.selectors[appName];
        if (!options) {
            return await this.page?.locator(page[selector]);
        }
        return await this.page?.locator(page[selector].tr(options));
        
    }

    public async wait (timer: number = 2000) {
        return await this.page?.waitForTimeout(timer);
    }
}


export { BrowserManager };