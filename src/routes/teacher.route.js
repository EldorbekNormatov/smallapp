const {Router} = require("express");
const isAuth = require("../middlewares/isAuth");
const { getTeacher, teacherAdd, getTeacherDel, TeacherDel} = require("../controllers/teacher.controller");

const router = Router();

router.get("/admin/teacher", isAuth, getTeacher);
router.post("/admin/teacher", isAuth, teacherAdd);
router.get("/admin/del/teacher", isAuth, getTeacherDel);
router.post("/admin/del/teacher", isAuth, TeacherDel);

module.exports = router;
