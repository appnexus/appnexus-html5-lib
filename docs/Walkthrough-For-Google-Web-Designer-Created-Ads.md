#How To: Integrate the AppNexus HTML5 Library with Ads Created in Google Web Designer

##Converting an Existing Google Web Designer Ad

If you are working with an ad already created in Google Web Designer, you can follow these instructions to modify that ad so it works with the AppNexus HTML5 Library.

<a name="standard-ads"></a>
##Standard Ads

Before we begin, find the folder containing the Google Web Designer-created ad.  You may only have a file with a `.zip` extension—in this case, you must unzip the file to reveal a folder containing its various assets. Then, look for and open the file named `index.html`. This file is where we will make all of the necessary changes in the steps below.

<a name="standard-ads-step-1"></a>
###Step 1: Add the AppNexus HTML5 Library

First, we will have to link to the actual HTML5 Library.  This should be done right before the `</head>` tag in the `index.html` file, as such:

```html
  <head>
        ...
        <script type="text/javascript" src="https://acdn.adnxs.com/html5-lib/1.3.0/appnexus-html5-lib.min.js"></script>
  </head>
```


<a name="standard-ads-step-2"></a>
###Step 2: Add a click event
The AppNexus HTML5 Library provides a function, `APPNEXUS.click()`, that should be called when your ad is clicked.  To implement it, first find the HTML DOM element that represents the ad in `index.html`.  It will look similar to this:

```html
<body>
  <gwd-doubleclick id="gwd-ad" polite-load="">
    <gwd-metric-configuration></gwd-metric-configuration>
    <div is="gwd-pagedeck" class="gwd-page-container" id="pagedeck">
      <div is="gwd-page" id="page1" class="gwd-page-wrapper gwd-page-size gwd-lightbox" data-gwd-width="160px" data-gwd-height="600px">
		...
```
For this example, we have determined that the last `<div>` is where we'd like to add our click event.  We next add the following attribute—`onclick="APPNEXUS.click()"`—inside the `<div>`, as such: 

```html
<body>
  <gwd-doubleclick id="gwd-ad" polite-load="">
    <gwd-metric-configuration></gwd-metric-configuration>
    <div is="gwd-pagedeck" class="gwd-page-container" id="pagedeck">
      <div is="gwd-page" id="page1" class="gwd-page-wrapper gwd-page-size gwd-lightbox" data-gwd-width="160px" data-gwd-height="600px" onclick="APPNEXUS.click()">
		...
```

<a name="standard-ads-step-3"></a>
###Step 3: Remove Google-specific click events
In some instances, you may have an ad created in Google Web Designer that already has support for an event built-in.  These click events do not need to be handled by the Google Web Designer library, since we've added in AppNexus's own click event code (in [step 2](#standard-ads-step-2)).

In order to remove them, search for `gwd-events="registration"` in the same `index.html` file you have had open since [step 1](#standard-ads-step-1).  You should find a `<script>` tag wrapped around a block of code that looks like this:

```html
<script type="text/javascript" gwd-events="registration">
gwd.actions.events.registerEventHandlers=function(event){gwd.actions.events.addHandler("touch","action",gwd.auto_TouchAction,false)};gwd.actions.events.deregisterEventHandlers=function(event){gwd.actions.events.removeHandler("touch","action",gwd.auto_TouchAction,false)};document.addEventListener("DOMContentLoaded",gwd.actions.events.registerEventHandlers);document.addEventListener("unload",gwd.actions.events.deregisterEventHandlers)
</script>
```
If you cannot find this block, there is no such Google-specific click event—you're already done.

If you do find it, then you must comment out the entire block of HTML (by prepending `<!--` and appending `-->`), as such:

```html
<!--
<script type="text/javascript" gwd-events="registration">
gwd.actions.events.registerEventHandlers=function(event){gwd.actions.events.addHandler("touch","action",gwd.auto_TouchAction,false)};gwd.actions.events.deregisterEventHandlers=function(event){gwd.actions.events.removeHandler("touch","action",gwd.auto_TouchAction,false)};document.addEventListener("DOMContentLoaded",gwd.actions.events.registerEventHandlers);document.addEventListener("unload",gwd.actions.events.deregisterEventHandlers)
</script>
-->
```
