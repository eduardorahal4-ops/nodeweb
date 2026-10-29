const express = require("express");
const router = express.Router();
const heoresController = require("../controllers/heroes.controller");
router.get("/", heoresController.list);




module.exports = router;