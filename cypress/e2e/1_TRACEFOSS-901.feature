@TRACEFOSS-901
Feature: 🎫 [QG][TESTING][FE] Trace-X Test Pipeline integration with Cypress + CuCumber and Xray
	#*As a* Test Manager 
	#*I want to* have frontend tests automated, reproducible and executed at any time 
	#*so that* I can detect regressions, retest on any code change and test the functionality for a complex frontend with low efforts AND can implement well-defined INT Tests.
	#h2. Details
	# * Concept [[^C-X XrayCucumberCypress.pdf]]
	# * Xray Test Management - Product Walkthrough for Jira Server/DC: [https://www.youtube.com/watch?v=73a16-yXAfA]
	# * [https://docs.cypress.io/guides/continuous-integration/github-actions]
	# * Testing in Chrome and Firefox with Cypress Docker Images [https://docs.cypress.io/guides/continuous-integration/github-actions#Testing-in-Chrome-and-Firefox-with-Cypress-Docker-Images]
	#
	#h2. Solution
	# * in github actions we will have 2 separated jobs in terms of E2E cucumber tests
	# ** E2E tests (default, without Jira (Xray) integration) - triggered automatically by PR, contains tests definition in repository
	# ** E2E tests - Xray (optional, require Jira (Xray) integration) - triggered manually byt Test Manager , can fetch tests scenarios from Jira (Xray) -> run tests -> push results to Xray 
	# *** as a parameter of this task, we can use e.g. Jira filter id to be able customize set of test definitions we want to fetch from Jira and run

	
	@TRACEFOSS-959
	Scenario: Cucumber test scenario - Dashboard page feature
		Given browser is opened to dashboard page
		Then url should contain dashboard
		And should be visible "Dashboard" header
		And should be visible "TOTAL OF PARTS" section
		And should be visible "TOTAL OF OTHER PARTS" section
		And should be visible "TOTAL INVESTIGATIONS" section
		And should be visible "Quality Investigations" section
		And should be visible "Number of parts per country" section
		And in "Quality Investigations" section should be able to click on "View all" button and go to integrations page