const Post = require("../model/Post");
const ObjectId = require("mongoose").Types.ObjectId;
const logger = require("../utils/logger");
const { addFile } = require("../utils/ipfs");

exports.addPost = (req, res, next) => {
  console.log(req.files);
  const files = []
  const files =  [...req.files.buffer]
  req.files.forEach(async file => {
    await addFile(Buffer.from(file.buffer))
    .then((data) => {
      files.push({
        name: file.originalname,
        type: file.mimetype,
        ...data
      })
      console.log(files)
    })
    .catch((err) => console.log(err));
  })
    


      const post = new Post({
        title: req.body.title,
        files: [...files],
        desc: req.body.desc || "",
      });

      post
        .save()
        .then((data) => {
          console.log(data.id);
          res.json({
            message: "Post Added Successfully ~",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
};
exports.editPostByID = (req, res) => {
  const postId = req.params.id;
  const { body } = req;
  if (postId) {
    Post.updateOne(
      {
        _id: postId,
      },
      body,
      function (err) {
        console.log(err);
        if (err) {
          res.status(500).send({
            status: false,
            message: err,
          });
        } else {
          res.send({
            status: true,
            message: "Update success",
          });
        }
      }
    );
  }
};
exports.deletePostByID = (req, res) => {
  const postId = req.params.id;
  if (postId) {
    Post.deleteOne({ _id: postId }, function (err) {
      if (err) {
        res.status(500).send({
          status: false,
          message: err,
        });
      } else {
        res.send({
          status: true,
          message: "delete success",
        });
      }
    });
  }
};

exports.getAllPosts = (req, res) => {
  Post.find().then((data) => {
    res.send(data);
  });
};
