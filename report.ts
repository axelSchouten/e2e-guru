import * as reporter from 'cucumber-html-reporter';

const options: reporter.Options = {
    theme: 'bootstrap',
    jsonFile: 'reports/results.json',
    output: `reports/${Date.now()}-result.html`,
    brandTitle: 'ZePLug / Guru ',
    reportSuiteAsScenarios: true,
    launchReport: true
};

reporter.generate(options);