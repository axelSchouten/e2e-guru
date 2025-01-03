const salesForceSelectors = {
    "appLauncherButton": "//button[@title='App Launcher']",
    "appLauncherSearchBox": "//one-app-launcher-search-bar/lightning-input/lightning-primitive-input-simple/div/div/input",
    "listViewDropDownButton": "//button[@title='Select a List View: {{name}}']",
    "listViewSearchList": "//input[@placeholder='Search lists...']",
    "listViewSearchList.Result": "//li[@data-aura-class='forceVirtualAutocompleteMenuOption']/a",
    "listViewInput.Search": "//force-list-view-manager-search-bar//input[@name='{{objectApiName}}-search-input']",
    "listViewTable.ResultLink": "//a[@data-recordid='{{id}}']",
    "quickActionButton": "//button[@name='{{quickActionName}}']"
    // if you want to get more than one attribute on the element 
    // you can simply add "and" condition between args : //a[@type="role" and @class="slds-input" ...]
}

const installerPortalSelectors = {}

export { salesForceSelectors, installerPortalSelectors };