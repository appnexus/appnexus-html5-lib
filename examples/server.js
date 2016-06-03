var express = require('express');
var app = express();
var ads = require('./ads.json').ads;
var path = require('path');

app.use(express.static('./'));
app.use(express.static('examples'));

app.get('/:type', function(req, res) {
	var type = req.params.type.trim();
	var filePath = null;
	for (var i = 0; i < ads.length; i++) {
		var value = ads[i];
		if (value.type === type) {
			filePath = value.path;
		}
	}
	if (!filePath) {
		res.send("There is no ad of type: " + type);
	} else {
		res.sendFile(path.join(__dirname+'/'+filePath));
	}
});

app.listen(3000, function() {
	console.log("Head to http://localhost:3000/<ad type> | ad-type = < standard | expanding | expanding-push | interstitial > ") 
})