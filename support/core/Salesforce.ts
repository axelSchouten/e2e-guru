import { readFileSync, readFile } from "fs";
import { BrowserManager } from "../common/BrowserManager";
import { salesForceSelectors, installerPortalSelectors } from "../common/Selector";
import { buildSQLQuery, cmd } from "../utils/command";
import { SFActions } from "./SalesforceActions";
import { RecordsOutPut, QueryOutPut } from "../utils/type";
import { ISalesforce } from "../utils/interfaces"


class Salesforce extends BrowserManager implements ISalesforce {
    
    actions: SFActions;

    constructor() {
        super({ sf: salesForceSelectors, installer: installerPortalSelectors });
        this.actions = new SFActions(this);
    }

    public async loggedInAs (profileName: string): Promise<any> {
        const userId = await this.runQuery(`SELECT ID FROM User WHERE Profile.Name ='${profileName}' AND isActive = true LIMIT 1`);
        const orgId = await this.runQuery(`SELECT ID FROM Organization`);
        if (userId && orgId) {
            this.visit(`${process.env.SALESFORCE_SETUP_REDIRECT}/servlet/servlet.su?oid=${orgId[0].Id}&suorgadminid=${userId[0].Id}&targetURL=/home/home.jsp?&isdtp=1`);
        }
    }

    public async loginSF (): Promise<any> {
        await cmd(`make init-sf`);
        const { 
            status, 
            result: { accessToken, instanceUrl } 
        } = JSON.parse(readFileSync(process.env.SALESFORCE_AUTH_FILE as string, 'utf8'));
        return this.visit(`${instanceUrl}/secur/frontdoor.jsp?sid=${accessToken}`);
    }

    public async getRecords (options: any) {
        const result = await this.runQuery(
            await buildSQLQuery(options.objectname, options.fields, options.clauses, 1)
        );
        return result?.length > 0 ? result[0] : null;
    }

    private runQuery (query: string) :Promise< RecordsOutPut[]> {
        return cmd(`sf data query --query "${query}" --json`).then(
            (_result) => {
                const { result : { records } } = JSON.parse(_result as string) as QueryOutPut;
                return records
            }
        );
    }
}

export default new Salesforce();