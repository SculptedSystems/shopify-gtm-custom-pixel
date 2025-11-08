# Shopify GTM Custom Pixel for Customer Events

## Background

### Purpose

This project provides a Custom Pixel for Shopify's Customer Events.

The Pixel captures store events in the browser and sends them to Google Tag Manager (GTM).

The Pixel enables Shopify stores to push customer interaction data like:

- product views
- cart updates
- purchases

into GTM for analytics and advertising workflows.

### Context

- The pixel runs within the Shopify storefront.
- It executes in the user’s browser.
- It pushes event data to GTM’s `dataLayer`.

## Installation

### Set Up

- run `git clone https://github.com/SculptedSystems/shopify-gtm-custom-pixel`
- run `cd shopify-gtm-custom-pixel`
- run `npm install`

### Configure

- edit `src/config.ts` to customize for your use case

### Compile

- run `npm start`
- copy the code from `dist/index.js`

### Publish

- navigate to [admin.shopify.com](https://admin.shopify.com)
- navigate to "Settings"
- navigate to "Customer events" in your store
- click "Add custom pixel"
- name it
- set "Permission" to "Not required"
- set "Data sale" to "Data collected does not qualify as data sale"
- paste the code in "Code"
- update the configuration
- click "save" at the top of the page
- click "Connect"
