import { Page, Locator } from "playwright";

interface IBrowserManager {
    page: Page | null
    launchBrowser: (options:any) => void
    closeBrowser: () => void
    visit: (url: string) => void
    getPage: () => Page
    wait: (timer: number) => Promise<void>
    get: (appName: string, selector: string, options?: any) => Promise<Locator | undefined>
}

interface ISFActions {
    navigateTo: (record:string) => void
    appLauncher: (appName:string) => void
    selectListViewName: (objectName:string, listViewName:string) => void
    searchAndPickRecord: (input:string, value:string, options: any) => void
}

interface ISalesforce extends IBrowserManager {
    actions: ISFActions
    loggedInAs: (profileName:string) => Promise<any>
    loginSF: () => Promise<any>
    getRecords: (fields: string, objectName: string) => void
}

export {
    IBrowserManager,
    ISFActions,
    ISalesforce
}