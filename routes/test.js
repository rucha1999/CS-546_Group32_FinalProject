const path = require('path');

const express = require('express');
const router = express.Router();

router.route("/").get(async (req, res) => {
    //code here for GET
    res.render('login', {title: "Login"});
});

router.route("/example_page").get(async (req, res) => {
    //code here for GET
    res.render('example_page', {title: "Example Title"});
});

module.exports = router;