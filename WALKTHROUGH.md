#Walkthrough for intergrating the AppNexus HTML5 Library with HTML5 creatives

## Table of Contents
- Manually Created Creatives
- Google Web Designer
- Adobe Edge
- Google Swiffy

## Manually created creatives

```	
	<!-- Step 1. Add AppNexus' HTML5 javascript library. -->
	<script type="text/javascript" src="https://acdn.adnxs.com/html5-lib/1.0.0/appnexus-html5-lib.min.js"></script>
	<!-- End of Step 1. -->
```

```	<!-- Step 2. Add id="clickthrough" to the main container of the ad. Adding this to the body will also work. -->
	<div class="container" id="clickthrough">
	<!-- End of Step 2. -->
```

```
    <!-- Step 3. Add ready and click functions inside of a script tag before the close of the body tag. Note that it targets the id set in Step 2 (see getElementById). -->
    <script type="text/javascript">
        APPNEXUS.ready(function () {
          var clickthrough = document.getElementById("clickthrough");

          clickthrough.addEventListener("click", function () {
            APPNEXUS.click();
          });
        });
    </script>
```