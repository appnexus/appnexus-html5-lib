#Intergrating the AppNexus HTML5 Library with Manually Created HTML5 Ads

## Table of Contents
- [Standard Ads](#standard-ads)
- [Expanding Ads](#expanding-ads)
- [Interstitial Ads](#interstitial-ads)

<a name="standard-ads"></a>
## Standard Ads
All standard ads require a file called `index.html`. Each of the following steps makes changes to that file.

####Step 1: Add the AppNexus HTML5 Library

You can find the AppNexus' HTML5 JavaScript library at this URL: [https://acdn.adnxs.com/html5-lib/1.4.1/appnexus-html5-lib.min.js](https://acdn.adnxs.com/html5-lib/1.4.1/appnexus-html5-lib.min.js).

You must add it to the ad's `index.html` file, inside the `<head>` tag, in a `<script>` tag like this:

```html	
	<head>
		...
		<script type="text/javascript" src="https://acdn.adnxs.com/html5-lib/1.4.1/appnexus-html5-lib.min.js"></script>
	</head>
```

####Step 2: Add a clickthrough element
Add a unique id `"clickthrough"` to `<div class="container">` (if that does not exist, you can add it to the `<body>` tag),

so that this:

```html	
	<div class="container">
```
becomes this:

```html	
	<div class="container" id="clickthrough">
```

####Step 3: Handle click event
Standard ads will make use of the `APPNEXUS.ready()` and `APPNEXUS.click()` functions (provided by the AppNexus HTML5 JavaScript library you added in Step 1).

Before the closing body tag (`</body>`), you can copy and paste the following `<script>` block—be sure that you do not accidentally add the `</body>` tag.

```html	
    <script type="text/javascript">
        APPNEXUS.ready(function () {
          var clickthrough = document.getElementById("clickthrough");

          clickthrough.addEventListener("click", function () {
            APPNEXUS.click();
          });
        });
    </script>
    </body>
```

__Brief Technical Explanation__

When the page is loaded and the HTML5 Library has loaded, `APPNEXUS.ready()` is called.  `APPNEXUS.click()` is called inside the `addEventListener` callback function — this means that it happens when the user clicks on the `clickthrough` element.

See `README.md` for additional technical documentation on `APPNEXUS.ready()` and `APPNEXUS.click()`. 

<a name="expanding-ads"></a>
## Expanding Ads
All expanding ads require a file called `index.html`. Each of the following steps makes changes to that file.

####Step 1: Add the AppNexus HTML5 Library
You can find the AppNexus' HTML5 JavaScript library at this URL: [https://acdn.adnxs.com/html5-lib/1.4.1/appnexus-html5-lib.min.js](https://acdn.adnxs.com/html5-lib/1.4.1/appnexus-html5-lib.min.js).

You must add it to the ad's `index.html` file, inside the `<head>` tag, in a `<script>` tag like this:

```html	
	<head>
		...
		<script type="text/javascript" src="https://acdn.adnxs.com/html5-lib/1.4.1/appnexus-html5-lib.min.js"></script>
	</head>
```

####Step 2: Add a clickthrough element
Add a unique id `"clickthrough"` to `<div class="container">` (if that does not exist, you can add it to the `<body>` tag),

so this:

```html	
	<div class="container">
```
becomes

```html	
	<div class="container" id="clickthrough">
```

####Step 3: Configure expanding properties
To make your expanding ad work properly, you will need to add the following `<script>` block before the closing body tag `</body>` in `index.html`. 

There are two main things we accomplish when working with expanding ads: 

1. expand/collapse the ad itself
2. making sure the containing `<iframe>` expands to fit the expanded ad

In the following example, the lines `expandingContainer.style.height = 600;` and `expandingContainer.style.height = 248;` exist specifically to expand the ad to `600px` when it is moused over, and to collapse it back to `248px` when it is not.  This code is essentially a placeholder for the animation of the ad—you will very likely be writing completely different code to animate your ad to the specifications that you need.


To expand the `<iframe>` to fit the expanded ad and ensure the ad is not hidden behind the `<iframe>`, you will have to pass in an object to the `APPNEXUS.setExpandProperties()` function:

```
APPNEXUS.setExpandProperties({
  	height: 600
});
```

Here, the object contains a property `height` with a value equal to the expanded height of the ad (set above: `expandingContainer.style.height = 600;`).  It can also contain a `width` property that sets the width of the `<iframe>`.


```html	
<body>
	...
  <script type="text/javascript">
      APPNEXUS.ready(function () {
        var isExpanded = false;
        var expandingContainer = document.getElementById("container");
        
        APPNEXUS.setExpandProperties({
          height: 600
        });
        
        expandingContainer.addEventListener("mouseover", function () {
          if (!isExpanded) { 
            APPNEXUS.expand();
          }
          expandingContainer.style.height = 600;
          isExpanded = true;
        });

        expandingContainer.addEventListener('mouseout', function() {
          if (isExpanded) {
            APPNEXUS.collapse();
            expandingContainer.style.height = 248;
          }
        });
      });
  </script>
</body>
```

##### Animating the containing `<iframe>`

Using `APPNEXUS.setExpandProperties()` allows you to smoothly animate the `<iframe>` that contains your ad. If you want to take advantage of this feature, you can do so by adding `expand` and `collapse` properties to an object that you pass into `APPNEXUS.setExpandProperties`.

Both the `expand` and `collapse` properties are themselves objects that contain `easing` and `duration` properties, which determine the easing curve and duration of the animation, respectively.

Putting it all together, we can add in `APPNEXUS.setExpandingProperties()` to the previous example, as such:

```html	
<body>
	...
  <script type="text/javascript">
      APPNEXUS.ready(function () {
        var isExpanded = false;
        var expandingContainer = document.getElementById("expanding-container");

        APPNEXUS.setExpandProperties({
          height: 600,
          expand: {
            easing: 'ease-in-out',
            duration: 2000
          },
          collapse: {
            easing: 'ease-in-out',
            duration: 1000
          }
        });

        expandingContainer.addEventListener("mouseover", function () {
          if (!isExpanded) { 
            APPNEXUS.expand();
          }
          expandingContainer.style.height = 600;
          isExpanded = true;
        });

        expandingContainer.addEventListener('mouseout', function() {
          if (isExpanded) {
            APPNEXUS.collapse();
            expandingContainer.style.height = 248;
          }
        });
      });
  </script>
</body>
```
__Brief Technical Explanation__

`APPNEXUS.expand()` is called inside the `addEventListener`'s callback function — in this case, this means that it happens when the user mouses over or moves their mouse outside of the `clickthrough` element.  This all takes place inside `APPNEXUS.ready()`— this means this only runs when the page is loaded and the HTML5 Library has loaded.

See `README.md` for additional technical documentation on `APPNEXUS.setExpandProperties()` and `APPNEXUS.expand()`. 

<a name="interstitial-ads"></a>
## Interstitial Ads
All interstitial ads require a file called `index.html`. Each of the following steps makes changes to that file.

####Step 1: Add the AppNexus HTML5 Library
You can find the AppNexus' HTML5 JavaScript library at this URL: [https://acdn.adnxs.com/html5-lib/1.4.1/appnexus-html5-lib.min.js](https://acdn.adnxs.com/html5-lib/1.4.1/appnexus-html5-lib.min.js).

You must add it to the ad's `index.html` file, inside the `<head>` tag, in a `<script>` tag like this:

```html	
	<head>
		...
		<script type="text/javascript" src="https://acdn.adnxs.com/html5-lib/1.4.1/appnexus-html5-lib.min.js"></script>
	</head>
```

####Step 2: Add a clickthrough element
Add a unique id `"clickthrough"` to `<div class="container">` (if that does not exist, you can add it to the `<body>` tag),

so this:

```html	
	<div class="container">
```
becomes

```html	
	<div class="container" id="clickthrough">
```

####Step 3: Configure interstitial properties
To make your expanding ad work properly, you will need to add the following `<script>` block before the closing body tag `</body>` in `index.html`. 

This makes use of the `APPNEXUS.setExpandProperties()` and `APPNEXUS.expand()` functions provided by the AppNexus HTML5 JavaScript library you added in Step 1 as such:

```html	
	...
    <script type="text/javascript">
        APPNEXUS.ready(function () {
          APPNEXUS.setExpandProperties({
			interstitial : true
  		  });
		  APPNEXUS.expand();
        });
    </script>
    </body>
```

If you have a close button on your interstitial ad, you can use `APPNEXUS.collapse()` to register that as such:

```html	
	...
    <script type="text/javascript">
		APPNEXUS.ready(function () {
			var closeButton = document.getElementById('close');
			closeButton.addEventListener("click", function () {
					APPNEXUS.collapse();
			});
			  		
			APPNEXUS.setExpandProperties({
				interstitial : true
			});
			APPNEXUS.expand();

        });
    </script>
    </body>
```

__Brief Technical Explanation__

`APPNEXUS.expand()` (and `APPNEXUS.collapse()`) is called  inside `APPNEXUS.ready()`— this means this only runs when the page is loaded and the HTML5 Library has loaded.

See `README.md` for additional technical documentation on `APPNEXUS.setExpandProperties()` and `APPNEXUS.expand()`. 
