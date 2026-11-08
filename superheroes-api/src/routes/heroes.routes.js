const express = require("express");
const router = express.Router();
const heoresController = require("../controllers/heroes.controller");
router.get("/", heoresController.list);
router.post("/", heoresController.create);
router.patch("/:id", heoresController.update); 
router.put("/:id", heoresController.replace);
router.delete("/:id", heoresController.remove);



module.exports = router;