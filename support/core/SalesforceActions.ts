import { ISFActions, ISalesforce } from "../utils/interfaces"

class SFActions implements ISFActions {
    sf:ISalesforce;
    constructor (parent:ISalesforce) {
        this.sf = parent;
    }

    public navigateTo (record:string) {}

    public async appLauncher (application:string) {
        console.log(application);
        const appLauncherButton = await this.sf.get('sf', 'appLauncherButton');
        await appLauncherButton?.click();

        const appLauncherInput = await this.sf.get('sf', 'appLauncherSearchBox');
        await appLauncherInput?.focus();
        await appLauncherInput?.fill(application);
        await this.sf.wait(800);
        await appLauncherInput?.press('Enter');
    }

    public async selectListViewName (objectName: string, listViewName:string) {
        const listView = await this.sf.get('sf', 'listViewDropDownButton', { name: objectName });
        listView?.click();
        const listViewInput = await this.sf.get('sf', 'listViewSearchList');
        listViewInput?.focus();
        listViewInput?.fill(listViewName);
        await this.sf.wait(2000);
        const listViewInputResults = await this.sf.get('sf', 'listViewSearchList.Result');
        if (listViewInputResults) {
            const allElements = await listViewInputResults.all();
            allElements.find( async element => await element.textContent() === listViewName )?.click();
        }
    }

    public async searchAndPickRecord (
        inputSelector: string,
        value: string,
        options: any
    ) {
        const input = await this.sf.get('sf', inputSelector);
        input?.fill(value);
        input?.press('Enter');
        const recordId = await this.sf.get('sf', 'listViewTable.ResultLink', options);
        return recordId?.click();
    }


}

export { SFActions };