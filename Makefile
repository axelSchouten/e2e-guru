CUCUMBER = npx cucumber-js
AUTHFILE = .authfile.json
SF_USER  = automate@integ
REPORT_HTML = ./report.ts
REPORT_JSON_RESULT = results

%:
	@:
ARGS = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

open-tag:
	@$(CUCUMBER) --tags "$(ARGS)"

build-tests:
	@$(CUCUMBER) --format json:reports/$(REPORT_JSON_RESULT).json
	@npx ts-node $(REPORT_HTML)

org-login: $(AUTHFILE)
	@sf org login sfdx-url --sfdx-url-file $(AUTHFILE) --alias $(SF_USER) --set-default

init-sf:
	@echo "Init SF assets"
	@sf org display --target-org $(SF_USER) --verbose --json 2>&- > $(AUTHFILE)