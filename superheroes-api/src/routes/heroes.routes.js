const express = require("express");
const router = express.Router();
const heoresController = require("../controllers/heroes.controller");
router.get("/", heoresController.list);
router.post("/", heoresController.create);



module.exports = router;