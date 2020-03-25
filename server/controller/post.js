const Post = require("../model/Post");
const logger = require('../utils/logger')

exports.addPost = (req, res) => {
  const post = new Post({
    title: req.body.title,
    link: req.body.link,
    desc: req.body.desc
  })
}