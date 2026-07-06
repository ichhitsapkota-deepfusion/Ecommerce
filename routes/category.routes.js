const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

router.get("/", categoryController.getAll);

router.post("/", verifyToken, categoryController.create);

router.put("/:id", verifyToken, categoryController.update);
router.delete("/:id", verifyToken, categoryController.remove);

module.exports = router;
