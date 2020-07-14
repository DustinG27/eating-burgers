var express = require("express");
var router = express.Router();
var burger = require("../models/burger");

router.get("/", function (req, res) {
    burger.all(function (data) {
        var allBurgers = {
            burgers: data
        };
        res.render("index", allBurgers)
    });
});

router.post("/api/burgers", function (req, res) {
    burger.create(req.body, function (result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function (req, res) {
    burger.update(req.params.id, {
        devoured: req.body.devoured
    }, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    });
});

module.exports = router; 