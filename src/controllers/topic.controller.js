const {v4: uuid} = require("uuid");
const path = require("path")
const Io = require("../utils/io")
const Topic = new Io(path.join( process.cwd(), "database", "topic.json" ))
const Model = require("../models/topic")

const getTopic = (req, res) => {
    res.render('topicAdd')
}


const addTopic = async (req, res) => {
    const {title, amount} = req.body
    const {image} = req.files

   const imageName = `${uuid()}${path.extname(image.name)}`;

    image.mv(process.cwd() + "/uploads/" + imageName);

    const topic = new Model(title, amount , imageName);

    const read = await Topic.read();

    const findTitle = read.find( (t) => t.title == title)
    const findname = read.find( (t) => t.amount == amount)


    const data = read.length ? [...read, topic] : [topic];


    if(!findTitle || !findname) {
    await Topic.write(data);
    res.render("admin")
    }  
    res.render("error-exist")
}

const getDeltopic = async (req, res) => {
    res.render("topicDel")
}

const delTopic = async (req, res) => {
    const {title, amount} = req.body

    const read = await Topic.read();  

    for(let i = 0; i < read.length; i++) {
      if(read[i].title == title && read[i].amount== amount ) {
        const data = read.indexOf(read[i])
        read.splice(data, 1)

        await Topic.write(read)
        res.render("admin")
      } else {
      }
    }
    res.render("error")

}
module.exports = {
    getTopic,
    addTopic,
    getDeltopic,
    delTopic,
}