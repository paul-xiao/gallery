const Post = require("../model/Post");
const ObjectId = require('mongoose').Types.ObjectId
const logger = require('../utils/logger')
const saveToIpfs = require('../utils/saveToIpfs')

exports.addPost = (req, res) => {
  const post = new Post({
    title: req.body.title,
    link: req.body.link,
    desc: req.body.desc
  })

  post.save().then(data => {
    console.log(data.id)
    res.json({
      message: "Successful created new user."
    });
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
}
exports.editPostByID = (req, res) => {
  const postId = req.params.id
  const { body } = req
  if(postId){
    Post.updateOne({
      _id: postId
    },body, function(err){
      console.log(err)
      if(err) {
        res.status(500).send({
          status:false,
          message: err
        })
      }else {
        res.send({
          status: true,
          message: 'Update success'
        })
      }
    })
  }
};
exports.deletePostByID = (req, res) => {
  const postId = req.params.id
  const { body } = req
  if(postId){
    Post.deleteOne({_id: postId}, function(err){
      if(err) {
        res.status(500).send({
          status:false,
          message: err
        })
      }else {
        res.send({
          status: true,
          message: 'delete success'
        })
      }
    })
}
}