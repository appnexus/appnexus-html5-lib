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
Ad a script tag (`<script type="text/javascript">`) before the closing body tag (`</body>`).

Inside of the `<script>` tag, standard ads will make use of the `APPNEXUS.ready()` and `APPNEXUS.click()` functions provided by the AppNexus HTML5 JavaScript library we added in Step 1 as such:

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
Ad a script tag (`<script type="text/javascript">`) before the closing body tag (`</body>`).

Inside of the `<script>` tag, you will make use of the `APPNEXUS.ready()`, and `APPNEXUS.expand()` functions provided by the AppNexus HTML5 JavaScript library we added in Step 1 as such:

```	
	...
  <script type="text/javascript">
      APPNEXUS.ready(function () {
        var isExpanded = false;
        var expandingContainer = document.getElementById("expanding-container");

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


If you want to take advantage of the additional features offered in the function `APPNEXUS.setExpandProperties()` that allow you to animate the `<iframe>` that your ad will be contained in, you can do so as such:

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
Ad a script tag (`<script type="text/javascript">`) before the closing body tag (`</body>`).

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

Since the interstitial is designed to occupy the entire device screen, the `APPNEXUS.expand()` function is called as soon as the page is deemed ready by `APPNEXUS.ready()`—it does not wait for a user event like a `click` or `mouseover`.
