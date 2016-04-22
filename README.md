# AppNexus HTML5 Library

The AppNexus HTML5 library helps integrate HTML5 ads into websites in a safe and secure manner.

## Installation

Run the following from the directory where you want the repo to liv in

```
git clone <this-repo-url> html5-lib
cd html5-lib
npm install
```

<br /><br />
## Development

You can develop and test on the fly by running:

```
npm run watch
```
This will automatically rebuild `appnexus-html5-lib.js` when any of the files under `src` change.


You can use the included example to test by running the following:

```
npm run example
```

You can run both commands on sepearte terminals for a better develeopment environment.


<br /><br />
## Building

To build the minified version run:

```
npm run build
```

This will build three files, `appnexus-html5-lib.js`, `appnexus-html5-lib.min.js` and `appnexus-html5-lib-<version>.js`.

<br /><br />
## Deploying

Make sure to bump the version number in packages.json and then build.


The appnexus-html-lib-host.min.js need to be placed on the CDN in a folder corresponding to its version number. for example `https://acdn.adnxs.com/html5-lib-host/1.0.1/appnexus-html5-lib-host.min.js`.

The templates also need to be updated in both sand and prod using the `/template` API.

### Updating sand

```
http://sand.api.appnexus.com/template?id=1469
{
	"template": {
		"content_js": "document.write('<scr'+'ipt type=\"text/javascript\" src=\"https://acdn.adnxs.com/html5-lib-host/1.0.1/appnexus-html5-lib-host.min.js\"></scr'+'ipt><scr'+'ipt type=\"text/javascript\">APPNEXUS.placement(\"#{HTML5_INDEX_FILE}\", \"${CLICK_URL}\", ${CREATIVE_WIDTH}, ${CREATIVE_HEIGHT});</scr'+'ipt>'); /*${MEDIA_URL}*/"
	}
}
```
```
http://sand.api.appnexus.com/template?id=1470
{
	"template": {
		"content_js": "document.write('<scr'+'ipt type=\"text/javascript\" src=\"https://acdn.adnxs.com/html5-lib-host/1.0.1/appnexus-html5-lib-host.min.js\"></scr'+'ipt><scr'+'ipt type=\"text/javascript\">APPNEXUS.placement(\"#{HTML5_INDEX_FILE}\", \"${CLICK_URL}\", ${CREATIVE_WIDTH}, ${CREATIVE_HEIGHT});</scr'+'ipt>'); /*${MEDIA_URL}*/"
	}
}
```
```
http://sand.api.appnexus.com/template?id=1471
{
	"template": {
		"content_js": "document.write('<scr'+'ipt type=\"text/javascript\" src=\"https://acdn.adnxs.com/html5-lib-host/1.0.1/appnexus-html5-lib-host.min.js\"></scr'+'ipt><scr'+'ipt type=\"text/javascript\">APPNEXUS.placement(\"#{HTML5_INDEX_FILE}\", \"${CLICK_URL}\", ${CREATIVE_WIDTH}, ${CREATIVE_HEIGHT});</scr'+'ipt>'); /*${MEDIA_URL}*/"
	}
}
```

### Updating prod
```
http://api.appnexus.com/template?id=8606
{
	"template": {
		"content_js": "document.write('<scr'+'ipt type=\"text/javascript\" src=\"https://acdn.adnxs.com/html5-lib-host/1.0.1/appnexus-html5-lib-host.min.js\"></scr'+'ipt><scr'+'ipt type=\"text/javascript\">APPNEXUS.placement(\"#{HTML5_INDEX_FILE}\", \"${CLICK_URL}\", ${CREATIVE_WIDTH}, ${CREATIVE_HEIGHT});</scr'+'ipt>'); /*${MEDIA_URL}*/"
	}
}
```
```
http://api.appnexus.com/template?id=8607
{
	"template": {
		"content_js": "document.write('<scr'+'ipt type=\"text/javascript\" src=\"https://acdn.adnxs.com/html5-lib-host/1.0.1/appnexus-html5-lib-host.min.js\"></scr'+'ipt><scr'+'ipt type=\"text/javascript\">APPNEXUS.placement(\"#{HTML5_INDEX_FILE}\", \"${CLICK_URL}\", ${CREATIVE_WIDTH}, ${CREATIVE_HEIGHT});</scr'+'ipt>'); /*${MEDIA_URL}*/"
	}
}
```
```
http://api.appnexus.com/template?id=8608
{
	"template": {
		"content_js": "document.write('<scr'+'ipt type=\"text/javascript\" src=\"https://acdn.adnxs.com/html5-lib-host/1.0.1/appnexus-html5-lib-host.min.js\"></scr'+'ipt><scr'+'ipt type=\"text/javascript\">APPNEXUS.placement(\"#{HTML5_INDEX_FILE}\", \"${CLICK_URL}\", ${CREATIVE_WIDTH}, ${CREATIVE_HEIGHT});</scr'+'ipt>'); /*${MEDIA_URL}*/"
	}
}
```


<br /><br />
## API Documentation

### `APPNEXUS` Object

The `APPNEXUS` object is the base object of the API which provides actions to pass down to the publisher website.


<br /><br />
### Method `APPNEXUS.ready(callback) : void`

The `APPNEXUS.ready()` will trigger `callback` function once the APPNEXUS object has been initialized and the page has been loaded.

``` js
APPNEXUS.ready(function () {
  var readMoreButton = document.getElementById('read-more-button');

  readMoreButton.addEventListener("click", function () {
    APPNEXUS.click();
  });
});
```

<br /><br />
### Method `APPNEXUS.click([url]) : void`

Opens a new window linking to the clickthrough URL or to the specified URL if the `url` parameter is specified.


*NOTE: Click-tracking is currently not available when a URL is specified with the `url` parameter.*

``` js
APPNEXUS.ready(function () {
  var readMoreButton = document.getElementById('read-more-button');
  var facebookButton = document.getElementById('facebook-button');

  readMoreButton.addEventListener("click", function () {
    APPNEXUS.click();
  });

  facebookButton.addEventListener("click", function () {
     // Does not use click-tracking
   APPNEXUS.click('http://www.facebook/myawesomeprofile');
  });
});
```

<br /><br />
### Method `APPNEXUS.setExpandProperties(properties) : void`

Sets the expanding properties of an ad, whether that's an interstitial, a push over, or a floating ad.

Options for `properties` settings:

|    Property    |   Type  | Value | Default |
|----------------|---------|-------|---------|
| `width` | Number | The expanded `width` in pixels | Current ad "width" |
| `height` | Number | The expanded `height` in pixles | Current ad "height" |
| `floating` | Boolean | Makes the ad float or push content | `false` |
| `anchor` | String | Can be one of the following: `"top-right"`, `"bottom-right"`, `"bottom-left"`, or `"top-left"` <br/ > *NOTE: Only works when the `floating` flag is set to true.* | `"top-left"`
| `expand` | Object | Expanding easing animation of the frame. See `easing-properties` option settings. | |
| `collapse` | Object | Collapsing easing animation of the frame. See `easing-properties` option settings. | Inherits `expand` property |
| `interstital` | Boolean | Sets the ad as a full screen interstitial with a light box overlay  | `false` |
| `overlayColor` | String | The CSS color of the light box overlay | `"rgba(0,0,0,0.5)"` |

*NOTE: Setting `interstitial` to `true` will ignore the `floating` value if set together*

<br /><br />
Options for `easing-properties` settings:

|    Property    |   Type  | Value | Default |
|----------------|---------|-------|---------|
| `easing`       | String  | CSS [transition-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function). | No easing by default |
| `duration`     | Number  | CSS transtion duration for `easing` | `400` |

<br /><br />
Some examples for `APPNEXUS.setExpandingProperties()`:

**Interstitial Ad Example**

``` js
// Ad must call `APPNEXUS.expand()` inside the `APPNEXUS.ready`
APPNEXUS.ready(function () {
  ...
  APPNEXUS.setExpandProperties({
    interstitial : true
  });
  APPNEXUS.expand();
});
```

**Expanding (Push Over) Ad Example**

``` js
// Original ad size 720x90 that expands to 720x275
APPNEXUS.ready(function () {
  var button = document.getElementById('button');

  APPNEXUS.setExpandProperties({
    height: 275,
    expand: {
      easing: 'ease-in-out',
      duration: 1000
    },
    collapse: {
      easing: 'ease-in-out',
      duration: 500
    }
  });

  // Expands on click
  button.addEventListener("click", function () {
   APPNEXUS.expand();
  });
});
```

**Expanding (Floating) Ad Example**

``` js
// Original ad size 300x250 that expands to 600x500
APPNEXUS.ready(function () {
  var button = document.getElementById('button');

  APPNEXUS.setExpandProperties({
    width: 600,
    height: 500,
    floating: true,
    expand: {
      easing: 'ease-in-out',
      duration: 1000
    }
  });

  // Expands on click
  button.addEventListener("click", function () {
   APPNEXUS.expand();
  });
});
```

<br /><br />
### Method `APPNEXUS.getExpandProperties() : Object`

Returns the current set expanding properties.

<br /><br />
### Method `APPNEXUS.expand() : void`

Triggers the ad to expand to the size specified by the expanding properties in `APPNEXUS.setExpandProperties()`.

<br /><br />
### Method `APPNEXUS.collapse() : void`

Triggers the ad to collapse to the original size.


<br /><br />
## Running Example

To run the examples, from the root folder type:

```
npm run example
```

Open your browser and navigate to `http://localhost:8888`

