#Intergrating the AppNexus HTML5 Library with Manually Created HTML5 Ads

## Table of Contents
- Standard Ads
- Expanding Ads
- Interstitial Ads

## Standard Ads
####Step 1:

Add AppNexus' HTML5 JavaScript library to the ad's `index.html` file:

```	
	<head>
		...
		<script type="text/javascript" src="https://acdn.adnxs.com/html5-lib/1.3.0/appnexus-html5-lib.min.js"></script>
	</head>
```

####Step 2:
Add a unique id (such as "clickthrough") to the main container (for example: `<div class="container">`), or the `<body>`, of the ad

_so that this:_

```
	<div class="container">
```
_becomes this_

```
	<div class="container" id="clickthrough">
```

####Step 3:
Add a script tag (`<script type="text/javascript">`) before the closing body tag (`</body>`).

Inside of the `<script>` tag you add, standard ads will make use of the `APPNEXUS.ready()` and `APPNEXUS.click()` functions (provided by the AppNexus HTML5 JavaScript library we added in Step 1) as such:

```	
	...
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

`APPNEXUS.click()` is called inside the `addEventListener`'s callback function — in this case, this means that it happens when the user clicks on the `clickthrough` element.  This all takes place inside `APPNEXUS.ready()`— this means this only runs when the page is loaded and the HTML5 Library has loaded.

See `README.md` for additional technical documentation on `APPNEXUS.ready()` and `APPNEXUS.click()`. 

## Expanding Ads
####Step 1:

Add AppNexus' HTML5 JavaScript library to the ad's `index.html` file:

```	
	<head>
		...
		<script type="text/javascript" src="https://acdn.adnxs.com/html5-lib/1.3.0/appnexus-html5-lib.min.js"></script>
	</head>
```

####Step 2:
Add a unique id (such as "clickthrough") to the main container (for example: `<div class="container">`), or the `<body>`, of the ad.

_so this:_

```
	<div class="container">
```
_becomes_

```
	<div class="container" id="clickthrough">
```

####Step 3:
Add a script tag (`<script type="text/javascript">`) before the closing body tag (`</body>`).

Inside of the `<script>` tag, you will make use of the `APPNEXUS.ready()` and `APPNEXUS.expand()` functions provided by the AppNexus HTML5 JavaScript library we added in Step 1 as such:

```	
	...
  <script type="text/javascript">
      APPNEXUS.ready(function () {
        var isExpanded = false;
        var expandingContainer = document.getElementById("container");

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

In this example, the lines `expandingContainer.style.height = 600;` and `expandingContainer.style.height = 248;` exist specifically to expand the ad (to `600px`) when it is moused over, and to collapse it (back to `248px`) when it is not.

More broadly, these lines handle the animation of the ad. If the ad you're working with has its own animation code (and, since this section covers expandable ads, it likely does), then these specific lines are not necessary.

Using `APPNEXUS.setExpandProperties()` is optional, but it allows you to animate the `<iframe>` that contains your ad.  You might want to do this to make your ad animate smoothly. If you want to take advantage of this feature, you can do so as such:

```	
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

## Interstitial Ads
####Step 1:

Add AppNexus' HTML5 JavaScript library to the ad's `index.html` file:

```	
	<head>
		...
		<script type="text/javascript" src="https://acdn.adnxs.com/html5-lib/1.3.0/appnexus-html5-lib.min.js"></script>
	</head>
```

####Step 2:
Add a unique id (such as "clickthrough") to the main container (for example: `<div class="container">`), or the `<body>`, of the ad.

_so this:_

```
	<div class="container">
```
_becomes_

```
	<div class="container" id="clickthrough">
```

####Step 3:
Add a script tag (`<script type="text/javascript">`) before the closing body tag (`</body>`).

Inside of the `<script>` tag, you will make use of the `APPNEXUS.setExpandProperties()` and `APPNEXUS.expand()` functions provided by the AppNexus HTML5 JavaScript library we added in Step 1 as such:

```	
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

```	
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

`APPNEXUS.expand()` (and `APPNEXUS.collapse()`) is called  inside `APPNEXUS.ready()`— this means this only runs when the page is loaded and the HTML5 Library has loaded.m

See `README.md` for additional technical documentation on `APPNEXUS.setExpandProperties()` and `APPNEXUS.expand()`. 
