#How To: Integrate the AppNexus HTML5 Library with Ads Created in Google Web Designer

##Converting an Existing Google Web Designer Ad

If you are working with an ad already created in Google Web Designer, you can follow these instructions to modify that ad so it works with the AppNexus HTML5 Library.

<a name="standard-ads"></a>
##Standard Ads
The corresponding example for this section can be found in this folder under `/Google Web Designer/Standard/`.

###Step 1: Find the `index.html` file
Before we begin, find the folder containing the Google Web Designer-created ad.  You may only have a file with a `.zip` extension—in this case, you must unzip the file to reveal a folder containing its various assets.


Then, look for and open the file named `index.html`. This file is where we will make all of the necessary changes in the steps below.

<a name="standard-ads-step-1"></a>
###Step 2: Add the AppNexus HTML5 Library
First, we will have to make sure the actual HTML5 Library is linked to inside `index.html`.  This should be done right before the `</head>` tag in the `index.html` file, by adding the following `<script>` tag:

```html
  <head>
        ...
        <script type="text/javascript" src="https://acdn.adnxs.com/html5-lib/1.4.1/appnexus-html5-lib.min.js"></script>
  </head>
```


<a name="standard-ads-step-2"></a>
###Step 3: Replace hard-coded URL with `APPNEXUS.getClickTag()`
Generally, you may have an ad created in Google Web Designer that has a hard-coded URL embedded.  

In order to remove them, search for `gwd-events="handlers"` in the same `index.html` file.  You should find a block of code that looks like this:

```html
  <script type="text/javascript" gwd-events="handlers">
    gwd.auto_BodyClick = function(event) {
      // GWD Predefined Function
      gwd.actions.gwdGenericad.exit('gwd-ad', 'https://appnexus.com', true);
    };
  </script>
```
Note that the hardcoded URL (in this case, `https://appnexus.com`) will vary based on the specific ad you are working with. 

Then, replace `"https://appnexus.com"` (including the quotation marks) with `APPNEXUS.getClickTag()`, so that this function looks like:

```html
  <script type="text/javascript" gwd-events="handlers">
    gwd.auto_BodyClick = function(event) {
      // GWD Predefined Function
      gwd.actions.gwdGenericad.exit('gwd-ad', APPNEXUS.getClickTag(), true);
    };
  </script>
```

###Step 4: Finish and Upload

Then, ZIP the folder containing `index.html` and the rest of your ad's assets and upload it using the [AppNexus Hosted HTML5 Creative Upload](https://wiki.appnexus.com/display/console/Upload+Hosted+HTML5+Creatives).