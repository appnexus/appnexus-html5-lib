#How To: Integrate the AppNexus HTML5 Library with Ads Created in Adobe Edge

##Converting an Existing Adobe Edge Ad

If you are working with an ad already created in Adobe Edge, you can follow these instructions to modify that ad so it works with the AppNexus HTML5 Library.

<a name="standard-ads"></a>
##Standard Ads

###Step 1: Find the right files to edit
Before we begin, find the folder containing the Adobe Edge-created ad.  You may only have a file with a `.zip` extension—in this case, you must unzip the file to reveal a folder containing its various assets.

Then, look for and open the file named `index.html`. There will also be a file with the extension `.js` at the root level of the ad folder, that looks like `300x250edge.js` (it has also been named `edgeActions.js` in some cases).   These files are where we will make all of the necessary changes in the steps below.

<a name="standard-ads-step-1"></a>
###Step 2: Add the AppNexus HTML5 Library
We will have to make sure the actual AppNexus HTML5 Library is linked to inside `index.html`.  The library can be found here: [https://acdn.adnxs.com/html5-lib/1.4.1/appnexus-html5-lib.min.js](https://acdn.adnxs.com/html5-lib/1.4.1/appnexus-html5-lib.min.js)

Linking the library in should be done inside the `<head>` tag in the `index.html` file, by adding the following `<script>` tag:

```html
<head>
	...
    <script type="text/javascript" src="https://acdn.adnxs.com/html5-lib/1.4.1/appnexus-html5-lib.min.js"></script>
</head>
```


<a name="standard-ads-step-2"></a>
###Step 3: Add Click Event
For this step, you will have to make all your changes to the `300x250edge.js`/`...edge.js`/`edgeActions.js` file.

####Without Existing Click Event
You could see an Adobe Edge JavaScript function that handles events, but has no existing click events. This looks something like this:

```javascript
//Edge symbol: 'stage'
(function(symbolName){
	Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",16750,function(sym,e){
		sym.play(0);
	});
//Edge binding end
})("stage");
```

In order to support the click event using the `APPNEXUS.click()` function, you will have to add in the following function:

```javascript
	Symbol.bindElementAction(compId,symbolName,"${Stage}","click",function(sym,e){
		APPNEXUS.click();
	});
```
Putting it all together, you will have a function that looks like this:

```javascript
//Edge symbol: 'stage'
(function(symbolName){
	Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",16750,function(sym,e){
		sym.play(0);
	});
	Symbol.bindElementAction(compId,symbolName,"${Stage}","click",function(sym,e){
		APPNEXUS.click();
	});
//Edge binding end
})("stage");
```

####With Existing Click Event
You could see an Adobe Edge JavaScript function that handles events, and already has an existing click event. This looks something like this:

```javascript
//Edge symbol: 'stage'
(function(symbolName){
   Symbol.bindElementAction(compId, symbolName, "${Stage}", "click", function(sym, e) {
      window.open("https://appnexus.com");         
   });
//Edge binding end
})("stage");
```

In order to support the click event using the `APPNEXUS.click()` function, you will have to replace the hard-coded URL, `https://appnexus.com` to add in the function  `APPNEXUS.getClickTag()`.


Putting it all together, you will have a function that looks like this:

```javascript
//Edge symbol: 'stage'
(function(symbolName){
   Symbol.bindElementAction(compId, symbolName, "${Stage}", "click", function(sym, e) {
      window.open(APPNEXUS.getClickTag());         
   });
//Edge binding end
})("stage");
```
