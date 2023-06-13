const {Router} = require("express");
const {addEpisode, addEpisodePost, delEpisodeGet, delEpisode} = require("../controllers/episode");

const router = Router();

router.get("/admin/epsiode", addEpisode);
router.post("/admin/epsiode", addEpisodePost)
router.get("/admin/del/epsiode", delEpisodeGet)
router.post("/admin/del/epsiode", delEpisode)


module.exports = router;
