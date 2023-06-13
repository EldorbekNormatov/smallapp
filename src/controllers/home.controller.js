const Io = require("../utils/io");
const Teachers = new Io("./database/teacher.json");
const Episode = new Io("./database/episode.json");
const Topic = new Io("./database/topic.json")
const Trend = new Io("./database/trend.json")


const home = async (req, res) => {
  const teachers = await Teachers.read();
  const episodes = await Episode.read()
  const topics = await Topic.read()
  const trends = await Trend.read()

  res.render("index", {
    teachers,
    episodes,
    topics,
    trends,
  });
};

const detailPage = async (req, res) => {
  res.render("detail-page");
};

const listingPage = async (req, res) => {
  res.render("listing-page");
};

const adminPage = async (req, res) => {
  res.render("admin");
};

module.exports = {
  home,
  detailPage,
  adminPage,
  listingPage,
};
