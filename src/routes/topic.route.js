const {Router} = require("express")
const{getTopic, addTopic, getDeltopic, delTopic} = require('../controllers/topic.controller')
const router = Router()

router.get("/admin/topic", getTopic )
router.post("/admin/topic", addTopic )
router.get("/admin/topic/del", getDeltopic )
router.post("/admin/topic/del", delTopic )

module.exports = router