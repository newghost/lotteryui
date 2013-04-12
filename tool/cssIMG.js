#!/usr/bin/env node

var fs = require("fs"),
    util = require("util");

//npm install mime
var mime = require("mime");

var src = process.argv[process.argv.length - 1];

(function() {

  if (src.indexOf('.') < 0) {
    console.log("input images' path");
    return;
  }

  fs.readFile(src, function(err, data) {

    if (err) {
      console.log(err);
      return;
    }

    console.log(util.format("data:%s;base64,%s", mime.lookup(src), data.toString("base64")));

  });

})();