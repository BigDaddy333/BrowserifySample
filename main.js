"use strict";

var R = require('ramda'),
	get_list = require('./list_provider.coffee');

var square = function(x) { return x*x; }
var squares = R.chain(square, get_list());

document.getElementById('response').innerHTML = squares;