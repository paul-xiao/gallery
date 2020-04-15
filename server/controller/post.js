const Post = require("../model/Post");
const ObjectId = require("mongoose").Types.ObjectId;
const logger = require("../utils/logger");
const { addFile, unpin, gc } = require("../utils/ipfs");

exports.addPost = async (req, res, next) => {
  const files = [...req.files].map((e) => {
    return {
      name: e.originalname,
      content: e.buffer,
      type: e.mimetype,
    };
  });
  await addFile(files)
    .then((data) => {
      console.log(data)
      const post = new Post({
        title: req.body.title,
        files: data,
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
    })
    .catch((err) => console.log(err));
};

exports.deletePostByID = (req, res) => {
  const postId = req.params.id;
  Post.findById(postId).then(async data => {
    if(data) {
    Post.deleteOne({ _id: postId }, async function (err) {
      if (err) {
        res.status(500).send({
          status: false,
          message: err,
        });
      } else {
        // unpin
        const { files } = data
        await unpin(files)
        console.log('done')
        res.send({
          status: true,
          message: "delete success",
        });
      }
    });
    }else {
      res.send({
        status: false,
        message: 'post not exist'
      })
    }

  })
};

exports.getAllPosts = (req, res) => {
  Post.find().then((data) => {
    res.send(data);
  });
};
