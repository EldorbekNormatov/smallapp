const {v4: uuid} = require("uuid");
const Io = require("../utils/io");
const Teachers = new Io("./database/teacher.json");
const Teacher = require("../models/Teacher");
const path = require("path");

const getTeacher = (req, res) => {
  res.render("teacherGet")
}

const teacherAdd = async (req, res) => {
  const {name, field} = req.body;
  const {image} = req.files;

  const imageName = `${uuid()}${path.extname(image.name)}`;

  image.mv(process.cwd() + "/uploads/" + imageName);

  const newTeacher = new Teacher(name, imageName, field);

  const teachers = await Teachers.read();

  const data = teachers.length ? [...teachers, newTeacher] : [newTeacher];
  
  
  const findTitle = teachers.find( (t) => t.name == name)
  const findname = teachers.find( (t) => t.field == field)

  if(!findTitle || !findname) {
    await Teachers.write(data);
    res.render("admin")
    }  
    res.render("error-exist")

};

const getTeacherDel = async (req, res) => {
  res.render("teacherDel")
}

const TeacherDel = async (req, res) => {
  const {name, field} = req.body

    const read = await Teachers.read();  

    for(let i = 0; i < read.length; i++) {
      if(read[i].name == name && read[i].field== field ) {
        const data = read.indexOf(read[i])
        read.splice(data, 1)

        await Teachers.write(read)
        res.render("admin")
      } else {
      }
    }
    res.render("error")
}

module.exports = {
  getTeacher,
  teacherAdd,
  getTeacherDel,
  TeacherDel,
};
