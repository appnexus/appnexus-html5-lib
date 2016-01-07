# Advertiser-Side API

The `APPNEXUS` object is the base object of the API which provides actions to pass down to the publisher website.

## APPNEXUS

### Methods

#### void APPNEXUS.ready(callbackFunction)

This function is called once the APPNEXUS object has been initialized.

```javascript
APPNEXUS.ready(function () {
  var readMoreButton = document.getElementById('read-more-button');

  readMoreButton.click = function () {
    APPNEXUS.click('MyAd', 'http://example.com');
  }
});
```


#### void APPNEXUS.click([url])


#### void APPNEXUS.expand()


#### void APPNEXUS.contract()