var express = require("express");
var morgan = require("morgan")
var path = require("path");
var fs = require("fs");

var app = express();

// Logs all income requests
app.use(morgan("short"));

var staticPath = path.join(__dirname, "static");
app.use(express.static(staticPath));

app.use(function(req, res) {
    res.status(404);
    res.send("<h1>File not Found.</h1>");
});

app.listen(3000, function(){
    console.log("App started on port 3000")
});