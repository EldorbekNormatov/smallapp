const {Router} = require("express");
const {getTrend, postTrend, delTrendGet, delTrend} = require("../controllers/trending.controller");

const router = Router();

router.get("/admin/trend", getTrend);
router.post("/admin/trend", postTrend)
router.get("/admin/del/trend", delTrendGet)
router.post("/admin/del/trend", delTrend)


module.exports = router;
