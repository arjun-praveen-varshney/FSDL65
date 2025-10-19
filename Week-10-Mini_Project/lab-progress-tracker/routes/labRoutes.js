// routes/labRoutes.js
const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const ctrl = require("../controllers/labController");
router.route("/")
.get(protect, ctrl.getLabs)
.post(protect, authorize("teacher"), ctrl.createLab);

3

router.route("/:id")
.get(protect, ctrl.getLabById)
.put(protect, authorize("teacher"), ctrl.updateLab)
.delete(protect, authorize("teacher"), ctrl.deleteLab);
// ... experiments, resources, assignments, discussions
module.exports = router;