const {v4: uuid} = require("uuid");
const path = require("path")
const Io = require("../utils/io");
const Episode = new Io(path.join( process.cwd(), "database", "episode.json"))
const Model = require("../models/episode");


const addEpisode = async (req, res ) => {
    res.render("addEpisode")
}

const addEpisodePost =async (req, res ) => {
  const {title, name, field} = req.body

  const {image1 } = req.files
  const {image2 } = req.files
  
const imageName1 = `${uuid()}${path.extname(image1.name)}`;
const imageName2 = `${uuid()}${path.extname(image2.name)}`;

image1.mv(process.cwd() + "/uploads/" + imageName1);
image2.mv(process.cwd() + "/uploads/" + imageName2);

const episode = new Model(title, name, field, imageName1, imageName2);

const read = await Episode.read();

const data = read.length ? [...read, episode] : [episode];

const findTitle = read.find( (t) => t.title == title)
const findname = read.find( (t) => t.name == name)

if(!findTitle || !findname) {
  await Episode.write(data);
  res.render("admin")

}  else{
  res.render("error-exist")
}


}

const delEpisodeGet =async (req, res ) => {   
    res.render("delEpisode")
}
const delEpisode =async (req, res ) => {   
    const {title, name, field} = req.body

  const read = await Episode.read();  

    for(let i = 0; i < read.length; i++) {
      if(read[i].name == name && read[i].title== title ) {
        const data = read.indexOf(read[i])
        read.splice(data, 1)

        await Episode.write(read)
        res.render("admin")
      } 
    
  }

  res.render("error")
    // res.status(201).json({message: "success"})
}

module.exports = {
    addEpisode,
    addEpisodePost,
    delEpisodeGet,
    delEpisode,
}