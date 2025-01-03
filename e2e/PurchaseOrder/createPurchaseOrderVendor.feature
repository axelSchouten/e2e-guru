@povendor
Feature: Create Purchase Order Vendor 
    
    Background: Generate PDF document for a Purchase Order with a RT_Vendor record type 
        Given logged in as a "Guru Ops"
        * I select the "Sales Console" application
        * I open the "Purchase Orders" object list view and select the "All Vendor POs" view name

    @povendor
    Scenario: Generate Vendor Document
        Given the user open a found "Rt_Vendor" Purchase Order from the list and is redirected to the page layout
        When the user click on "Purchase_Order__c.Generate_PO_Document" quick action to be able to open the pop-up

