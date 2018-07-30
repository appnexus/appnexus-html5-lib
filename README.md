# AppNexus HTML5 Client Library

The AppNexus HTML5 client library helps integrate HTML5 ads into websites in a safe and secure manner.

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

#### Multiple `APPNEXUS.ready()` calls

The library also supports multiple `APPNEXUS.ready()` calls per page.  You might want to do this if you have multiple functions that want to check if the APPNEXUS object is initialized and the page is loaded.

`interaction.js`

``` js
APPNEXUS.ready(function () {
  var readMoreButton = document.getElementById('read-more-button');

  readMoreButton.addEventListener("click", function () {
    APPNEXUS.click();
  });
});
```

`layout.js`

``` js
APPNEXUS.ready(function () {
  var fullscreenButton = document.getElementById('fullscreen-button');

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
  fullscreenButton.addEventListener("hover", function () {
   APPNEXUS.expand();
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
### Method `APPNEXUS.getClickTag() : string`

returns the current clickTag url passed to the creative.  This is useful for integration with other ad builders such as adobe edge.

This function can be called before `APPNEXUS.ready` has fired.

**Example usage**

```
var clickTag = APPNEXUS.getClickTag();
```

<br /><br />
### Method `APPNEXUS.getMacroByName(string) : string`

returns the value of a given macro passed to the creative. This is useful for GDPR purposes.

*NOTE: Only works the two `GDPR` macros.*

**Example usage**

```javascript
 APPNEXUS.ready(function () {
    clickthrough.addEventListener("click", function () {
      APPNEXUS.getMacroByName("GDPR_APPLIES");
      APPNEXUS.getMacroByName("GDPR_CONSENT_STRING");
    });
  });
```

<br /><br />
## Usage Documentation

Visit the links below for walkthroughs on how to use the AppNexus HTML5 library in a few specific cases:

- [Integrating the AppNexus HTML5 Library with Manually Created Creatives](https://github.com/appnexus/appnexus-html5-lib/blob/master/docs/Walkthrough-For-Manually-Created-Ads.md)
- [Integrating the AppNexus HTML5 Library with Ads Created in Google Web Designer](https://wiki.appnexus.com/display/industry/Integrating+the+AppNexus+HTML5+Library+with+Ads+Created+in+Google+Web+Designer)
- [Integrating the AppNexus HTML5 Library with Ads Created in Adobe Edge](https://wiki.appnexus.com/display/industry/Integrating+the+AppNexus+HTML5+Library+with+Ads+Created+in+Adobe+Edge)

## Development

For instructions on how to develop this library, see the [Contribution Guidelines](https://github.com/appnexus/appnexus-html5-lib/blob/master/CONTRIBUTION.md).