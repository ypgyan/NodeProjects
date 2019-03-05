var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var passport = require("passport");
var setUpPassport = require("./setuppassport");

var routes = require("./routes");

var app = express();
mongoose.connect("mongodb://localhost:27017/lam");
setUpPassport();

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extend: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "TKRvOIJs=HYqrvagQ#&!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});
