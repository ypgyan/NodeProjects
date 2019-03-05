var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");

// Inicializando a variavel app com express.
var app = express();

// Configurando a view engine do projeto.
app.set("views", path.resolve(__dirname,"views"));
app.set("view engine", "ejs");

// Array global para armazernas as entradas.
var entries = [];
app.locals.entries = entries; // Disponibiliza o array para todas as views.

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

// Criando Rotas
app.get("/", function(req, res){
    res.render("index");
});

app.get("/new-entry", function(req, res){
    res.render("new-entry");
});

app.post("/new-entry", function(req, res){
    if (!req.body.title || !req.body.body) {
        res.status(400).send("Entries must have a title and a body.");
        return;
    }
    entries.push({
        title: req.body.title,
        content: req.body.body,
        published: new Date()
    });
    res.redirect("/");
});

app.use(function(req, res){
    res.status(404).render("404");
});

app.listen(3000, function(){
    console.log("Guestbook app started on port 3000");
});