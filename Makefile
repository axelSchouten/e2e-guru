CUCUMBER = npx cucumber-js
AUTHFILE = .authfile.json
SF_USER  = automate@integ

open-tag:
	@$(CUCUMBER) --tags "$(ARGS)"

org-login: $(AUTHFILE)
	@sf org login sfdx-url --sfdx-url-file $(AUTHFILE) --alias $(SF_USER) --set-default

init-sf:
	@echo "Init SF assets"
	@sf org display --target-org $(SF_USER) --verbose --json 2>&- > $(AUTHFILE); \