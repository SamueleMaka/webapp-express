const express = require("express")
const router = express.Router()

const controller = require("../controller/controller")

router.get("/", controller.index)

router.get("/:id", controller.show)

router.post("/:id/reviews", controller.store)
module.exports = router