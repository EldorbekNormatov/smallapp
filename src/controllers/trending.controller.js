const {v4: uuid} = require("uuid");
const path = require("path")
const Io = require("../utils/io");
const Trend = new Io(path.join( process.cwd(), "database", "trend.json"))
const Model = require("../models/trend");



const getTrend = async (req, res ) => {
    res.render("trend")
}

const postTrend =async (req, res ) => {
  const {title, name, field} = req.body

  const {image1 } = req.files
  const {image2 } = req.files
  
const imageName1 = `${uuid()}${path.extname(image1.name)}`;
const imageName2 = `${uuid()}${path.extname(image2.name)}`;

image1.mv(process.cwd() + "/uploads/" + imageName1);
image2.mv(process.cwd() + "/uploads/" + imageName2);

const episode = new Model(title, name, field, imageName1, imageName2);

const read = await Trend.read();

const data = read.length ? [...read, episode] : [episode];

const findTitle = read.find( (t) => t.title == title)
const findname = read.find( (t) => t.name == name)

if(!findTitle || !findname) {
  await Trend.write(data);
  res.render("admin")

}  else{
  res.render("error-exist")
}


}

const delTrendGet =async (req, res ) => {   
    res.render("delTrend")
}
const delTrend =async (req, res ) => {   
    const {title, name, field} = req.body

  const read = await Trend.read();  

    for(let i = 0; i < read.length; i++) {
      if(read[i].name == name && read[i].title== title ) {
        const data = read.indexOf(read[i])
        read.splice(data, 1)

        await Trend.write(read)
        res.render("admin")
      } 
    
  }

  res.render("error")
    // res.status(201).json({message: "success"})
}

module.exports = {
    getTrend,
    postTrend,
    delTrendGet,
    delTrend,
}